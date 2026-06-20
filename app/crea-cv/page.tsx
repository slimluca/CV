import { CvBuilder } from "@/components/cv-builder";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { pageMetadata, siteUrl } from "@/lib/site";

export const metadata = pageMetadata("Crea il tuo CV online gratis", "Builder CV italiano con anteprima live, salvataggio locale, controllo di completezza e download PDF.", "/crea-cv");

export default function BuilderPage() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Builder CV creailcv.it", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: `${siteUrl}/crea-cv`, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" } }} /><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Crea CV" }]} /><section className="container-site py-10 sm:py-14"><div className="max-w-4xl"><p className="eyebrow">Builder CV</p><h1 className="title-lg mt-4">Costruisci un CV chiaro, una sezione alla volta.</h1><p className="lead mt-5">Compila i contenuti e controlla subito l’anteprima. I dati vengono salvati localmente nel browser e il PDF essenziale è gratuito.</p></div><div className="mt-10"><CvBuilder /></div></section></>;
}
