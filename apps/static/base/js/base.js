function toggleSidebar() {
    let sidebar = $("#baseSidebar");
    if (sidebar.css("display") != "none") {
        sidebar.css("display", "none");
    } else {
        sidebar.css("display", "");
    }
}
