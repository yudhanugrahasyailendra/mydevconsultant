"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroTerminal() {
  const elRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !elRef.current) return;
    
    const lines = [
      { html: '<span class="c-com">// membangun website Anda</span>' },
      { html: '<span class="c-tag">&lt;section</span> <span class="c-attr">class</span>=<span class="c-str">"hero"</span><span class="c-tag">&gt;</span>' },
      { html: '&nbsp;&nbsp;<span class="c-tag">&lt;h1&gt;</span>Selamat datang<span class="c-tag">&lt;/h1&gt;</span>' },
      { html: '&nbsp;&nbsp;<span class="c-tag">&lt;button&gt;</span>Hubungi Kami<span class="c-tag">&lt;/button&gt;</span>' },
      { html: '<span class="c-tag">&lt;/section&gt;</span>' },
      { html: '<span class="c-com">// deploy sedang berjalan...</span>' },
    ];
    
    const el = elRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let active = true;

    function renderStatic() {
      if(el) el.innerHTML = lines.map(l => '<div>'+l.html+'</div>').join('');
    }

    async function typeLine(container: HTMLDivElement, html: string) {
      if (!active) return;
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      const text = tmp.textContent || '';
      const lineEl = document.createElement('div');
      container.appendChild(lineEl);
      let shown = '';
      for(let i=0; i<text.length; i++){
        if (!active) return;
        shown = text.slice(0, i+1);
        lineEl.textContent = shown;
        await new Promise(r => setTimeout(r, 30));
      }
      if (active) lineEl.innerHTML = html;
    }

    async function playSequence() {
      if(el) el.innerHTML = '';
      for(const line of lines){
        if (!active) return;
        if (el) await typeLine(el, line.html);
        await new Promise(r => setTimeout(r, 200));
      }
      if (active && el) {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        el.appendChild(cursor);
      }
    }

    const checkPreloaderAndPlay = () => {
      if (!active) return;
      if (document.querySelector('.preloader-modern')) {
        setTimeout(checkPreloaderAndPlay, 500);
        return;
      }
      if(reduceMotion){
        renderStatic();
      } else {
        playSequence();
      }
    };

    checkPreloaderAndPlay();

    return () => { active = false; };
  }, [isClient]);

  return (
    <div className="term-body" id="typewriter" ref={elRef}></div>
  );
}
