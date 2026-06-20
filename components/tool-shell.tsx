import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui";

export function ToolShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Strumenti", href: "/strumenti" }, { name: title }]} /><section className="container-site py-10 sm:py-14"><div className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h1 className="title-lg mt-4">{title}</h1><p className="lead mt-5">{intro}</p></div><div className="mt-10">{children}</div></section></>;
}
