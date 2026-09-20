import { createMediaPlayer, videoURL } from './media-player.js';

const base = document.body.dataset.baseurl || '';
const albums = [
  { title: 'Blue Banisters', year: '2021', image: `${base}/images/lana0.png`, color: '#9f865a', subtitle: 'The record that feels like coming home.', video: 9 },
  { title: 'Chemtrails', year: '2021', image: `${base}/images/lana7.jpg`, color: '#747e60', subtitle: 'Chemtrails over the Country Club', video: 1, sleeve: 'PERSONAL PHOTO SLEEVE' },
  { title: 'California', year: '2019', image: `${base}/images/lana8.png`, color: '#ab684e', subtitle: 'A little West Coast daydream.', video: 2, sleeve: 'PERSONAL PHOTO SLEEVE' },
  { title: 'Summertime Sadness', year: '2012', image: `${base}/images/lana6.png`, color: '#668384', subtitle: 'For the afternoons that linger.', video: 8, sleeve: 'PERSONAL PHOTO SLEEVE' },
  { title: 'Fishtail', year: '2023', image: `${base}/images/lana3.png`, color: '#7a8272', subtitle: 'A quiet song, a little closer.', video: 0 },
  { title: 'Ultraviolence', year: '2014', image: `${base}/images/lana1.jpg`, color: '#867c6d', subtitle: 'In black and white, and everything between.', video: 3 },
  { title: 'Honeymoon', year: '2015', image: `${base}/images/lana9.png`, color: '#9a7967', subtitle: 'The world can wait a little.', video: 4 },
  { title: 'Lust for Life', year: '2017', image: `${base}/images/lana4.png`, color: '#815450', subtitle: 'Turn it up, just a little.', video: 5 },
  { title: 'If You Lie Down With Me', year: '2021', image: `${base}/images/lana2.jpg`, color: '#b19972', subtitle: 'One more dance before the evening ends.', video: 6 },
];
const videos = [
  { title: 'Fishtail', year: '2023', id: 'cs8VlhUDna0' },
  { title: 'Chemtrails over the Country Club', year: '2021', id: 'vBHild0PiTE' },
  { title: 'California', year: '2019', id: 'vK1YiArMDfg' },
  { title: 'Ultraviolence', year: '2014', id: 'ZFWC4SiZBao' },
  { title: 'Honeymoon', year: '2015', id: 'oPU8XJcA__k', list: 'OLAK5uy_nIKMbuSAOxnLGiMM09jdug9vn_JAGsj_Y' },
  { title: 'Lust for Life', year: '2017', id: 'eP4eqhWc7sI' },
  { title: 'If You Lie Down With Me', year: '2021', id: 'xFv0wg_alGk' },
  { title: 'TV in B&W', year: '2013', id: 'BV1yG4y1W7AD', provider: 'bilibili' },
  { title: 'Summertime Sadness', year: '2012', id: 'TdrL3QxjyVw' },
  { title: 'Blue Banisters', year: '2021', id: 'fN0OmdJUl0I' },
];
const $ = (id) => document.getElementById(id);
let room = null;
let selected = null;
let spinning = false;
let evening = false;
let videoIndex = 0;
let recordState = 'idle';
let mediaLoaded = false;
const shelf = $('album-shelf');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const televisionPlayer = createMediaPlayer($('video-screen'), handlePlayback);

albums.forEach((album, index) => {
  const button = document.createElement('button');
  button.className = 'album-card';
  button.type = 'button';
  button.title = `${album.title} · ${album.year}`;
  button.setAttribute('aria-label', `Play ${album.title}, ${album.year}`);
  button.setAttribute('aria-pressed', 'false');
  const art = document.createElement('span');
  art.className = 'album-art';
  art.style.display = 'block';
  const img = document.createElement('img');
  img.src = album.image;
  img.alt = '';
  img.draggable = false;
  img.loading = 'lazy';
  const number = document.createElement('span');
  number.className = 'album-number';
  number.textContent = String(index + 1).padStart(2, '0');
  const chosen = document.createElement('span');
  chosen.className = 'album-chosen';
  chosen.textContent = 'ON THE TURNTABLE';
  chosen.setAttribute('aria-hidden', 'true');
  art.append(img, number, chosen);
  const name = document.createElement('span');
  name.className = 'album-name';
  name.textContent = album.title;
  const year = document.createElement('span');
  year.className = 'album-year';
  year.textContent = album.year;
  const caption = document.createElement('span');
  caption.className = 'album-caption';
  caption.append(name, year);
  button.append(art, caption);
  button.addEventListener('click', () => selectRecord(index));
  shelf.append(button);
});

