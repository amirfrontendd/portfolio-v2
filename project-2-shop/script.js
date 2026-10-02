const products = [
    { id: 1, emoji: '📱', cls: 'p1', cat: 'mobile', price: 24500000, old: 26900000, off: 9, rating: '4.8 (210)', fa: 'گوشی سامسونگ A55', en: 'Samsung A55' },
    { id: 2, emoji: '📱', cls: 'p2', cat: 'mobile', price: 58900000, old: 62500000, off: 6, rating: '4.9 (340)', fa: 'آیفون ۱۳ - ۱۲۸ گیگ', en: 'iPhone 13 128GB' },
    { id: 3, emoji: '🎧', cls: 'p3', cat: 'audio', price: 2490000, old: 3500000, off: 29, rating: '4.7 (520)', fa: 'هدفون گیمینگ پرو', en: 'Pro Gaming Headset' },
    { id: 4, emoji: '💻', cls: 'p4', cat: 'laptop', price: 42500000, old: 47000000, off: 10, rating: '4.8 (150)', fa: 'لپ‌تاپ ایسوس Vivobook', en: 'Asus Vivobook' },
    { id: 5, emoji: '⌚', cls: 'p5', cat: 'wear', price: 8900000, old: 10500000, off: 15, rating: '4.6 (280)', fa: 'ساعت هوشمند اولترا', en: 'Smart Watch Ultra' },
    { id: 6, emoji: '🔊', cls: 'p6', cat: 'audio', price: 3200000, old: 3900000, off: 18, rating: '4.5 (190)', fa: 'اسپیکر بلوتوثی JBL', en: 'JBL Bluetooth Speaker' },
    { id: 7, emoji: '💻', cls: 'p7', cat: 'laptop', price: 68000000, old: 74000000, off: 8, rating: '5.0 (90)', fa: 'مک‌بوک ایر M2', en: 'MacBook Air M2' },
    { id: 8, emoji: '⌚', cls: 'p8', cat: 'wear', price: 1950000, old: 2600000, off: 25, rating: '4.4 (410)', fa: 'هندزفری واچ و ایرپاد', en: 'Watch + AirPods Set' },
];
const catFa = { mobile: 'موبایل', laptop: 'لپ‌تاپ', audio: 'صوتی', wear: 'پوشیدنی' };
const catEn = { mobile: 'Mobile', laptop: 'Laptop', audio: 'Audio', wear: 'Wearable' };
let lang = localStorage.getItem('shopLang') || 'fa';
let theme = localStorage.getItem('shopTheme') || 'light';
let cart = JSON.parse(localStorage.getItem('amirCart') || '{}');
let activeCat = 'all';

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const resultCount = document.getElementById('resultCount');

function faNum(n) { return n.toLocaleString('fa-IR'); }
function price(n) { return lang === 'fa' ? faNum(n) + ' تومان' : n.toLocaleString('en-US') + ' T'; }

function getList() {
    let list = products.filter(p => activeCat === 'all' || p.cat === activeCat);
    const q = searchInput.value.trim();
    if (q) list = list.filter(p => p.fa.includes(q) || p.en.toLowerCase().includes(q.toLowerCase()));
    const s = sortSelect.value;
    if (s === 'cheap') list = [...list].sort((a, b) => a.price - b.price);
    if (s === 'exp') list = [...list].sort((a, b) => b.price - a.price);
    if (s === 'off') list = [...list].sort((a, b) => b.off - a.off);
    return list;
}

function render() {
    const list = getList();
    resultCount.textContent = lang === 'fa' ? `${faNum(list.length)} محصول پیدا شد` : `${list.length} products found`;
    if (!list.length) { grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:40px">محصولی پیدا نشد 😕</p>`; return; }
    grid.innerHTML = list.map(p => `
<div class="product">
<div class="p-img ${p.cls}">${p.emoji}<span class="p-off">٪${lang === 'fa' ? faNum(p.off) : p.off}</span></div>
<div class="p-body">
<span class="p-cat">${lang === 'fa' ? catFa[p.cat] : catEn[p.cat]}</span>
<h3>${lang === 'fa' ? p.fa : p.en}</h3>
<div class="stars">★★★★★ <small>${p.rating}</small></div>
<div class="p-price"><strong>${price(p.price)}</strong><s>${price(p.old)}</s></div>
<button class="btn" onclick="addToCart(${p.id})">${lang === 'fa' ? 'افزودن به سبد 🛒' : 'Add to cart 🛒'}</button>
</div>
</div>`).join('');
}

document.querySelectorAll('.filter').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); activeCat = b.dataset.cat; render();
}));
searchInput.addEventListener('input', render);
sortSelect.addEventListener('change', render);

// سبد خرید
const drawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('cartOverlay');
function openCart() { drawer.classList.add('open'); overlay.classList.add('show'); renderCart(); }
function closeCartFn() { drawer.classList.remove('open'); overlay.classList.remove('show'); }
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCartFn);
overlay.addEventListener('click', closeCartFn);

