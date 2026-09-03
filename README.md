# Podrão Chic Delight

# SITE OFICIAL "PODRÃO CHIC"

Construa um site institucional + cardápio digital de página única (com navegação por âncoras) para a lanchonete de street food **Podrão Chic**, no Recreio dos Bandeirantes, Rio de Janeiro. O resultado precisa parecer uma marca real e profissional, capaz de competir visualmente com grandes redes de fast-food — não um template genérico de restaurante. Siga TODAS as instruções abaixo com rigor. Todo o conteúdo visível deve estar em português do Brasil.

## 1. OBJETIVO
- Fazer o visitante sentir fome em menos de 3 segundos e clicar em "Pedir agora".
- Comunicar: comida apetitosa, "podrão" brasileiro de verdade, variedade, preço acessível, rapidez, identidade jovem.
- Do carregamento ao disparo do pedido no WhatsApp: no máximo 2 cliques, de qualquer ponto da página.
- Mobile-first absoluto: assuma que 85% do tráfego vem do celular, via link na bio do Instagram.

## 2. STACK E ARQUITETURA
React + TypeScript + Vite + Tailwind CSS, shadcn/ui (Button, Sheet, Dialog, Accordion, Tabs, Badge, Skeleton, Toast, Separator, ScrollArea), lucide-react, framer-motion (com moderação e respeitando prefers-reduced-motion), react-helmet-async para SEO. Carrinho com Context API + useReducer. SEM backend, SEM banco de dados, SEM pagamento.

Estrutura de pastas obrigatória:
```
src/
  components/layout/     (Header, MobileNav, StickyOrderBar, Footer)
  components/sections/   (Hero, Destaques, Categorias, Cardapio, Combos, Acai, Galeria, Avaliacoes, Sobre, Localizacao, Contato)
  components/common/     (ProductCard, CategoryChip, SectionTitle, FoodImage, EmptyState, LoadingState, WhatsAppButton)
  context/CartContext.tsx
  data/                  (menu.ts, combos.ts, reviews.ts, siteConfig.ts, gallery.ts)
  hooks/                 (useCart, useScrollSpy, useIsOpenNow, useReducedMotion)
  lib/                   (whatsapp.ts, format.ts, orderService.ts, utils.ts)
  pages/                 (Index.tsx, NotFound.tsx)
```
REGRA CENTRAL: todo conteúdo editável (preços, produtos, textos de contato, horários, links) vive EXCLUSIVAMENTE em `src/data/*.ts`, tipado e comentado. Nenhum preço, telefone ou nome de produto hardcoded dentro de JSX.

## 3. IDENTIDADE VISUAL
O conceito é a tensão do próprio nome: **"Podrão" (rua, chapa, exagero, madrugada) + "Chic" (elegante, premium, caprichado)**. O design deve expressar esse contraste de forma proposital, nunca bagunçada.

Paleta (tokens no tailwind.config.ts) — o site é DARK por padrão:
- asfalto `#121110` (fundo) · asfalto-2 `#1C1A18` (cards)
- mostarda `#FFC01F` (primária, CTAs) · brasa `#E5342A` (secundária, promoções)
- acai `#6B2FA0` (exclusiva da seção de açaí)
- creme `#F7F2E7` (texto) · dourado `#C9A227` (detalhes "chic") · fumaca `#8B8377` (texto secundário)

Fundo com grão sutil (noise SVG ~4% de opacidade) e leve gradiente radial quente vindo do topo, simulando luz de chapa. Nunca fundo branco liso na home.

Tipografia:
- Display: **Anton**, CAIXA ALTA, tracking -0.02em — títulos gigantes e hero.
- "Chic": **Playfair Display itálico**, usado APENAS na palavra "Chic" do logo e em 2–3 momentos de destaque. É a piada visual da marca; usar demais mata o efeito.
- Corpo: **Inter** (400/500/600/700), line-height 1.6.
- H1 mobile clamp(2.75rem, 12vw, 5rem), desktop até 7.5rem. Fontes via preconnect + display=swap, só os pesos usados.