// Native touch scrolling; mouse dragging starts only after a clear horizontal gesture.
let filmDrag = null;
let suppressFilmClick = false;
shelf.addEventListener('pointerdown', event => {
  suppressFilmClick = false;
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  filmDrag = { x: event.clientX, y: event.clientY, scroll: shelf.scrollLeft, pointer: event.pointerId, moved: false };
});
shelf.addEventListener('pointermove', event => {
  if (!filmDrag) return;
  const dx = event.clientX - filmDrag.x;
  if (!filmDrag.moved && Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(event.clientY - filmDrag.y)) {
    filmDrag.moved = true;
    suppressFilmClick = true;
    shelf.setPointerCapture(event.pointerId);
    shelf.classList.add('is-dragging');
  }
  if (filmDrag.moved) { event.preventDefault(); shelf.scrollLeft = filmDrag.scroll - dx; }
});
function endFilmDrag() {
  if (filmDrag && shelf.hasPointerCapture(filmDrag.pointer)) shelf.releasePointerCapture(filmDrag.pointer);
  filmDrag = null;
  shelf.classList.remove('is-dragging');
}
shelf.addEventListener('pointerup', endFilmDrag);
shelf.addEventListener('pointercancel', endFilmDrag);
shelf.addEventListener('pointerleave', () => { if (!filmDrag?.moved) endFilmDrag(); });
shelf.addEventListener('click', event => {
  if (suppressFilmClick && event.detail !== 0) { event.preventDefault(); event.stopImmediatePropagation(); }
  suppressFilmClick = false;
}, true);
shelf.addEventListener('keydown', event => {
  const buttons = Array.from(shelf.children);
  const index = buttons.indexOf(document.activeElement);
  if (index < 0) return;
  const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : null;
  if (next === null) return;
  event.preventDefault();
  const button = buttons[Math.max(0, Math.min(next, buttons.length - 1))];
  button.focus({ preventScroll: true });
  button.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest', inline: 'nearest' });
});
function updateFilmNavigation() {
  $('film-previous').disabled = shelf.scrollLeft < 2;
  $('film-next').disabled = shelf.scrollLeft + shelf.clientWidth >= shelf.scrollWidth - 2;
}
for (const [id, direction] of [['film-previous', -1], ['film-next', 1]]) {
  $(id).addEventListener('click', () => shelf.scrollBy({ left: direction * shelf.clientWidth * .72, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
}
shelf.addEventListener('scroll', updateFilmNavigation, { passive: true });
new ResizeObserver(updateFilmNavigation).observe(shelf);
updateFilmNavigation();

function updateControls(message) {
  const album = albums[selected];
  $('record-title').textContent = album ? album.title : 'Choose your first record';
  $('record-subtitle').textContent = album ? album.subtitle : 'A small ritual for a slow afternoon.';
  const canPause = ['loading', 'playing', 'buffering'].includes(recordState);
  $('record-label').textContent = spinning ? 'NOW PLAYING' : album ? recordState === 'loading' ? 'SETTING THE NEEDLE' : 'ON THE TURNTABLE' : 'THE TURNTABLE IS WAITING';
  $('spin-record').disabled = selected === null;
  $('eject-record').disabled = selected === null;
  $('spin-record').replaceChildren();
  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = canPause ? 'Ⅱ' : '▷';
  $('spin-record').append(icon, document.createTextNode(canPause ? 'Pause record' : 'Play record'));
  $('spin-record').setAttribute('aria-pressed', String(spinning));
  $('status-lamp').classList.toggle('is-on', spinning);
  document.querySelector('.fallback-disc').classList.toggle('spinning', spinning);
  Array.from(shelf.children).forEach((button, i) => {
    button.setAttribute('aria-pressed', String(i === selected));
    button.setAttribute('aria-label', `${i === selected && canPause ? 'Pause' : 'Play'} ${albums[i].title}, ${albums[i].year}`);
    button.querySelector('.album-chosen').textContent = i === selected && spinning ? 'NOW PLAYING' : 'ON THE TURNTABLE';
  });
  $('room-hint').textContent = album ? 'Click the record to play or pause. Stay a little longer.' : 'Take a record from the wall. Make yourself at home.';
  const sourceLink = $('record-source-link');
  if (sourceLink) {
    sourceLink.href = videoURL(videos[videoIndex]);
    sourceLink.hidden = !['blocked', 'unavailable', 'error'].includes(recordState);
    sourceLink.textContent = videos[videoIndex].provider === 'bilibili' ? 'Open on Bilibili ↗' : 'Open on YouTube ↗';
  }
  if (message) $('record-status').textContent = message;
}

function selectRecord(index) {
  if (selected === index) { toggleRecord(); return; }
  selectVideo(albums[index].video);
  startPlayback();
}
function toggleRecord() {
  if (selected === null) {
    $('record-status').textContent = 'Choose a song from the filmstrip or the wall first.';
    return;
  }
  if (['loading', 'playing', 'buffering'].includes(recordState)) televisionPlayer.pause();
  else startPlayback();
}
function ejectRecord() {
  if (selected === null) return;
  const title = albums[selected].title;
  stopPlayback();
  setRecordSelection(null);
  updateControls(`${title} is back in its sleeve. Choose another when you're ready.`);
}

function setRecordSelection(index) {
  if (selected === index) return;
  selected = index;
  spinning = false;
  room?.setSpinning(false);
  room?.setRecord(index);
}
function stopPlayback() {
  televisionPlayer.stop();
  mediaLoaded = false;
  recordState = 'idle';
  spinning = false;
  room?.setSpinning(false);
  $('video-placeholder').hidden = false;
  document.querySelector('.television').classList.remove('is-playing');
}
function startPlayback() {
  const albumIndex = albums.findIndex(album => album.video === videoIndex);
  setRecordSelection(albumIndex < 0 ? null : albumIndex);
  // Sharing the media session must not move the listener away from the room.
  $('video-placeholder').hidden = true;
  if (mediaLoaded) televisionPlayer.play();
  else {
    mediaLoaded = true;
    televisionPlayer.load(videos[videoIndex]);
  }
}
function handlePlayback(state) {
  recordState = state;
  spinning = state === 'playing' && selected !== null;
  room?.setSpinning(spinning);
  document.querySelector('.television').classList.toggle('is-playing', state === 'playing');
  if (state === 'paused' && !$('video-screen').querySelector('iframe')) $('video-placeholder').hidden = false;
  const messages = {
    loading: 'Setting the needle…', ready: 'Your record is ready. Press play to begin.',
    playing: 'Now playing. Stay a little longer.', paused: 'Paused, whenever you need a moment.',
    buffering: 'Waiting for the music…', ended: 'One more song?',
    blocked: 'Playback was blocked. Try Play record again, or open the song below.',
    unavailable: 'The song could not connect. Try Play record again, or open the song below.',
    error: 'This recording cannot play here. Open it on YouTube instead.',
    external: 'Use the Bilibili controls on the TV.',
  };
  updateControls(messages[state] || 'Your record is ready.');
}
$('spin-record').addEventListener('click', toggleRecord);
$('eject-record').addEventListener('click', ejectRecord);
$('light-switch').addEventListener('click', () => {
  evening = !evening;
  room?.setNight(evening);
  $('light-switch').setAttribute('aria-pressed', String(evening));
  $('light-switch').innerHTML = evening ? '<span aria-hidden="true">☀</span> Afternoon light' : '<span aria-hidden="true">☾</span> Evening light';
  document.querySelector('.room-frame').classList.toggle('is-night', evening);
});
$('reset-view').addEventListener('click', () => room?.reset());

videos.forEach((video, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-pressed', String(index === videoIndex));
  [String(index + 1).padStart(2, '0'), video.title, video.year.slice(2)].forEach((text) => {
    const span = document.createElement('span');
    span.textContent = text;
    button.append(span);
  });
  button.addEventListener('click', () => selectVideo(index));
  $('tape-list').append(button);
});

function selectVideo(index) {
  stopPlayback();
  videoIndex = index;
  const albumIndex = albums.findIndex(album => album.video === index);
  setRecordSelection(albumIndex < 0 ? null : albumIndex);
  const video = videos[index];
  const screen = $('video-screen');
  $('video-title').textContent = video.title;
  screen.querySelector('.screen-footer').textContent = `${video.title.toUpperCase()} / ${video.year}`;
  screen.querySelector('.tv-channel').textContent = `LDR · CH ${String(index + 1).padStart(2, '0')}`;
  $('video-link').href = videoURL(video);
  $('video-link').textContent = video.provider === 'bilibili' ? 'Open on Bilibili ↗' : 'Open on YouTube ↗';
  Array.from($('tape-list').children).forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  updateControls(`${video.title} is ready. Press play on the TV.`);
}
$('load-video').addEventListener('click', startPlayback);
updateControls();

function showFallback() {
  $('room-loading').hidden = true;
  $('room-fallback').hidden = false;
  document.querySelector('.room-frame').classList.add('scene-unavailable');
  $('light-switch').hidden = true;
  $('record-status').textContent = 'The 3D room is unavailable here. You can still choose records and watch all the music below.';
}

try {
  const { createRoom } = await import('./room.js');
  room = await createRoom($('room-stage'), {
    albums, onSelect: selectRecord, onToggle: toggleRecord, onEject: ejectRecord,
    onPortrait: () => $('xiaoman-portrait-link').click(),
  });
  if (selected !== null) room.setRecord(selected);
  room.setSpinning(spinning);
  room.setNight(evening);
  $('room-loading').classList.add('is-ready');
  window.setTimeout(() => { $('room-loading').hidden = true; }, reducedMotion.matches ? 0 : 600);
  $('room-stage').querySelector('canvas')?.addEventListener('webglcontextlost', () => {
    room?.dispose();
    room = null;
    showFallback();
  });
} catch (error) {
  console.warn('The listening room could not open:', error);
  $('room-stage').querySelector('canvas')?.remove();
  showFallback();
}
