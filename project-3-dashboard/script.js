window.onload = function () {
    var sidebar = document.getElementById('sidebar');
    document.getElementById('menuBtn').onclick = function () { sidebar.classList.toggle('open'); };

    // زبان کامل
    var lang = 'fa';
    try { lang = localStorage.getItem('dashLang') || 'fa'; } catch (e) { }
    var dict = {
        userName: { fa: 'امیر عباسی', en: 'Amir Abasi' },
        userRole: { fa: 'مدیر فروشگاه', en: 'Shop Manager' },
        mDash: { fa: 'داشبورد', en: 'Dashboard' }, mOrders: { fa: 'سفارش‌ها', en: 'Orders' }, mProducts: { fa: 'محصولات', en: 'Products' }, mUsers: { fa: 'مشتریان', en: 'Customers' }, mSettings: { fa: 'تنظیمات', en: 'Settings' },
        dashTitle: { fa: 'داشبورد فروش', en: 'Sales Dashboard' }, dashSub: { fa: 'نمای کلی امروز فروشگاهت', en: 'Today store overview' },
        reportBtn: { fa: '+ گزارش جدید', en: '+ New Report' },
        s1: { fa: 'فروش امروز', en: "Today's Sales" }, s2: { fa: 'سفارش‌ها', en: 'Orders' }, s3: { fa: 'مشتری جدید', en: 'New Customers' }, s4: { fa: 'موجودی انبار', en: 'Stock' },
        chartT: { fa: 'فروش ۷ روز اخیر', en: 'Last 7 Days Sales' }, yearTag: { fa: 'امسال', en: 'This Year' },
        pieT: { fa: 'فروش دسته‌ها', en: 'Sales by Category' },
        cat1: { fa: 'موبایل ۴۰٪', en: 'Mobile 40%' }, cat2: { fa: 'لپ‌تاپ ۲۵٪', en: 'Laptop 25%' }, cat3: { fa: 'صوتی ۲۰٪', en: 'Audio 20%' }, cat4: { fa: 'پوشیدنی ۱۵٪', en: 'Wearable 15%' },
        tableT: { fa: 'آخرین سفارش‌ها', en: 'Recent Orders' },
        fAll: { fa: 'همه', en: 'All' }, fOk: { fa: 'تحویل‌شده', en: 'Delivered' }, fWait: { fa: 'در راه', en: 'Shipping' }, fCancel: { fa: 'لغوشده', en: 'Canceled' },
        th1: { fa: 'مشتری', en: 'Customer' }, th2: { fa: 'محصول', en: 'Product' }, th3: { fa: 'مبلغ', en: 'Amount' }, th4: { fa: 'وضعیت', en: 'Status' }
    };
    var ph = { searchPh: { fa: 'جست‌وجو در سفارش‌ها...', en: 'Search orders...' } };
    function applyLang(l) {
        var els = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < els.length; i++) { var k = els[i].getAttribute('data-i18n'); if (dict[k] && dict[k][l]) els[i].textContent = dict[k][l]; }
        var inp = document.getElementById('search');
        if (inp) inp.placeholder = ph.searchPh[l];
        document.documentElement.lang = l;
        document.documentElement.dir = (l === 'fa') ? 'rtl' : 'ltr';
        document.getElementById('langBtn').textContent = (l === 'fa') ? 'EN' : 'FA';
        try { localStorage.setItem('dashLang', l); } catch (e) { }
        render();
    }

    // تم
    var theme = 'light';
    try { theme = localStorage.getItem('dashTheme') || 'light'; } catch (e) { }
    function setTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        document.getElementById('themeBtn').textContent = (t === 'light') ? '🌙' : '☀️';
        try { localStorage.setItem('dashTheme', t); } catch (e) { }
        drawAll();
    }
    setTheme(theme);
    document.getElementById('themeBtn').onclick = function () { theme = (theme === 'light') ? 'dark' : 'light'; setTheme(theme); };
    document.getElementById('langBtn').onclick = function () { lang = (lang === 'fa') ? 'en' : 'fa'; applyLang(lang); };

    // ناوبری سایدبار - این مشکل دوم بود
    var links = document.querySelectorAll('#sideMenu a');
    function toast(m) { var t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(function () { t.classList.remove('show'); }, 2000); }
    for (var li = 0; li < links.length; li++) {
        (function (a) {
            a.onclick = function (e) {
                e.preventDefault();
                for (var j = 0; j < links.length; j++) links[j].classList.remove('active');
                a.classList.add('active');
                sidebar.classList.remove('open');
                var p = a.getAttribute('data-page');
                if (p === 'dash') { window.scrollTo({ top: 0, behavior: 'smooth' }); }
                else if (p === 'orders') { document.getElementById('orderCard').scrollIntoView({ behavior: 'smooth' }); toast(lang === 'fa' ? 'بخش سفارش‌ها ✓' : 'Orders ✓'); }
                else if (p === 'products') { toast(lang === 'fa' ? 'بخش محصولات به‌زودی با فروشگاه وصل میشه' : 'Products coming soon'); }
                else if (p === 'users') { toast(lang === 'fa' ? 'لیست مشتریان: ۵۸ نفر این ماه' : 'Customers: 58 this month'); }
                else if (p === 'settings') { var cur = document.documentElement.getAttribute('data-theme'); theme = (cur === 'light') ? 'dark' : 'light'; setTheme(theme); toast(lang === 'fa' ? 'تم عوض شد' : 'Theme changed'); }
            };
        })(links[li]);
    }

    // جدول
    var orders = [
        { id: 1041, name: 'سارا محمدی', enName: 'Sara M', p: 'آیفون ۱۳', enP: 'iPhone 13', price: '58,900,000', st: 'ok' },
        { id: 1040, name: 'امیر رضایی', enName: 'Amir R', p: 'هدفون پرو', enP: 'Headset Pro', price: '2,490,000', st: 'wait' },
        { id: 1039, name: 'نگار کریمی', enName: 'Negar K', p: 'مک‌بوک ایر', enP: 'MacBook Air', price: '68,000,000', st: 'ok' },
        { id: 1038, name: 'رضا احمدی', enName: 'Reza A', p: 'ساعت اولترا', enP: 'Watch Ultra', price: '8,900,000', st: 'cancel' },
        { id: 1037, name: 'مریم حسینی', enName: 'Maryam H', p: 'اسپیکر JBL', enP: 'JBL Speaker', price: '3,200,000', st: 'wait' },
        { id: 1036, name: 'علی موسوی', enName: 'Ali M', p: 'سامسونگ A55', enP: 'Samsung A55', price: '24,500,000', st: 'ok' }
    ];
    var stTx = { ok: { fa: '✅ تحویل‌شده', en: 'Delivered' }, wait: { fa: '⏳ در راه', en: 'Shipping' }, cancel: { fa: '❌ لغوشده', en: 'Canceled' } };
    var stCl = { ok: 'ok', wait: 'wait', cancel: 'cancel' };
    var f = 'all';
    window.filterTable = function (v, btn) {
        f = v;
        var b = btn.parentElement.querySelectorAll('button');
        for (var i = 0; i < b.length; i++) b[i].classList.remove('active');
        btn.classList.add('active');
        render();
    };
    function render() {
        if (!document.getElementById('body')) return;
        var q = document.getElementById('search').value.trim();
        var html = '';
        for (var i = 0; i < orders.length; i++) {
            var o = orders[i];
            if (f !== 'all' && o.st !== f) continue;
            var nm = (lang === 'fa') ? o.name : o.enName;
            var pr = (lang === 'fa') ? o.p : o.enP;
            if (q && nm.indexOf(q) === -1 && pr.indexOf(q) === -1 && String(o.id).indexOf(q) === -1) continue;
            html += '<tr><td>#' + o.id + '</td><td>' + nm + '</td><td>' + pr + '</td><td>' + o.price + '</td><td><span class="st ' + stCl[o.st] + '">' + stTx[o.st][lang] + '</span></td></tr>';
        }
        document.getElementById('body').innerHTML = html || '<tr><td colspan="5" style="text-align:center">-</td></tr>';
    }
    document.getElementById('search').oninput = render;
    document.getElementById('reportBtn').onclick = function () { toast(lang === 'fa' ? '✓ گزارش جدید ساخته شد' : 'New report created'); };
    applyLang(lang);

    // نمودارها
    function drawAll() { drawBar(); drawPie(); }
    function drawBar() {
        var cv = document.getElementById('bar'); if (!cv) return;
        var ctx = cv.getContext('2d');
        var W = cv.parentElement.clientWidth - 36; if (W < 250) W = 300; cv.width = W;
        ctx.clearRect(0, 0, W, 230);
        var vals = [12, 19, 9, 22, 16, 28, 24];
        var bw = (W - 20) / vals.length;
        for (var i = 0; i < vals.length; i++) {
            var h = vals[i] * 7; var x = 10 + i * bw;
            var g = ctx.createLinearGradient(0, 210 - h, 0, 210); g.addColorStop(0, '#3B82F6'); g.addColorStop(1, '#A855F7');
            ctx.fillStyle = g; ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x, 210 - h, bw - 14, h, 8); else ctx.rect(x, 210 - h, bw - 14, h);
            ctx.fill();
            ctx.fillStyle = '#94A3B8'; ctx.font = '12px Tahoma'; ctx.fillText((i + 1), x + 6, 225);
        }
    }
    function drawPie() {
        var cv = document.getElementById('pie'); if (!cv) return;
        var ctx = cv.getContext('2d');
        var W = cv.parentElement.clientWidth - 36; if (W < 200) W = 260; cv.width = W;
        ctx.clearRect(0, 0, W, 200);
        var data = [[40, '#3B82F6'], [25, '#10B981'], [20, '#F59E0B'], [15, '#EC4899']];
        var a = -Math.PI / 2, cx = W / 2, cy = 100, r = 75;
        for (var i = 0; i < data.length; i++) { var a2 = a + (data[i][0] / 100) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a, a2); ctx.closePath(); ctx.fillStyle = data[i][1]; ctx.fill(); a = a2; }
        ctx.beginPath(); ctx.arc(cx, cy, 42, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
        ctx.fillStyle = '#0F172A'; ctx.font = 'bold 14px Tahoma'; ctx.textAlign = 'center'; ctx.fillText('Total', cx, cy + 5);
    }
    drawAll();
    window.onresize = drawAll;
};