Linguagem visual:
- Raio 20px em cards, 999px em chips e botões. Nada de quinas retas.
- Elementos gráficos como SVG leve (nunca imagens pesadas): faixa diagonal de listras mostarda/asfalto (toldo de barraca) como divisor entre seções; forma orgânica de "pingo de molho" no topo de blocos; filete dourado de 1px separando os blocos "chic"; marquee horizontal infinito lento e pausável no hover com "NA CHAPA • ATÉ 2H • RECREIO • AÇAÍ CREMOSO •" em Anton (aria-hidden).
- Sombras quentes rgba(255,192,31,0.18) em vez de cinzas.
- Fotos sempre grandes, com leve vinheta e saturação alta; cards em aspect-[4/3].

Tom de voz: direto, carioca, confiante, humor seco — nunca infantil, sem excesso de gírias ou emojis. Copy base (pode refinar mantendo o tom):
- Hero H1: "O PODRÃO MAIS *CHIC* DO RECREIO."
- Subtítulo: "Chapa quente, porção generosa e açaí cremoso. Até as 2h da manhã."
- CTAs: "PEDIR AGORA" / "Ver cardápio"
- Combos: "Combo que resolve a fome e o bolso."
- Açaí: "Açaí de verdade. Cremoso, gelado, sem enrolação."
- Sobre: "Nasceu na rua, cresceu na chapa."

## 4. SEÇÕES (ordem exata)

**4.1 Header** — fixo, backdrop-blur, fundo asfalto/85, 64px mobile / 80px desktop. Logo em texto: "PODRÃO" (Anton) + "Chic" (Playfair itálico dourado) com ícone de chama/chapa. Desktop ≥1024px: links âncora Destaques · Cardápio · Combos · Açaí · Avaliações · Localização, com sublinhado mostarda animado no ativo (useScrollSpy). Direita: badge "ABERTO AGORA"/"FECHADO" calculada por useIsOpenNow (ponto verde pulsante quando aberto), ícone de carrinho com contador, botão "Pedir agora". Mobile: hambúrguer abrindo Sheet em tela cheia com links de 28px, ícones de WhatsApp/Instagram/Maps e botão "Pedir agora" fixo na base. Header encolhe ~15% ao rolar.

**4.2 Hero** — min-h-[92svh]. Fundo com foto grande de lanche em close (placeholder no início), overlay gradiente from-asfalto via-asfalto/70 to-transparent, grão e zoom lento infinito (scale 1→1.06 em 20s, desligado com prefers-reduced-motion). Kicker "RECREIO DOS BANDEIRANTES · RIO DE JANEIRO", H1 gigante, subtítulo, dois CTAs (empilhados no mobile, lado a lado no desktop): "PEDIR NO WHATSAPP" (mostarda, ícone WhatsApp) e "VER CARDÁPIO" (outline creme, scroll suave). Abaixo, faixa de prova social em linha: "★ 4,9 no iFood (143 avaliações)" · "Aberto até 02:00" · "Entrega no Recreio". Entrada em stagger de 60ms (kicker → título → sub → CTAs → prova social), fade + translate-y 16px, total < 700ms. Indicador de scroll discreto na base.

**4.3 Barra de pedido persistente** — quando o hero sai da viewport, barra fixa na base (mobile/tablet) com total do carrinho à esquerda (ou "Seu pedido" se vazio) e botão "Pedir agora" à direita, entrando com slide-up e respeitando env(safe-area-inset-bottom). No desktop, um FAB circular de WhatsApp no canto inferior direito.

**4.4 Destaques / Os mais pedidos** — carrossel horizontal com snap no mobile, grid de 3–4 colunas no desktop. 6 itens com `destaque: true`, badge "MAIS PEDIDO" (brasa) ou "NOVO" (mostarda). Card: imagem 4:3, nome, descrição de 1 linha truncada, preço em Anton, botão circular "+" com micro-feedback (escala 0.92 → 1.08 → 1, ícone vira check por 800ms, toast "Adicionado ao pedido").

**4.5 Categorias** — chips horizontais com scroll e snap: Podrões · Cachorro-quente · Hambúrgueres · Porções · Açaí · Bebidas · Sobremesas. Chip ativo em mostarda com texto asfalto; clique faz scroll suave até o bloco e a faixa fica sticky top-16 enquanto o cardápio está visível. Cada chip com ícone e contagem de itens.

