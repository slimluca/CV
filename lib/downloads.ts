export type PdfSection = {
  label?: string;
  content: string;
};

export function safeDocumentFilename(
  prefix: string,
  name: string,
  role: string,
  extension: "pdf" | "txt",
) {
  const complete = name.trim() && role.trim();
  const base = complete ? [prefix, name, role].join("-") : `${prefix}-creailcv`;
  const slug = base
    .toLocaleLowerCase("it-IT")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug}.${extension}`;
}

export function downloadTxt(filename: string, content: string) {
  if (!content.trim()) return false;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  return true;
}

export async function downloadTextPdf(
  filename: string,
  title: string,
  sections: PdfSection[],
) {
  const visibleSections = sections.filter((section) => section.content.trim());
  if (!visibleSections.length) return false;
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 20;
  const width = 170;
  let y = 22;
  doc.setTextColor(23, 48, 43);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, margin, y);
  y += 12;

  for (const section of visibleSections) {
    if (section.label) {
      doc.setTextColor(23, 107, 77);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(section.label.toUpperCase(), margin, y);
      y += 6;
    }
    doc.setTextColor(45, 58, 54);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(section.content, width);
    for (const line of lines) {
      if (y > 278) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += 5.2;
    }
    y += 5;
  }
  doc.save(filename);
  return true;
}
