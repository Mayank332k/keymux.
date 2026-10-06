import { Copy01Icon, Tick01Icon } from 'hugeicons-react';
import { ScrollReveal } from '@/components/lightswind/scroll-reveal';
import { useState, useRef } from 'react';

const providers = [
  { name: 'Nvidia NIM', model: 'Nemotron 3 Ultra 550B', endpoint: 'integrate.api.nvidia.com' },
  { name: 'Groq LPU', model: 'Qwen 3.8 27B / GPT-OSS 120B', endpoint: 'api.groq.com' },
  { name: 'Mistral AI', model: 'Devstral / Codestral', endpoint: 'api.mistral.ai' },
  { name: 'Google Gemini', model: 'Gemini 3.5 Flash Lite', endpoint: 'generativelanguage.googleapis.com' },
  { name: 'OpenRouter', model: 'Ling 3.0 Flash VL (Free)', endpoint: 'openrouter.ai' },
];

const shortcuts = [
  { key: '/keymux', desc: 'Open routing & metrics dashboard' },
  { key: 'Double ESC', desc: 'Conversation rewind & branch fork' },
  { key: 'Ctrl + P', desc: 'Cycle available models' },
  { key: 'Shift + Tab', desc: 'Cycle thinking levels' },
  { key: 'Ctrl + O', desc: 'Toggle expanded tool output' },
  { key: '/model <id>', desc: 'Switch model on the fly' },
  { key: '/tree', desc: 'Visual branch tree inspector' },
  { key: '/clear', desc: 'Clear history, preserve env' },
];

const modes = [
  { name: 'Interactive', cmd: 'leo', flags: 'TUI + dashboard + rewind', desc: 'Full pair-programming session with live rendering, themes, message rewind, and /keymux dashboard access.' },
  { name: 'Print', cmd: 'leo -p "Fix the auth bug"', flags: 'Stream output → exit', desc: 'One-shot execution. Streams result and exits. Ideal for CI/CD, automation, quick analysis.' },
  { name: 'Read-Only', cmd: 'leo --tools read,grep,find -p "..."', flags: 'Write tools disabled', desc: 'Safe exploration. Disables edit/write/bash. Use for architecture review, code search, docs lookup.' },
];

const features = [
  { title: 'Sub-300ms TTFT', detail: 'Direct Node.js stdout streaming. No Python runtime, no middleware frameworks (LangChain/LlamaIndex), zero localhost proxy hops.', evidence: 'In-process Keymux engine → packages/ai/src/providers/keymux-engine.ts' },
  { title: 'Live Chain-of-Thought', detail: 'Intercepts tool execution to render model reasoning inline. Expandable thought blocks with tool call correlation.', evidence: 'Tool interception → src/core/tools/browser.ts:258 (data-leo-id attribution)' },
  { title: 'State Rewind & Fork', detail: 'Double-ESC opens message timeline. Select any turn → rewind session state → fork new branch. Prior context preserved.', evidence: 'Session branching → src/core/agent-session.ts:680 (custom message handling)' },
  { title: 'TUI Dashboard (/keymux)', detail: 'Real-time provider health, RPM limits, TTFT latency, 14-day Braille spline velocity chart (btop-style).', evidence: 'Dashboard component → src/modes/interactive/components/keymux-dashboard.ts' },
  { title: 'Native Web Search', detail: 'Built-in Tavily integration. Real-time research, documentation lookup, diagnostics. No external browser needed.', evidence: 'Web search tool → src/core/tools/web-search.ts (Tavily API)' },
  { title: 'In-Process Failover', detail: 'Circuit breakers + automatic failover on HTTP 429/5xx before stream initiates. Zero-downtime model switching.', evidence: 'Failover logic → packages/ai/src/providers/keymux-engine.ts (circuit breaker pattern)' },
];

const security = [
  { file: 'keymux-config.json', path: '~/.pi/agent/keymux-config.json', content: 'Provider keys, routing rules, model preferences, strict/auto mode' },
  { file: 'keymux-usage.json', path: '~/.pi/agent/keymux-usage.json', content: 'Token I/O, cache stats, request counts, 14-day velocity, provider breakdown' },
  { file: 'sessions/', path: '~/.pi/agent/sessions/', content: 'JSONL session files — messages, branches, compaction history, tool calls' },
];

function CodeBlock({ children, filename }: { children: React.ReactNode; filename?: string }) {
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
    <div className="relative">
      {filename && (
        <div className="px-4 py-2 bg-[#121214] border-b border-mistral-hairline-strong dark:border-mistral-ink-tint/50 flex items-center justify-between text-[11px] font-mono text-mistral-muted">
          <span>{filename}</span>
          <button
            onClick={handleCopy}
            className="px-2 py-1 text-[10px] font-mono rounded border transition-all hover:bg-mistral-hairline-soft dark:hover:bg-mistral-ink-tint"
            aria-label="Copy"
          >
            {copied ? (
              <> <Tick01Icon size={12} className="text-emerald-500" /> Copied</>
            ) : (
              <> <Copy01Icon size={12} /> Copy </>
            )}
          </button>
        </div>
      )}
      <pre className="bg-[#0a0a0b] p-4 overflow-x-auto font-mono text-[13px] leading-[1.6] text-mistral-canvas/90">
        <code ref={codeRef} className="select-all">{children}</code>
      </pre>
    </div>
  );
}

