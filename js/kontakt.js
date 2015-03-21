$('#SENDEN').on('click',function(event) {
    event.preventDefault();
    submitKontakt();
});
submitKontakt = function() {
    $('#SENDEN').hide();
    var docHeight = $(document).height(),
    iName=$("input[name=name]"),
    iXYZ=$("input[name=xyz]"),
    iMSG=$("textarea[name=msg]");
    $('.overlay').height(docHeight).show();
    $('#form_msg').empty();
    iName.removeClass("form__error");
    iXYZ.removeClass("form__error");
    iMSG.removeClass("form__error");
    var postForm = {
        'name': iName.val(),
        'xyz': iXYZ.val(),
        'msg': iMSG.val()
    };
    $.ajax({
        type: 'POST',
        url: 'mailajax.php',
        data: postForm,
        dataType: 'json',
        success: function(data) {
            if (!data.success) {
                if (data.errors.name) {
                    $('.overlay').hide();
                    $('#form_msg_error').empty();
                    $('#form_msg_error').fadeIn(1000).append('<span class="kontakt__error">' + data.errors.name + '</span>');
                    $('#SENDEN').show();
                    if(data.errors.badmail) {
                        iXYZ.focus();
                        iXYZ.addClass("form__error");
                    }
                    if(data.errors.badname) {
                        iName.focus();
                        iName.addClass("form__error");
                    }
                    if(data.errors.badmsg) {
                        iMSG.focus();
                        iMSG.addClass("form__error");
                    }
                }
            } else {
                $('.overlay').hide();
                $('#form_msg_error').hide();
                if ( !data.phpmail_bad ) {
                    $(".post--content").fadeOut("fast");
                    $('#form_msg').fadeIn(1000).append('<span class="kontakt__success">Danke ' + data.name + ' für deine eMail!</span>');
                } else {
                    $('#form_msg_error').fadeIn(1000).append('<span class="kontakt__error">Es gab ein Problem mit unseren eMail-Server. Bitte versuch es später nochmal oder schreibe direkt an mail@glossboss.de</span>');
                }
                $('.kontakt__form').fadeOut();
            }
        }
    });
}