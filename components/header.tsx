"use client";

import Link from "next/link";
import { useState } from "react";

const links = [{ href: "/crea-cv", label: "Crea CV" }, { href: "/cv-ats", label: "CV e ATS" }, { href: "/strumenti", label: "Strumenti" }, { href: "/modelli-curriculum-vitae", label: "Modelli" }];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f7f2]/95 backdrop-blur"><div className="container-site flex h-[72px] items-center justify-between"><Link href="/" aria-label="creailcv.it, homepage" className="flex items-center gap-2 text-lg font-black tracking-[-.03em]"><span className="grid size-8 place-items-center rounded-xl bg-[#176b4d] text-sm text-white">CV</span>creailcv.it</Link><nav className="hidden items-center gap-7 md:flex" aria-label="Navigazione principale">{links.map((link) => <Link className="text-sm font-bold text-[#4e5e5a] hover:text-[#176b4d]" href={link.href} key={link.href}>{link.label}</Link>)}<Link className="btn btn-primary !min-h-10 !px-4 !py-2 text-sm" href="/crea-cv">Crea gratis</Link></nav><button aria-expanded={open} aria-controls="mobile-menu" aria-label="Apri il menu" onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-xl border border-[#d5ddd7] bg-white text-xl md:hidden">{open ? "×" : "≡"}</button></div>{open && <nav id="mobile-menu" className="container-site grid gap-1 border-t border-[#e0e5e1] py-4 md:hidden" aria-label="Navigazione mobile">{links.map((link) => <Link onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-bold hover:bg-white" href={link.href} key={link.href}>{link.label}</Link>)}<Link onClick={() => setOpen(false)} className="btn btn-primary mt-2" href="/crea-cv">Crea il tuo CV gratis</Link></nav>}</header>;
}
