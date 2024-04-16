hideElement("baseNotifications");
hideElement("baseAccountSubmenu");

hideElement("loginWrapper");

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
