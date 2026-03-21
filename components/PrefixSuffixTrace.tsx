'use client';

import { useState } from 'react';

export interface PrefixSuffixStep {
  nums: number[];
  result: number[];
  currentI: number; // -1 = no specific index highlighted
  pass: 'forward' | 'backward' | 'done';
  accumulator: number;
  accName: 'prefix' | 'suffix' | '';
  label: string;
}

function resultCellState(i: number, step: PrefixSuffixStep): string {
  const { currentI, pass } = step;
  if (pass === 'done') return 'ps-final';
  if (pass === 'forward') {
    if (currentI === -1) return 'ps-empty';
    if (i < currentI) return 'ps-filled';
    if (i === currentI) return 'ps-active-fwd';
    return 'ps-empty';
  }
  // backward
  if (currentI === -1) return 'ps-filled'; // transition between passes
  if (i > currentI) return 'ps-final';
  if (i === currentI) return 'ps-active-bwd';
  return 'ps-filled';
}

export default function PrefixSuffixTrace({ steps }: { steps: PrefixSuffixStep[] }) {
  const [idx, setIdx] = useState(0);
  const step = steps[idx];
  const n = step.nums.length;

  const passBadge = step.pass === 'forward'
    ? { label: 'FORWARD', cls: 'ps-fwd' }
    : step.pass === 'backward'
      ? { label: 'BACKWARD', cls: 'ps-bwd' }
      : { label: 'DONE', cls: 'ps-done' };

  return (
    <div className="dfh-trace">
      <div className="dfh-trace-body">
        {/* Pass badge + accumulator */}
        <div className="ps-header">
          <span className={`dfh-trace-badge ${passBadge.cls}`}>{passBadge.label} PASS</span>
          {step.accName && (
            <span className="ps-acc">
              <span className="ps-acc-name">{step.accName}</span>
              <span className="ps-acc-eq">=</span>
              <span className="ps-acc-val">{step.accumulator}</span>
            </span>
          )}
        </div>

        {/* Two-row array grid */}
        <div className="ps-grid">
          {/* Row labels */}
          <div className="ps-row-labels">
            <span className="ps-row-label">nums</span>
            <span className="ps-row-label">result</span>
          </div>

          {/* Columns */}
          <div className="ps-cols">
            {Array.from({ length: n }, (_, i) => {
              const isActive = i === step.currentI;
              const rState = resultCellState(i, step);
              return (
                <div key={i} className="ps-col">
                  <div className={`dfh-trace-cell ps-nums-cell${isActive ? ' ps-nums-active' : ''}`}>
                    {step.nums[i]}
                  </div>
                  <div className={`dfh-trace-cell ${rState}`}>
                    {step.result[i]}
                  </div>
                  <div className="dfh-trace-idx">{i}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dfh-trace-info" style={{ marginTop: '0.75rem' }}>
          <p className="dfh-trace-label">{step.label}</p>
        </div>
      </div>

      <div className="dfh-trace-footer">
        <div className="dfh-trace-legend">
          <span className="ps-legend-fwd">■ prefix stored</span>
          <span className="ps-legend-bwd">■ final value</span>
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