function saveCart() { localStorage.setItem('amirCart', JSON.stringify(cart)); updateCount(); }
function updateCount() {
    const n = Object.values(cart).reduce((a, b) => a + b, 0);
    document.getElementById('cartCount').textContent = lang === 'fa' ? faNum(n) : n;
}
function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1; saveCart();
    const p = products.find(x => x.id === id);
    toast(lang === 'fa' ? `«${p.fa}» به سبد اضافه شد ✓` : `${p.en} added ✓`);
    if (drawer.classList.contains('open')) renderCart();
}
function changeQty(id, d) {
    cart[id] = (cart[id] || 0) + d;
    if (cart[id] <= 0) delete cart[id];
    saveCart(); renderCart();
}
function renderCart() {
    const box = document.getElementById('cartItems');
    const ids = Object.keys(cart);
    if (!ids.length) { box.innerHTML = `<div class="cart-empty">🛒<br>${lang === 'fa' ? 'سبدت خالیه! یه چیزی انتخاب کن' : 'Cart is empty!'}</div>`; }
    else {
        box.innerHTML = ids.map(id => {
            const p = products.find(x => x.id == id);
            const q = cart[id];
            return `<div class="cart-item">
<div class="ci-emoji ${p.cls}">${p.emoji}</div>
<div class="ci-info"><h4>${lang === 'fa' ? p.fa : p.en}</h4><small>${price(p.price)}</small>
<div class="qty"><button onclick="changeQty(${p.id},1)">+</button><span>${lang === 'fa' ? faNum(q) : q}</span><button onclick="changeQty(${p.id},-1)">−</button></div>
</div></div>`;
        }).join('');
    }
    const total = ids.reduce((s, id) => s + products.find(x => x.id == id).price * cart[id], 0);
    document.getElementById('cartTotal').textContent = price(total);
}
document.getElementById('clearCart').addEventListener('click', () => { cart = {}; saveCart(); renderCart(); });
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (!Object.keys(cart).length) { toast(lang === 'fa' ? 'سبد خالیه!' : 'Empty cart!'); return; }
    toast(lang === 'fa' ? 'سفارشت ثبت شد، به‌زودی تماس می‌گیریم ✓' : 'Order placed ✓');
    cart = {}; saveCart(); renderCart();
});
function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._tm); t._tm = setTimeout(() => t.classList.remove('show'), 2200);
}

// تم و زبان
const themeBtn = document.getElementById('themeBtn');
function applyTheme(t) { document.documentElement.setAttribute('data-theme', t); themeBtn.textContent = t === 'light' ? '🌙' : '☀️'; localStorage.setItem('shopTheme', t); }
applyTheme(theme);
themeBtn.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; applyTheme(theme); });

const langBtn = document.getElementById('langBtn');
const dict = {
    heroTitle: { fa: 'هر چی برای دیجیتال لازم داری، اینجاست', en: 'Everything digital you need, right here' },
    heroSub: { fa: 'موبایل، لپ‌تاپ، هدفون و ساعت هوشمند با بهترین قیمت و تخفیف ویژه', en: 'Mobiles, laptops, headphones and smart watches at best price' },
    o1: { fa: 'تخفیف موبایل', en: 'Mobile off' }, o2: { fa: 'ارسال بالای ۱ میلیون', en: 'Free ship over 1M' }, o2v: { fa: 'رایگان', en: 'Free' }, o3: { fa: 'مهلت مرجوعی', en: 'Return days' },
    hotTag: { fa: 'پیشنهاد داغ 🔥', en: 'Hot deal 🔥' }, hotTitle: { fa: 'هدفون گیمینگ پرو', en: 'Pro Gaming Headset' },
    addBtn: { fa: 'افزودن به سبد', en: 'Add to cart' },
    fAll: { fa: 'همه', en: 'All' }, fMob: { fa: 'موبایل', en: 'Mobile' }, fLap: { fa: 'لپ‌تاپ', en: 'Laptop' }, fAud: { fa: 'صوتی', en: 'Audio' }, fWear: { fa: 'پوشیدنی', en: 'Wearable' },
    sNew: { fa: 'جدیدترین', en: 'Newest' }, sCheap: { fa: 'ارزان‌ترین', en: 'Cheapest' }, sExp: { fa: 'گران‌ترین', en: 'Expensive' }, sOff: { fa: 'بیشترین تخفیف', en: 'Biggest off' },
    fe1t: { fa: 'ارسال سریع', en: 'Fast ship' }, fe1d: { fa: 'به سراسر کشور', en: 'Nationwide' }, fe2t: { fa: 'ضمانت اصالت', en: 'Original' }, fe2d: { fa: 'کالای اورجینال', en: 'Genuine goods' },
    fe3t: { fa: 'پرداخت امن', en: 'Secure pay' }, fe3d: { fa: 'درگاه معتبر', en: 'Trusted gateway' }, fe4t: { fa: 'پشتیبانی', en: 'Support' }, fe4d: { fa: '۷ روز هفته', en: '7 days a week' },
    cartTitle: { fa: 'سبد خرید', en: 'Cart' }, totalLbl: { fa: 'جمع کل:', en: 'Total:' }, checkout: { fa: 'تسویه حساب', en: 'Checkout' }, clear: { fa: 'خالی کردن سبد', en: 'Clear cart' }
};
function applyLang(l) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (dict[k] && dict[k][l]) el.textContent = dict[k][l];
    });
    const ph = document.querySelector('[data-i18n-ph]');
    if (ph) ph.placeholder = l === 'fa' ? 'جست‌وجو محصول...' : 'Search products...';
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'fa' ? 'rtl' : 'ltr';
    langBtn.textContent = l === 'fa' ? 'EN' : 'FA';
    localStorage.setItem('shopLang', l);
    render(); updateCount(); if (drawer.classList.contains('open')) renderCart();
}
applyLang(lang);
langBtn.addEventListener('click', () => { lang = lang === 'fa' ? 'en' : 'fa'; applyLang(lang); });
render(); updateCount();