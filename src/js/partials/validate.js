(function() {

    $(function() {

        var
            regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
            regName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,
            emailErrorBox = $('.error-email'),
            nameErrorBox = $('.error-name'),
            form = $('.form'),
            emailFieldForm = $('#e-mail'),
            nameFieldForm = $('#name'),
            textareaFieldForm = $('#massage'),
            textareaErrorBox = $('.error-massage'),
            fields = $('#e-mail, #name, #massage'),
            DURATION =  1000;

        var isValid = function(fieldText, temp) {
            return temp.test(fieldText);
        };

        var showErrorBox = function(fieldMassageDiv, massage, field) {
            event.preventDefault();
            fieldMassageDiv
                .fadeIn(DURATION)
                .find('p')
                .html('Incorrect ' + massage);

            field.addClass('error-input')
                .removeClass('allow-input');
        };

        var createPopup = function(obj) {
            var temp = '<div class="popup"> <div class="popup__text"> <p>Hi {{name}}!' +
                ' <br>Your message was successfully sent!</p> </div> </div>';

            var res = temp.replace(/{{name}}/g, obj.name);

            $(res).appendTo('body');

            $('.popup').slideDown(400);

            fields.each(function() {
                var $this = $(this);
                $this.val('')
            });

            setTimeout(function() {
                $('.popup').slideUp(400, function() {
                    $('.popup').remove();
                })
                    
            }, 5000)
        };

        var ajaxReq = function(event) {
            var URL = '/submit';

            $.ajax({
                type: "POST",
                url: URL,
                data: form.serialize(),
                success: function(data)
                {
                    var res = JSON.parse(data);
                    
                    createPopup(res);
                }
            });

            event.preventDefault();
        };

        var checkField = function(field, fieldMassageDiv, regType, massage) {

            if (!regType) {
                if ( !field.val() ) {
                    showErrorBox(fieldMassageDiv, massage, field);
                } else {
                    field.addClass('allow-input')
                        .removeClass('error-input');
                    fieldMassageDiv.fadeOut(DURATION);
                }
            } else  {
                if ( !field.val() ) {
                    showErrorBox(fieldMassageDiv, massage, field);
                } else if ( !isValid(field.val(), regType) ) {
                    showErrorBox(fieldMassageDiv, massage, field);
                } else {
                    field.addClass('allow-input')
                        .removeClass('error-input');
                    fieldMassageDiv.fadeOut(DURATION);
                }
            }
        };

        form.on('submit', function(e) {
            var tunnel = true;

            checkField(emailFieldForm, emailErrorBox, regEmail, 'email');
            checkField(nameFieldForm, nameErrorBox, regName, 'name');
            checkField(textareaFieldForm, textareaErrorBox, false, 'massage');

            fields.each(function() {
                var $this = $(this);
                if ( $this.is('.error-input') ) {
                    tunnel = false;
                }
            });

            if (tunnel) ajaxReq(e);
        });

        form.on('click', function() {
            nameFieldForm.removeClass('error-input');
            nameErrorBox.fadeOut(DURATION);

            emailFieldForm.removeClass('error-input');
            emailErrorBox.fadeOut(DURATION);

            textareaFieldForm.removeClass('error-input');
            textareaErrorBox.fadeOut(DURATION);
        });
    })
}());
