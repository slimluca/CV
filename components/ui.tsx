import Link from "next/link";
import type { ReactNode } from "react";
import type { FaqItem } from "@/data/content";

export function Button({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "quiet"; className?: string }) {
  return <Link className={`btn btn-${variant} ${className}`} href={href}>{children}<span aria-hidden="true">→</span></Link>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function ScoreCard({ score, label, detail }: { score: number; label: string; detail: string }) {
  return <div className="rounded-2xl border border-[#d9e3dc] bg-white p-4"><div className="flex items-end justify-between"><strong className="text-sm">{label}</strong><span className="text-2xl font-bold text-[#176b4d]">{score}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8efea]"><div className="h-full rounded-full bg-[#176b4d]" style={{ width: `${score}%` }} /></div><p className="mt-2 text-xs leading-5 text-[#5e6c69]">{detail}</p></div>;
}

export function FAQ({ items }: { items: FaqItem[] }) {
  return <div className="grid gap-3">{items.map((item) => <details className="group rounded-2xl border border-[#dfe5df] bg-white p-5" key={item.question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">{item.question}<span className="text-[#176b4d] transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-[.96rem] leading-7 text-[#5e6c69]">{item.answer}</p></details>)}</div>;
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return <nav aria-label="Percorso" className="container-site pt-6 text-sm text-[#65736f]"><ol className="flex flex-wrap gap-2">{items.map((item, index) => <li className="flex gap-2" key={item.name}>{index > 0 && <span>/</span>}{item.href ? <Link className="hover:text-[#176b4d]" href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol></nav>;
}

export function PageCTA({ title = "Pronto a rendere più forte la tua candidatura?", text = "Crea il CV, controllalo e prepara i testi per l’invio in un unico percorso.", href = "/crea-cv", label = "Crea il tuo CV gratis" }: { title?: string; text?: string; href?: string; label?: string }) {
  return <section className="container-site pb-20"><div className="overflow-hidden rounded-[30px] bg-[#122b36] px-6 py-10 text-white sm:px-12 sm:py-14"><p className="eyebrow !text-[#8ed1ad]">Il prossimo passo</p><div className="mt-4 flex flex-col items-start justify-between gap-7 md:flex-row md:items-end"><div><h2 className="title-md max-w-2xl">{title}</h2><p className="mt-4 max-w-2xl leading-7 text-[#cbd7d7]">{text}</p></div><Button href={href}>{label}</Button></div></div></section>;
}

export function SeoHero({ eyebrow, title, intro, primaryHref = "/crea-cv", primaryLabel = "Crea il tuo CV gratis" }: { eyebrow: string; title: string; intro: string; primaryHref?: string; primaryLabel?: string }) {
  return <section className="container-site py-14 sm:py-20"><div className="max-w-4xl"><p className="eyebrow">{eyebrow}</p><h1 className="title-lg mt-4">{title}</h1><p className="lead mt-6 max-w-3xl">{intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button href={primaryHref}>{primaryLabel}</Button><Button href="/strumenti" variant="secondary">Esplora gli strumenti</Button></div></div></section>;
}
