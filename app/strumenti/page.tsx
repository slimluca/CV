import Link from "next/link";
import { Breadcrumbs, Card } from "@/components/ui";
import { tools } from "@/data/content";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Strumenti gratuiti per CV e candidatura", "Crea, controlla, adatta e invia: strumenti italiani gratuiti per preparare una candidatura più curata.", "/strumenti");

export default function ToolsPage() {
  return <><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Strumenti" }]} /><section className="container-site py-12 sm:py-16"><div className="max-w-3xl"><p className="eyebrow">Cassetta degli attrezzi</p><h1 className="title-lg mt-4">Dalla bozza del CV all’invio.</h1><p className="lead mt-5">Ogni strumento risolve un passaggio concreto. I controlli sono deterministici e i testi generati restano bozze da verificare.</p></div><div className="mt-12 grid gap-10">{["Crea", "Controlla", "Adatta", "Invia"].map((group) => <section key={group}><div className="flex items-center gap-4"><h2 className="title-md">{group}</h2><div className="h-px flex-1 bg-[#dfe5df]" /></div><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{tools.filter((tool) => tool.group === group).map((tool) => <Link href={tool.href} key={tool.title}><Card className="h-full p-6 transition hover:-translate-y-1 hover:border-[#a9c5b2]"><span className="text-xs font-black text-[#176b4d]">{tool.mark}</span><h3 className="mt-5 text-xl font-black">{tool.title}</h3><p className="mt-3 text-sm leading-6 text-[#5e6c69]">{tool.text}</p><span className="mt-6 inline-block font-bold text-[#176b4d]">Apri lo strumento →</span></Card></Link>)}</div></section>)}</div></section></>;
}
