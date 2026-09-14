document.addEventListener('DOMContentLoaded', () => {

  const c = window.SITE_CONFIG || {};

  // =========================================
  // WHATSAPP UMUM
  // =========================================

  document.querySelectorAll('[data-whatsapp]').forEach(a => {
    if (c.whatsapp) {
      a.href = 'https://wa.me/' + c.whatsapp +
        (a.dataset.message
          ? '?text=' + encodeURIComponent(a.dataset.message)
          : '');
    }
  });

  document.querySelectorAll('[data-whatsapp="label"]').forEach(e => {
    e.textContent = '08133-474-8004';
  });


  // =========================================
  // SOCIAL MEDIA
  // =========================================

  document.querySelectorAll('[data-social]').forEach(a => {
    const k = a.dataset.social;

    if (c.social && c.social[k]) {
      a.href = c.social[k];
    }
  });


  // =========================================
  // ADDRESS
  // =========================================

  document.querySelectorAll('[data-address]').forEach(e => {
    e.textContent = c.address || 'Alamat belum diatur';
  });


  // =========================================
  // EMAIL
  // =========================================

  document.querySelectorAll('[data-email]').forEach(e => {

    if (c.email) {
      e.textContent = c.email;
      e.href = 'mailto:' + c.email;
    } else {
      e.style.display = 'none';
    }

  });


  // =========================================
  // MOBILE MENU
  // =========================================

  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {

    toggle.addEventListener('click', () => {

      menu.classList.toggle('open');

      toggle.setAttribute(
        'aria-expanded',
        menu.classList.contains('open')
      );

    });

  }


  // =========================================
  // MOBILE DROPDOWN
  // =========================================

  document.querySelectorAll('.nav-item > .nav-link').forEach(link => {

    link.addEventListener('click', e => {

      if (
        window.innerWidth <= 900 &&
        link.nextElementSibling &&
        link.nextElementSibling.classList.contains('dropdown')
      ) {

        e.preventDefault();

        link.parentElement.classList.toggle('open');

      }

    });

  });


  // =========================================
  // ACTIVE MENU
  // =========================================

  const current =
    window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('[data-page]').forEach(a => {

    a.classList.toggle(
      'active',
      a.dataset.page === current
    );

  });


  // =========================================
  // SCROLL REVEAL
  // =========================================

  document.querySelectorAll('[data-reveal]').forEach(el => {

    const io = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('show');

            io.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    io.observe(el);

  });


  // =========================================
  // SLIDER
  // =========================================

  const slides = document.querySelector('.slides');

  if (slides) {

    const items = [...slides.children];

    const dots = [
      ...document.querySelectorAll('.slider-dot')
    ];

    let i = 0;

    const go = n => {

      i = (n + items.length) % items.length;

      slides.style.transform =
        `translateX(-${i * 100}%)`;

      dots.forEach((d, j) => {

        d.classList.toggle(
          'active',
          j === i
        );

      });

    };

    document
      .querySelector('.slider-next')
      ?.addEventListener(
        'click',
        () => go(i + 1)
      );

    document
      .querySelector('.slider-prev')
      ?.addEventListener(
        'click',
        () => go(i - 1)
      );

    dots.forEach((d, j) => {

      d.addEventListener(
        'click',
        () => go(j)
      );

    });

    setInterval(
      () => go(i + 1),
      6000
    );

  }


  // =========================================
  // CONTACT FORM → WHATSAPP
  // =========================================

  const contactForm =
    document.getElementById('contactForm');

  if (contactForm) {

    contactForm.addEventListener(
      'submit',
      function (e) {

        // Mencegah form reload / hilang
        e.preventDefault();

        const name =
          document.getElementById('name')?.value.trim();

        const service =
          document.getElementById('service')?.value.trim();

        const message =
          document.getElementById('message')?.value.trim();


        // Validasi
        if (!name) {

          alert('Silakan isi Nama terlebih dahulu.');

          document.getElementById('name')?.focus();

          return;

        }


        if (!message) {

          alert('Silakan isi Pesan terlebih dahulu.');

          document.getElementById('message')?.focus();

          return;

        }


        // Nomor WhatsApp 3DIT
        const whatsappNumber =
          c.whatsapp || '6281334748004';


        // Pesan WhatsApp
        const whatsappMessage =
`Halo 3DIT.id,

Saya ingin berkonsultasi.

Nama: ${name}
Layanan: ${service}

Pesan:
${message}

Terima kasih.`;


        // Buat URL WhatsApp
        const whatsappURL =
          'https://wa.me/' +
          whatsappNumber +
          '?text=' +
          encodeURIComponent(whatsappMessage);


        // Buka WhatsApp
        window.location.href = whatsappURL;

      }
    );

  }


  // =========================================
  // BACK TO TOP
  // =========================================

  const backToTop =
    document.createElement('button');

  backToTop.id = 'backToTop';

  backToTop.setAttribute(
    'aria-label',
    'Kembali ke atas'
  );

  backToTop.setAttribute(
    'title',
    'Kembali ke atas'
  );

  backToTop.innerHTML = '↑';

  document.body.appendChild(backToTop);


  window.addEventListener('scroll', () => {

    if (window.scrollY > 400) {

      backToTop.classList.add('show');

    } else {

      backToTop.classList.remove('show');

    }

  });


  backToTop.addEventListener('click', () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });


  // =========================================
  // YEAR FOOTER
  // =========================================

  const year =
    document.getElementById('year');

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }

});
