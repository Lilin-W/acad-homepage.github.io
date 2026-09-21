(() => {
  const viewer = document.getElementById('story-viewer');
  const photos = Array.from(document.querySelectorAll('.story-photo'));
  if (!viewer || !photos.length) return;
  const image = document.getElementById('story-viewer-image');
  const caption = document.getElementById('story-viewer-caption');
  const count = document.getElementById('story-viewer-count');
  let current = 0, returnFocus = null, previousOverflow = '';
  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    const source = photo.querySelector('img');
    image.src = source.src;
    image.alt = source.alt;
    caption.textContent = photo.dataset.caption;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
  }
  photos.forEach((button, index) => button.addEventListener('click', () => {
    showPhoto(index);
    returnFocus = button;
    previousOverflow = document.body.style.overflow;
    viewer.showModal();
    document.body.style.overflow = 'hidden';
  }));
  viewer.querySelector('.story-viewer-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.story-viewer-prev').addEventListener('click', () => showPhoto(current - 1));
  viewer.querySelector('.story-viewer-next').addEventListener('click', () => showPhoto(current + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
  });
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    returnFocus?.focus({ preventScroll: true });
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.story-nav a').forEach(link => link.addEventListener('click', event => {
    const section = document.getElementById(link.getAttribute('href').slice(1));
    if (!section) return;
    event.preventDefault();
    section.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
  }));
})();

// Keep the original mouse-following cat continuous across the hero iframe.
(() => {
  const frame = document.getElementById('xiaoman-hero-frame');
  if (!frame) return;
  let connectedDocument = null;
  const connect = () => {
    const frameDocument = frame.contentDocument;
    if (!frameDocument || frameDocument === connectedDocument) return;
    connectedDocument = frameDocument;
    frameDocument.addEventListener('mousemove', event => {
      const bounds = frame.getBoundingClientRect();
      document.dispatchEvent(new MouseEvent('mousemove', {
        clientX: bounds.left + event.clientX,
        clientY: bounds.top + event.clientY,
        bubbles: true
      }));
    }, { passive: true });
  };
  frame.addEventListener('load', connect);
  connect();
})();
