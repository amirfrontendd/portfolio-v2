var foods = [
    { id: 1, e: '🍢', c: 'f1', cat: 'kebab', price: 390000, fa: 'دنده‌کباب مخصوص', en: 'Special Ribs' },
    { id: 2, e: '🍖', c: 'f2', cat: 'kebab', price: 280000, fa: 'کباب کوبیده دوبل', en: 'Kubideh Double' },
    { id: 3, e: '🍲', c: 'f3', cat: 'local', price: 220000, fa: 'خورشت خلال', en: 'Khalal Stew' },
    { id: 4, e: '🥘', c: 'f4', cat: 'local', price: 180000, fa: 'آش عباسعلی', en: 'Abbasali Ash' },
    { id: 5, e: '🥗', c: 'f5', cat: 'local', price: 150000, fa: 'سالاد شیرازی', en: 'Shirazi Salad' },
    { id: 6, e: '🍚', c: 'f6', cat: 'kebab', price: 250000, fa: 'چلو جوجه', en: 'Chicken Rice' },
    { id: 7, e: '🍰', c: 'f7', cat: 'dessert', price: 95000, fa: 'باقلوا و چای', en: 'Baklava and Tea' },
    { id: 8, e: '🥛', c: 'f8', cat: 'dessert', price: 60000, fa: 'دوغ محلی', en: 'Local Doogh' }
];
var cat = 'all', cart = {}, lang = 'fa', theme = 'light';
try { cart = JSON.parse(localStorage.getItem('resCart') || '{}'); } catch (e) { cart = {}; }
try { lang = localStorage.getItem('resLang') || 'fa'; } catch (e) { }
try { theme = localStorage.getItem('resTheme') || 'light'; } catch (e) { }
var dict = {
    logo: { fa: 'شب‌های کرمانشاه', en: 'Kermanshah Nights' },
    orderBtn: { fa: 'سفارش', en: 'Order' },
    nHome: { fa: 'خانه', en: 'Home' }, nMenu: { fa: 'منو', en: 'Menu' }, nRes: { fa: 'رزرو میز', en: 'Reserve' }, nCon: { fa: 'تماس', en: 'Contact' },
    badge: { fa: 'دنده‌کباب اصیل + ارسال ۳۰ دقیقه‌ای', en: 'Authentic ribs + 30min delivery' },
    heroT: { fa: 'طعم واقعی کرمانشاه، داغ و تازه', en: 'Real Kermanshah taste, hot and fresh' },
    heroS: { fa: 'کباب، خورشت خلال و آش عباسعلی. رزرو میز یا سفارش آنلاین.', en: 'Kebab, Khalal stew and Ash. Reserve or order online.' },
    bMenu: { fa: 'دیدن منو', en: 'View Menu' }, bRes: { fa: 'رزرو میز', en: 'Reserve Table' },
    todayT: { fa: 'پیشنهاد امروز', en: "Today's Deal" }, todayS: { fa: 'دنده‌کباب + نان داغ + دوغ محلی', en: 'Ribs + hot bread + local drink' },
    todayP: { fa: '۳۹۰٬۰۰۰ تومان', en: '390,000 T' }, todayB: { fa: 'افزودن به سفارش', en: 'Add to Order' },
    menuT: { fa: 'منوی رستوران', en: 'Restaurant Menu' }, menuS: { fa: 'فیلتر کن و سفارشت رو ثبت کن', en: 'Filter and place your order' },
    fAll: { fa: 'همه', en: 'All' }, fK: { fa: 'کباب‌ها', en: 'Kebabs' }, fL: { fa: 'محلی', en: 'Local' }, fD: { fa: 'دسر', en: 'Dessert' },
    resT: { fa: 'رزرو میز', en: 'Reserve a Table' }, resS: { fa: 'فرم رو پر کن، تأیید می‌کنیم', en: 'Fill the form, we confirm' },
    lName: { fa: 'نام', en: 'Name' }, lPhone: { fa: 'موبایل', en: 'Phone' }, lDate: { fa: 'تاریخ', en: 'Date' }, lCount: { fa: 'تعداد', en: 'Guests' },
    c2: { fa: '۲ نفره', en: '2 persons' }, c4: { fa: '۴ نفره', en: '4 persons' }, c6: { fa: '۶ نفره', en: '6 persons' }, c8: { fa: '۸ نفره', en: '8 persons' },
    resB: { fa: 'ثبت رزرو', en: 'Confirm Reserve' }, resOk: { fa: 'رزروت ثبت شد!', en: 'Reserved!' },
    foot: { fa: 'رستوران شب‌های کرمانشاه | ساخته امیر عباسی • 09231374838', en: 'Kermanshah Nights | by Amir Abasi • 09231374838' },
    cartT: { fa: 'سفارش شما', en: 'Your Order' }, total: { fa: 'جمع:', en: 'Total:' }, pay: { fa: 'ثبت سفارش', en: 'Place Order' }
};
var dictPh = { phName: { fa: 'نام شما', en: 'Your name' } };
function faN(n) { return n.toLocaleString('fa-IR'); }
function priceT(n) { return (lang === 'fa' ? faN(n) : n.toLocaleString('en-US')) + (lang === 'fa' ? ' تومان' : ' T'); }
function toast(m) { var t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(function () { t.classList.remove('show'); }, 2000); }
function applyLang(l) {
    lang = l;
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) { var k = els[i].getAttribute('data-i18n'); if (dict[k] && dict[k][l]) els[i].textContent = dict[k][l]; }
    var phs = document.querySelectorAll('[data-i18n-ph]');
    for (var j = 0; j < phs.length; j++) { var kp = phs[j].getAttribute('data-i18n-ph'); if (dictPh[kp]) phs[j].placeholder = dictPh[kp][l]; }
    document.documentElement.lang = l; document.documentElement.dir = (l === 'fa') ? 'rtl' : 'ltr';
    document.getElementById('langBtn').textContent = (l === 'fa') ? 'EN' : 'FA';
    try { localStorage.setItem('resLang', l); } catch (e) { }
    render(); drawCart();
}
function render() {
    var g = document.getElementById('foodGrid'); var h = '';
    for (var i = 0; i < foods.length; i++) {
        var p = foods[i]; if (cat !== 'all' && p.cat !== cat) continue;
        var nm = (lang === 'fa') ? p.fa : p.en;
        var btn = (lang === 'fa') ? 'افزودن' : 'Add';
        h += '<div class="food"><div class="f-img ' + p.c + '">' + p.e + '</div><div class="f-body"><h3>' + nm + '</h3><div class="price">' + priceT(p.price) + '</div><button class="btn" data-id="' + p.id + '">' + btn + '</button></div></div>';
    }
    g.innerHTML = h;
    var btns = g.querySelectorAll('button');
    for (var j = 0; j < btns.length; j++) { btns[j].onclick = function () { addToCart(parseInt(this.getAttribute('data-id'))); }; }
    updateCount();
}
function updateCount() { var n = 0; for (var k in cart) n += cart[k]; document.getElementById('cartCount').textContent = (lang === 'fa') ? faN(n) : n; }
function save() { try { localStorage.setItem('resCart', JSON.stringify(cart)); } catch (e) { } updateCount(); }
function addToCart(id) { cart[id] = (cart[id] || 0) + 1; save(); drawCart(); openDrawer(); toast(lang === 'fa' ? 'به سفارش اضافه شد ✓' : 'Added ✓'); }
function openDrawer() { document.getElementById('drawer').classList.add('open'); document.getElementById('overlay').classList.add('show'); }
function closeDrawer() { document.getElementById('drawer').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }
function drawCart() {
    var box = document.getElementById('cartItems'); var h = '', total = 0;
    for (var id in cart) {
        var p = null; for (var i = 0; i < foods.length; i++)if (foods[i].id == id) p = foods[i]; var q = cart[id]; total += p.price * q; var nm = (lang === 'fa') ? p.fa : p.en;
        h += '<div class="ci"><span>' + p.e + ' ' + nm + ' × ' + q + '</span><span class="qty"><button data-a="1" data-id="' + id + '">+</button><button data-a="-1" data-id="' + id + '">−</button></span></div>';
    }
    box.innerHTML = h || (lang === 'fa' ? 'خالیه' : 'Empty');
    document.getElementById('cartTotal').textContent = priceT(total);
    var btns = box.querySelectorAll('button');
    for (var j = 0; j < btns.length; j++) { btns[j].onclick = function () { var d = parseInt(this.getAttribute('data-a')); var pid = this.getAttribute('data-id'); cart[pid] = (cart[pid] || 0) + d; if (cart[pid] <= 0) delete cart[pid]; save(); drawCart(); }; }
}
document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('themeBtn').textContent = (theme === 'light') ? '🌙' : '☀️';
    applyLang(lang);
    document.getElementById('hamburger').onclick = function () { document.getElementById('navLinks').classList.toggle('open'); };
    document.getElementById('themeBtn').onclick = function () { theme = (theme === 'light') ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', theme); this.textContent = (theme === 'light') ? '🌙' : '☀️'; try { localStorage.setItem('resTheme', theme); } catch (e) { } };
    document.getElementById('langBtn').onclick = function () { applyLang(lang === 'fa' ? 'en' : 'fa'); };
    var fb = document.querySelectorAll('#filters .filter');
    for (var i = 0; i < fb.length; i++) { (function (b) { b.onclick = function () { for (var j = 0; j < fb.length; j++)fb[j].classList.remove('active'); b.classList.add('active'); cat = b.getAttribute('data-cat'); render(); }; })(fb[i]); }
    document.getElementById('cartBtn').onclick = function () { drawCart(); openDrawer(); };
    document.getElementById('closeCart').onclick = closeDrawer;
    document.getElementById('overlay').onclick = closeDrawer;
    document.getElementById('todayBtn').onclick = function () { addToCart(1); };
    document.getElementById('payBtn').onclick = function () { if (!Object.keys(cart).length) { toast(lang === 'fa' ? 'سبد خالیه' : 'Empty'); return; } cart = {}; save(); drawCart(); closeDrawer(); toast(lang === 'fa' ? 'سفارشت ثبت شد ✓' : 'Ordered ✓'); };
    document.getElementById('resForm').onsubmit = function (e) {
        e.preventDefault();
        var n = document.getElementById('rName').value.trim(), ph = document.getElementById('rPhone').value.trim(), ok = true;
        document.getElementById('eName').textContent = ''; document.getElementById('ePhone').textContent = '';
        if (n.length < 3) { document.getElementById('eName').textContent = (lang === 'fa' ? 'نام کوتاهه' : 'Short name'); ok = false; }
        if (!/^09\d{9}$/.test(ph)) { document.getElementById('ePhone').textContent = (lang === 'fa' ? 'موبایل معتبر نیست' : 'Invalid phone'); ok = false; }
        if (ok) { this.reset(); toast(lang === 'fa' ? 'رزروت ثبت شد ✓' : 'Reserved ✓'); }
    };
});