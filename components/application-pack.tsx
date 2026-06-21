import Link from "next/link";

const items = [
  [
    "CV in PDF",
    "Compila, controlla e scarica il curriculum nel modello scelto.",
    "/crea-cv",
  ],
  [
    "Lettera PDF o TXT",
    "Prepara una lettera mirata e conservala nel formato più utile.",
    "/strumenti/generatore-lettera-presentazione",
  ],
  [
    "Email candidatura TXT",
    "Genera oggetto e corpo dell’email, pronti da rivedere.",
    "/strumenti/email-candidatura",
  ],
  [
    "Checklist finale",
    "Verifica contenuti, allegati e adattamento prima dell’invio.",
    "/strumenti/checklist-cv",
  ],
] as const;

export function ApplicationPack() {
  return (
    <section
      className="container-site pb-16"
      aria-labelledby="application-pack-title"
    >
      <div className="rounded-[28px] border border-[#d8e1db] bg-white p-6 shadow-[0_16px_45px_rgba(18,43,54,.07)] sm:p-8">
        <div className="max-w-3xl">
          <p className="eyebrow">Pacchetto candidatura</p>
          <h2 id="application-pack-title" className="title-md mt-3">
            Prepara tutti i documenti prima dell’invio.
          </h2>
          <p className="mt-3 leading-7 text-[#5e6c69]">
            Mantieni CV, lettera, email e controllo finale nello stesso
            percorso, verificando sempre nomi, fatti e allegati.
          </p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map(([title, text, href], index) => (
            <Link
              className="rounded-2xl border border-[#dfe5df] bg-[#f8f9f5] p-5 transition hover:-translate-y-1 hover:border-[#9db9a6]"
              href={href}
              key={href}
            >
              <span className="text-xs font-black text-[#176b4d]">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5e6c69]">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
