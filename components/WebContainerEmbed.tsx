'use client'
import { useEffect, useRef, useState } from 'react'
import type { EditorView } from '@codemirror/view'
import type { Transaction } from '@codemirror/state'
import type { WebContainer } from '@webcontainer/api'

// Module-level refs populated by Effect 1 after imports resolve
let _Transaction: typeof Transaction | null = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _foldEffect: any = null

// Auto-fold everything below the helpers sentinel comment
function foldHelpers(view: EditorView) {
  if (!_foldEffect) return
  const doc = view.state.doc
  for (let n = 1; n <= doc.lines; n++) {
    const line = doc.line(n)
    if (line.text.includes('─── Helpers')) {
      if (line.to < doc.length) {
        try { view.dispatch({ effects: [_foldEffect.of({ from: line.to, to: doc.length })] }) } catch {}
      }
      return
    }
  }
}

// Strip ANSI escape codes from terminal output
const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '')

// Singleton — one WebContainer per browsing context
let wcInstance: WebContainer | null = null
let wcBootPromise: Promise<WebContainer> | null = null

async function getWebContainer(): Promise<WebContainer> {
  if (wcInstance) return wcInstance
  if (!wcBootPromise) {
    wcBootPromise = (async () => {
      const { WebContainer } = await import('@webcontainer/api')
      const wc = await WebContainer.boot()

      await wc.fs.writeFile('.npmrc', 'registry=http://registry.npmjs.org/')
      await wc.fs.writeFile('package.json', JSON.stringify({
        name: 'dsa',
        dependencies: { tsx: 'latest' }
      }, null, 2))

      const install = await wc.spawn('npm', ['install'])
      const installLog: string[] = []
      install.output.pipeTo(new WritableStream({
        write(data) { installLog.push(stripAnsi(data)) }
      }))
      const code = await install.exit
      if (code !== 0) throw new Error(`npm install failed:\n${installLog.join('')}`)

      wcInstance = wc
      return wc
    })().catch(err => {
      wcBootPromise = null
      throw err
    })
  }
  return wcBootPromise
}

interface Props {
  file: string
  step: number
  total: number
  solution: string
  problemSlug: string
}

