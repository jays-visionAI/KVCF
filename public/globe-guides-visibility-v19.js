/* Fade the four globe guides as the sphere leaves its hero position. */
(() => {
  'use strict';
  const guides = document.querySelector('#p-home .nh-globe-guides');
  const scene = globalThis.KVCFScrollScene;
  if (!guides || !scene) return;

  const smooth = value => {
    const t = Math.max(0, Math.min(1, value));
    return t * t * (3 - 2 * t);
  };

  function sync() {
    const state = scene.read();
    if (!state) {
      guides.style.opacity = '0';
      guides.style.visibility = 'hidden';
      return;
    }
    const departure = Math.hypot(state.cx - state.heroCX, state.cy - state.heroCY);
    const opacity = 1 - smooth(departure / (Math.max(1, state.R) * .55));
    guides.style.opacity = opacity.toFixed(3);
    guides.style.visibility = opacity <= .001 ? 'hidden' : 'visible';
  }

  scene.subscribe(sync);
  sync();
})();
