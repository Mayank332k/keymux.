import { 
  CodeBlock, 
  KeyCap, 
  EvidenceLink, 
  Divider, 
  SectionHeader 
} from './CodeBlock';

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
  { title: 'Sub-300ms TTFT', detail: 'Direct Node.js stdout streaming. No Python runtime, no middleware frameworks (LangChain/LlamaIndex), zero localhost proxy hops.', evidence: 'packages/ai/src/providers/keymux-engine.ts' },
  { title: 'Live Chain-of-Thought', detail: 'Intercepts tool execution to render model reasoning inline. Expandable thought blocks with tool call correlation.', evidence: 'src/core/tools/browser.ts:258' },
  { title: 'State Rewind & Fork', detail: 'Double-ESC opens message timeline. Select any turn → rewind session state → fork new branch. Prior context preserved.', evidence: 'src/core/agent-session.ts:680' },
  { title: 'TUI Dashboard (/keymux)', detail: 'Real-time provider health, RPM limits, TTFT latency, 14-day Braille spline velocity chart (btop-style).', evidence: 'src/modes/interactive/components/keymux-dashboard.ts' },
  { title: 'Native Web Search', detail: 'Built-in Tavily integration. Real-time research, documentation lookup, diagnostics. No external browser needed.', evidence: 'src/core/tools/web-search.ts' },
  { title: 'In-Process Failover', detail: 'Circuit breakers + automatic failover on HTTP 429/5xx before stream initiates. Zero-downtime model switching.', evidence: 'packages/ai/src/providers/keymux-engine.ts' },
];

const security = [
  { file: 'keymux-config.json', path: '~/.pi/agent/keymux-config.json', content: 'Provider keys, routing rules, model preferences, strict/auto mode' },
  { file: 'keymux-usage.json', path: '~/.pi/agent/keymux-usage.json', content: 'Token I/O, cache stats, request counts, 14-day velocity, provider breakdown' },
  { file: 'sessions/', path: '~/.pi/agent/sessions/', content: 'JSONL session files — messages, branches, compaction history, tool calls' },
];

