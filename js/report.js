/* =========================================================================
   Live report viewer — opens a Power BI report in a modal, on the page
   =========================================================================

   HOW TO ADD A REPORT BUTTON
   --------------------------
   Put this inside a project card, and that's it — no JavaScript to edit:

     <button type="button" class="report-btn" data-report
             data-report-src="https://app.powerbi.com/view?r=…"
             data-report-title="Maven Pizza Sales Dashboard">
       View live report
     </button>

   `data-report-src` is the src="…" out of the <iframe> Power BI gives you
   under File → Embed report → Publish to web.

   WHY THE src IS SET ON CLICK, NOT IN THE HTML
   -------------------------------------------
   A Power BI embed is a few megabytes and starts running as soon as it's in
   the page. With the reports hard-coded into an <iframe> every visitor would
   download all of them just by loading the homepage. Here the iframe stays
   empty until someone asks for a report, and is emptied again on close so the
   report stops running.
   ========================================================================= */

(function () {
  'use strict';

  var modal = document.getElementById('report');
  if (!modal) return;

  var elFrame   = document.getElementById('report-frame');
  var elTitle   = document.getElementById('report-title');
  var elNewTab  = document.getElementById('report-open-new');
  var elClose   = document.getElementById('report-close');

  var BLANK = 'about:blank';
  var lastFocus = null;

  function isOpen() { return !modal.hasAttribute('hidden'); }

  function open(src, title) {
    if (!src) return;
    lastFocus = document.activeElement;

    elTitle.textContent = title || 'Live report';
    elFrame.title = title || 'Live report';
    elFrame.src = src;
    elNewTab.href = src;

    modal.removeAttribute('hidden');
    document.body.classList.add('lb-open');
    elClose.focus();
  }

  function close() {
    if (!isOpen()) return;
    modal.setAttribute('hidden', '');
    document.body.classList.remove('lb-open');
    elFrame.src = BLANK;          // stop the report running
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  /* ---- Open triggers ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-report]'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      open(btn.getAttribute('data-report-src'), btn.getAttribute('data-report-title'));
    });
  });

  /* ---- Close triggers ---- */
  elClose.addEventListener('click', close);
  Array.prototype.forEach.call(modal.querySelectorAll('[data-report-close]'), function (el) {
    el.addEventListener('click', close);
  });

  /* ---- Keyboard: Escape, plus a focus trap over the two controls ----
     Once focus is inside the iframe the browser owns it and Tab belongs to
     the report, which is what a visitor reading a dashboard expects. */
  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;

    if (e.key === 'Escape') { close(); return; }

    if (e.key === 'Tab') {
      var focusable = [elClose, elNewTab, elFrame];
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
