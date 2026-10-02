const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
let theme = localStorage.getItem('theme') || 'light';
function applyTheme(t) { root.setAttribute('data-theme', t); themeBtn.textContent = t === 'light' ? '🌙' : '☀️'; localStorage.setItem('theme', t); }
applyTheme(theme);
themeBtn.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; applyTheme(theme); });
const langBtn = document.getElementById('langBtn');
const dict = {
    myName: { fa: 'امیر عباسی', en: 'Amir Abasi' },
    myName2: { fa: 'امیر عباسی', en: 'Amir Abasi' },
    myName3: { fa: 'امیر عباسی', en: 'Amir Abasi' },
    navHome: { fa: 'خانه', en: 'Home' }, navAbout: { fa: 'درباره من', en: 'About' }, navAbout2: { fa: 'درباره من', en: 'About' }, navServices: { fa: 'خدمات', en: 'Services' }, navServices2: { fa: 'خدمات', en: 'Services' }, navWorks: { fa: 'نمونه‌کارها', en: 'Works' }, navFaq: { fa: 'سوالات', en: 'FAQ' }, navPrice: { fa: 'تعرفه', en: 'Pricing' }, navOrder: { fa: 'سفارش پروژه', en: 'Order' }, navOrder2: { fa: 'سفارش پروژه', en: 'Order' },
    heroTitle: { fa: 'سلام، من امیر عباسی‌هستم — سایتی می‌سازم که مشتری بیاره', en: "Hi, I'm Amir Abasi — I build websites that bring customers" },
    heroText: { fa: 'پایه دوازدهم رشته تولید و توسعه‌دهنده وب. لندینگ، شرکتی و فروشگاهی تمیز، سریع و ریسپانسیو.', en: 'Grade 12 web student. Clean, fast and responsive landing, corporate and shop websites.' },
    heroBtn1: { fa: 'سفارش پروژه', en: 'Order Project' }, heroBtn2: { fa: 'دیدن نمونه‌کارها', en: 'See Works' },
    st1: { fa: 'پروژه', en: 'Projects' }, st2: { fa: 'ریسپانسیو', en: 'Responsive' }, st3: { fa: 'تحویل لندینگ', en: 'Landing delivery' },
    aboutTitle: { fa: 'درباره من', en: 'About Me' }, aboutText: { fa: 'من امیرم، پایه ۱۲ رشته تولید و توسعه‌دهنده وب. عاشق طراحی سایت و برنامه‌نویسی‌ام و هدفم رسیدن به درآمد از همین تخصصه.', en: "I'm Amir, grade-12 web student. I love design and coding, my goal is earning from it." },
    skill1: { fa: '✓ مسلط به HTML ،CSS ،Flex و Grid', en: '✓ HTML, CSS, Flex and Grid' }, skill2: { fa: '✓ جاوااسکریپت: منو، اسلایدر، فرم و localStorage', en: '✓ JS: menu, slider, forms, localStorage' }, skill3: { fa: '✓ طراحی کاملا ریسپانسیو', en: '✓ Fully responsive design' },
    servicesTitle: { fa: 'خدمات من', en: 'My Services' }, servicesSub: { fa: 'برای شروع قدرتمند کسب‌وکارت', en: 'To launch your business strong' },
    s1t: { fa: 'لندینگ سریع', en: 'Fast Landing' }, s1d: { fa: 'فرم و واتساپ، تحویل 7 روزه.', en: 'Form + WhatsApp, 7 day delivery.' },
    s2t: { fa: 'سایت شرکتی', en: 'Corporate' }, s2d: { fa: 'معرفی حرفه‌ای خدماتت.', en: 'Pro brand presentation.' },
    s3t: { fa: 'فروشگاهی', en: 'Shop' }, s3d: { fa: 'سبد خرید و درگاه پرداخت.', en: 'Cart and payment.' },
    s4t: { fa: 'سئو و سرعت', en: 'SEO & Speed' }, s4d: { fa: 'سرعت بالا و سئوی پایه.', en: 'Speed and basic SEO.' },
    worksTitle: { fa: 'نمونه‌کارها', en: 'Works' }, worksSub: { fa: 'به‌زودی با پروژه‌های واقعی پر می‌شه', en: 'Will be filled with real projects soon' },
    w1: { fa: 'فروشگاه اینترنتی', en: 'Online Shop' }, w2: { fa: 'داشبورد ادمین', en: 'Admin Dashboard' }, w3: { fa: 'سایت رستوران', en: 'Restaurant' }, w4: { fa: 'سایت آموزشگاه', en: 'Academy' },
    testiTitle: { fa: 'نظر مشتریان', en: 'Testimonials' }, t1: { fa: '«به‌زودی نظر اولین مشتری واقعی من اینجا میاد.»', en: '"First real client review coming soon."' }, t2: { fa: '«کیفیت، سرعت و پشتیبانی سه اصل کاری منه.»', en: '"Quality, speed and support are my rules."' },
    faqTitle: { fa: 'سوالات پرتکرار', en: 'FAQ' }, q1: { fa: 'تحویل سایت چقدر طول می‌کشه؟', en: 'How long is delivery?' }, a1: { fa: 'لندینگ ۷ روز، شرکتی ۲ هفته، فروشگاهی ۳ هفته.', en: 'Landing 7 days, corporate 2 weeks, shop 3 weeks.' }, q2: { fa: 'هزینه چقدره؟', en: 'How much?' }, a2: { fa: 'لندینگ از ۴ میلیون، شرکتی از ۷ میلیون، فروشگاهی از ۱۲ میلیون.', en: 'From 4M landing, 7M corporate, 12M shop.' }, q3: { fa: 'پشتیبانی داری؟', en: 'Support?' }, a3: { fa: 'بله، ۱ تا ۳ ماه پشتیبانی رایگان.', en: 'Yes, 1-3 months free support.' },
    priceTitle: { fa: 'تعرفه‌ها', en: 'Pricing' }, p1t: { fa: 'لندینگ', en: 'Landing' }, p2t: { fa: 'شرکتی', en: 'Corporate' }, p3t: { fa: 'فروشگاهی', en: 'Shop' },
    p1l1: { fa: 'تحویل ۷ روزه', en: '7-day delivery' }, p1l2: { fa: 'فرم + واتساپ', en: 'Form + WhatsApp' }, p1l3: { fa: 'ریسپانسیو کامل', en: 'Fully responsive' },
    p2l1: { fa: '۵ تا ۷ صفحه', en: '5-7 pages' }, p2l2: { fa: 'سئوی پایه', en: 'Basic SEO' }, p2l3: { fa: '۲ ماه پشتیبانی', en: '2 months support' },
    p3l1: { fa: 'سبد خرید کامل', en: 'Full cart' }, p3l2: { fa: 'درگاه پرداخت', en: 'Payment gateway' }, p3l3: { fa: '۳ ماه پشتیبانی', en: '3 months support' },
    toman: { fa: 'تومان', en: 'Toman' }, toman2: { fa: 'تومان', en: 'Toman' }, toman3: { fa: 'تومان', en: 'Toman' },
    order: { fa: 'سفارش', en: 'Order' }, order2: { fa: 'سفارش', en: 'Order' }, order3: { fa: 'سفارش', en: 'Order' },
    contactTitle: { fa: 'سفارش پروژه', en: 'Order Project' }, contactSub: { fa: 'فرم رو پر کن، کمتر از ۲۴ ساعت تماس می‌گیرم', en: 'Fill the form, I call in 24h' },
    lblName: { fa: 'نام', en: 'Name' }, lblPhone: { fa: 'موبایل', en: 'Phone' }, lblMsg: { fa: 'توضیح', en: 'Message' }, send: { fa: 'ارسال درخواست', en: 'Send Request' },
    footAbout: { fa: 'طراحی سایت تمیز، سریع و مشتری‌ساز برای کسب‌وکارهای ایرانی.', en: 'Clean, fast websites for Iranian businesses.' },
    footLinks: { fa: 'دسترسی سریع', en: 'Quick Links' }, footContact: { fa: 'تماس با من', en: 'Contact Me' },
    footLoc: { fa: '📍 تهران، ایران - همکاری ریموت با همه شهرها', en: '📍 Tehran, Iran - remote worldwide' },
    chatBtn: { fa: 'شروع گفت‌وگو', en: 'Start Chat' }
};
let lang = localStorage.getItem('lang') || 'fa';
function applyLang(l) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (dict[k] && dict[k][l]) el.textContent = dict[k][l];
    });
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'fa' ? 'rtl' : 'ltr';
    langBtn.textContent = l === 'fa' ? 'EN' : 'FA';
    localStorage.setItem('lang', l);
}
applyLang(lang);
langBtn.addEventListener('click', () => { lang = lang === 'fa' ? 'en' : 'fa'; applyLang(lang); });
const slides = document.querySelectorAll('.slide');
let current = 0;
function showSlide(i) { if (!slides.length) return; slides.forEach(s => s.classList.remove('active')); current = (i + slides.length) % slides.length; slides[current].classList.add('active'); }
document.getElementById('next').addEventListener('click', () => showSlide(current + 1));
document.getElementById('prev').addEventListener('click', () => showSlide(current - 1));
setInterval(() => showSlide(current + 1), 5000);
document.querySelectorAll('.faq-q').forEach(b => b.addEventListener('click', () => b.parentElement.classList.toggle('open')));
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const msg = document.getElementById('msg').value.trim();
    let ok = true;
    document.getElementById('errName').textContent = '';
    document.getElementById('errPhone').textContent = '';
    document.getElementById('errMsg').textContent = '';
    if (name.length < 3) { document.getElementById('errName').textContent = 'نام حداقل ۳ حرف'; ok = false; }
    if (!/^09\d{9}$/.test(phone)) { document.getElementById('errPhone').textContent = 'شماره معتبر نیست'; ok = false; }
    if (msg.length < 10) { document.getElementById('errMsg').textContent = 'حداقل ۱۰ حرف'; ok = false; }
    if (ok) { document.getElementById('successMsg').style.display = 'block'; form.reset(); setTimeout(() => document.getElementById('successMsg').style.display = 'none', 4000); }
});
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); }), { threshold: 0.15 });
reveals.forEach(r => obs.observe(r));
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => { topBtn.style.display = window.scrollY > 400 ? 'block' : 'none'; });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); navLinks.classList.remove('open'); }
    });
});