export default function WebContainerEmbed({ file, step, total, solution, problemSlug }: Props) {
  const [tab, setTab] = useState<'try' | 'solution'>('try')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<'idle' | 'booting' | 'running' | 'done' | 'error'>('idle')

  const processRef = useRef<any>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const codeRef = useRef('')

  // Keep codeRef current on every render so Effect 1's async callback
  // always reads the latest value without a stale closure
  codeRef.current = code

  const activeFile = tab === 'try' ? file : solution

  // Load file content when tab/file changes — sets code as reset trigger
  useEffect(() => {
    setCode('')
    setOutput('')
    setStatus('idle')
    fetch(`/api/step-file?slug=${encodeURIComponent(problemSlug)}&file=${encodeURIComponent(activeFile)}`)
      .then(r => r.json())
      .then(({ content }) => { if (content) setCode(content) })
      .catch(() => {})
  }, [activeFile, problemSlug])

  // Effect 1: Mount CodeMirror once
  useEffect(() => {
    let cancelled = false

    ;(async () => {
      const [
        { basicSetup },
        { EditorView },
        { Transaction },
        { HighlightStyle, syntaxHighlighting, foldEffect },
        { javascript },
        { vim, Vim },
        { tags },
      ] = await Promise.all([
        import('codemirror'),
        import('@codemirror/view'),
        import('@codemirror/state'),
        import('@codemirror/language'),
        import('@codemirror/lang-javascript'),
        import('@replit/codemirror-vim'),
        import('@lezer/highlight'),
      ])

      if (cancelled || !editorRef.current) return

      const theme = EditorView.theme({
        '&': {
          backgroundColor: 'var(--bg-alt)',
          color: 'var(--fg)',
        },
        '.cm-content': {
          caretColor: 'var(--fg)',
          padding: '0.75rem 0',
        },
        '.cm-cursor': {
          borderLeftColor: 'var(--fg)',
          borderLeftWidth: '2px',
        },
        '.cm-activeLine': { backgroundColor: 'var(--bg-highlight)' },
        '.cm-activeLineGutter': { backgroundColor: 'var(--bg-highlight)' },
        '.cm-selectionBackground': { backgroundColor: 'var(--sel-bg) !important' },
        '&.cm-focused .cm-selectionBackground': { backgroundColor: 'var(--sel-bg) !important' },
        '.cm-gutters': {
          backgroundColor: 'var(--bg-alt)',
          color: 'var(--fg-gutter)',
          border: 'none',
          borderRight: '1px solid var(--border)',
          paddingRight: '4px',
        },
        '.cm-foldPlaceholder': {
          backgroundColor: 'var(--bg-highlight)',
          border: '1px solid var(--border)',
          color: 'var(--fg-comment)',
        },
      })

      const highlight = HighlightStyle.define([
        { tag: tags.keyword,                  color: 'var(--purple)', fontWeight: '600' },
        { tag: tags.controlKeyword,           color: 'var(--purple)', fontWeight: '600' },
        { tag: tags.definitionKeyword,        color: 'var(--purple)', fontWeight: '600' },
        { tag: tags.moduleKeyword,            color: 'var(--purple)', fontWeight: '600' },
        { tag: tags.string,                   color: 'var(--green)' },
        { tag: tags.special(tags.string),     color: 'var(--green)' },
        { tag: tags.number,                   color: 'var(--orange)' },
        { tag: tags.bool,                     color: 'var(--orange)' },
        { tag: tags.null,                     color: 'var(--orange)' },
        { tag: tags.comment,                  color: 'var(--fg-comment)', fontStyle: 'italic' },
        { tag: tags.lineComment,              color: 'var(--fg-comment)', fontStyle: 'italic' },
        { tag: tags.blockComment,             color: 'var(--fg-comment)', fontStyle: 'italic' },
        { tag: [tags.typeName, tags.className], color: 'var(--blue)' },
        { tag: tags.propertyName,             color: 'var(--cyan, var(--blue))' },
        { tag: tags.function(tags.variableName), color: 'var(--blue)' },
        { tag: tags.definition(tags.variableName), color: 'var(--fg)' },
        { tag: tags.variableName,             color: 'var(--fg)' },
        { tag: tags.operator,                 color: 'var(--fg-alt)' },
        { tag: tags.punctuation,              color: 'var(--fg-alt)' },
        { tag: tags.invalid,                  color: 'var(--red)', textDecoration: 'underline' },
        { tag: tags.angleBracket,             color: 'var(--fg-alt)' },
      ])

      const view = new EditorView({
        doc: codeRef.current,
        extensions: [
          vim(),
          basicSetup,
          javascript({ typescript: true }),
          theme,
          syntaxHighlighting(highlight),
        ],
        parent: editorRef.current,
      })

      viewRef.current = view
      _Transaction = Transaction  // make available to Effect 2
      _foldEffect = foldEffect    // make available to foldHelpers

      // Activate relative + absolute line numbers (standard nvim defaults)
      // Vim.setOption is a static call — does not need the EditorView
      Vim.setOption('relativenumber', true)
      Vim.setOption('number', true)

      foldHelpers(view)
    })()

    return () => {
      cancelled = true
      viewRef.current?.destroy()
      viewRef.current = null
    }
  }, [])

  // Effect 2: Sync external code changes into the editor
  useEffect(() => {
    const view = viewRef.current
    if (!view || !_Transaction) return  // still loading; Effect 1 reads codeRef on init
    const current = view.state.doc.toString()
    if (current === code) return

    view.dispatch({
      changes: { from: 0, to: current.length, insert: code },
      annotations: _Transaction.addToHistory.of(false),
    })
    foldHelpers(view)
  }, [code])

  async function runCode() {
    // Read directly from editor — not from stale React state
    const currentCode = viewRef.current?.state.doc.toString() || code
    if (!currentCode) return
    setOutput('')
    setStatus('booting')
    try {
      const wc = await getWebContainer()
      setStatus('running')
      if (processRef.current) { try { processRef.current.kill() } catch {} }
      await wc.fs.writeFile(activeFile, currentCode)
      const proc = await wc.spawn('node', ['node_modules/tsx/dist/cli.mjs', activeFile])
      processRef.current = proc
      proc.output.pipeTo(new WritableStream({ write(data) { setOutput(p => p + stripAnsi(data)) } }))
      const exit = await proc.exit
      setStatus(exit === 0 ? 'done' : 'error')
    } catch (err) {
      setOutput(p => (p ? p + '\n' : '') + String(err))
      setStatus('error')
    }
  }

  const hasCode = !!(viewRef.current?.state.doc.length || code.length)

  const showTabs = file !== solution

  return (
    <div className="dfh-wc">
      <div className="dfh-wc-header">
        {showTabs && (
          <div className="dfh-wc-tabs">
            <button type="button" className={`dfh-wc-tab${tab === 'try' ? ' active' : ''}`} onClick={() => setTab('try')}>Try It</button>
            <button type="button" className={`dfh-wc-tab${tab === 'solution' ? ' active' : ''}`} onClick={() => setTab('solution')}>Solution</button>
          </div>
        )}
        <span className="dfh-wc-step">Step {step} of {total}</span>
      </div>
      <div className="dfh-wc-body">
        <div ref={editorRef} className="dfh-wc-editor" />
        <div className="dfh-wc-toolbar">
          <button
            type="button"
            className="dfh-wc-run"
            onClick={runCode}
            disabled={status === 'booting' || status === 'running' || !hasCode}
          >
            {status === 'booting' ? '⏳ Installing…' : status === 'running' ? '⏳ Running…' : '▶ Run'}
          </button>
        </div>
        {output && (
          <pre className={`dfh-wc-output${status === 'error' ? ' error' : ''}`}>{output}</pre>
        )}
      </div>
    </div>
  )
}
