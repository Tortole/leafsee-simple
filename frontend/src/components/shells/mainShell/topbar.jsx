/*
Topbar components
*/

import { useContext } from "react";

import { MainShellPanelsVisibilityContext } from "./mainShell";

import { AuthStatusContext } from "services/authStatus";

import { ReactComponent as BurgerMenuButton } from "static/svg/burger_menu_button.svg";
import { ReactComponent as LeafIcon } from "static/svg/leaf_icon.svg";
import { ReactComponent as Magnifier } from "static/svg/magnifier.svg";
import { ReactComponent as NotificationBell } from "static/svg/notification_bell.svg";
import { ReactComponent as UserIcon } from "static/svg/user_icon.svg";
import { ReactComponent as VideoUpload } from "static/svg/video_upload.svg";

function TopbarBurgerButton() {
    /*
    Burger Button of Topbar to show or hide the Sidebar
    */

    return (
        <button
            className="clip-polygon-octagon hover:bg-green-l-hover active:bg-green-l-onclick float-left flex size-10 items-center justify-center"
            onClick="toggleElement('base-sidebar')"
        >
            <BurgerMenuButton className="w-8" />
        </button>
    );
}

function TopbarIcon() {
    /*
    Icon of Topbar with site site logo
    */

    return (
        <button className="bg-green-l clip-polygon-steep-2 float-left ml-5 flex h-9 w-max items-center px-4">
            <LeafIcon className="float-left w-7" />
            <p className="font-jockeyone float-left ml-2 text-center text-3xl">
                LeafSee
            </p>
        </button>
    );
}

function TopbarSearch() {
    /*
    Search bar of Topbar
    */

    return (
        <div className="clip-polygon-steep-2 h-7 w-max">
            <button className="bg-green-l hover:bg-green-l-hover active:bg-green-l-onclick float-left h-full pl-5 pr-3 text-center">
                <Magnifier className="w-5" />
            </button>
            <input
                type="text"
                className="float-left h-full w-[500px] pl-2 pr-5 outline-none"
                name="search"
                placeholder="Поиск"
            />
        </div>
    );
}

function TopbarAuthenticated() {
    /*
    Block of Topbar containing link buttons for an authenticated user:
        - notification menu button
        - new video upload button
        - user's account submenu button
    */

    const { setIsNotificationsPanelVisible, setIsTopbarMenuPanelVisible } =
        useContext(MainShellPanelsVisibilityContext);

    return (
        <div className="flex h-full w-max items-center justify-between gap-4">
            <a href="{% url 'video-list' %}">
                <VideoUpload className="w-8" />
            </a>
            <button onClick={() => setIsNotificationsPanelVisible((i) => !i)}>
                <NotificationBell className="w-6" />
            </button>
            <button
                className="clip-polygon-octagon flex size-8 items-center justify-center bg-white"
                onClick={() => setIsTopbarMenuPanelVisible((i) => !i)}
            >
                <UserIcon className="w-7" />
            </button>
        </div>
    );
}

function TopbarNotAuthenticated() {
    /*
    Block of Topbar containing link buttons for an unauthenticated user:
        - button for login
        - button for registration
    */

    const { setIsLoginPanelVisible, setIsRegistrationPanelVisible } =
        useContext(MainShellPanelsVisibilityContext);

    return (
        <div className="flex h-full w-max items-center justify-between gap-5">
            <button
                className="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick h-7 w-[140px] px-4"
                onClick={() => setIsLoginPanelVisible((i) => !i)}
            >
                Вход
            </button>
            <button
                className="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick h-7 w-[140px] px-4"
                onClick={() => setIsRegistrationPanelVisible((i) => !i)}
            >
                Регистрация
            </button>
        </div>
    );
}

export default function Topbar() {
    /*
    Topbar of Main Shell containing search bar and buttons for navigating through pages related to the user's account:
        - notification icon and menu
        - user's account menu
        - buttons for login or register
        - link to the new video upload page
    */

    const { isUserAuthenticated } = useContext(AuthStatusContext);

    return (
        <div
            id="base-topbar"
            className="bg-green-n z-10 flex h-12 w-full items-center justify-between px-5"
        >
            <div>
                <div className="flex items-center">
                    <TopbarBurgerButton />
                    <TopbarIcon />
                </div>
            </div>
            <TopbarSearch />
            {isUserAuthenticated == null ? (
                <div></div>
            ) : isUserAuthenticated ? (
                <TopbarAuthenticated />
            ) : (
                <TopbarNotAuthenticated />
            )}
        </div>
    );
}
