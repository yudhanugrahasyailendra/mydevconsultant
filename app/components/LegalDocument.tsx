import Navbar from "./Navbar";
import Footer from "./Footer";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export default function LegalDocument({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: LegalDocumentProps) {
  return (
    <>
      <Navbar />

      <div className="page-header">
        <div className="wrap">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <article className="legal">
            <p className="legal-updated">Terakhir diperbarui: {updatedAt}</p>
            {sections.map((section, index) => (
              <div className="legal-section" key={section.title}>
                <h2>
                  {index + 1}. {section.title}
                </h2>
                {section.paragraphs?.map((text) => (
                  <p key={text}>{text}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
}
