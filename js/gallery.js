/* =========================================================================
   Project galleries — preview images + swipeable lightbox
   =========================================================================

   Serves both sections: the community project photo galleries, and the data
   project dashboard screenshots.

   HOW TO ADD OR CHANGE PHOTOS
   ---------------------------
   1. Each project has its own folder of images, listed in GALLERIES below.
      Community projects live under assets/images/community_projects/ and are
      .jpg; data projects live under assets/images/data_projects/ and are .png
      (see the note on that block). The folder names are fixed — each one is
      also a data-gallery="…" attribute in index.html.

   2. Name the files 01.jpg, 02.jpg, 03.jpg … in the order you want them
      shown. Always two digits, and no gaps in the numbering.

   3. The card's preview photo is set separately, as the <img src> inside that
      card's <button class="project-media …"> in index.html — so you can preview
      any photo in the folder without disturbing the gallery order. Community
      previews are cropped to a 3:2 box, data previews to 16:9 anchored to the
      top, so pick a wide/landscape shot.

   If you ADD photos, they're found automatically — the gallery keeps looking
   one past the last known photo. If you REMOVE photos, update `count` below
   so the totals stay right (the gallery self-corrects either way, it just
   shows the old total until it reaches the end).

   `count` is simply how many photos are in that folder. Set it to 0 to have
   the gallery work the number out on its own.

   A folder defaults to .jpg inside community_projects/. To point elsewhere,
   add `dir:` and/or `ext:` to that project's line.
   ========================================================================= */

(function () {
  'use strict';

  var GALLERIES = {
    'grand-games':        { count: 7 },
    'business-showcase':  { count: 5 },
    'staff-hangout':      { count: 3 },
    'womens-board':       { count: 6 },
    'valentines-connect': { count: 4 },
    /* Monthly Games Days has no card on the page. To add one, copy any of the
       project <article> blocks in index.html, set data-gallery="games-days",
       drop photos into assets/images/community_projects/games-days/, and set
       the count below. Harmless left at 0. */
    'games-days':         { count: 0 },
  };

  /* Data project dashboards live in their own folder and stay .png, because
     JPEG compression softens small chart text. One screenshot each for now —
     add 02.png, 03.png … to a folder and the gallery finds them on its own. */
  GALLERIES['hub-perf-dashboard']  = { count: 1, dir: 'data_projects', ext: '.png' };
  GALLERIES['learner-fb-analysis'] = { count: 1, dir: 'data_projects', ext: '.png' };
  GALLERIES['pizza-sales']         = { count: 1, dir: 'data_projects', ext: '.png' };
  GALLERIES['maiji-ndogo-water']   = { count: 1, dir: 'data_projects', ext: '.png' };

  var BASE = 'assets/images/';
  var MAX_PHOTOS = 60;          // hard stop, so a typo can never loop forever

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function srcFor(folder, index) {
    var cfg = GALLERIES[folder] || {};
    return BASE + (cfg.dir || 'community_projects') + '/' + folder + '/'
         + pad(index + 1) + (cfg.ext || '.jpg');
  }

  /* ---------------------------------------------------------------------
     Register the cards. The preview <img> lives in index.html so the
     browser can lazy-load it; if it 404s, its inline onerror strips the
     .has-preview class and the card falls back to the flat brown header.
     --------------------------------------------------------------------- */
  var cards = [];

  function initPreviews() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-gallery]'), function (article) {
      var folder = article.getAttribute('data-gallery');
      var media = article.querySelector('[data-lb-open]');
      if (!folder || !media) return;

      cards.push({
        article: article,
        media: media,
        folder: folder,
        title: article.getAttribute('data-gallery-title') || '',
      });
    });
  }

  /* A card is live only while its preview photo is actually showing. */
  function hasPhotos(entry) {
    return entry.media.classList.contains('has-preview');
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

  /* Once the visitor reaches the last photo we know about, quietly check
     whether one more exists. That way photos added to a folder later still
     show up even though `count` above wasn't updated. */
  function probeBeyond() {
    if (state.total === null || state.total >= MAX_PHOTOS) return;
    var folder = state.folder;
    var idx = state.total;
    var img = new Image();
    img.onload = function () {
      if (state.folder === folder && state.total === idx) {
        state.total = idx + 1;
        render();
      }
    };
    img.src = srcFor(folder, idx);
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
    if (state.total !== null && state.index >= state.total - 1) probeBeyond();
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
    if (!hasPhotos(entry)) return;                  // no photos in that folder
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

      /* Cards with their own buttons and links (the data project cards, which
         have "View live report" / "Open the spreadsheet") opt out of the
         click-anywhere behaviour — otherwise those controls are ambiguous. */
      if (entry.article.hasAttribute('data-gallery-mediaonly')) return;

      entry.article.addEventListener('click', function (e) {
        if (e.target.closest('[data-lb-open]')) return;   // handled above
        if (e.target.closest('a, button')) return;        // let controls work
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
