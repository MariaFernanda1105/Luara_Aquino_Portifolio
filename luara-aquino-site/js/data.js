/* ============================================================
   LUARA AQUINO — catálogo de obras e produtos
   * As imagens em /assets são ilustrações de referência (placeholder)
   * — substitua pelos arquivos fotográficos reais das obras.
   ============================================================ */

const OBRAS = [
  {
    id: "ponte-paraiso-3",
    titulo: "Ponte Paraíso Palmas III",
    ano: 2015,
    tecnica: "Acrílica e madeira sobre tela",
    dimensoes: "80 × 80 cm",
    serie: "Com Passo, Descompasso, Ato",
    imagem: "assets/obra-ponte-paraiso.svg",
    status: "acervo",
    descricao: "Geometria que recorta o horizonte de Palmas contra o azul do Tocantins — bidimensionalidade e volume se encontram na mesma superfície, remetendo ao cerrado e à urbanidade da capital."
  },
  {
    id: "efeito-formal",
    titulo: "Efeito Formal",
    ano: 2015,
    tecnica: "Tinta acrílica sobre MDF",
    dimensoes: "60 × 90 cm",
    serie: "Com Passo, Descompasso, Ato",
    imagem: "assets/obra-efeito-formal.svg",
    status: "disponivel",
    preco: 2400,
    descricao: "Uma cadência de barras verticais em ritmo irregular — estudo de cheios e vazios que testa o limite entre desenho técnico e gesto livre."
  },
  {
    id: "corrente-lantejoula",
    titulo: "Corrente Lantejoula",
    ano: 2016,
    tecnica: "Fotografia, impressão fine art",
    dimensoes: "50 × 70 cm",
    serie: "Com Passo, Descompasso, Ato",
    imagem: "assets/obra-corrente.svg",
    status: "disponivel",
    preco: 980,
    descricao: "Um objeto cotidiano fotografado até virar desenho — elo por elo, a corrente se torna linha, depois forma, depois espiral."
  },
  {
    id: "espiral-da-vida",
    titulo: "Espiral da Vida",
    ano: 2018,
    tecnica: "Nanquim sobre papel",
    dimensoes: "42 × 59 cm",
    serie: "Estudos em papel",
    imagem: "assets/obra-espiral.svg",
    status: "disponivel",
    preco: 1200,
    descricao: "Figuras entrelaçadas em queda e ascensão dentro de um cone — um estudo sobre ciclos, vínculo e a forma do tempo."
  },
  {
    id: "abraco-irma-dulce",
    titulo: "O Abraço de Irmã Dulce",
    ano: 2019,
    tecnica: "Técnica mista sobre tela",
    dimensoes: "70 × 100 cm",
    serie: "Estudos em papel",
    imagem: "assets/obra-abraco.svg",
    status: "doada",
    descricao: "Homenagem à religiosa baiana — o gesto do abraço reduzido à sua forma mais essencial, doada a uma instituição parceira."
  },
  {
    id: "sussuapara-por-do-sol",
    titulo: "Sussuapara ao Pôr-do-Sol",
    ano: 2024,
    tecnica: "Óleo sobre tela",
    dimensoes: "60 × 80 cm",
    serie: "Salve o Cerrado",
    imagem: "assets/obra-cerrado.svg",
    status: "disponivel",
    preco: 3200,
    descricao: "Pintura realizada para a curadoria 'Salve o Cerrado', uma reflexão sobre a fauna e a flora do bioma que cerca Palmas."
  },
  {
    id: "travessia",
    titulo: "Travessia",
    ano: 2023,
    tecnica: "Acrílica sobre tela",
    dimensoes: "90 × 60 cm",
    serie: "Águas do Tocantins",
    imagem: "assets/obra-travessia.svg",
    status: "disponivel",
    preco: 2800,
    descricao: "Faixas de cor sobrepostas como camadas de água e luz — uma travessia visual ao longo do rio que dá nome ao estado."
  }
];

/* status: 'disponivel' (à venda), 'acervo' (não comercializável), 'doada' (não comercializável) */

function obraPorId(id) {
  return OBRAS.find(o => o.id === id);
}

/* ---------- PRODUTOS DA LOJA ---------- */
/* Originais: somente obras 'disponivel'. Impressões: disponíveis para quase todas, exceto peças doadas. */
const PRODUTOS = [];

OBRAS.forEach(o => {
  if (o.status === "disponivel") {
    PRODUTOS.push({
      id: o.id + "-original",
      obraId: o.id,
      tipo: "Original",
      nome: o.titulo + " — Original",
      preco: o.preco,
      imagem: o.imagem,
      detalhe: o.tecnica + " · " + o.dimensoes,
      estoque: 1
    });
  }
  if (o.status !== "doada") {
    PRODUTOS.push({
      id: o.id + "-impressao",
      obraId: o.id,
      tipo: "Impressão",
      nome: o.titulo + " — Impressão Giclée",
      preco: Math.round((o.preco || 1500) * 0.22 / 10) * 10,
      imagem: o.imagem,
      detalhe: "Edição limitada, papel de algodão 300g · " + o.dimensoes,
      estoque: 30
    });
  }
});

function produtoPorId(id) {
  return PRODUTOS.find(p => p.id === id);
}
