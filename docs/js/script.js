/* ============================================================
   LUARA AQUINO — script.js (compartilhado entre todas as páginas)
   ============================================================ */

/* ---------- NAV MOBILE ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
  document.querySelectorAll('.dropdown > a').forEach(a => {
    a.addEventListener('click', (e) => {
      if (window.innerWidth <= 920) {
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });
  atualizarBadgeCarrinho();
});

/* ---------- TOAST ---------- */
function mostrarToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- CARRINHO (localStorage) ---------- */
const CARRINHO_KEY = 'luara_carrinho_v1';

function lerCarrinho() {
  try { return JSON.parse(localStorage.getItem(CARRINHO_KEY)) || []; }
  catch (e) { return []; }
}
function salvarCarrinho(itens) {
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(itens));
  atualizarBadgeCarrinho();
}
function adicionarAoCarrinho(produto) {
  const itens = lerCarrinho();
  const existente = itens.find(i => i.id === produto.id);
  if (existente) {
    existente.qtd += 1;
  } else {
    itens.push({ ...produto, qtd: 1 });
  }
  salvarCarrinho(itens);
  mostrarToast(`"${produto.nome}" adicionado ao carrinho.`);
}
function removerDoCarrinho(id) {
  const itens = lerCarrinho().filter(i => i.id !== id);
  salvarCarrinho(itens);
  if (typeof renderizarCarrinho === 'function') renderizarCarrinho();
}
function alterarQuantidade(id, delta) {
  const itens = lerCarrinho();
  const item = itens.find(i => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) {
    return removerDoCarrinho(id);
  }
  salvarCarrinho(itens);
  if (typeof renderizarCarrinho === 'function') renderizarCarrinho();
}
function totalCarrinho() {
  return lerCarrinho().reduce((soma, i) => soma + i.preco * i.qtd, 0);
}
function contagemCarrinho() {
  return lerCarrinho().reduce((soma, i) => soma + i.qtd, 0);
}
function atualizarBadgeCarrinho() {
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = contagemCarrinho();
  });
}
function formatarPreco(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
