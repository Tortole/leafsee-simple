hideElement("baseNotifications");
hideElement("baseAccountSubmenu");

function toggleElement(elementId) {
    let sidebar = $(`#${elementId}`);
    if (sidebar.css("display") != "none") {
        sidebar.css("display", "none");
    } else {
        sidebar.css("display", "");
    }
}

function hideElement(elementId) {
    $(`#${elementId}`).css("display", "none");
}
