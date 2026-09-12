import { useState, useRef } from 'react';
import { Tick01Icon, Copy01Icon } from 'hugeicons-react';
import { ShinyText } from "@/components/lightswind/shiny-text";
import { motion } from 'framer-motion';

interface CodeBlockProps {
  label?: string;
  code: React.ReactNode;
  rawText: string;
}

function CodeSnippet({ label, code, rawText }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleCopy = async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCopied(true);
    try {
      await navigator.clipboard.writeText(rawText);
    } catch (err) {
      console.warn('Failed to copy:', err);
    } finally {
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="relative group flex flex-col bg-[#121214] dark:bg-[#0a0a0b] border border-mistral-hairline-strong dark:border-mistral-ink-tint/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      
      {/* Top Bar with Mac dots */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 dark:bg-white/[0.02] border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          {label && (
            <span className="text-[10px] font-mono font-semibold text-mistral-muted/80 tracking-widest uppercase">{label}</span>
          )}
        </div>

        {/* Copy Button */}
        <button 
          aria-label="Copy snippet" 
          onClick={handleCopy}
          className={`px-2 py-1 text-[11px] font-mono rounded inline-flex items-center gap-1.5 transition-all duration-200 border ${
            copied 
              ? 'bg-mistral-primary/20 text-mistral-primary border-mistral-primary/30 opacity-100' 
              : 'bg-transparent text-mistral-muted border-transparent hover:text-mistral-canvas hover:bg-white/10 opacity-50 group-hover:opacity-100'
          }`}
        >
          {copied ? <Tick01Icon size={14} className="text-mistral-primary" /> : <Copy01Icon size={14} />}
          <span className="font-medium">{copied ? 'copied' : 'copy'}</span>
        </button>
      </div>

      <div className="flex items-start justify-between p-5 overflow-x-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
        <pre className="font-mono text-[13px] leading-[1.7] select-all text-mistral-canvas/90 w-full z-10 relative">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function InstallationSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-5 md:px-8 xl:pr-72 py-16 md:py-24 relative border-t border-mistral-hairline-soft dark:border-mistral-ink-tint" id="installation">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className="max-w-3xl"
      >
        <div className="mb-6">
          <span className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest">
            Installation
          </span>
        </div>

        <h2 className="font-editorial text-[52px] font-normal tracking-[-0.5px] leading-[1.15] text-mistral-ink dark:text-mistral-canvas mb-6">
          How to use <span style={{ color: 'rgb(217, 119, 87)' }} className="font-editorial italic">Claude Code</span> App with Keymux
        </h2>
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-mistral-cream-deeper dark:bg-mistral-ink-tint rounded-full border border-mistral-sunshine-300 dark:border-mistral-ink-tint">
          <span className="text-xs font-bold text-mistral-primary uppercase tracking-wide">100% Free / BYO-Key</span>
        </div>
        <p className="text-lg text-mistral-slate dark:text-mistral-muted leading-[1.50] mb-4">
          By default, the Claude Code app asks you to log in with an Anthropic account and charges you per token. But using Keymux, you can reroute it to use Free APIs (like Google Gemini, Groq, or OpenRouter) completely transparently!
        </p>
        <p className="text-lg text-mistral-slate dark:text-mistral-muted leading-[1.50] mb-12">
          This also works flawlessly as a drop-in proxy for the <motion.span whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.1 }} className="inline-block"><ShinyText speed={5} repeatDelay={4} baseColor="#94a3b8" shineColor="#fa520f" className="inline font-medium">Claude Code CLI, Claude Desktop, and Claude Code extension</ShinyText></motion.span>, along with popular code editor extensions like <strong className="font-medium text-mistral-ink dark:text-mistral-canvas">Cline, Roo, and Continue</strong>.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-4xl space-y-12"
      >
        {/* Universal AI Setup Prompt */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-mistral-ink dark:text-mistral-canvas flex items-center gap-2">
              Automated Setup (AI IDEs)
              <span className="px-2 py-0.5 rounded-sm bg-mistral-primary/10 text-mistral-primary text-[10px] font-bold uppercase tracking-wide">Magic</span>
            </h3>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Don't want to configure it manually? Just copy-paste this prompt into your favorite AI IDE (Cursor, Windsurf, Antigravity, Copilot) or Claude Code itself, and let the AI do all the heavy lifting:
          </p>
          <CodeSnippet 
            label="AI Prompt"
            rawText={'Hey AI! I want to set up Keymux as a local proxy for Claude Code. Please execute the following steps for me: 1. Clone https://github.com/Mayank332k/keymux.git if not already here, then npm install, npm run build, and npm link so the CLI is global. 2. Write and execute a background script to run keymux start --port 3002. 3. Detect my active shell profile (.zshrc or .bashrc) and append an alias free-claude that exports ANTHROPIC_API_KEY="dummy" and ANTHROPIC_BASE_URL="http://127.0.0.1:3002/v1" right before executing the claude command. Verify everything works!'}
            code={
              <div className="text-mistral-canvas text-sm leading-relaxed font-mono whitespace-pre-wrap italic">
                "Hey AI! I want to set up Keymux as a local proxy for Claude Code. Please execute the following steps for me: 1. Clone https://github.com/Mayank332k/keymux.git if not already here, then npm install, npm run build, and npm link so the CLI is global. 2. Write and execute a background script to run keymux start --port 3002. 3. Detect my active shell profile (.zshrc or .bashrc) and append an alias free-claude that exports ANTHROPIC_API_KEY=\"dummy\" and ANTHROPIC_BASE_URL=\"http://127.0.0.1:3002/v1\" right before executing the claude command. Verify everything works!"
              </div>
            }
          />
        </motion.div>

        {/* Step 1: Create API Keys */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-base font-semibold text-mistral-ink dark:text-mistral-canvas">
              Step 1: Get Your Free API Keys
            </h3>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Keymux supports the following free AI providers. Go ahead and generate an API key for your preferred service:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {['Nvidia (nim.nvidia.com)', 'Groq (console.groq.com)', 'OpenRouter (openrouter.ai)', 'Google AI (aistudio.google.com)', 'Mistral (console.mistral.ai)'].map(provider => (
              <li key={provider} className="flex items-center gap-3 text-sm text-mistral-slate dark:text-mistral-muted bg-mistral-cream-soft dark:bg-[#121214] px-4 py-2.5 rounded-lg border border-mistral-hairline dark:border-mistral-ink-tint/50">
                <div className="w-1.5 h-1.5 rounded-full bg-mistral-primary shrink-0 shadow-[0_0_8px_rgba(250,82,15,0.6)]"></div>
                <span className="truncate font-medium">{provider}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Step 2: Download & Build */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-base font-semibold text-mistral-ink dark:text-mistral-canvas">
              Step 2: Download &amp; Build
            </h3>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Since the project is built in TypeScript, we need to clone and build it first.
          </p>
          <CodeSnippet 
            label="bash"
            rawText={"git clone https://github.com/Mayank332k/keymux.git\ncd keymux\nnpm install\nnpm run build"}
            code={
              <div className="flex flex-col gap-1.5">
                <div>
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">git</span>{' '}
                  <span className="text-mistral-canvas">clone</span>{' '}
                  <span className="text-mistral-canvas/70 underline decoration-dotted underline-offset-2">https://github.com/Mayank332k/keymux.git</span>
                </div>
                <div>
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">cd</span>{' '}
                  <span className="text-mistral-canvas">keymux</span>
                </div>
                <div>
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">npm</span>{' '}
                  <span className="text-mistral-canvas">install</span>
                </div>
                <div>
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">npm</span>{' '}
                  <span className="text-mistral-canvas">run</span>{' '}
                  <span className="text-mistral-canvas">build</span>
                </div>
              </div>
            }
          />
        </motion.div>

        {/* Step 3: Make it Global */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-base font-semibold text-mistral-canvas flex items-center gap-2">
              Step 3: Make it Global 
            </h3>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            To avoid running <code className="font-mono text-[11px] bg-mistral-hairline-soft dark:bg-[#121214] border border-mistral-hairline dark:border-mistral-ink-tint/50 px-1.5 py-0.5 rounded">node dist/cli.js</code> every time, let's make it global so you can type <code className="font-mono text-[11px] bg-mistral-hairline-soft dark:bg-[#121214] border border-mistral-hairline dark:border-mistral-ink-tint/50 px-1.5 py-0.5 rounded">keymux</code> from anywhere in your system.
          </p>
          <CodeSnippet 
            rawText="npm link"
            code={
              <>
                <span className="text-mistral-muted select-none font-medium">$ </span>
                <span className="text-mistral-sunshine-500 font-semibold">npm</span>{' '}
                <span className="text-mistral-canvas">link</span>
              </>
            }
          />
        </motion.div>

        {/* Step 4: Add API Keys */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-base font-semibold text-mistral-ink dark:text-mistral-canvas">
              Step 4: Add API Keys via Dashboard
            </h3>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Open the sleek CLI Dashboard to safely input your free API keys (Gemini, Groq, OpenRouter). Keymux automatically saves them to <code className="font-mono text-[11px] bg-mistral-hairline-soft dark:bg-[#121214] border border-mistral-hairline dark:border-mistral-ink-tint/50 px-1.5 py-0.5 rounded">~/.keymux/config.json</code>.
          </p>
          <CodeSnippet 
            rawText="keymux -d"
            code={
              <>
                <span className="text-mistral-muted select-none font-medium">$ </span>
                <span className="text-mistral-sunshine-500 font-semibold">keymux</span>{' '}
                <span className="text-mistral-muted">-d</span>
              </>
            }
          />
        </motion.div>

        {/* Step 5: Start Proxy */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-base font-semibold text-mistral-ink dark:text-mistral-canvas">
              Step 5: Start the Proxy
            </h3>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Start the Keymux proxy server in the background (or in a separate terminal tab) to listen for incoming requests.
          </p>
          <CodeSnippet 
            rawText="keymux start --port 3002"
            code={
              <>
                <span className="text-mistral-muted select-none font-medium">$ </span>
                <span className="text-mistral-sunshine-500 font-semibold">keymux</span>{' '}
                <span className="text-mistral-canvas">start</span>{' '}
                <span className="text-mistral-muted">--port</span>{' '}
                <span className="text-mistral-canvas/70">3002</span>
              </>
            }
          />
        </motion.div>

        {/* Step 6: Attach Claude Code */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-base font-semibold text-mistral-ink dark:text-mistral-canvas">
              Step 6: Attach Claude Code
            </h3>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Instead of hitting Anthropic's official servers, we'll inject environment variables to trick Claude Code into hitting Keymux instead. Provide a dummy key (Keymux ignores it and uses the ones you configured).
          </p>
          <CodeSnippet 
            label="bash"
            rawText={"export ANTHROPIC_API_KEY=\"sk-ant-dummy-key\"\nexport ANTHROPIC_BASE_URL=\"http://127.0.0.1:3002/v1\"\nclaude"}
            code={
              <div className="flex flex-col gap-1.5">
                <div>
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">export</span>{' '}
                  <span className="text-mistral-canvas">ANTHROPIC_API_KEY=</span><span className="text-mistral-primary">"sk-ant-dummy-key"</span>
                </div>
                <div>
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">export</span>{' '}
                  <span className="text-mistral-canvas">ANTHROPIC_BASE_URL=</span><span className="text-mistral-primary">"http://127.0.0.1:3002/v1"</span>
                </div>
                <div className="pt-2">
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">claude</span>
                </div>
              </div>
            }
          />
        </motion.div>

        {/* Step 7: Permanent Setup */}
        <motion.div variants={itemVariants} className="pt-10 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint">
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-base font-semibold text-mistral-canvas flex items-center gap-2">
              Permanent Setup 
              <span className="px-2 py-0.5 rounded-sm bg-mistral-cream-deeper dark:bg-mistral-ink-tint text-mistral-primary text-[10px] font-bold uppercase tracking-wide">Recommended</span>
            </h3>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Don't want to type those export commands every time? Open your shell configuration file (<code className="font-mono text-[11px] bg-mistral-hairline-soft dark:bg-mistral-surface-code px-1.5 py-0.5 rounded">~/.bashrc</code> or <code className="font-mono text-[11px] bg-mistral-hairline-soft dark:bg-mistral-surface-code px-1.5 py-0.5 rounded">~/.zshrc</code>) and add this magical alias. Now you can just type <code className="font-mono text-[11px] bg-mistral-hairline-soft dark:bg-mistral-surface-code px-1.5 py-0.5 rounded">free-claude</code> to launch it.
          </p>
          <CodeSnippet 
            label="~/.zshrc"
            rawText={"alias free-claude='export ANTHROPIC_API_KEY=\"dummy\" ANTHROPIC_BASE_URL=\"http://127.0.0.1:3002/v1\" && claude'"}
            code={
              <>
                <span className="text-mistral-sunshine-500 font-semibold">alias</span>{' '}
                <span className="text-mistral-canvas">free-claude=</span><span className="text-mistral-primary">'export ANTHROPIC_API_KEY="dummy" ANTHROPIC_BASE_URL="http://127.0.0.1:3002/v1" && claude'</span>
              </>
            }
          />
        </motion.div>

        {/* Why this is awesome */}
        <motion.div variants={itemVariants} className="pt-10 border-t border-mistral-hairline-soft dark:border-mistral-ink-tint">
          <h3 className="font-mono text-xs font-semibold text-mistral-steel uppercase tracking-widest mb-8">
            Why this is awesome
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-8">
            <div className="p-6 rounded-lg bg-mistral-cream-soft dark:bg-[#1a1a1c] border border-mistral-hairline dark:border-mistral-ink-tint relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity font-editorial text-7xl font-bold italic text-mistral-primary">
                01
              </div>
              <h4 className="text-sm font-semibold text-mistral-canvas mb-2">Zero Downtime</h4>
              <p className="text-xs text-mistral-slate dark:text-mistral-muted leading-relaxed">
                If your OpenRouter or Gemini key hits a rate limit, Keymux intercepts the 429 error and silently fails over to a backup key. Claude Code won't even crash!
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-mistral-cream-soft dark:bg-[#1a1a1c] border border-mistral-hairline dark:border-mistral-ink-tint relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity font-editorial text-7xl font-bold italic text-mistral-primary">
                02
              </div>
              <h4 className="text-sm font-semibold text-mistral-canvas mb-2">Tools Work Perfectly</h4>
              <p className="text-xs text-mistral-slate dark:text-mistral-muted leading-relaxed">
                Keymux safely translates all of Claude's intense tool calls (like file edits, shell commands, and grep searches) so that OpenAI-compatible endpoints can understand them.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-mistral-cream-soft dark:bg-[#1a1a1c] border border-mistral-hairline dark:border-mistral-ink-tint relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity font-editorial text-7xl font-bold italic text-mistral-primary">
                03
              </div>
              <h4 className="text-sm font-semibold text-mistral-canvas mb-2">Save Money</h4>
              <p className="text-xs text-mistral-slate dark:text-mistral-muted leading-relaxed">
                Why pay premium Anthropic rates for simple boilerplate code generation when you can route it to llama-3.1-70b for free?
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