function KeyCap({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-[11px] px-2.5 py-1.5 rounded bg-[#121214] border border-mistral-hairline-strong dark:border-mistral-ink-tint/50 text-mistral-sunshine-500 font-medium whitespace-nowrap shrink-0">
      {children}
    </kbd>
  );
}

function Divider() {
  return <hr className="border-mistral-hairline-soft dark:border-mistral-ink-tint/50 my-12" />;
}

function SectionHeader({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-2">
        {label}
      </p>
      <h3 className="font-editorial text-[36px] md:text-[44px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas">
        {title}
      </h3>
    </div>
  );
}

export function LeoAgentSection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72 py-16 md:py-24 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint" id="leo-agent">
      
      {/* Header */}
      <div className="mb-16 md:mb-20 max-w-3xl">
        <p className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-4">
          Leo Agent
        </p>
        <h2 className="font-editorial text-[42px] md:text-[52px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas mb-6">
          Autonomous coding agent with <span className="text-mistral-primary">embedded Keymux routing</span>
        </h2>
        <p className="text-base md:text-lg text-mistral-slate dark:text-mistral-muted leading-[1.6] max-w-2xl">
          Leo embeds the Keymux routing engine directly in-process. No proxy daemon, no network hop. 
          Sub-300ms TTFT with intelligent multi-model failover, state rewinding, and a keyboard-driven TUI.
        </p>
      </div>

      {/* Architecture */}
      <div className="mb-16 md:mb-20 space-y-3 font-mono text-[13px] leading-[1.8]">
        <div className="flex items-center gap-4 p-4 bg-[#0a0a0b] border border-mistral-hairline-strong dark:border-mistral-ink-tint/50 rounded-lg">
          <span className="text-mistral-muted shrink-0 w-10 text-right">▸</span>
          <span className="text-mistral-canvas font-medium">Leo Agent</span>
          <span className="text-mistral-slate/60 ml-auto mr-4">Interactive TUI · Dynamic themes · Message rewind · Live CoT</span>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border border-mistral-primary/30 text-mistral-primary rounded">
            In-Process
          </span>
        </div>

        <div className="flex justify-center text-mistral-primary/50">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>

        <div className="flex items-center gap-4 p-4 bg-[#0a0a0b] border border-mistral-hairline-strong dark:border-mistral-ink-tint/50 rounded-lg">
          <span className="text-mistral-sunshine-500/80 shrink-0 w-10 text-right">▸</span>
          <span className="text-mistral-canvas font-medium">Keymux Native Engine</span>
          <span className="text-mistral-slate/60 ml-auto mr-4 flex flex-wrap gap-2">
            <span className="px-2 py-0.5 text-[10px] bg-mistral-hairline-soft dark:bg-mistral-ink-tint rounded">Failover</span>
            <span className="px-2 py-0.5 text-[10px] bg-mistral-hairline-soft dark:bg-mistral-ink-tint rounded">Circuit Breakers</span>
            <span className="px-2 py-0.5 text-[10px] bg-mistral-hairline-soft dark:bg-mistral-ink-tint rounded">TTFT Routing</span>
            <span className="px-2 py-0.5 text-[10px] bg-mistral-hairline-soft dark:bg-mistral-ink-tint rounded">Analytics</span>
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border border-mistral-sunshine-500/30 text-mistral-sunshine-500 rounded">
            Embedded
          </span>
        </div>

        <div className="flex justify-center text-mistral-sunshine-500/50">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[12px]">
            <thead>
              <tr className="border-b border-mistral-hairline-strong dark:border-mistral-ink-tint/50">
                <th className="pb-2 text-mistral-muted font-normal tracking-widest uppercase">Provider</th>
                <th className="pb-2 text-mistral-muted font-normal tracking-widest uppercase">Model</th>
                <th className="pb-2 text-mistral-muted font-normal tracking-widest uppercase">Endpoint</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p, i) => (
                <tr key={p.name} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="py-3 font-medium text-mistral-ink dark:text-mistral-canvas">{p.name}</td>
                  <td className="py-3 text-mistral-canvas/80">{p.model}</td>
                  <td className="py-3 text-mistral-slate/60 dark:text-mistral-muted/60 font-mono">{p.endpoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider />

      {/* Core Capabilities */}
      <div className="mb-16 md:mb-20">
        <SectionHeader label="Core Capabilities" title={<>Technical <ScrollReveal staggerDelay={0.1} duration={0.8} blurStrength={8}>specifications</ScrollReveal></>} />
        
        <dl className="space-y-8">
          {features.map((f) => (
            <div key={f.title} className="grid md:grid-cols-[1fr_2fr_auto] gap-6 md:gap-8 items-start">
              <dt className="font-semibold text-base md:text-lg text-mistral-ink dark:text-mistral-canvas">
                {f.title}
              </dt>
              <dd className="text-mistral-slate dark:text-mistral-muted leading-[1.6] text-base md:text-lg">
                {f.detail}
              </dd>
              <dd className="md:col-start-2 md:col-end-4 mt-4 md:mt-0">
                <CodeBlock filename="Evidence">
                  {f.evidence}
                </CodeBlock>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Divider />

      {/* Keyboard Shortcuts */}
      <div className="mb-16 md:mb-20">
        <SectionHeader label="Keyboard Shortcuts" title={<>Default <ScrollReveal staggerDelay={0.1} duration={0.8} blurStrength={8}>keybindings</ScrollReveal></>} />
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left font-mono text-[13px]">
            <thead>
              <tr className="border-b border-mistral-hairline-strong dark:border-mistral-ink-tint/50">
                <th className="pb-3 pr-6 text-mistral-muted font-normal tracking-widest uppercase">Key</th>
                <th className="pb-3 text-mistral-muted font-normal tracking-widest uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((s, i) => (
                <tr key={s.key} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="py-3 font-medium text-mistral-canvas">
                    <KeyCap>{s.key}</KeyCap>
                  </td>
                  <td className="py-3 text-mistral-slate dark:text-mistral-muted">{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider />

      {/* Usage Modes */}
      <div className="mb-16 md:mb-20">
        <SectionHeader label="Usage Modes" title={<>Three <ScrollReveal staggerDelay={0.1} duration={0.8} blurStrength={8}>execution modes</ScrollReveal></>} />
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left font-mono text-[13px]">
            <thead>
              <tr className="border-b border-mistral-hairline-strong dark:border-mistral-ink-tint/50">
                <th className="pb-3 pr-6 text-mistral-muted font-normal tracking-widest uppercase">Mode</th>
                <th className="pb-3 pr-6 text-mistral-muted font-normal tracking-widest uppercase">Command</th>
                <th className="pb-3 pr-6 text-mistral-muted font-normal tracking-widest uppercase">Flags</th>
                <th className="pb-3 text-mistral-muted font-normal tracking-widest uppercase">Description</th>
              </tr>
            </thead>
            <tbody>
              {modes.map((m, i) => (
                <tr key={m.name} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="py-4 font-medium text-mistral-ink dark:text-mistral-canvas">{m.name}</td>
                  <td className="py-4">
                    <CodeBlock>{m.cmd}</CodeBlock>
                  </td>
                  <td className="py-4 text-mistral-slate/70 dark:text-mistral-muted/70 text-[12px]">{m.flags}</td>
                  <td className="py-4 text-mistral-slate dark:text-mistral-muted leading-[1.5]">{m.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider />

      {/* Security */}
      <div className="mb-16 md:mb-20">
        <SectionHeader label="Security Model" title={<>Zero hardcoded keys — <ScrollReveal staggerDelay={0.1} duration={0.8} blurStrength={8}>secure by design</ScrollReveal></>} />
        
        <div className="font-mono text-[13px] space-y-4">
          {security.map((s) => (
            <div key={s.file} className="pl-8 border-l border-mistral-hairline-soft/50 dark:border-mistral-ink-tint/30 pl-4">
              <div className="flex items-baseline gap-3 mb-1">
                <code className="text-mistral-canvas font-medium">{s.file}</code>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide border border-mistral-sunshine-500/30 text-mistral-sunshine-500 rounded">
                  gitignored
                </span>
              </div>
              <div className="ml-6 text-mistral-slate/60 dark:text-mistral-muted/60 text-[12px] mb-2">
                {s.path}
              </div>
              <div className="ml-6 text-mistral-slate/50 dark:text-mistral-muted/50 text-[11px]">
                {s.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Install */}
      <div>
        <SectionHeader label="Installation" title={<>Get <ScrollReveal staggerDelay={0.1} duration={0.8} blurStrength={8}>running</ScrollReveal></>} />
        
        <div className="space-y-6 max-w-3xl">
          <CodeBlock filename="Clone & build">
git clone https://github.com/Mayank332k/leo.git
cd leo
npm install && npm run build
npm link ./packages/coding-agent
          </CodeBlock>

          <CodeBlock filename="Configure keys">
# Option 1: Interactive dashboard
leo
# → /keymux → Tab → Settings → Enter provider → paste key → S

# Option 2: Shell profile
export NVIDIA_API_KEY="nvapi-..."
export GROQ_API_KEY="gsk_..."
export GEMINI_API_KEY="AIza..."
export MISTRAL_API_KEY="..."
export OPENROUTER_API_KEY="sk-or-v1-..."
export TAVILY_API_KEY="tvly-..."
          </CodeBlock>

          <CodeBlock filename="Run">
# Interactive TUI
leo

# One-shot task
leo -p "Analyze src/auth.ts and fix the token expiration edge case"

# Read-only exploration
leo --tools read,grep,find -p "Explain the multi-provider routing flow"
          </CodeBlock>
        </div>
      </div>

    </section>
  );
}