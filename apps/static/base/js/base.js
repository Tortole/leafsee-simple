hideElement("base-notifications");
hideElement("base-account-submenu");

hideElement("login-form-wrapper");

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
