import { useEffect, useState } from "react";
import { LogoArt, LogoDisc } from "./Logo";
import { reviews, reviewCount } from "./reviews";
import {
  Scissors, Stethoscope, ShoppingBag, PawPrint, ArrowRight, Star,
  Snowflake, CircleParking, Truck, MapPin, Phone, MessageCircle, Instagram,
} from "lucide-react";

// Fotos reais da loja — largadas em src/assets/fotos/ (ver README lá).
// A seção só aparece quando há foto; nada aqui é placeholder.
const PHOTOS = Object.entries(
  import.meta.glob("./assets/fotos/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    alt: path.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim(),
  }));

const WA = "5527996201847";
const CEL = "(27) 99620-1847";
const FIXO = "(27) 3072-9163";
const IG = "https://www.instagram.com/grand_pet_store/";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Grand+Pet+Av.+Antonio+Gil+Veloso+646+Praia+da+Costa+Vila+Velha";
const wa = (m: string) => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;

const FACTS = [
  { icon: Star, text: `${reviewCount} avaliações no Google` },
  { icon: Snowflake, text: "Loja climatizada" },
  { icon: CircleParking, text: "Estacionamento gratuito" },
  { icon: Truck, text: "Delivery em Vila Velha" },
];

const SERVICES = [
  {
    icon: Scissors,
    name: "Estética animal",
    desc: "Banho e tosa em ambiente climatizado, com toalha esterilizada para cada animal.",
    ask: "Olá! Gostaria de agendar banho e tosa.",
  },
  {
    icon: Stethoscope,
    name: "Consultório veterinário",
    desc: "Consulta e acompanhamento dentro da loja, sem precisar levar o animal a outro endereço.",
    ask: "Olá! Gostaria de marcar uma consulta veterinária.",
  },
  {
    icon: PawPrint,
    name: "Rações e farmácia",
    desc: "Rações convencionais e terapêuticas, medicamentos e suplementos de laboratórios sérios.",
    ask: "Olá! Queria saber sobre uma ração terapêutica.",
  },
  {
    icon: ShoppingBag,
    name: "Boutique pet",
    desc: "Roupas, coleiras, camas e acessórios importados — o lado charmoso da loja.",
    ask: "Olá! Queria ver as roupinhas e acessórios da boutique.",
  },
];

const HOURS = [
  { d: "Segunda a sexta", h: "08:00 — 19:00", days: [1, 2, 3, 4, 5], o: 8, c: 19 },
  { d: "Sábado", h: "08:00 — 18:00", days: [6], o: 8, c: 18 },
  { d: "Domingo", h: "Fechado", days: [0], o: -1, c: -1 },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -50px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useOpen() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  const row = HOURS.find((r) => r.days.includes(now.getDay()))!;
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = row.o >= 0 && mins >= row.o * 60 && mins < row.c * 60;
  return { open, row };
}