function ArchitectureRow({ label, description, badge, badgeColor, iconColor }: {
  label: string;
  description: string;
  badge: string;
  badgeColor: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 md:p-5 bg-[#0a0a0b] border border-mistral-hairline-strong dark:border-mistral-ink-tint/50 rounded-xl">
      <span className="text-mistral-muted shrink-0 w-10 text-right" style={{color: iconColor}}>▸</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-mistral-canvas font-medium text-base md:text-lg">{label}</span>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded border" style={{borderColor: badgeColor, color: badgeColor, backgroundColor: `${badgeColor}15`}}>
            {badge}
          </span>
        </div>
        <p className="mt-1 text-mistral-slate/60 dark:text-mistral-muted/60 text-sm md:text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ArrowDown({ color }: { color: string }) {
  return (
    <div className="flex justify-center py-1" style={{color}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7"/>
      </svg>
    </div>
  );
}

export function LeoAgentSection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10 xl:pr-72 py-16 md:py-24 lg:py-28 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint" id="leo-agent">
      
      {/* Header */}
      <div className="mb-16 md:mb-20 lg:mb-24 max-w-3xl">
        <p className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-4">
          Leo Agent
        </p>
        <h2 className="font-editorial text-[42px] md:text-[52px] lg:text-[58px] font-normal tracking-[-0.5px] leading-[1.1] text-mistral-ink dark:text-mistral-canvas mb-6">
          Autonomous coding agent with <span className="text-mistral-primary">embedded Keymux routing</span>
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-mistral-slate dark:text-mistral-muted leading-[1.7] max-w-2xl">
          Leo embeds the Keymux routing engine directly in-process. No proxy daemon, no network hop. 
          Sub-300ms TTFT with intelligent multi-model failover, state rewinding, and a keyboard-driven TUI.
        </p>
      </div>

      {/* Architecture — cleaner visual flow */}
      <div className="mb-16 md:mb-20 lg:mb-24 space-y-4">
        <ArchitectureRow
          label="Leo Agent"
          description="Interactive TUI · Dynamic themes · Message rewind · Live CoT rendering"
          badge="In-Process"
          badgeColor="#6F8F72"
          iconColor="#A8B3B0"
        />
        
        <ArrowDown color="#6F8F7280" />
        
        <ArchitectureRow
          label="Keymux Native Engine"
          description="Failover · Circuit Breakers · TTFT Routing · Analytics"
          badge="Embedded"
          badgeColor="#F2A65A"
          iconColor="#F2A65A"
        />
        
        <ArrowDown color="#F2A65A80" />
        
        {/* Providers table */}
        <div className="overflow-x-auto rounded-xl border border-mistral-hairline-strong dark:border-mistral-ink-tint/50 bg-[#0a0a0b]">
          <table className="w-full text-left font-mono text-[12px] md:text-[13px]">
            <thead>
              <tr className="border-b border-mistral-hairline-strong dark:border-mistral-ink-tint/50 bg-white/[0.02]">
                <th className="px-4 py-3 text-mistral-muted font-normal tracking-widest uppercase">Provider</th>
                <th className="px-4 py-3 text-mistral-muted font-normal tracking-widest uppercase">Model</th>
                <th className="px-4 py-3 text-mistral-muted font-normal tracking-widest uppercase">Endpoint</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p, i) => (
                <tr key={p.name} className={`border-b border-mistral-hairline-soft/50 dark:border-mistral-ink-tint/30 last:border-0 hover:bg-white/[0.03] transition-colors ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="px-4 py-3 font-medium text-mistral-ink dark:text-mistral-canvas">{p.name}</td>
                  <td className="px-4 py-3 text-mistral-canvas/80">{p.model}</td>
                  <td className="px-4 py-3 text-mistral-slate/60 dark:text-mistral-muted/60 font-mono">{p.endpoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider />

      {/* Core Capabilities */}
      <div className="mb-16 md:mb-20 lg:mb-24">
        <SectionHeader label="Core Capabilities" title={<>Technical <span className="text-mistral-primary">specifications</span></>} />
        
        <dl className="space-y-6 md:space-y-8">
          {features.map((f) => (
            <div key={f.title} className="grid md:grid-cols-[1fr_2fr_auto] gap-5 md:gap-8 items-start">
              <dt className="font-semibold text-base md:text-lg text-mistral-ink dark:text-mistral-canvas">
                {f.title}
              </dt>
              <dd className="text-mistral-slate dark:text-mistral-muted leading-[1.6] text-base md:text-lg">
                {f.detail}
              </dd>
              <dd className="md:col-start-2 md:col-end-4 mt-3 md:mt-0">
                <EvidenceLink href={f.evidence}>{f.evidence}</EvidenceLink>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Divider />

      {/* Keyboard Shortcuts */}
      <div className="mb-16 md:mb-20 lg:mb-24">
        <SectionHeader label="Keyboard Shortcuts" title={<>Default <span className="text-mistral-primary">keybindings</span></>} />
        
        <div className="overflow-x-auto rounded-xl border border-mistral-hairline-strong dark:border-mistral-ink-tint/50 bg-[#0a0a0b]">
          <table className="w-full min-w-[500px] text-left font-mono text-[13px]">
            <thead>
              <tr className="border-b border-mistral-hairline-strong dark:border-mistral-ink-tint/50 bg-white/[0.02]">
                <th className="px-4 py-3 pr-6 text-mistral-muted font-normal tracking-widest uppercase">Key</th>
                <th className="px-4 py-3 text-mistral-muted font-normal tracking-widest uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((s, i) => (
                <tr key={s.key} className={`border-b border-mistral-hairline-soft/50 dark:border-mistral-ink-tint/30 last:border-0 hover:bg-white/[0.03] transition-colors ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="px-4 py-3 font-medium text-mistral-canvas">
                    <KeyCap>{s.key}</KeyCap>
                  </td>
                  <td className="px-4 py-3 text-mistral-slate dark:text-mistral-muted">{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider />

      {/* Usage Modes */}
      <div className="mb-16 md:mb-20 lg:mb-24">
        <SectionHeader label="Usage Modes" title={<>Three <span className="text-mistral-primary">execution modes</span></>} />
        
        <div className="overflow-x-auto rounded-xl border border-mistral-hairline-strong dark:border-mistral-ink-tint/50 bg-[#0a0a0b]">
          <table className="w-full min-w-[650px] text-left font-mono text-[13px]">
            <thead>
              <tr className="border-b border-mistral-hairline-strong dark:border-mistral-ink-tint/50 bg-white/[0.02]">
                <th className="px-4 py-3 pr-6 text-mistral-muted font-normal tracking-widest uppercase">Mode</th>
                <th className="px-4 py-3 pr-6 text-mistral-muted font-normal tracking-widest uppercase">Command</th>
                <th className="px-4 py-3 pr-6 text-mistral-muted font-normal tracking-widest uppercase">Flags</th>
                <th className="px-4 py-3 text-mistral-muted font-normal tracking-widest uppercase">Description</th>
              </tr>
            </thead>
            <tbody>
              {modes.map((m, i) => (
                <tr key={m.name} className={`border-b border-mistral-hairline-soft/50 dark:border-mistral-ink-tint/30 last:border-0 hover:bg-white/[0.03] transition-colors ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="px-4 py-4 font-medium text-mistral-ink dark:text-mistral-canvas">{m.name}</td>
                  <td className="px-4 py-4">
                    <CodeBlock>{m.cmd}</CodeBlock>
                  </td>
                  <td className="px-4 py-4 text-mistral-slate/70 dark:text-mistral-muted/70 text-[12px]">{m.flags}</td>
                  <td className="px-4 py-4 text-mistral-slate dark:text-mistral-muted leading-[1.5]">{m.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider />

      {/* Security */}
      <div className="mb-16 md:mb-20 lg:mb-24">
        <SectionHeader label="Security Model" title={<>Zero hardcoded keys — <span className="text-mistral-primary">secure by design</span></>} />
        
        <div className="space-y-3 md:space-y-4 font-mono text-[13px] md:text-[14px]">
          {security.map((s) => (
            <div key={s.file} className="pl-4 md:pl-6 border-l border-mistral-hairline-soft/50 dark:border-mistral-ink-tint/30 bg-white/[0.02] rounded-r-xl p-4 md:p-5 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <code className="text-mistral-canvas font-medium text-base">{s.file}</code>
                <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-wide rounded border border-mistral-sunshine-500/30 text-mistral-sunshine-500 bg-mistral-sunshine-500/5">
                  gitignored
                </span>
              </div>
              <div className="ml-4 text-mistral-slate/60 dark:text-mistral-muted/60 text-[12px] mb-1 font-mono">
                {s.path}
              </div>
              <div className="ml-4 text-mistral-slate/50 dark:text-mistral-muted/50 text-sm leading-relaxed">
                {s.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Install */}
      <div>
        <SectionHeader label="Installation" title={<>Get <span className="text-mistral-primary">running</span></>} />
        
        <div className="space-y-5 max-w-3xl">
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