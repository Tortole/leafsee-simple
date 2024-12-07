import axios from "axios";

import getCookie from "../getCookie";

export default function logout() {
    const csrfToken = getCookie("csrftoken");
    axios.post("/auth/logout", {
        headers: {
            "X-CSRFToken": csrfToken,
        },
    });
}
