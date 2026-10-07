import { useState, useRef } from 'react';
import { Copy01Icon, Tick01Icon } from 'hugeicons-react';

interface CodeBlockProps {
  children: React.ReactNode;
  filename?: string;
  language?: string;
}

export function CodeBlock({ children, filename, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = async () => {
    if (!codeRef.current) return;
    try {
      await navigator.clipboard.writeText(codeRef.current.textContent || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  return (
    <div className="relative group">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#121214] border-b border-mistral-hairline-strong dark:border-mistral-ink-tint/50">
          <div className="flex items-center gap-2 text-[11px] font-mono text-mistral-muted">
            {language && (
              <span className="px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-mistral-hairline-soft dark:bg-mistral-ink-tint text-mistral-slate">
                {language}
              </span>
            )}
            {filename && <span>{filename}</span>}
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-[10px] font-mono rounded border transition-all opacity-60 hover:opacity-100 hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mistral-primary"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <> <Tick01Icon size={12} className="text-emerald-500" /> Copied</>
            ) : (
              <> <Copy01Icon size={12} /> Copy </>
            )}
          </button>
        </div>
      )}
      <pre className="bg-[#0a0a0b] p-4 md:p-5 overflow-x-auto font-mono text-[13px] md:text-[14px] leading-[1.7] text-mistral-canvas/95 tab-size-2">
        <code ref={codeRef} className="select-all block">{children}</code>
      </pre>
    </div>
  );
}

interface KeyCapProps {
  children: React.ReactNode;
}

export function KeyCap({ children }: KeyCapProps) {
  return (
    <kbd className="font-mono text-[11px] px-2.5 py-1.5 rounded bg-[#121214] border border-mistral-hairline-strong dark:border-mistral-ink-tint/50 text-mistral-sunshine-500 font-medium whitespace-nowrap shrink-0">
      {children}
    </kbd>
  );
}

interface EvidenceLinkProps {
  children: React.ReactNode;
  href: string;
}

export function EvidenceLink({ children, href }: EvidenceLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-mistral-primary/80 hover:text-mistral-primary dark:text-mistral-primary-light dark:hover:text-mistral-primary-light cursor-pointer transition-colors group" onClick={handleCopy}>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity"><span aria-hidden="true">→</span></span>
      <span className="underline underline-offset-2 decoration-dotted hover:decoration-solid">{children}</span>
      {copied && <Tick01Icon size={10} className="text-emerald-500" />}
    </span>
  );
}

export function Divider() {
  return <hr className="border-mistral-hairline-soft dark:border-mistral-ink-tint/50 my-12" />;
}

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
}

export function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-14">
      <p className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-3">
        {label}
      </p>
      <h3 className="font-editorial text-[36px] md:text-[44px] lg:text-[48px] font-normal tracking-[-0.5px] leading-[1.1] text-mistral-ink dark:text-mistral-canvas">
        {title}
      </h3>
    </div>
  );
}