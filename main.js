document.addEventListener('DOMContentLoaded',()=>{
 const c=window.SITE_CONFIG||{};
 document.querySelectorAll('[data-whatsapp]').forEach(a=>{a.href='https://wa.me/'+c.whatsapp+(a.dataset.message?'?text='+encodeURIComponent(a.dataset.message):'');});
 document.querySelectorAll('[data-whatsapp="label"]').forEach(e=>e.textContent='08133-474-8004');
 document.querySelectorAll('[data-social]').forEach(a=>{const k=a.dataset.social;if(c.social?.[k])a.href=c.social[k];});
 document.querySelectorAll('[data-address]').forEach(e=>e.textContent=c.address||'Alamat belum diatur');
 document.querySelectorAll('[data-email]').forEach(e=>{if(c.email){e.textContent=c.email;e.href='mailto:'+c.email}else{e.style.display='none'}});
 const toggle=document.querySelector('.menu-toggle'), menu=document.querySelector('.nav-menu'); if(toggle&&menu){toggle.addEventListener('click',()=>{menu.classList.toggle('open');toggle.setAttribute('aria-expanded',menu.classList.contains('open'))});}
 document.querySelectorAll('.nav-item > .nav-link').forEach(link=>link.addEventListener('click',e=>{if(innerWidth<=900&&link.nextElementSibling?.classList.contains('dropdown')){e.preventDefault();link.parentElement.classList.toggle('open')}}));
 const current=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('[data-page]').forEach(a=>a.classList.toggle('active',a.dataset.page===current));
 document.querySelectorAll('[data-reveal]').forEach(el=>{const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('show');io.unobserve(x.target)}}),{threshold:.12});io.observe(el)});
 const slides=document.querySelector('.slides');if(slides){const items=[...slides.children],dots=[...document.querySelectorAll('.slider-dot')];let i=0;const go=n=>{i=(n+items.length)%items.length;slides.style.transform=`translateX(-${i*100}%)`;dots.forEach((d,j)=>d.classList.toggle('active',j===i))};document.querySelector('.slider-next')?.addEventListener('click',()=>go(i+1));document.querySelector('.slider-prev')?.addEventListener('click',()=>go(i-1));dots.forEach((d,j)=>d.addEventListener('click',()=>go(j)));setInterval(()=>go(i+1),6000)}
 const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
// =========================================
// CONTACT FORM → WHATSAPP
// =========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
      alert('Silakan isi Nama dan Pesan terlebih dahulu.');
      return;
    }

    const whatsappNumber = '6281334748004';

    const text =
`Halo 3DIT.id,

Saya ingin berkonsultasi.

Nama: ${name}
Layanan: ${service}

Pesan:
${message}

Terima kasih.`;

    const whatsappURL =
      'https://wa.me/' +
      whatsappNumber +
      '?text=' +
      encodeURIComponent(text);

    window.location.href = whatsappURL;
  }
 
});
// =========================================
// BACK TO TOP
// =========================================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}
// =========================================
// BACK TO TOP - OTOMATIS SEMUA HALAMAN
// =========================================

(function () {

  // Buat tombol otomatis
  const backToTop = document.createElement("button");

  backToTop.id = "backToTop";
  backToTop.setAttribute("aria-label", "Kembali ke atas");
  backToTop.setAttribute("title", "Kembali ke atas");
  backToTop.innerHTML = "↑";

  // Masukkan tombol ke halaman
  document.body.appendChild(backToTop);

  // Tampilkan tombol setelah scroll
  window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

  });

  // Klik tombol → kembali ke paling atas
  backToTop.addEventListener("click", function () {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

})();
// =========================================
// CONTACT FORM → WHATSAPP
// =========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
      alert("Silakan isi Nama dan Pesan terlebih dahulu.");
      return;
    }

    const whatsappNumber = "6281334748004";

    const whatsappMessage =
`Halo 3DIT.id,

Saya ingin berkonsultasi.

Nama: ${name}
Layanan: ${service}

Pesan:
${message}

Terima kasih.`;

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");
  });
}