**4.6 Cardápio completo** — renderizado de menu.ts, agrupado por categoria, cada grupo com título em Anton e divisor de listras diagonais. Mobile: 1 coluna (card horizontal, imagem 96×96 à esquerda). md: 2 colunas. lg: 3 colunas (card vertical, imagem 4:3). Item: nome, descrição (máx. 90 caracteres), preço, badges opcionais (Vegetariano, Picante, Serve 2), botão de adicionar. Busca no topo (input com lupa, filtro instantâneo por nome e descrição, debounce 200ms) com EmptyState ilustrado ("Não achamos esse. Que tal um X-Tudo?" + botão para limpar). Itens com `disponivel: false` em opacidade 50%, badge "Esgotado" e botão desabilitado (aria-disabled).

**4.7 Combos e promoções** — fundo diferenciado (gradiente escuro + brasa) que quebra o ritmo visual. 3–4 cards maiores com nome, itens inclusos, preço "de/por" (antigo riscado em fumaca, novo em mostarda grande) e selo circular girando lentamente "ECONOMIZE R$ X". Um card principal ocupando 2 colunas no desktop. Campo opcional `validade` em combos.ts exibindo tag "Só hoje" quando presente.

**4.8 Seção especial de Açaí** — muda a temperatura visual: fundo acai com gradiente para asfalto, detalhes em creme e dourado. Título grande, texto curto, 3–4 opções (300ml, 500ml, 700ml, montado) com preços. Acompanhamentos em chips (granola, leite ninho, banana, morango, paçoca, leite condensado, nutella). CTA próprio "Pedir açaí no WhatsApp" com mensagem pré-preenchida específica. Transição suave da seção anterior via forma SVG orgânica de "pingo" na borda superior — nada de corte seco.

**4.9 Galeria** — grid bento com 5–7 espaços de alturas variadas, lazy loading, abrindo Dialog em tela cheia ao clicar (navegação por setas e teclado, fechar com ESC). Legenda discreta: "Imagens ilustrativas".

**4.10 Avaliações** — bloco "chic": fundo levemente mais claro, filete dourado, depoimentos em tipografia serifada. Cabeçalho com selo "4,9 ★ no iFood · 143 avaliações". 3 cards em carrossel com autoplay de 6s, pausável, controles acessíveis. REGRA CRÍTICA: não invente depoimentos como se fossem reais — preencha reviews.ts com objetos marcados `isPlaceholder: true` e um comentário no topo do arquivo instruindo a substituir pelos textos reais do iFood/Google; os placeholders devem ser curtos e genéricos, baseados nos temas elogiados (comida, açaí, cachorro-quente). NÃO exiba nota do Google nem qualquer avaliação negativa em lugar nenhum.

**4.11 Sobre** — duas colunas no desktop (texto + imagem), empilhado no mobile. Máx. 3 parágrafos de 2 linhas sobre street food do Recreio, chapa quente, porção honesta e madrugada. Três pílulas com ícone: Feito na hora · Preço honesto · Aberto até 02:00.

**4.12 Localização e horários** — esquerda: "Recreio dos Bandeirantes, Rio de Janeiro – RJ, CEP 22790-701". NÃO invente rua, número ou complemento; deixe comentário no código indicando onde inserir o endereço completo depois. Botão "Como chegar" abrindo em nova aba `https://www.google.com/maps/search/?api=1&query=Podr%C3%A3o+Chic+Recreio+dos+Bandeirantes+Rio+de+Janeiro`. Tabela de horários por dia lida de siteConfig.ts com o dia atual destacado — só temos "aberto até 02:00"; preencha os demais como valores editáveis padrão e sinalize em comentário que devem ser confirmados. Direita: iframe do Google Maps com loading="lazy", cantos arredondados e overlay "clique para carregar o mapa" para não pesar o carregamento inicial.

**4.13 Contato** — cards grandes e tocáveis (mín. 56px de altura) para WhatsApp (21) 96630-4028, Instagram @podraochic e Facebook Podrão Chic, cada um com ícone, título, subtítulo de ação e seta.

**4.14 Footer** — logo, frase da marca, navegação secundária, redes, endereço resumido, horário, "© 2026 Podrão Chic. Todos os direitos reservados." e linha discreta "Imagens meramente ilustrativas." Faixa de listras diagonais como acabamento superior.

