// Load the official API only after a listener requests a song.
let youtubeAPI;
function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeAPI) return youtubeAPI;
  youtubeAPI = new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    const script = document.createElement('script');
    const cleanup = () => {
      window.clearTimeout(timer);
      if (window.onYouTubeIframeAPIReady === onReady) window.onYouTubeIframeAPIReady = previous;
    };
    const onReady = () => {
      cleanup();
      try { previous?.(); } finally { resolve(window.YT); }
    };
    const fail = () => { cleanup(); script.remove(); reject(new Error('Player API unavailable')); };
    const timer = window.setTimeout(fail, 15000);
    window.onYouTubeIframeAPIReady = onReady;
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = fail;
    document.head.append(script);
  }).catch(error => { youtubeAPI = null; throw error; });
  return youtubeAPI;
}

export function videoURL(video) {
  return video.provider === 'bilibili'
    ? `https://www.bilibili.com/video/${video.id}/`
    : `https://www.youtube.com/watch?v=${video.id}`;
}

// Each instance owns its iframe. Invalidated callbacks cannot restart an old song.
export function createMediaPlayer(container, onState = () => {}) {
  let generation = 0;
  let player = null;
  let iframe = null;
  let currentVideo = null;
  let ready = false;
  let wantsPlay = false;
  let startupTimer = null;

  function clear() {
    generation += 1;
    window.clearTimeout(startupTimer);
    ready = false;
    wantsPlay = false;
    player?.destroy();
    player = null;
    iframe?.remove();
    iframe = null;
  }

  function load(video) {
    clear();
    currentVideo = video;
    wantsPlay = true;
    const ticket = generation;
    const frame = document.createElement('iframe');
    iframe = frame;
    frame.title = `${video.title} — ${video.provider === 'bilibili' ? 'Bilibili' : 'YouTube'} player`;
    frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.width = '480';
    frame.height = '270';
    const emit = state => {
      if (ticket !== generation) return;
      if (state !== 'loading') window.clearTimeout(startupTimer);
      onState(state);
    };
    emit('loading');
    if (video.provider === 'bilibili') {
      frame.src = `https://player.bilibili.com/player.html?bvid=${video.id}&page=1&high_quality=1&danmaku=0&autoplay=1`;
      container.append(frame);
      emit('external');
      return;
    }
    // The iframe is created only by a listener's play action. Request playback
    // immediately; the API then reports real state and handles pause/resume.
    const params = new URLSearchParams({ autoplay: '1', enablejsapi: '1', playsinline: '1', rel: '0', origin: window.location.origin });
    frame.src = `https://www.youtube-nocookie.com/embed/${video.id}?${params}`;
    container.append(frame);
    startupTimer = window.setTimeout(() => emit('unavailable'), 20000);
    loadYouTubeAPI().then(YT => {
      if (ticket !== generation) return;
      player = new YT.Player(frame, { events: {
        onReady: event => {
          if (ticket !== generation) return;
          ready = true;
          window.clearTimeout(startupTimer);
          if (wantsPlay) event.target.playVideo();
          else { wantsPlay = false; emit('ready'); }
        },
        onStateChange: event => {
          if (ticket !== generation) return;
          const states = { '-1': 'ready', 0: 'ended', 1: 'playing', 2: 'paused', 3: 'buffering', 5: 'ready' };
          if (event.data === 1) wantsPlay = true;
          if (event.data === 0 || event.data === 2) wantsPlay = false;
          emit(states[event.data] || 'ready');
        },
        onAutoplayBlocked: () => { if (ticket === generation) wantsPlay = false; emit('blocked'); },
        onError: () => { if (ticket === generation) wantsPlay = false; emit('error'); },
      } });
    }).catch(() => emit('unavailable'));
  }

  function pause() {
    wantsPlay = false;
    if (ready && player) player.pauseVideo();
    else clear(); // Removing a pending / external iframe reliably stops its audio.
    onState('paused');
  }

  function play() {
    if (ready && player) {
      wantsPlay = true;
      onState('loading');
      player.playVideo();
    }
    else if (currentVideo) load(currentVideo);
  }

  function stop() { clear(); currentVideo = null; }
  return { load, play, pause, stop };
}
