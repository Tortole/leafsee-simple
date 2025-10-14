/*
Topbar User account Submenu components for account management
*/

import axios from "axios";

function TopbarUserSubmenuButton({ text, onClickAction }) {
    /*
    Button of Submenu of Topbar
    */

    return (
        <button
            className="font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick w-[90%] px-4 text-left text-lg"
            onClick={() => onClickAction()}
        >
            {text}
        </button>
    );
}

export default function TopbarUserSubmenu() {
    /*
    Submenu of Topbar that contains buttons to navigate through pages related to account management
    */

    return (
        <div className="bg-green-l clip-polygon-right-2 absolute right-4 top-16 z-20 flex h-[400px] w-[220px] items-center justify-center">
            <div className="bg-green-ll clip-polygon-right-2 flex h-[calc(100%-4px)] w-[calc(100%-4px)] flex-col items-center justify-start gap-1 py-3">
                <TopbarUserSubmenuButton
                    text="Личный кабинет"
                    onClickAction={() => console.log("Личный кабинет")}
                />
                <TopbarUserSubmenuButton
                    text="Мои видео"
                    onClickAction={() => console.log("Мои видео")}
                />
                <TopbarUserSubmenuButton
                    text="Выйти из аккаунта"
                    onClickAction={() =>
                        axios
                            .post("/auth/logout")
                            .then(window.location.reload())
                    }
                />
            </div>
        </div>
    );
}