## 5. CESTA / CARRINHO
Cesta visual e local, sem backend e sem pagamento. CartContext com useReducer: addItem, removeItem, incrementQty, decrementQty, clearCart, total, itemCount. Persistir apenas em estado de React durante a sessão — NÃO usar localStorage. Abre como Sheet lateral (desktop) / Drawer de baixo para cima (mobile), contendo: lista de itens (thumb, nome, preço unitário, stepper de quantidade, remover); observação opcional por item ("sem cebola, capricha no cheddar"); campo de nome do cliente e select de modalidade Retirada ou Entrega (se entrega, textarea de endereço); resumo com subtotal e aviso "Taxa de entrega e disponibilidade são confirmadas no WhatsApp."; botão final "ENVIAR PEDIDO NO WHATSAPP".

`lib/whatsapp.ts` monta a mensagem, aplica encodeURIComponent e abre `https://wa.me/5521966304028?text=...` neste formato:
```
*NOVO PEDIDO — PODRÃO CHIC*
Cliente: {nome}
Modalidade: {Retirada|Entrega}
Endereço: {endereço}

*Itens:*
2x Podrão Chic Especial — R$ 00,00
  obs: sem cebola
1x Açaí 500ml — R$ 00,00

*Subtotal:* R$ 00,00
Pedido feito pelo site.
```
Estado vazio com ilustração simples e botão "Ver cardápio". Botão de envio desabilitado com carrinho vazio ou nome em branco, com mensagem de validação abaixo do campo (nunca `alert`). Crie `src/lib/orderService.ts` com uma interface `OrderService` e a implementação `WhatsAppOrderService`, documentando em comentário como trocar por um sistema real de pedidos no futuro — mas não construa esse sistema agora.

## 6. IMAGENS E PLACEHOLDERS
Não invente URLs de fotos reais do restaurante nem afirme que uma imagem é do estabelecimento. Centralize tudo em `src/data/gallery.ts` e no campo `image` de cada produto, com comentário no topo: `// SUBSTITUIR pelas fotos reais do Podrão Chic. Enquanto isso, placeholders são exibidos.`

Componente `FoodImage`: recebe `src` opcional; se vazio ou com erro (onError), renderiza placeholder gerado em CSS/SVG — gradiente quente + ícone da categoria (hambúrguer, cachorro-quente, copo de açaí) + texto "Foto em breve". Skeleton com shimmer enquanto carrega. Sempre loading="lazy", decoding="async", width/height e aspect-ratio fixos para evitar CLS. Onde usar imagens ilustrativas de comida, use apenas fontes livres (Unsplash) e marque "Imagem ilustrativa" no rodapé da seção. O layout precisa continuar bonito e coeso com 100% dos placeholders ativos — teste isso.

## 7. INTERAÇÕES E ESTADOS
Scroll reveal com fade + translate-y 20px, viewport={{ once: true, amount: 0.2 }}, nunca mais de 4 elementos animando ao mesmo tempo. Hover no desktop: card sobe 4px, imagem scale(1.04) com overflow-hidden, filete mostarda na borda, transições 200–250ms ease-out. Todo clicável com active:scale-[0.97]. Focus com ring-2 ring-mostarda ring-offset-2 ring-offset-asfalto. Loading: Skeleton nos cards do cardápio no primeiro render e spinner dentro do botão ao enviar o pedido (aria-busy). Empty states: busca sem resultado, carrinho vazio, categoria sem itens. Erro: imagem quebrada → placeholder; falha ao abrir WhatsApp → toast com o número copiável. useReducedMotion desliga zoom do hero, marquee, autoplay do carrossel e parallax. SEM parallax pesado, SEM confete, SEM cursor customizado, SEM preloader de tela cheia.

## 8. RESPONSIVIDADE
Breakpoints 360 / 640 / 768 / 1024 / 1280 / 1536. Testar e ajustar em 360px, 390px, 768px, 1024px e 1440px. Alvos de toque mínimos de 44×44px. Espaçamento entre seções: 64px mobile, 112px desktop. Nenhum scroll horizontal em qualquer largura (exceto carrosséis intencionais). Usar svh em vez de vh. Corpo de texto nunca abaixo de 15px.

