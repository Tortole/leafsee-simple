$("#registration-form").submit(function (e) {
    e.preventDefault();

    $.ajax({
        url: this.action,
        type: "POST",
        data: $(this).serialize(),
        dataType: "json",
        success: function (response) {
            clearColorRegistrationInputs();
            clearRegistrationErrorText();
            if (response.success) {
                window.location.href = response.next_page;
            } else {
                $.each(response.errors, function (error_name, error) {
                    addRegistrationErrorText(error[0]);
                    console.log(error_name);
                    switch (error_name) {
                        case "__all__":
                            $.each(
                                [
                                    "registration-username-inputwraper",
                                    "registration-password1-inputwraper",
                                    "registration-password2-inputwraper",
                                    "registration-email-inputwraper",
                                    "registration-nickname-inputwraper",
                                    "registration-first-name-inputwraper",
                                    "registration-last-name-inputwraper",
                                ],
                                function (index, value) {
                                    colorErrorRegistrationInput(value);
                                },
                            );
                            break;
                        case "username":
                            colorErrorRegistrationInput(
                                "registration-username-inputwraper",
                            );
                            break;
                        case "password1":
                            colorErrorRegistrationInput(
                                "registration-password1-inputwraper",
                            );
                            break;
                        case "password2":
                            colorErrorRegistrationInput(
                                "registration-password1-inputwraper",
                            );
                            colorErrorRegistrationInput(
                                "registration-password2-inputwraper",
                            );
                            break;
                        case "email":
                            colorErrorRegistrationInput(
                                "registration-email-inputwraper",
                            );
                            break;
                        case "nickname":
                            colorErrorRegistrationInput(
                                "registration-nickname-inputwraper",
                            );
                            break;
                        case "first_name":
                            colorErrorRegistrationInput(
                                "registration-first-name-inputwraper",
                            );
                            break;
                        case "last_name":
                            colorErrorRegistrationInput(
                                "registration-last-name-inputwraper",
                            );
                            break;
                    }
                });
            }
        },
    });
});

function clearColorRegistrationInputs() {
    $(".registration-inputwraper")
        .removeClass(inputErrorColorClass)
        .addClass(inputDefaultColorClass);
    $(".registration-inputwraper label")
        .removeClass(inputErrorColorClass)
        .addClass(inputDefaultColorClass);
}

function colorErrorRegistrationInput(inputWrapperId) {
    $(`#${inputWrapperId}`)
        .removeClass(inputDefaultColorClass)
        .addClass(inputErrorColorClass);
    $(`#${inputWrapperId} label`)
        .removeClass(inputDefaultColorClass)
        .addClass(inputErrorColorClass);
}

function clearRegistrationErrorText() {
    $("#registration-error-text").text("");
}

function addRegistrationErrorText(errorText) {
    $("#registration-error-text").append(`<p>${errorText}</p>`);
}
