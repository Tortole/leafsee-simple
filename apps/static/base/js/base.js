let inputDefaultColorClass = "bg-green-l";
let inputErrorColorClass = "bg-red-l";

hideElement("base-notifications");
hideElement("base-account-submenu");

hideElement("login-form-wrapper");
hideElement("registration-form-wrapper");

function toggleElement(elementId) {
    let element = $(`#${elementId}`);

    // If element is hide, then show it
    if (element.css("display") == "none") {
        element.css("display", "");
    }
    // otherwise hide it
    else {
        element.css("display", "none");
    }
}

function hideElement(elementId) {
    $(`#${elementId}`).css("display", "none");
}

function stopPropagation(event) {
    event.stopPropagation();
}

function switchLoginRegister() {
    let login = $("#login-form-wrapper");
    let registration = $("#registration-form-wrapper");

    // If login is hide, then show login and hide registration
    if (login.css("display") == "none") {
        login.css("display", "");
        registration.css("display", "none");
    }
    // otherwise hide login and show registration
    else {
        login.css("display", "none");
        registration.css("display", "");
    }
}