## 9. ACESSIBILIDADE
HTML semântico (header, nav, main, section aria-labelledby, footer), um único h1. Skip link "Pular para o cardápio" visível ao focar. Alt descritivo em português; decorativas com alt="". Contraste mínimo AA — texto sobre mostarda sempre em asfalto, nunca branco; texto sobre foto sempre com overlay. Carrossel navegável por teclado; Dialog e Sheet com foco preso e retorno de foco ao fechar. Contador do carrinho com aria-live="polite". lang="pt-BR".

## 10. SEO
react-helmet-async com:
- Title: `Podrão Chic — Lanches, Cachorro-Quente e Açaí no Recreio | Rio de Janeiro`
- Description: `Podrão Chic no Recreio dos Bandeirantes: cachorro-quente, hambúrgueres, porções e açaí cremoso. Peça pelo WhatsApp. Aberto até 02:00.`
- Open Graph e Twitter Card completos (og:image gerado a partir da marca), canonical, theme-color #FFC01F.
JSON-LD tipo `Restaurant`: name, telephone +5521966304028, address (addressLocality Recreio dos Bandeirantes, addressRegion RJ, postalCode 22790-701, addressCountry BR), servesCuisine ["Fast Food","Street Food","Brasileira"], priceRange "$", openingHoursSpecification lido de siteConfig.ts, sameAs com Instagram e Facebook, hasMenu apontando para a âncora do cardápio. Hierarquia correta de headings, sitemap.xml e robots.txt básicos, favicon e apple-touch-icon a partir do símbolo da marca. Palavras-chave naturais no texto: "lanche no Recreio", "cachorro-quente Recreio dos Bandeirantes", "açaí Recreio", "delivery até 2h".

## 11. PERFORMANCE
Meta LCP < 2,5s e CLS < 0,1 em 4G. Imagem do hero com fetchpriority="high", todas as demais lazy. WebP/AVIF, dimensões declaradas. content-visibility: auto abaixo da dobra. Code-splitting de galeria e mapa com React.lazy + Suspense com Skeleton. Mapa só carrega sob interação. Nenhuma biblioteca de animação além de framer-motion; nenhuma fonte além das três citadas.

## 12. DADOS INICIAIS
Popule menu.ts com 20 a 26 itens realistas distribuídos nas categorias (podrões, cachorro-quente, hambúrgueres, porções, açaí, bebidas, sobremesas), com nomes criativos coerentes com a marca (ex.: "Podrão Chic", "Podrão da Madrugada", "X-Salada Honesto", "Porção de Fritas com Cheddar") e preços plausíveis de street food carioca. No topo de menu.ts e combos.ts inclua obrigatoriamente:
```ts
// ATENÇÃO: nomes, descrições e preços abaixo são SUGESTÕES INICIAIS editáveis.
// Substitua pelos itens e valores reais do Podrão Chic antes de publicar.
```
Tipos exigidos:
```ts
type Category = 'podroes' | 'cachorro-quente' | 'hamburgueres' | 'porcoes' | 'acai' | 'bebidas' | 'sobremesas';

interface MenuItem {
  id: string;
  nome: string;
  descricao: string;
  preco: number;          // em reais, ex.: 24.9
  categoria: Category;
  image?: string;         // vazio => placeholder
  destaque?: boolean;
  disponivel: boolean;
  tags?: string[];        // ex.: ['Serve 2', 'Picante']
}
```
Formatação de preço sempre via `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })` em lib/format.ts.

## 13. CRITÉRIOS DE ACEITE
1. Todo o conteúdo em português do Brasil, sem texto em inglês visível.
2. Nenhum preço, telefone, horário ou nome de produto hardcoded em componentes.
3. O site é bonito com 100% dos placeholders de imagem ativos.
4. Botão de pedido acessível em qualquer ponto da rolagem, no mobile e no desktop.
5. Link do WhatsApp abre com mensagem pré-preenchida correta, incluindo os itens do carrinho.
6. Nenhuma avaliação negativa e nenhuma nota do Google exibidas.
7. Nenhum depoimento apresentado como real sem estar marcado como placeholder no código.
8. Nenhum endereço de rua inventado.
9. Zero scroll horizontal em 360px.
10. Navegação completa por teclado, com foco sempre visível.
11. Animações desativadas com prefers-reduced-motion.
12. Console limpo, sem warnings de React nem chaves duplicadas.

Construa o site completo agora, com todos os componentes funcionando e o cardápio populado.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6e6f1b16-db30-44ec-b714-f39bae14cd94).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
