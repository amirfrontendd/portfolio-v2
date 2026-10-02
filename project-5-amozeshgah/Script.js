/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', cur === 'light' ? 'dark' : 'light');
  localStorage.setItem('theme', cur === 'light' ? 'dark' : 'light');
});
// load saved theme
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}

/* ===== i18n ===== */
const i18n = {
  fa: {
    brand: 'آکادمی نخبگان عباسی',
    nav_home: 'خانه', nav_courses: 'دوره‌ها', nav_teachers: 'اساتید',
    nav_stats: 'دستاوردها', nav_contact: 'تماس',
    hero_badge: '✨ ثبت‌نام ترم جدید آغاز شد',
    hero_title1: 'آینده‌ات را', hero_title2: 'همین‌جا بساز',
    hero_sub: 'آموزش تخصصی برنامه‌نویسی، دیجیتال مارکتینگ و طراحی با بهترین اساتید ایران — پروژه‌محور، کاربردی و با پشتیبانی مادام‌العمر.',
    hero_cta1: 'مشاهده دوره‌ها', hero_cta2: 'مشاوره رایگان',
    proof_count: '+۱۲,۰۰۰', proof_text: 'دانشجوی موفق تا امروز',
    stat1: 'دانشجو', stat2: 'دوره تخصصی', stat3: 'استاد حرفه‌ای', stat4: 'رضایت (٪)',
    courses_title: 'دوره‌های محبوب', courses_sub: 'از صفر تا ورود به بازار کار',
    ribbon: 'پرفروش‌ترین',
    c1_t: 'برنامه‌نویسی وب فول‌استک', c1_d: 'جاوااسکریپت، ری‌اکت، نود و پروژه واقعی از روز اول.',
    c2_t: 'طراحی UI/UX با فیگما', c2_d: 'از اصول طراحی تا ساخت پورتفولیوی حرفه‌ای.',
    c3_t: 'دیجیتال مارکتینگ', c3_d: 'سئو، تبلیغات و رشد برند در شبکه‌های اجتماعی.',
    teachers_title: 'اساتید ما', teachers_sub: 'مدرسانی که صنعت را ساخته‌اند',
    t1_n: 'مهندس آرش محمدی', t1_r: 'توسعه‌دهنده ارشد وب',
    t2_n: 'سارا احمدی', t2_r: 'طراح محصول و UX',
    t3_n: 'نیما رضایی', t3_r: 'کارشناس ارشد مارکتینگ',
    t4_n: 'مینا کریمی', t4_r: 'دکترای مدیریت کسب‌وکار',
    cta_t: 'همین امروز اولین قدم را بردار 🚀', cta_d: 'مشاوره رایگان بگیر و مسیر رشدت را شروع کن.', cta_btn: 'شروع کن',
    contact_title: 'در تماس باشیم', contact_d: 'سؤالی داری؟ فرم را پر کن، کارشناسان ما در سریع‌ترین زمان پاسخ می‌دهند.',
    send: 'ارسال پیام', footer: 'همه حقوق محفوظ است.'
  },
  en: {
    brand: 'Elite Academy abbasi',
    nav_home: 'Home', nav_courses: 'Courses', nav_teachers: 'Teachers',
    nav_stats: 'Achievements', nav_contact: 'Contact',
    hero_badge: '✨ New semester enrollment is open',
    hero_title1: 'Build your', hero_title2: 'future right here',
    hero_sub: 'Expert training in programming, digital marketing and design with Iran’s best instructors — hands-on, project-based, with lifetime support.',
    hero_cta1: 'Browse Courses', hero_cta2: 'Free Consultation',
    proof_count: '12,000+', proof_text: 'successful students so far',
    stat1: 'Students', stat2: 'Courses', stat3: 'Instructors', stat4: 'Satisfaction (%)',
    courses_title: 'Popular Courses', courses_sub: 'From zero to getting hired',
    ribbon: 'Best Seller',
    c1_t: 'Full-Stack Web Development', c1_d: 'JavaScript, React, Node and a real project from day one.',
    c2_t: 'UI/UX Design with Figma', c2_d: 'From design fundamentals to a professional portfolio.',
    c3_t: 'Digital Marketing', c3_d: 'SEO, advertising and brand growth on social media.',
    teachers_title: 'Our Instructors', teachers_sub: 'Taught by industry leaders',
    t1_n: 'Arash Mohammadi', t1_r: 'Senior Web Developer',
    t2_n: 'Sara Ahmadi', t2_r: 'Product & UX Designer',
    t3_n: 'Nima Rezaei', t3_r: 'Senior Marketing Specialist',
    t4_n: 'Mina Karimi', t4_r: 'PhD in Business Management',
    cta_t: 'Take the first step today 🚀', cta_d: 'Get a free consultation and start your growth journey.', cta_btn: 'Get Started',
    contact_title: 'Get in Touch', contact_d: 'Have a question? Fill out the form and our experts will respond as soon as possible.',
    send: 'Send Message', footer: 'All rights reserved.'
  }
};
let lang = localStorage.getItem('lang') || 'fa';

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.querySelector('.lang-label').textContent = lang === 'fa' ? 'EN' : 'فا';
  localStorage.setItem('lang', lang);
}
document.getElementById('langToggle').addEventListener('click', () => {
  lang = lang === 'fa' ? 'en' : 'fa';
  applyLang();
});

/* ===== Animated counters ===== */
const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const toFa = n => String(n).replace(/\d/g, d => faDigits[d]);
let counted = false;
function animateStats() {
  const section = document.getElementById('stats');
  const rect = section.getBoundingClientRect();
  if (counted || rect.top > window.innerHeight - 100) return;
  counted = true;
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = (lang === 'fa' ? toFa(cur.toLocaleString()) : cur.toLocaleString())
        + (target === 12000 ? '+' : '');
    }, 25);
  });
}
window.addEventListener('scroll', animateStats);

/* ===== Navbar ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ===== Loader ===== */
window.addEventListener('load', () => {
  document.querySelector('.loader').classList.add('hide');
  applyLang();
});