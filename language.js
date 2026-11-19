(() => {
  const toggle = document.getElementById('bilingual-toggle');
  // Reuse the original toolkit key so returning students keep their choice.
  const preferenceKey = 'onshape-notes.student-toolkit.bilingual';

  function setBilingual(enabled) {
    const state = String(enabled);
    if (document.documentElement.dataset.bilingual === state) return;
    document.documentElement.dataset.bilingual = state;
    toggle.setAttribute('aria-pressed', state);
    document.dispatchEvent(new CustomEvent('onshape-language-change', { detail: enabled }));
  }

  function restorePreference() {
    try {
      setBilingual(localStorage.getItem(preferenceKey) === 'true');
    } catch {
      setBilingual(toggle.getAttribute('aria-pressed') === 'true');
    }
  }

  restorePreference();
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const enabled = toggle.getAttribute('aria-pressed') !== 'true';
    setBilingual(enabled);
    try { localStorage.setItem(preferenceKey, String(enabled)); } catch { /* The choice still works on this page. */ }
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) restorePreference();
  });
  window.addEventListener('storage', event => {
    if (event.key === preferenceKey || event.key === null) restorePreference();
  });
})();
