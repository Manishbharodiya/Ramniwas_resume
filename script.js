// Smooth scroll effect for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href') || '';
      const isInPage = href.startsWith('#');
      if (!isInPage) return; // allow normal navigation to other pages
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu upon navigation
      const menu = document.getElementById('nav-menu');
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        const burger = document.querySelector('.hamburger');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      }
    });
  });

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

// Gallery page: populate images and add interactions
const galleryGridEl = document.getElementById('galleryGrid');
if (galleryGridEl) {
  const imageSources = [
    'public/image copy 5.png',
    'public/image copy.png',
    'public/image copy 4.png',
    'public/image copy 2.png',
    'public/image copy 3.png'
  ];

  galleryGridEl.innerHTML = '';
  imageSources.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Gallery image ${index + 1}`;
    img.loading = 'lazy';
    galleryGridEl.appendChild(img);
  });

  const allImgs = galleryGridEl.querySelectorAll('img');
  allImgs.forEach((img) => {
    img.addEventListener('click', () => {
      allImgs.forEach(i => i.classList.remove('active'));
      img.classList.add('active');
      window.open(img.src, '_blank');
    });
  });
}

// Share profile
const shareBtn = document.getElementById('shareProfile');
if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'Ramniwas Lakharan | Portfolio',
      text: 'Check out Ramniwas Lakharan\'s professional portfolio.',
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        shareBtn.textContent = 'Link Copied!';
        setTimeout(() => (shareBtn.textContent = 'Share Profile'), 2000);
      }
    } catch (err) {
      console.error('Share failed', err);
    }
  });
}

// Removed resume button and handler per request
  