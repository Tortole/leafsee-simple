import React, { useState, useContext } from "react";

import { AuthContext } from "../../services/authentication/authStatus";

import { ReactComponent as BurgerMenuButton } from "../../static/svg/burger_menu_button.svg";
import { ReactComponent as LeafIcon } from "../../static/svg/leaf_icon.svg";
import { ReactComponent as Magnifier } from "../../static/svg/magnifier.svg";
import { ReactComponent as VideoUpload } from "../../static/svg/video_upload.svg";
import { ReactComponent as NotificationBell } from "../../static/svg/notification_bell.svg";
import { ReactComponent as UserIcon } from "../../static/svg/user_icon.svg";

function TopbarBurgerButton() {
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
    return (
        <div className="flex h-full w-max items-center justify-between gap-4">
            <a href="{% url 'video-list' %}">
                <VideoUpload className="w-8" />
            </a>
            <button onClick="">
                <NotificationBell className="w-6" />
            </button>
            <button
                className="clip-polygon-octagon flex size-8 items-center justify-center bg-white"
                onClick="toggleElement('base-account-submenu')"
            >
                <UserIcon className="w-7" />
            </button>
        </div>
    );
}

function TopbarNotAuthenticated() {
    return (
        <div className="flex h-full w-max items-center justify-between gap-5">
            <button
                className="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick h-7 w-[140px] px-4"
                onClick="toggleElement('login-form-wrapper')"
            >
                Вход
            </button>
            <button
                className="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick h-7 w-[140px] px-4"
                onClick="toggleElement('registration-form-wrapper')"
            >
                Регистрация
            </button>
        </div>
    );
}

function Topbar() {
    const { authenticated } = useContext(AuthContext);

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
            {authenticated == null ? (
                <div></div>
            ) : authenticated ? (
                <TopbarAuthenticated />
            ) : (
                <TopbarNotAuthenticated />
            )}
        </div>
    );
}

function SidebarMenuButton({ text }) {
    return (
        <button class="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick h-max w-full px-4 text-left text-2xl">
            {text}
        </button>
    );
}

function SidebarMenu() {
    return (
        <div class="flex w-full flex-col gap-3 px-3">
            <SidebarMenuButton text={"Главная"} />
            <SidebarMenuButton text={"Подписки"} />
            <SidebarMenuButton text={"История"} />
            <SidebarMenuButton text={"Понравившиеся"} />
        </div>
    );
}

function SidebarSubscription() {
    return (
        <div>
            <button class="bg-green-l clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick flex w-full items-center justify-start gap-2 px-3 py-1">
                <div class="clip-polygon-octagon flex size-8 items-center justify-center bg-white">
                    <UserIcon className="w-7" />
                </div>
                <p class="font-play text-xl">Название канала</p>
            </button>
        </div>
    );
}

function Sidebar() {
    const { authenticated } = useContext(AuthContext);

    return (
        <div
            id="base-sidebar"
            class="bg-green-l z-10 flex w-64 flex-col items-start gap-5 overflow-auto py-5"
        >
            <SidebarMenu />
            {authenticated == null ? (
                <div></div>
            ) : (
                authenticated && (
                    <>
                        <div class="h-px w-full bg-black"></div>
                        <div class="flex w-full flex-col gap-3 px-3">
                            <p class="font-play text-left text-3xl">Подписки</p>
                            <SidebarSubscription />
                        </div>
                    </>
                )
            )}
        </div>
    );
}

function NotificationMenuLine() {
    return (
        <div class="clip-polygon-right-2 hover:bg-green-ll-hover active:bg-green-ll-onclick px-4 py-2">
            <p class="font-play font-bold">Вам ответили на комментарий</p>
            <p class="font-play text-sm">
                Пользователь rubiroit ответил вам на комментарий “Если я не
                ошибаюсь, то вилка не подходит для зам...”
            </p>
        </div>
    );
}

function NotificationMenu() {
    let isNotifications = false;

    return (
        <div
            id="base-notifications"
            class="bg-green-l clip-polygon-right-2 absolute right-8 top-16 z-20 flex h-[520px] w-[400px] items-center justify-center"
        >
            <div class="bg-green-ll clip-polygon-right-2 h-[calc(100%-4px)] w-[calc(100%-4px)]">
                {isNotifications ? (
                    <div class="flex h-full w-full flex-col justify-start px-4 py-3">
                        <NotificationMenuLine />
                    </div>
                ) : (
                    <div class="flex h-full w-full items-center justify-center">
                        <p class="font-play text-center text-5xl opacity-50">
                            Уведомлений <br />
                            нет
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function MainShell(props) {
    const [isVisibleNotifications, setIsVisibleNotifications] = useState(false);

    return (
        <div>
            <Topbar />
            <div class="top-12 flex h-[calc(100vh-3rem)] w-full">
                <Sidebar />
                <main class="bg-gray-n z-0 h-full flex-grow overflow-auto p-4">
                    {props.children}
                </main>
            </div>
            {isVisibleNotifications && <NotificationMenu />}
        </div>
    );
}

export default MainShell;
