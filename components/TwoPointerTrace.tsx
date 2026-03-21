'use client';

import { useState } from 'react';

export interface TwoPointerStep {
  chars: string[];
  L: number;
  R: number;
  action: 'match' | 'mismatch' | 'done' | null;
  label: string;
}

function cellState(i: number, step: TwoPointerStep): string {
  const { L, R, action } = step;
  if (action === 'done') {
    if (L === R && i === L) return 'tp-middle';
    return 'tp-verified';
  }
  if (action === 'mismatch') {
    if (i === L || i === R) return 'tp-mismatch';
    if (i < L || i > R) return 'tp-verified';
    return 'tp-unchecked';
  }
  if (i < L || i > R) return 'tp-verified';
  if (i === L && i === R) return 'tp-both';
  if (i === L) return 'tp-left';
  if (i === R) return 'tp-right';
  return 'tp-unchecked';
}

export default function TwoPointerTrace({ steps }: { steps: TwoPointerStep[] }) {
  const [idx, setIdx] = useState(0);
  const step = steps[idx];
  const isDone = step.action === 'done';
  const isMismatch = step.action === 'mismatch';

  return (
    <div className="dfh-trace">
      <div className="dfh-trace-body">
        <div className="dfh-trace-array">
          {step.chars.map((ch, i) => {
            const state = cellState(i, step);
            const isL = i === step.L && !isDone;
            const isR = i === step.R && !isDone;
            return (
              <div key={i} className="dfh-trace-col">
                <div className={`dfh-trace-cell ${state}`}>{ch}</div>
                <div className="dfh-trace-idx">{i}</div>
                <div className="dfh-trace-ptrs">
                  {isL && isR && <span className="dfh-ptr tp-both-ptr">L R</span>}
                  {isL && !isR && <span className="dfh-ptr tp-l-ptr">L</span>}
                  {isR && !isL && <span className="dfh-ptr tp-r-ptr">R</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="dfh-trace-info">
          {step.action && (
            <span className={`dfh-trace-badge action-${step.action}`}>
              {step.action === 'match' ? 'MATCH' : step.action === 'mismatch' ? 'MISMATCH' : step.action === 'done' ? 'DONE' : ''}
            </span>
          )}
          <p className="dfh-trace-label">{step.label}</p>
        </div>
      </div>

      <div className="dfh-trace-footer">
        <div className="dfh-trace-legend">
          <span><span className="dfh-ptr tp-l-ptr">L</span> left</span>
          <span><span className="dfh-ptr tp-r-ptr">R</span> right</span>
        </div>
        <div className="dfh-trace-nav">
          <button className="dfh-trace-btn" disabled={idx === 0} onClick={() => setIdx(i => i - 1)}>← Prev</button>
          <span className="dfh-trace-counter">{idx + 1} / {steps.length}</span>
          <button className="dfh-trace-btn" disabled={idx === steps.length - 1} onClick={() => setIdx(i => i + 1)}>Next →</button>
        </div>
      </div>
    </div>
  );
}
