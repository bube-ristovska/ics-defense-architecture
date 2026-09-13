import { useEffect, useRef, useState } from 'react';
import { SUGGESTIONS, answerQuestion } from './aiAdvisor.js';

export default function AiPanel({ open, onClose, checks, focusId, onOpenNode }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const ask = (text) => {
    const q = (text ?? query).trim();
    if (!q) return;
    setQuery(q);
    setResult(answerQuestion(q, { checks, focusId }));
  };

  return (
    <div className="ai-backdrop" onClick={onClose}>
      <aside className="ai-panel" onClick={(e) => e.stopPropagation()} aria-label="AI advisor">
        <header className="ai-head">
          <div>
            <div className="modal-tag mono">AI ADVISOR · LOCAL TO THIS GUIDE</div>
            <h2>Ask the architecture</h2>
            <p className="ai-note">
              Answers are retrieved from the hardening text already in this app.
              Nothing is sent to an external service.
            </p>
          </div>
          <button type="button" className="icon-close" onClick={onClose} aria-label="Close advisor">×</button>
        </header>

        <form
          className="ai-form"
          onSubmit={(e) => { e.preventDefault(); ask(); }}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={focusId ? 'Ask about this node, or the rest of the guide' : 'Ask about a level, control, or IDS paradigm'}
            aria-label="Question"
          />
          <button type="submit">Ask</button>
        </form>

        <div className="ai-chips">
          {SUGGESTIONS.map((s) => (
            <button type="button" key={s} className="ai-chip" onClick={() => ask(s)}>{s}</button>
          ))}
        </div>

        <div className="ai-body">
          {!result && (
            <p className="ai-empty">
              Use this when you need a pointer into the guide — for example which
              Level 2 controls matter first, how hybrid detection is placed, or
              which checklist items are still open.
            </p>
          )}
          {result && (
            <>
              <h3>{result.title}</h3>
              <p>{result.body}</p>
              {result.remaining?.length > 0 && (
                <ul className="ai-remaining">
                  {result.remaining.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {result.hits?.map((hit) => (
                <button
                  type="button"
                  key={`${hit.id}|${hit.heading}`}
                  className="ai-hit"
                  onClick={() => onOpenNode(hit.id)}
                >
                  <span className="mono">{hit.tag}</span>
                  <strong>{hit.title}</strong>
                  <em>{hit.heading}</em>
                  {hit.excerpt ? <span className="ai-excerpt">{hit.excerpt}</span> : null}
                </button>
              ))}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
