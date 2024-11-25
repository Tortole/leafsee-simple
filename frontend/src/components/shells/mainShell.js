import { ReactComponent as BurgerMenuButton } from "../../static/svg/burger_menu_button.svg";
import { ReactComponent as LeafIcon } from "../../static/svg/leaf_icon.svg";
import { ReactComponent as Magnifier } from "../../static/svg/magnifier.svg";
import { ReactComponent as VideoUpload } from "../../static/svg/video_upload.svg";
import { ReactComponent as NotificationBell } from "../../static/svg/notification_bell.svg";
import { ReactComponent as UserIcon } from "../../static/svg/user_icon.svg";

function toggleElement(elementId) {
    // let element = $(`#${elementId}`);
    // // If element is hide, then show it
    // if (element.css("display") == "none") {
    //     element.css("display", "");
    // }
    // // otherwise hide it
    // else {
    //     element.css("display", "none");
    // }
}

function TopbarBurgerButton() {
    return (
        <button
            class="clip-polygon-octagon hover:bg-green-l-hover active:bg-green-l-onclick float-left flex size-10 items-center justify-center"
            onclick="toggleElement('base-sidebar')"
        >
            <BurgerMenuButton class="w-8" />
        </button>
    );
}

function TopbarIcon() {
    return (
        <button class="bg-green-l clip-polygon-steep-2 float-left ml-5 flex h-9 w-max items-center px-4">
            <LeafIcon class="float-left w-7" />
            <p class="font-jockeyone float-left ml-2 text-center text-3xl">
                LeafSee
            </p>
        </button>
    );
}

function TopbarSearch() {
    return (
        <div class="clip-polygon-steep-2 h-7 w-max">
            <button class="bg-green-l hover:bg-green-l-hover active:bg-green-l-onclick float-left h-full pl-5 pr-3 text-center">
                <Magnifier class="w-5" />
            </button>
            <input
                type="text"
                class="float-left h-full w-[500px] pl-2 pr-5 outline-none"
                name="search"
                placeholder="Поиск"
            />
        </div>
    );
}

function TopbarAuthenticated() {
    return (
        <div class="flex h-full w-max items-center justify-between gap-4">
            <a href="{% url 'video-list' %}">
                <VideoUpload class="w-8" />
            </a>
            <button onclick="toggleElement('base-notifications')">
                <NotificationBell class="w-6" />
            </button>
            <button
                class="clip-polygon-octagon flex size-8 items-center justify-center bg-white"
                onclick="toggleElement('base-account-submenu')"
            >
                <UserIcon class="w-7" />
            </button>
        </div>
    );
}

function TopbarNotAuthenticated() {
    return (
        <div class="flex h-full w-max items-center justify-between gap-5">
            <button
                class="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick h-7 w-[140px] px-4"
                onclick="toggleElement('login-form-wrapper')"
            >
                Вход
            </button>
            <button
                class="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick h-7 w-[140px] px-4"
                onclick="toggleElement('registration-form-wrapper')"
            >
                Регистрация
            </button>
        </div>
    );
}

// function Topbar() {
//     return (

//     );
// }

function Topbar() {
    return (
        <div
            id="base-topbar"
            class="bg-green-n z-10 flex h-12 w-full items-center justify-between px-5"
        >
            <div>
                <div class="flex items-center">
                    <TopbarBurgerButton />
                    <TopbarIcon />
                </div>
            </div>
            <TopbarSearch />
            <TopbarAuthenticated />
        </div>
    );
}

function MainShell() {
    return (
        <div>
            <Topbar />
        </div>
    );
}

export default MainShell;
