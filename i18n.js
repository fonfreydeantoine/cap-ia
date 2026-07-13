/* Cap IA · bascule FR/EN
   Un seul fichier, chargé sur les pages traduites (index, réalisations, diagnostic).
   - Charge translations.json une fois
   - Détecte la page via l'attribut data-page sur <html>
   - Persiste la langue dans localStorage ("capia_lang"), défaut "fr"
   - Remplace textContent / innerHTML / placeholder / content selon l'attribut data-i18n* */
(function () {
  'use strict';

  var STORAGE_KEY = 'capia_lang';
  var DEFAULT_LANG = 'fr';
  var page = document.documentElement.getAttribute('data-page');
  var dict = null;

  function readLang() {
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { stored = null; }
    return stored === 'en' || stored === 'fr' ? stored : DEFAULT_LANG;
  }

  function entryFor(key) {
    if (!dict || !page || !dict[page]) return null;
    return dict[page][key] || null;
  }

  function applyTranslations(lang) {
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var e = entryFor(el.getAttribute('data-i18n'));
      if (e && e[lang] != null) el.textContent = e[lang];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var e = entryFor(el.getAttribute('data-i18n-html'));
      if (e && e[lang] != null) el.innerHTML = e[lang];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var e = entryFor(el.getAttribute('data-i18n-placeholder'));
      if (e && e[lang] != null) el.setAttribute('placeholder', e[lang]);
    });

    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var e = entryFor(el.getAttribute('data-i18n-content'));
      if (e && e[lang] != null) el.setAttribute('content', e[lang]);
    });
  }

  function syncToggle(lang) {
    document.querySelectorAll('.lang-opt').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function setLanguage(lang) {
    if (lang !== 'fr' && lang !== 'en') lang = DEFAULT_LANG;
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    syncToggle(lang);
    applyTranslations(lang);
  }
  window.setLanguage = setLanguage;

  function init() {
    var lang = readLang();

    // État immédiat (avant même le chargement du JSON) : langue html + toggle.
    document.documentElement.setAttribute('lang', lang);
    syncToggle(lang);

    document.querySelectorAll('.lang-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-lang'));
      });
    });

    fetch('/translations.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { dict = data; applyTranslations(lang); })
      .catch(function (err) { console.error('i18n: chargement translations.json échoué', err); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
