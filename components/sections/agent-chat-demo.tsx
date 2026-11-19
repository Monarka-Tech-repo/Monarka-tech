"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, CheckCheck, CreditCard } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type Copy = Dictionary["automationPage"]["demo"];
type Message = Copy["messages"][number];

// Pauses between messages: customers "type" a bit faster than the agent "thinks".
const USER_DELAY = 1100;
const AGENT_TYPING = 1300;
const LOOP_PAUSE = 4500;

function PayCard({ t }: { t: Copy }) {
  return (
    <div className="w-[78%] overflow-hidden rounded-xl bg-white text-[#111]">
      <div className="flex items-center gap-2 bg-[#3d8bff] px-3 py-2 text-white">
        <CreditCard aria-hidden className="size-4" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">{t.payLabel}</span>
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-3">
        <span className="text-xl font-semibold tracking-[-0.03em]">{t.payAmount}</span>
        <span className="rounded-full bg-[#111] px-4 py-1.5 text-xs font-semibold text-white">{t.payCta}</span>
      </div>
    </div>
  );
}

function Bubble({ message, t }: { message: Message; t: Copy }) {
  if (message.from === "pay") return <PayCard t={t} />;
  const mine = message.from === "user";
  return (
    <div
      className={`max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-[1.35] text-white ${
        mine ? "self-end rounded-br-md bg-[#005c4b]" : "rounded-bl-md bg-[#202c33]"
      }`}
    >
      {message.text}
      {mine && <CheckCheck aria-hidden className="ml-1.5 inline size-3.5 text-[#53bdeb]" />}
    </div>
  );
}

/** A phone running a WhatsApp-style conversation with an AI agent, replayed while on screen. */
export function AgentChatDemo({ t }: { t: Copy }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const total = t.messages.length;
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  // Reduced motion: the whole conversation, no replay.
  const visible = reduceMotion ? total : shown;
  const showTyping = !reduceMotion && typing;

  useEffect(() => {
    if (reduceMotion || !inView) return;

    let timer: ReturnType<typeof setTimeout>;
    const next = (count: number) => {
      if (count >= total) {
        timer = setTimeout(() => {
          setShown(0);
          next(0);
        }, LOOP_PAUSE);
        return;
      }
      if (t.messages[count].from === "user") {
        timer = setTimeout(() => {
          setShown(count + 1);
          next(count + 1);
        }, USER_DELAY);
      } else {
        setTyping(true);
        timer = setTimeout(() => {
          setTyping(false);
          setShown(count + 1);
          next(count + 1);
        }, AGENT_TYPING);
      }
    };
    next(shown);
    return () => {
      clearTimeout(timer);
      setTyping(false);
    };
    // `shown` is read once to resume where the replay paused when scrolled away.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, total, t.messages]);

  return (
    <div ref={rootRef} className="flex flex-col items-center">
      {/* Full transcript for screen readers; the animated phone is decorative. */}
      <ol className="sr-only" aria-label={t.note}>
        {t.messages.map((m, i) => (
          <li key={i}>
            {m.from === "pay" ? `${t.payLabel}: ${t.payAmount}` : m.from === "agent" ? `${t.agentName}: ${m.text}` : m.text}
          </li>
        ))}
      </ol>

      <div
        aria-hidden
        className="relative h-[600px] w-[300px] overflow-hidden rounded-[2.6rem] border-[10px] border-[#1a1a18] bg-[#0b141a] shadow-[0_50px_100px_-30px_rgba(0,0,0,.7)]"
      >
        <div className="absolute left-1/2 top-0 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-[#1a1a18]" />

        <div className="flex items-center gap-3 bg-[#1f2c34] px-4 pb-3 pt-9 text-white">
          <span className="grid size-9 place-items-center rounded-full bg-[#3d8bff]">
            <Bot className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{t.agentName}</p>
            <p className="text-[11px] text-[#25d366]">{showTyping ? "…" : t.status}</p>
          </div>
        </div>

        <div className="flex h-[calc(100%-4.75rem)] flex-col justify-end gap-2 overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(61,139,255,.12),transparent_45%)] px-3 pb-5">
          <AnimatePresence initial={false}>
            {t.messages.slice(0, visible).map((m, i) => (
              <motion.div
                key={`${i}-${m.from}`}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <Bubble message={m} t={t} />
              </motion.div>
            ))}
            {showTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-[#202c33] px-3 py-3"
              >
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="size-1.5 rounded-full bg-white/60"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.14em] text-white/40">{t.note}</p>
    </div>
  );
}
