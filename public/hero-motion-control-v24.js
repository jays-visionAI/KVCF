/* Place the existing play/pause control above the quick-access row. */
(() => {
  'use strict';
  const button = document.querySelector('#p-home .nh-motion-toggle');
  const grid = document.querySelector('#p-home .nh-hero-grid');
  if (button && grid) grid.append(button);
})();
