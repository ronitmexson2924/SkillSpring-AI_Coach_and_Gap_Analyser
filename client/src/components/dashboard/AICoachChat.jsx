import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, SendHorizonal, User } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function AICoachChat({
  messages,
  onSend,
  isChatting,
  suggestedQuestions,
  targetRole,
}) {
  const [draft, setDraft] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const submit = (event) => {
    event.preventDefault();

    if (!draft.trim()) {
      return;
    }

    onSend(draft);
    setDraft('');
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.68fr_0.32fr]">
      <Card className="flex min-h-[720px] flex-col p-0">
        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">AI Coach</p>
          <h3 className="mt-3 font-display text-3xl text-white">Context-aware career guidance</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Ask strategy questions and get answers grounded in your skill map, current gaps, and{' '}
            {targetRole} target.
          </p>
        </div>

        <div ref={containerRef} className="scrollbar-thin flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[84%] rounded-[28px] px-5 py-4 ${
                  message.role === 'assistant'
                    ? 'border border-white/10 bg-white/5 text-slate-100'
                    : 'bg-gradient-to-r from-brand-teal to-brand-indigo text-slate-950'
                }`}
              >
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em]">
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4 text-brand-teal" />
                  ) : (
                    <User className="h-4 w-4 text-slate-950" />
                  )}
                  <span>{message.role === 'assistant' ? 'AI Coach' : 'You'}</span>
                </div>
                <div className="chat-markdown text-sm leading-7">
                  <ReactMarkdown>{message.content || (message.streaming ? 'Thinking...' : '')}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="border-t border-white/10 px-6 py-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => onSend(question)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-brand-violet/50 hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={3}
                placeholder="Ask for the next best skill, a practice drill, or a personalized quiz."
                className="min-h-[96px] flex-1 rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-brand-teal/40 transition focus:ring-2"
              />
              <Button type="submit" className="min-w-[180px]" disabled={isChatting}>
                <SendHorizonal className="h-5 w-5" />
                {isChatting ? 'Streaming...' : 'Send question'}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-muted">Coach Hints</p>
        <div className="mt-5 space-y-4">
          <div className="rounded-[24px] border border-brand-teal/20 bg-brand-teal/10 p-4 text-sm leading-7 text-brand-teal">
            Ask for ordering, not just resources. The best questions start with “what should I do
            first?” or “how should I prove this skill?”
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
            The coach already knows your target role and live gap matrix, so you do not need to
            restate context every time.
          </div>
          <div className="rounded-[24px] border border-brand-violet/20 bg-brand-violet/10 p-4 text-sm leading-7 text-violet-100">
            Try a practice prompt like “Quiz me on React and accessibility, then rate my answers.”
          </div>
        </div>
      </Card>
    </div>
  );
}

