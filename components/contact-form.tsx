"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [message, setMessage] = useState("");
  const href = `mailto:ciao@creailcv.it?subject=${encodeURIComponent(`Richiesta da ${name || "utente creailcv.it"}`)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`)}`;
  return <form className="card grid gap-4 p-5 sm:p-7" onSubmit={(e) => { e.preventDefault(); window.location.href = href; }}><label className="label">Nome<input required className="input" value={name} onChange={(e) => setName(e.target.value)} /></label><label className="label">Email<input required type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></label><label className="label">Messaggio<textarea required className="input min-h-40" value={message} onChange={(e) => setMessage(e.target.value)} /></label><button className="btn btn-primary mt-2 sm:w-fit" type="submit">Apri nel programma email</button><p className="text-xs leading-5 text-[#65736f]">Il pulsante apre l’app email configurata sul dispositivo. Il sito non mostra una conferma automatica e non invia il messaggio in autonomia.</p></form>;
}
