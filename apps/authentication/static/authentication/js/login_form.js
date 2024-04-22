let inputDefaultColorClass = "bg-green-l";
let inputErrorColorClass = "bg-red-l";

$("#login-form").submit(function (e) {
    e.preventDefault();

    $.ajax({
        url: this.action,
        type: "POST",
        data: $(this).serialize(),
        dataType: "json",
        success: function (response) {
            clearColorLoginInputs();
            clearErrorText();
            if (response.success) {
                window.location.href = response.next_page;
            } else {
                $.each(response.errors, function (error_name, error) {
                    addErrorText(error[0]);
                    switch (error_name) {
                        case "__all__":
                            colorErrorLoginInput("login-login-inputwraper");
                            colorErrorLoginInput("login-password-inputwraper");
                            break;
                        case "email":
                        case "username":
                            colorErrorLoginInput("login-login-inputwraper");
                            break;
                        case "password":
                            colorErrorLoginInput("login-password-inputwraper");
                            break;
                    }
                });
            }
        },
    });
});

function clearColorLoginInputs() {
    $(".login-inputwraper")
        .removeClass(inputErrorColorClass)
        .addClass(inputDefaultColorClass);
    $(".login-inputwraper label")
        .removeClass(inputErrorColorClass)
        .addClass(inputDefaultColorClass);
}

function colorErrorLoginInput(inputWrapperId) {
    $(`#${inputWrapperId}`)
        .removeClass(inputDefaultColorClass)
        .addClass(inputErrorColorClass);
    $(`#${inputWrapperId} label`)
        .removeClass(inputDefaultColorClass)
        .addClass(inputErrorColorClass);
}

function clearErrorText() {
    $("#login-error-text").text("");
}

function addErrorText(errorText) {
    let errorPanel = $("#login-error-text");
    errorPanel.text(errorPanel.text() + "\n" + errorText);
}
