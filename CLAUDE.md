# Grand Pet — site institucional

Landing page para a **Grand Pet**, pet shop em Vila Velha (ES). Fase 1 de um plano de 3 fases.

## Rodar

```bash
npm install
npm run dev
```

## Stack

Vite + React 18 + TypeScript + Tailwind (só o preflight; **o design é CSS puro em `src/index.css`**, não utilitários Tailwind). Ícones: `lucide-react`.

## Dados reais do cliente (não inventar)

| | |
|---|---|
| Nome | Grand Pet |
| Endereço | Galeria do **Edifício Grand Canal**, Av. Antônio Gil Veloso, 646 — Loja 01, Praia da Costa, Vila Velha — ES, 29101-012 |
| Entrada | Pela galeria (a loja **não** tem porta direto pra avenida) |
| Estacionamento | Gratuito, na rua de trás do prédio |
| WhatsApp | (27) 99620-1847 → `wa.me/5527996201847` |
| Fixo / delivery | (27) 3072-9163 |
| Instagram | [@grand_pet_store](https://www.instagram.com/grand_pet_store/) |
| Google | 4.552 avaliações |
| Serviços | Estética animal · Consultório veterinário · Rações e farmácia · Boutique pet |
| Diferenciais | Loja climatizada · Toalhas esterilizadas · Acessórios importados · **Delivery em Vila Velha** |

## Marca

- Amarelo **`#FCC10B`** (amostrado do arquivo do logo — é o valor exato, não aproximar)
- Cinza dos mascotes `#868686` · Tinta `#26251F` · Branco puro
- Display: **Fredoka** · Corpo: **DM Sans**
- Logo em `src/Logo.tsx` — SVG vetorizado a partir do PNG original do cliente (176px). Se o cliente entregar o vetor original (.ai/.svg), substituir.

## Regras de design

- O amarelo aparece em **3 momentos só**: disco do hero, ícones dos serviços, faixa do delivery. O resto é branco. Não espalhar amarelo.
- Todo CTA vai pro WhatsApp **com a mensagem já preenchida** (ver helper `wa()` em `App.tsx`).
- Status aberto/fechado é calculado ao vivo pelo relógio do visitante (`useOpen()`).

## ⚠️ Pendências antes de publicar

1. **Horários são chute.** Só se sabe que fecha 19h. `HOURS` em `App.tsx` está com seg–sex 8–19, sáb 8–18, dom fechado. **Confirmar com o cliente** — é o dado que mais gera ligação irritada.
2. **Fotos: grade pronta, faltam os arquivos.** A seção "A Grand Pet no Instagram" renderiza sozinha o que estiver em `src/assets/fotos/` (ver README lá) — pasta vazia, seção some. Basta jogar os arquivos. O **hero ainda usa o logo**; trocar por foto real é decisão em aberto.
3. **Depoimentos: pipeline pronto, falta a chave.** `scripts/fetch-reviews.mjs` puxa as avaliações reais do Google no build e grava em `src/reviews.json`; a seção só renderiza se houver avaliações (nada é inventado). Rode `GOOGLE_PLACES_API_KEY=xxx npm run reviews` (ver `.env.example`). Sem a chave, o build passa e a seção fica oculta. A contagem ("4.552 avaliações") vira ao vivo assim que a chave rodar.

## Roadmap

- **Fase 1 (aqui)** — site institucional. Hoje é SPA Vite; **para SEO local ("pet shop Vila Velha", "estética animal Praia da Costa") vale migrar pra Next.js ou Astro com SSG** antes de publicar.
- **Fase 2** — painel admin + API (Hono) + PostgreSQL/Drizzle, pro dono editar horário, serviços e produtos sozinho.
- **Fase 3** — agendamento online de banho/tosa e consulta, com notificação por WhatsApp.
