// jQuery : formulaire de contact (page contact.html)
$(function () {

  $('#form-contact').on('submit', function (e) {
    e.preventDefault();                         // on empêche le rechargement de la page
    var form = this;
    var $retour = $('#retour');

    // 1. Vérification des champs (obligatoires, e-mail valide, 10 caractères minimum)
    if (!form.checkValidity()) {
      $(form).addClass('was-validated');        // Bootstrap affiche les messages d'erreur
      return;
    }

    // 2. Envoi du message vers mon e-mail (service FormSubmit)
    $retour.removeClass('d-none alert-success alert-danger').addClass('alert-info').text('Envoi en cours...');

    $.ajax({
      url: 'https://formsubmit.co/ajax/ndolimoayemarie@gmail.com',
      method: 'POST',
      dataType: 'json',
      data: $(form).serialize()
    })
    .done(function (reponse) {
      if (reponse && (reponse.success === 'true' || reponse.success === true)) {
        $retour.removeClass('alert-info').addClass('alert-success')
               .text('Merci ! Votre message a bien été envoyé.');
        form.reset();
        $(form).removeClass('was-validated');
      } else {
        console.log('Réponse FormSubmit :', reponse);
        erreur(reponse && reponse.message);
      }
    })
    .fail(function (xhr) {
      console.log('Échec FormSubmit, code :', xhr.status, xhr.responseText);
      erreur(xhr.responseJSON && xhr.responseJSON.message);
    });

    // Affiche la raison donnée par le service (si elle existe)
    function erreur(raison) {
      var texte = "Le message n'a pas pu être envoyé.";
      if (raison) { texte += ' Message du service : ' + raison; }
      texte += ' Vous pouvez aussi m\'écrire à ndolimoayemarie@gmail.com.';
      $retour.removeClass('alert-info').addClass('alert-danger').text(texte);
    }
  });

});
