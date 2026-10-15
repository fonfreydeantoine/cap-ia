/* Cap IA : seul script du site, volontairement minimal.
   1. Menu repliable sur téléphone.
   2. Envoi des formulaires sans quitter la page (le formulaire fonctionne aussi sans JavaScript). */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var bouton = document.querySelector('.entete__menu');
  var nav = document.getElementById('navigation-principale');
  if (bouton && nav) {
    bouton.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('est-ouvert');
      bouton.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('est-ouvert')) {
        nav.classList.remove('est-ouvert');
        bouton.setAttribute('aria-expanded', 'false');
        bouton.focus();
      }
    });
  }

  document.querySelectorAll('form[data-envoi]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!window.fetch || !window.FormData) return;
      e.preventDefault();
      var envoi = form.querySelector('[type="submit"]');
      var zone = form.querySelector('[data-message]');
      var libelle = envoi ? envoi.textContent : '';
      if (envoi) { envoi.disabled = true; envoi.textContent = 'Envoi en cours…'; }
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (reponse) {
          if (!reponse.ok) throw new Error('envoi');
          window.location.href = form.getAttribute('data-merci') || '/merci';
        })
        .catch(function () {
          if (envoi) { envoi.disabled = false; envoi.textContent = libelle; }
          if (zone) {
            zone.hidden = false;
            zone.className = 'message-formulaire message-formulaire--erreur';
            zone.textContent = "L'envoi n'a pas abouti. Vous pouvez réessayer ou écrire directement à antoine@cap-ia.pro.";
            zone.focus();
          }
        });
    });
  });
});
