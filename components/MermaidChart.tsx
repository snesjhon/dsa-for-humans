'use client';

import { useEffect, useRef, useId, useState, useCallback } from 'react';

interface MermaidChartProps {
  chart: string;
}

const BTN: React.CSSProperties = {
  width: 26,
  height: 26,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--border)',
  background: 'var(--bg)',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: '0.85rem',
  color: 'var(--fg-alt)',
  flexShrink: 0,
  userSelect: 'none',
};

type XY = { x: number; y: number };

export default function MermaidChart({ chart }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const naturalSize = useRef<{ w: number; h: number } | null>(null);
  const fittedState = useRef<{ scale: number; translate: XY } | null>(null);
  const dragOrigin = useRef<{
    mx: number;
    my: number;
    tx: number;
    ty: number;
  } | null>(null);
  const id = useId().replace(/:/g, '');

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState<XY>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState(false); // true once user clicks in
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);

  // Keep refs in sync for use inside native event listener
  const scaleRef = useRef(scale);
  const translateRef = useRef(translate);
  const activeRef = useRef(active);
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);
  useEffect(() => {
    translateRef.current = translate;
  }, [translate]);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // ── Render SVG ────────────────────────────────────────────────────
  useEffect(() => {
    if (!innerRef.current) return;
    let cancelled = false;

    async function run() {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#EDE8F8',
          primaryTextColor: '#303030',
          primaryBorderColor: '#D0D0E8',
          lineColor: '#7878A8',
          secondaryColor: '#E8F0FD',
          tertiaryColor: '#F0F0FA',
          background: '#FAFAFF',
          mainBkg: '#EDE8F8',
          nodeBorder: '#B8B8D8',
          clusterBkg: '#F0F0FA',
          titleColor: '#303030',
          edgeLabelBackground: '#FAFAFF',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: '13px',
        },
        flowchart: { curve: 'basis', htmlLabels: true },
        sequence: { useMaxWidth: false },
      });

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim());
        if (cancelled || !innerRef.current) return;

        innerRef.current.innerHTML = svg;
        const svgEl = innerRef.current.querySelector('svg');
        if (!svgEl) return;

        const attrW = parseFloat(svgEl.getAttribute('width') ?? '0');
        const attrH = parseFloat(svgEl.getAttribute('height') ?? '0');
        let nw = attrW,
          nh = attrH;

        if (!nw || !nh) {
          const vb = svgEl.getAttribute('viewBox')?.split(/\s+/);
          if (vb?.length === 4) {
            nw = parseFloat(vb[2]);
            nh = parseFloat(vb[3]);
          }
        }

        svgEl.removeAttribute('width');
        svgEl.removeAttribute('height');
        svgEl.style.display = 'block';
        svgEl.style.overflow = 'visible';

        naturalSize.current = { w: nw || 600, h: nh || 400 };
        setRendered(true);
      } catch (err) {
        if (!cancelled) setError(String(err));
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  // ── Fit to container ─────────────────────────────────────────────
  const fitToContainer = useCallback(() => {
    if (!containerRef.current || !naturalSize.current) return;
    const { w: nw, h: nh } = naturalSize.current;
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const s = Math.max(0.05, Math.min((cw - 40) / nw, (ch - 40) / nh));
    const t = { x: (cw - nw * s) / 2, y: (ch - nh * s) / 2 };
    fittedState.current = { scale: s, translate: t };
    setScale(s);
    setTranslate(t);
  }, []);

  useEffect(() => {
    if (rendered) fitToContainer();
  }, [rendered, fitToContainer]);

  // ── Native wheel listener — only zooms when active ───────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (!activeRef.current) return; // inactive — let page scroll
      e.preventDefault();

      const s = scaleRef.current;
      const t = translateRef.current;
      const factor = e.deltaY < 0 ? 1.15 : 0.87;
      const newScale = Math.max(0.05, Math.min(10, s * factor));
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      scaleRef.current = newScale;
      translateRef.current = {
        x: mx - (mx - t.x) * (newScale / s),
        y: my - (my - t.y) * (newScale / s),
      };
      setScale(newScale);
      setTranslate({ ...translateRef.current });
    }

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []); // empty deps — refs keep values current

  // ── Drag ─────────────────────────────────────────────────────────
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      setActive(true);
      setDragging(true);
      dragOrigin.current = {
        mx: e.clientX,
        my: e.clientY,
        tx: translate.x,
        ty: translate.y,
      };
    },
    [translate],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging || !dragOrigin.current) return;
      setTranslate({
        x: dragOrigin.current.tx + (e.clientX - dragOrigin.current.mx),
        y: dragOrigin.current.ty + (e.clientY - dragOrigin.current.my),
      });
    },
    [dragging],
  );

  // ── Leave — deactivate and reset to fitted view ───────────────────
  const handleMouseLeave = useCallback(() => {
    setDragging(false);
    setActive(false);
    dragOrigin.current = null;
    if (fittedState.current) {
      setScale(fittedState.current.scale);
      setTranslate(fittedState.current.translate);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    dragOrigin.current = null;
  }, []);

  return (
    <div
      onMouseLeave={handleMouseLeave}
      style={{
        margin: '1.75rem 0',
        border: `1px solid ${active ? 'var(--purple)' : 'var(--border)'}`,
        borderRadius: '0.75rem',
        overflow: 'hidden',
        background: 'var(--bg-alt)',
        transition: 'border-color 150ms',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '7px 12px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
        }}
      >
        <span
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fg-gutter)',
          }}
        >
          Diagram
        </span>

        <div
          style={{
            display: 'flex',
            gap: 4,
            marginLeft: 'auto',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.65rem',
              color: 'var(--fg-gutter)',
              minWidth: 36,
              textAlign: 'right',
            }}
          >
            {Math.round(scale * 100)}%
          </span>
          <button
            style={BTN}
            onClick={() => {
              setActive(true);
              setScale((s) => Math.min(10, s * 1.25));
            }}
            title="Zoom in"
          >
            +
          </button>
          <button
            style={BTN}
            onClick={() => {
              setActive(true);
              setScale((s) => Math.max(0.05, s * 0.8));
            }}
            title="Zoom out"
          >
            −
          </button>
          <button
            style={BTN}
            onClick={fitToContainer}
            title="Fit to view"
            aria-label="Reset zoom"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M1 4V1h3M8 1h3v3M11 8v3H8M4 11H1V8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        style={{
          height: 420,
          position: 'relative',
          overflow: 'hidden',
          cursor: dragging ? 'grabbing' : active ? 'grab' : 'default',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Transformed SVG */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
        >
          <div ref={innerRef} />
        </div>

        {/* Hint — changes based on active state */}
        {rendered && (
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              right: 12,
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.6rem',
              color: active ? 'var(--purple)' : 'var(--fg-gutter)',
              pointerEvents: 'none',
              userSelect: 'none',
              transition: 'color 150ms',
            }}
          >
            {active ? 'scroll to zoom · drag to pan' : 'click to interact'}
          </div>
        )}

        {error && (
          <pre
            style={{
              color: 'var(--red)',
              fontSize: '0.8rem',
              padding: '1rem',
              margin: 0,
            }}
          >
            [Mermaid parse error]{'\n'}
            {error}
          </pre>
        )}
      </div>
    </div>
  );
}
