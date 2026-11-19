(() => {
  'use strict';

  const canvas = document.getElementById('particle-field');
  const toggle = document.getElementById('motion-toggle');
  const context = canvas && canvas.getContext('2d');
  if (!context || !toggle) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const preferenceKey = 'maxchen-particles-paused';
  const particles = [];
  const hues = ['#447765', '#447765', '#708977', '#b1865c'];
  const minFrameInterval = 1000 / 30 - 1;
  let width = 0;
  let height = 0;
  let scale = 1;
  let phase = 0;
  let pace = 1;
  let scrollPace = 1;
  let lastInput = -Infinity;
  let previousY = window.scrollY;
  let touchY = null;
  let lastFrame = null;
  let frameId = null;
  let playing = false;
  let paused = false;

  try {
    paused = localStorage.getItem(preferenceKey) === 'yes';
  } catch {
    // The control also works when the browser disallows storage.
  }

  function newParticle() {
    const angle = 2 * Math.PI * Math.random();
    const speed = 9 + 8 * Math.random();
    return {
      u: Math.random(), v: Math.random(),
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      radius: 0.9 + 1.45 * Math.random(),
      opacity: 0.19 + 0.22 * Math.random(),
      hue: hues[Math.floor(Math.random() * hues.length)],
      cross: Math.random() < 0.11
    };
  }

  function wrap(position, extent) {
    const span = extent + 12;
    return position - span * Math.floor(position / span) - 6;
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    for (const point of particles) {
      const x = wrap(point.u * (width + 12) + point.vx * phase, width);
      const y = wrap(point.v * (height + 12) + point.vy * phase, height);
      context.globalAlpha = point.opacity;
      context.fillStyle = point.hue;
      if (point.cross) {
        const size = point.radius * 1.65;
        context.fillRect(x - size, y - 0.55, size * 2, 1.1);
        context.fillRect(x - 0.55, y - size, 1.1, size * 2);
      } else {
        context.beginPath();
        context.arc(x, y, point.radius, 0, 2 * Math.PI);
        context.fill();
      }
    }
    context.globalAlpha = 1;
  }

  function resize() {
    const nextWidth = canvas.clientWidth;
    const nextHeight = canvas.clientHeight;
    const nextScale = Math.min(window.devicePixelRatio || 1, 2);
    if (width === nextWidth && height === nextHeight && scale === nextScale) return;
    width = nextWidth;
    height = nextHeight;
    scale = nextScale;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    const count = Math.min(110, Math.max(20, Math.round(width * height / 11500)));
    while (particles.length < count) particles.push(newParticle());
    particles.length = count;
    draw();
  }

  function tick(now) {
    frameId = requestAnimationFrame(tick);
    if (lastFrame === null) lastFrame = now;
    const elapsed = now - lastFrame;
    if (elapsed < minFrameInterval) return;
    lastFrame = now;
    const seconds = Math.min(elapsed / 1000, 0.08);
    const scrolling = now - lastInput < 190;
    const target = scrolling ? scrollPace : 1;
    const easing = 1 - Math.exp(-seconds / (scrolling ? 0.045 : 0.32));
    pace += (target - pace) * easing;
    // A signed clock lets each dot retrace its own path when the pace is negative.
    phase += seconds * pace;
    draw();
  }

  function syncPlayback() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    lastFrame = null;
    lastInput = -Infinity;
    previousY = window.scrollY;
    pace = 1;
    playing = !paused && !reducedMotion.matches && !document.hidden;
    toggle.hidden = reducedMotion.matches;
    const label = paused ? 'Resume motion' : 'Pause motion';
    toggle.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    toggle.querySelector('.motion-label').textContent = label;
    if (playing) frameId = requestAnimationFrame(tick);
  }

  function respondToScroll(distance) {
    if (!playing || !distance) return;
    const now = performance.now();
    const interval = Math.min(80, Math.max(12, now - lastInput));
    const strength = Math.min(1, Math.abs(distance) / interval);
    scrollPace = distance > 0 ? 1.35 + 0.55 * strength : -(0.5 + 0.4 * strength);
    lastInput = now;
  }

  function scrollLimit() {
    return Math.max(0, document.documentElement.scrollHeight - document.documentElement.clientHeight);
  }

  window.addEventListener('scroll', () => {
    const y = Math.max(0, Math.min(scrollLimit(), window.scrollY));
    respondToScroll(y - previousY);
    previousY = y;
  }, { passive: true });

  // Short pages and the edges of long pages can receive a gesture without scrolling.
  function atEdge(distance) {
    return distance < 0 ? window.scrollY <= 0 : window.scrollY >= scrollLimit() - 1;
  }

  window.addEventListener('wheel', event => {
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (!atEdge(event.deltaY)) return;
    let distance = event.deltaY;
    if (event.deltaMode === 1) distance *= 16;
    if (event.deltaMode === 2) distance *= height;
    respondToScroll(distance);
  }, { passive: true });

  window.addEventListener('touchstart', event => {
    touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
  }, { passive: true });
  window.addEventListener('touchmove', event => {
    if (event.touches.length !== 1) {
      touchY = null;
      return;
    }
    const y = event.touches[0].clientY;
    if (touchY !== null && atEdge(touchY - y)) respondToScroll(touchY - y);
    touchY = y;
  }, { passive: true });

  toggle.addEventListener('click', () => {
    paused = !paused;
    try {
      localStorage.setItem(preferenceKey, paused ? 'yes' : 'no');
    } catch { /* Keep the setting for this page. */ }
    syncPlayback();
  });
  reducedMotion.addEventListener('change', syncPlayback);
  document.addEventListener('visibilitychange', syncPlayback);
  window.addEventListener('pageshow', syncPlayback);
  window.addEventListener('resize', resize, { passive: true });
  resize();
  syncPlayback();
})();
