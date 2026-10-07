import { useState, useRef } from 'react';
import { Tick01Icon, Copy01Icon } from 'hugeicons-react';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  label?: string;
  code: React.ReactNode;
  rawText: string;
}

function CodeSnippet({ label, code, rawText }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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

        <h2 className="font-editorial text-[42px] md:text-[52px] font-normal tracking-[-0.5px] leading-[1.2] md:leading-[1.15] text-mistral-ink dark:text-mistral-canvas mb-6">
          How to setup Free{' '}
          <span className="inline-flex items-center gap-2 text-[#D97757] mx-1 -my-2 align-middle">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-11 md:h-11" xmlSpace="preserve" viewBox="0 0 16 16"><g fill="currentColor"><path d="m14.375 6.48.49.28v.209l-.14.489-5.937 1.397-.558-1.387zm0 0"/><path d="m12.155 2.373.683.143.182.224.173.535-.072.342-3.983 5.447L7.81 7.737l3.673-4.82z"/><path d="m8.719 1.522.419-.28.349.14.349.49-.957 5.748-.65-.441-.279-.769.49-4.33z"/><path d="m4.239 1.614.43-.55L4.95 1l.558.081.275.216 2.004 4.442.724 2.11-.848.471-3.231-5.864z"/><path d="m2.154 4.665-.14-.56.42-.488.488.07h.14l2.933 2.165.908.698 1.257.978-.698 1.187-.629-.489-.419-.419-4.05-2.863z"/><path d="M1.316 8.296 1 7.946v-.31l.316-.108 3.562.21 3.491.279-.113.695-6.66-.346z"/><path d="M3.411 11.931h-.698l-.278-.32v-.382l1.186-.838 4.82-3.068.487.833z"/><path d="m4.738 13.883-.28.07-.418-.21.07-.35 4.12-5.446.558.768-3.072 4.05z"/><path d="m8.23 14.581-.21.28-.419.14-.349-.28-.21-.42L8.09 8.646l.629.07z"/><path d="M11.791 13.045v.558l-.07.21-.279.14-.489-.066-3.356-4.996 1.331-1.014 1.117 2.025.105.733z"/><path d="m13.398 12.207.07.349-.21.279-.21-.07-1.187-.838-1.815-1.606-1.397-.978.419-1.326.698.419.42.768z"/><path d="m12.49 8.645 1.746.14.419.28.279.418v.302l-.768.327-3.911-.978-1.606-.07.419-1.466 1.117.838z"/></g></svg>
            <span className="font-editorial italic font-medium pt-1">Claude Code</span>
          </span>{' '}
          with Keymux
        </h2>
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-mistral-cream-deeper dark:bg-mistral-ink-tint rounded-full border border-mistral-sunshine-300 dark:border-mistral-ink-tint">
          <span className="text-xs font-bold text-mistral-primary uppercase tracking-wide">100% Free / BYO-Key</span>
        </div>
        <p className="text-lg text-mistral-slate dark:text-mistral-muted leading-[1.50] mb-4">
          By default, the Claude Code app asks you to log in with an Anthropic account and charges you per token. But using Keymux, you can reroute it to use Free APIs (like Google Gemini, Groq, or OpenRouter) completely transparently!
        </p>
        <p className="text-lg text-mistral-slate dark:text-mistral-muted leading-[1.50] mb-12">
          This also works flawlessly as a drop-in proxy for the <span className="font-bold text-mistral-primary">Claude Code CLI, Claude Desktop, and Claude Code extension</span>, along with popular code editor extensions like <strong className="font-bold text-mistral-ink dark:text-mistral-canvas">Cline, Roo, and Continue</strong>.
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

        {/* Step 1: Quick Install */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-bold text-mistral-ink dark:text-mistral-canvas">
              Step 1: Install & Build
            </h2>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Clone the repository, install dependencies, build it, and link it globally so you can use the <code className="font-mono text-[11px] bg-mistral-hairline-soft dark:bg-[#121214] border border-mistral-hairline dark:border-mistral-ink-tint/50 px-1.5 py-0.5 rounded">keymux</code> command anywhere.
          </p>
          <CodeSnippet 
            label="bash"
            rawText={"git clone https://github.com/Mayank332k/keymux.git\ncd keymux\nnpm install && npm run build\nnpm link"}
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
                  <span className="text-mistral-canvas">install</span>{' '}
                  <span className="text-mistral-muted">&&</span>{' '}
                  <span className="text-mistral-sunshine-500 font-semibold">npm</span>{' '}
                  <span className="text-mistral-canvas">run build</span>
                </div>
                <div>
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">npm</span>{' '}
                  <span className="text-mistral-canvas">link</span>
                </div>
              </div>
            }
          />
        </motion.div>

        {/* Step 2: Dashboard & Settings */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-bold text-mistral-ink dark:text-mistral-canvas">
              Step 2: Dashboard & Settings
            </h2>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Launch the interactive dashboard to add your free API keys (Gemini, Groq, OpenRouter). Keys are safely stored locally.
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

        {/* Step 3: Manage the Proxy */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-bold text-mistral-ink dark:text-mistral-canvas">
              Step 3: Start / Stop the Proxy
            </h2>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Use these commands to easily control the background proxy server.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CodeSnippet 
              label="Start Proxy"
              rawText="keymux start"
              code={
                <>
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">keymux</span>{' '}
                  <span className="text-mistral-canvas">start</span>
                </>
              }
            />
            <CodeSnippet 
              label="Stop Proxy"
              rawText="keymux stop"
              code={
                <>
                  <span className="text-mistral-muted select-none font-medium">$ </span>
                  <span className="text-mistral-sunshine-500 font-semibold">keymux</span>{' '}
                  <span className="text-mistral-canvas">stop</span>
                </>
              }
            />
          </div>
        </motion.div>

        {/* Step 4: Attach Claude Code */}
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-base font-semibold text-mistral-ink dark:text-mistral-canvas">
              Step 4: Attach Claude Code
            </h3>
          </div>
          <p className="text-sm text-mistral-slate dark:text-mistral-muted mb-4">
            Now tell Claude Code to hit your Keymux proxy instead of Anthropic's paid API. Add this magical alias to your <code className="font-mono text-[11px] bg-mistral-hairline-soft dark:bg-mistral-surface-code px-1.5 py-0.5 rounded">~/.zshrc</code> or <code className="font-mono text-[11px] bg-mistral-hairline-soft dark:bg-mistral-surface-code px-1.5 py-0.5 rounded">~/.bashrc</code> and you're set!
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
