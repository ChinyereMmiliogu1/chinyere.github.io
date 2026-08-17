/* =========================================================================
   Community project galleries — preview images + swipeable lightbox
   =========================================================================

   HOW TO ADD YOUR PHOTOS
   ----------------------
   1. Put each project's photos in its own folder under
      assets/images/community_projects/  — the folder names are fixed and
      listed in GALLERIES below.

   2. Name the files 01.jpg, 02.jpg, 03.jpg … in the order you want them
      shown. Always zero-padded, and no gaps in the numbering.

   3. 01.jpg becomes the card's preview image automatically.

   That's all — you do NOT need to edit this file. The gallery finds the end
   of each set on its own by loading forward until a file is missing.

   OPTIONAL: if you set `count` to the real number of photos, the gallery
   knows the total up front, so it can show "3 / 8" and the dot indicators
   straight away instead of discovering them as you swipe.

   OPTIONAL: if your files are .png (or .jpeg), set `ext` for that project.
   ========================================================================= */

(function () {
  'use strict';

  var GALLERIES = {
    'grand-games':        { count: 0 },  // count: 0 = "work it out for me"
    'business-showcase':  { count: 0 },
    'staff-hangout':      { count: 0 },
    'games-days':         { count: 0 },
    'valentines-connect': { count: 0 },
  };

  var BASE = 'assets/images/community_projects/';
  var MAX_PHOTOS = 60;          // hard stop, so a typo can never loop forever

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function srcFor(folder, index) {
    var cfg = GALLERIES[folder] || {};
    return BASE + folder + '/' + pad(index + 1) + (cfg.ext || '.jpg');
  }

  /* ---------------------------------------------------------------------
     Card previews — swap 01.jpg in where it exists, leave the flat brown
     header + emoji where it doesn't. Nothing looks broken either way.
     --------------------------------------------------------------------- */
  var cards = [];

  function initPreviews() {
    var articles = document.querySelectorAll('[data-gallery]');

    Array.prototype.forEach.call(articles, function (article) {
      var folder = article.getAttribute('data-gallery');
      var media = article.querySelector('[data-lb-open]');
      if (!folder || !media) return;

      var entry = {
        article: article,
        media: media,
        folder: folder,
        title: article.getAttribute('data-gallery-title') || '',
        ready: false,
      };
      cards.push(entry);

      var probe = new Image();
      probe.onload = function () {
        var img = document.createElement('img');
        img.src = probe.src;
        img.alt = '';
        img.className = 'project-preview';
        img.setAttribute('aria-hidden', 'true');
        media.insertBefore(img, media.firstChild);
        media.classList.add('has-preview');
        entry.ready = true;

        var declared = (GALLERIES[folder] || {}).count || 0;
        var badge = media.querySelector('[data-photo-count]');
        if (badge) {
          badge.textContent = declared > 1 ? declared + ' photos' : 'View photos';
          badge.hidden = false;
        }
      };
      probe.onerror = function () {
        /* No 01.jpg yet — keep the emoji header and make the card inert. */
        media.setAttribute('aria-disabled', 'true');
      };
      probe.src = srcFor(folder, 0);
    });
  }

  /* ---------------------------------------------------------------------
     Lightbox
     --------------------------------------------------------------------- */
  var lb = document.getElementById('lightbox');
  if (!lb) return;

  var elImg     = document.getElementById('lightbox-img');
  var elTitle   = document.getElementById('lightbox-title');
  var elCounter = document.getElementById('lightbox-counter');
  var elPrev    = document.getElementById('lightbox-prev');
  var elNext    = document.getElementById('lightbox-next');
  var elClose   = document.getElementById('lightbox-close');
  var elDots    = document.getElementById('lightbox-dots');
  var elStage   = document.getElementById('lightbox-stage');

  var state = {
    folder: null,
    title: '',
    index: 0,
    total: null,      // null = not yet known; discovered by loading forward
    lastFocus: null,
  };

  function isOpen() { return !lb.hasAttribute('hidden'); }

  function preload(index) {
    if (index < 0) return;
    if (state.total !== null && index >= state.total) return;
    if (state.total === null && index >= MAX_PHOTOS) return;

    var folder = state.folder;
    var img = new Image();
    /* A forward preload that 404s tells us where the set ends — so the Next
       button greys out before the visitor ever taps it. */
    img.onerror = function () {
      if (state.folder === folder && state.total === null && index > 0) {
        state.total = index;
        render();
      }
    };
    img.src = srcFor(folder, index);
  }

  function renderDots() {
    elDots.innerHTML = '';
    if (state.total === null || state.total < 2 || state.total > 20) {
      elDots.hidden = true;
      return;
    }
    elDots.hidden = false;
    for (var i = 0; i < state.total; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'lightbox-dot' + (i === state.index ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Photo ' + (i + 1));
      dot.setAttribute('data-index', String(i));
      elDots.appendChild(dot);
    }
  }

  function render() {
    elImg.src = srcFor(state.folder, state.index);
    elImg.alt = state.title + ' — photo ' + (state.index + 1);

    elCounter.textContent = state.total !== null
      ? (state.index + 1) + ' / ' + state.total
      : String(state.index + 1);

    elPrev.disabled = state.index === 0;
    elNext.disabled = state.total !== null && state.index >= state.total - 1;

    renderDots();
    preload(state.index + 1);
    preload(state.index - 1);
  }

  /* If an image 404s, the folder is shorter than we thought: that index is the
     real length. Remember it and step back to the last photo that exists.
     This also self-corrects an over-declared `count`. */
  elImg.addEventListener('error', function () {
    if (state.folder === null) return;
    if (state.index <= 0) return;          // nothing safe to fall back to
    state.total = state.index;
    state.index = state.total - 1;
    render();
  });

  function open(folder, title, startIndex) {
    var declared = (GALLERIES[folder] || {}).count || 0;
    state.folder = folder;
    state.title = title;
    state.index = startIndex || 0;
    state.total = declared > 0 ? declared : null;
    state.lastFocus = document.activeElement;

    elTitle.textContent = title;
    render();

    lb.removeAttribute('hidden');
    document.body.classList.add('lb-open');
    elClose.focus();
  }

  function close() {
    lb.setAttribute('hidden', '');
    document.body.classList.remove('lb-open');
    state.folder = null;
    elImg.removeAttribute('src');
    if (state.lastFocus && typeof state.lastFocus.focus === 'function') {
      state.lastFocus.focus();
    }
  }

  function go(step) {
    var next = state.index + step;
    if (next < 0) return;
    if (state.total !== null && next >= state.total) return;
    if (state.total === null && next >= MAX_PHOTOS) return;
    state.index = next;
    render();
  }

  /* ---- Open triggers ---- */
  function openFor(entry, e) {
    if (!entry.ready) return;                       // no photos in that folder yet
    if (e && e.target.closest('a')) return;         // let real links work
    if (window.getSelection && String(window.getSelection()) !== '') return;
    open(entry.folder, entry.title, 0);
  }

  function bindCards() {
    cards.forEach(function (entry) {
      entry.media.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openFor(entry, e);
      });
      /* Clicking anywhere else on the card opens it too. */
      entry.article.addEventListener('click', function (e) {
        if (e.target.closest('[data-lb-open]')) return;   // handled above
        openFor(entry, e);
      });
    });
  }

  /* ---- Controls ---- */
  elPrev.addEventListener('click', function () { go(-1); });
  elNext.addEventListener('click', function () { go(1); });
  elClose.addEventListener('click', close);

  elDots.addEventListener('click', function (e) {
    var dot = e.target.closest('[data-index]');
    if (!dot) return;
    state.index = parseInt(dot.getAttribute('data-index'), 10);
    render();
  });

  Array.prototype.forEach.call(lb.querySelectorAll('[data-lb-close]'), function (el) {
    el.addEventListener('click', close);
  });

  /* ---- Keyboard: arrows, Escape, and a simple focus trap ---- */
  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;

    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); return; }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1); return; }

    if (e.key === 'Tab') {
      var focusable = [elClose, elPrev, elNext].filter(function (el) { return !el.disabled; });
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---- Swipe ---- */
  var touchX = 0, touchY = 0, tracking = false;
  var SWIPE_MIN = 45;

  elStage.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { tracking = false; return; }
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });

  elStage.addEventListener('touchend', function (e) {
    if (!tracking) return;
    tracking = false;
    var t = e.changedTouches[0];
    var dx = t.clientX - touchX;
    var dy = t.clientY - touchY;
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);       // swipe left → next
  }, { passive: true });

  /* ---- Go ---- */
  initPreviews();
  bindCards();
})();
