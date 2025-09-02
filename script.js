// Smooth scroll effect for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
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

// Gallery Modal
const galleryModal = document.getElementById('galleryModal');
const openGalleryBtn = document.getElementById('openGallery');
const closeGalleryBtn = document.getElementById('closeGallery');
const galleryGrid = document.getElementById('galleryGrid');
const galleryViewer = document.getElementById('galleryViewer');

const imageSources = [
  'public/image.png',
  'public/image.png',
  'public/image.png',
  'public/image.png',
  'public/image.png'
];

function openGallery(index = 0) {
  if (!galleryModal) return;
  galleryModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setActiveImage(index);
}

function closeGallery() {
  if (!galleryModal) return;
  galleryModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setActiveImage(index) {
  if (!galleryViewer || !galleryGrid) return;
  const src = imageSources[index % imageSources.length];
  galleryViewer.src = src;
  [...galleryGrid.querySelectorAll('img')].forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

// Build thumbnails
if (galleryGrid) {
  galleryGrid.innerHTML = '';
  imageSources.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Gallery image ' + (i + 1);
    img.addEventListener('click', () => setActiveImage(i));
    galleryGrid.appendChild(img);
  });
}

if (openGalleryBtn) openGalleryBtn.addEventListener('click', () => openGallery(0));
if (closeGalleryBtn) closeGalleryBtn.addEventListener('click', closeGallery);
if (galleryModal) {
  galleryModal.addEventListener('click', (e) => {
    const isBackdrop = (e.target instanceof HTMLElement) && e.target.classList.contains('modal-backdrop');
    if (isBackdrop) closeGallery();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.getAttribute('aria-hidden') === 'false') {
      closeGallery();
    }
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
  