export default function App() {
  useReveal();
  const { open, row } = useOpen();

  return (
    <div>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="mark" href="#top">
            <span className="mark-badge">
              <LogoArt rounded={11} />
            </span>
            <span className="mark-t">
              <b>Grand Pet</b>
              <span>Praia da Costa</span>
            </span>
          </a>
          <nav className="nav-links">
            <a href="#servicos">Serviços</a>
            <a href="#delivery">Delivery</a>
            <a href="#visita">Onde estamos</a>
          </nav>
          <a className="btn btn-y btn-sm" href={wa("Olá! Vim pelo site da Grand Pet.")} target="_blank" rel="noreferrer">
            <MessageCircle size={16} strokeWidth={2.2} />
            <span>Chamar no WhatsApp</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">Edifício Grand Canal — Vila Velha</span>
              <h1>
                Cuidar bem<br />é o <span className="hl">básico</span>.<br />O resto é carinho.
              </h1>
              <p className="lede">
                Estética animal, consultório veterinário, rações e boutique no mesmo endereço, na
                avenida da praia. Você estaciona, resolve tudo de uma vez — e ainda leva pra casa
                por delivery se quiser.
              </p>
              <div className="hero-cta">
                <a className="btn btn-y" href={wa("Olá! Gostaria de agendar banho e tosa.")} target="_blank" rel="noreferrer">
                  <MessageCircle size={17} strokeWidth={2.2} />
                  Agendar banho e tosa
                </a>
                <a className="btn btn-o" href="#servicos">
                  Conhecer a loja
                </a>
              </div>
              <div className="hero-meta">
                <span className="stars">★★★★★</span>
                <small>{reviewCount} avaliações no Google · 1.377 seguidores no Instagram</small>
              </div>
            </div>

            <div className="hero-art">
              <div className="disc">
                <LogoDisc />
                <div className="card-float f-a">
                  <span className="ic"><Scissors size={17} strokeWidth={2} /></span>
                  <span>
                    <b>Estética animal</b>
                    <small>Banho, tosa e toalha esterilizada</small>
                  </span>
                </div>
                <div className="card-float f-b">
                  <span className="ic"><Stethoscope size={17} strokeWidth={2} /></span>
                  <span>
                    <b>Consultório vet.</b>
                    <small>Consulta dentro da própria loja</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FACTS */}
        <section className="facts">
          <div className="wrap facts-in">
            {FACTS.map((f) => (
              <div className="fact" key={f.text}>
                <f.icon size={19} strokeWidth={1.9} />
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SERVIÇOS */}
        <section className="sec" id="servicos">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="eyebrow">O que a gente faz</span>
              <h2>Quatro serviços, um endereço só.</h2>
              <p>
                O veterinário indica a ração, a farmácia tem. O banho é hoje, a consulta pode ser no
                mesmo dia. É essa a vantagem de tudo estar na mesma loja.
              </p>
            </div>

            <div className="cards rv">
              {SERVICES.map((s) => (
                <a className="card" key={s.name} href={wa(s.ask)} target="_blank" rel="noreferrer">
                  <span className="ic"><s.icon size={23} strokeWidth={2} /></span>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <span className="go">
                    Falar no WhatsApp <ArrowRight size={15} strokeWidth={2.3} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERY */}
        <section id="delivery" style={{ paddingBottom: 110 }}>
          <div className="wrap">
            <div className="band rv">
              <div>
                <span className="eyebrow" style={{ color: "rgba(38,37,31,.65)" }}>Delivery</span>
                <h2>Saco de ração é pesado. Deixa com a gente.</h2>
                <p>
                  Peça pelo WhatsApp ou pelo telefone e a gente entrega em Vila Velha. Ração,
                  medicamento, areia, o que for — sem você carregar nada.
                </p>
                <div className="band-cta">
                  <a className="btn btn-w" href={wa("Olá! Gostaria de fazer um pedido por delivery.")} target="_blank" rel="noreferrer">
                    <MessageCircle size={17} strokeWidth={2.2} />
                    Pedir pelo WhatsApp
                  </a>
                </div>
              </div>
              <div className="phones">
                <a className="phone" href={`tel:+55${FIXO.replace(/\D/g, "")}`}>
                  <span className="ic"><Phone size={17} strokeWidth={2} /></span>
                  <span>
                    <b>{FIXO}</b>
                    <small>Delivery e pedidos</small>
                  </span>
                </a>
                <a className="phone" href={`tel:+${WA}`}>
                  <span className="ic"><MessageCircle size={17} strokeWidth={2} /></span>
                  <span>
                    <b>{CEL}</b>
                    <small>WhatsApp e agendamentos</small>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS — só renderiza com avaliações reais do Google (ver scripts/fetch-reviews.mjs) */}
        {reviews.items.length > 0 && (
          <section className="sec reviews" id="depoimentos" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head rv">
                <span className="eyebrow">Quem já é cliente</span>
                <h2>O que dizem sobre a Grand Pet.</h2>
                <p>
                  Avaliações reais publicadas no Google
                  {reviews.total ? `, entre as ${reviews.total.toLocaleString("pt-BR")} da loja` : ""}.
                  Nenhuma foi escrita pela gente.
                </p>
              </div>

              <div className="review-grid rv">
                {reviews.items.map((r, i) => (
                  <figure className="review" key={i}>
                    <div className="review-stars" aria-label={`${r.rating} de 5 estrelas`}>
                      {"★".repeat(r.rating)}
                      <span>{"★".repeat(5 - r.rating)}</span>
                    </div>
                    <blockquote>{r.text}</blockquote>
                    <figcaption>
                      <span className="av" aria-hidden="true">{r.author.trim().charAt(0).toUpperCase()}</span>
                      <span className="who">
                        <b>{r.author}</b>
                        {r.when && <small>{r.when}</small>}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <a className="review-src rv" href={MAPS} target="_blank" rel="noreferrer">
                Ver todas as avaliações no Google <ArrowRight size={15} strokeWidth={2.3} />
              </a>
            </div>
          </section>
        )}

        {/* INSTAGRAM — grade das fotos reais em src/assets/fotos/ (some se a pasta estiver vazia) */}
        {PHOTOS.length > 0 && (
          <section className="sec insta" id="instagram" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head rv">
                <span className="eyebrow">No dia a dia</span>
                <h2>A Grand Pet no Instagram.</h2>
                <p>
                  Banho e tosa, boutique e a clientela de quatro patas — as fotos são todas da
                  loja. Siga{" "}
                  <a href={IG} target="_blank" rel="noreferrer" style={{ color: "var(--amber-text)", fontWeight: 500 }}>
                    @grand_pet_store
                  </a>.
                </p>
              </div>

              <div className="insta-grid rv">
                {PHOTOS.map((p, i) => (
                  <a className="insta-cell" key={i} href={IG} target="_blank" rel="noreferrer">
                    <img src={p.src} alt={p.alt || "Foto da Grand Pet"} loading="lazy" />
                    <span className="insta-ic"><Instagram size={20} strokeWidth={2} /></span>
                  </a>
                ))}
              </div>

              <a className="btn btn-o rv" href={IG} target="_blank" rel="noreferrer" style={{ marginTop: 34 }}>
                <Instagram size={17} strokeWidth={2.2} />
                Seguir no Instagram
              </a>
            </div>
          </section>
        )}

        {/* VISITA */}
        <section className="sec" id="visita" style={{ paddingTop: 0 }}>
          <div className="wrap visit">
            <div className="rv">
              <span className="eyebrow">Onde estamos</span>
              <h2 style={{ fontSize: "clamp(30px,3.9vw,46px)", lineHeight: 1.12, margin: "16px 0 22px" }}>
                Na avenida da praia,<br />com onde parar.
              </h2>

              <span className={"pill" + (open ? "" : " shut")}>
                <span className="dot" />
                {open ? "Aberto agora" : "Fechado agora"}
              </span>

              <table className="hours">
                <tbody>
                  {HOURS.map((r) => (
                    <tr key={r.d} className={r === row ? "now" : ""}>
                      <td>{r.d}</td>
                      <td>{r.h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="note">
                <b>Estamos na galeria do Edifício Grand Canal</b>, loja 01 — a entrada é pela Av.
                Antônio Gil Veloso. Há estacionamento gratuito na rua de trás do prédio, então dá
                pra chegar de carro sem dar três voltas no quarteirão com o cachorro no colo.
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
                <a className="btn btn-y" href={MAPS} target="_blank" rel="noreferrer">
                  <MapPin size={17} strokeWidth={2.2} />
                  Abrir no Google Maps
                </a>
                <a className="btn btn-o" href={IG} target="_blank" rel="noreferrer">
                  Ver o Instagram
                </a>
              </div>
            </div>

            <div className="rv">
              <div className="mapbox">
                <svg viewBox="0 0 460 380" role="img" aria-label="Mapa esquemático: a Grand Pet fica na galeria do Edifício Grand Canal, na Av. Antônio Gil Veloso, 646, de frente para a Praia da Costa, com estacionamento na rua de trás">
                  <rect width="460" height="380" fill="#FBFAF7" />

                  <path d="M0 306 Q115 294 230 308 T460 302 L460 380 L0 380Z" fill="#FFF1CC" />
                  <path d="M0 316 Q115 304 230 318 T460 312" fill="none" stroke="#E0A800" strokeWidth="1.5" opacity=".55" />
                  <text x="230" y="356" textAnchor="middle" fill="#B98200" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="500" letterSpacing="3">PRAIA DA COSTA</text>

                  <rect x="0" y="244" width="460" height="46" fill="#FFFFFF" />
                  <line x1="0" y1="244" x2="460" y2="244" stroke="#EDEBE4" strokeWidth="1.5" />
                  <line x1="0" y1="290" x2="460" y2="290" stroke="#EDEBE4" strokeWidth="1.5" />
                  <line x1="0" y1="267" x2="460" y2="267" stroke="#FCC10B" strokeWidth="2.5" strokeDasharray="16 14" />
                  <text x="18" y="234" fill="#9A9A96" fontFamily="DM Sans, sans-serif" fontSize="10.5" fontWeight="500" letterSpacing="1.8">AV. ANTÔNIO GIL VELOSO</text>

                  <rect x="74" y="96" width="312" height="122" rx="16" fill="#FFFFFF" stroke="#E3E0D8" strokeWidth="1.5" />
                  <text x="230" y="122" textAnchor="middle" fill="#6E6E6B" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="500" letterSpacing="1.6">EDIFÍCIO GRAND CANAL</text>
                  <text x="230" y="137" textAnchor="middle" fill="#9A9A96" fontFamily="DM Sans, sans-serif" fontSize="10">galeria comercial · térreo</text>

                  <rect x="92" y="150" width="276" height="52" rx="12" fill="#FCC10B" />
                  <text x="230" y="172" textAnchor="middle" fill="#26251F" fontFamily="Fredoka, sans-serif" fontSize="18" fontWeight="600">Grand Pet</text>
                  <text x="230" y="190" textAnchor="middle" fill="rgba(38,37,31,.68)" fontFamily="DM Sans, sans-serif" fontSize="10.5" fontWeight="500" letterSpacing="1">LOJA 01 · Nº 646</text>

                  <line x1="230" y1="218" x2="230" y2="244" stroke="#26251F" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="230" cy="244" r="5.5" fill="#26251F" />
                  <text x="244" y="238" fill="#6E6E6B" fontFamily="DM Sans, sans-serif" fontSize="10">entrada da galeria</text>

                  <rect x="122" y="30" width="216" height="44" rx="14" fill="none" stroke="#D9D6CC" strokeWidth="1.5" strokeDasharray="7 6" />
                  <text x="230" y="49" textAnchor="middle" fill="#9A9A96" fontFamily="DM Sans, sans-serif" fontSize="10.5" fontWeight="500" letterSpacing="1.5">ESTACIONAMENTO</text>
                  <text x="230" y="64" textAnchor="middle" fill="#9A9A96" fontFamily="DM Sans, sans-serif" fontSize="10.5">rua de trás · gratuito</text>
                  <line x1="230" y1="74" x2="230" y2="96" stroke="#D9D6CC" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="mark" href="#top">
                <span className="mark-badge">
                  <LogoArt rounded={11} />
                </span>
                <span className="mark-t">
                  <b>Grand Pet</b>
                  <span>Praia da Costa</span>
                </span>
              </a>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#6F6F6C", fontWeight: 300, marginTop: 16, maxWidth: 260 }}>
                Boutique pet, estética animal e consultório veterinário na Praia da Costa,
                Vila Velha — ES.
              </p>
            </div>

            <div>
              <h4>Serviços</h4>
              {SERVICES.map((s) => (
                <a key={s.name} href="#servicos">{s.name}</a>
              ))}
            </div>

            <div>
              <h4>Contato</h4>
              <a href={`tel:+55${FIXO.replace(/\D/g, "")}`}>{FIXO}</a>
              <a href={wa("Olá! Vim pelo site.")} target="_blank" rel="noreferrer">{CEL}</a>
              <a href={IG} target="_blank" rel="noreferrer">@grand_pet_store</a>
              <a href={MAPS} target="_blank" rel="noreferrer">Google Maps</a>
            </div>

            <div>
              <h4>Horário</h4>
              {HOURS.map((r) => (
                <span className="li" key={r.d}>{r.d} · {r.h}</span>
              ))}
            </div>
          </div>

          <div className="foot-base">
            <span>© {new Date().getFullYear()} Grand Pet</span>
            <span>Galeria do Edifício Grand Canal · Av. Antônio Gil Veloso, 646 — Loja 01 · Praia da Costa, Vila Velha — ES · 29101-012</span>
          </div>
        </div>
      </footer>

      <a className="float" href={wa("Olá! Vim pelo site da Grand Pet.")} target="_blank" rel="noreferrer">
        <MessageCircle size={18} strokeWidth={2.2} />
        WhatsApp
      </a>
    </div>
  );
}
