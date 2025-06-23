/*
Sidebar components
*/

import { useContext } from "react";

import { AuthStatusContext } from "services/authStatus";

import { ReactComponent as UserIcon } from "static/svg/user_icon.svg";

function SidebarMenuButton({ text }) {
    /*
    Button of Menu of Sidebar
    */

    return (
        <button className="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick h-max w-full px-4 text-left text-2xl">
            {text}
        </button>
    );
}

function SidebarMenu() {
    /*
    Menu of Sidebar containing buttons to navigate to pages with videos
    */

    return (
        <div className="flex w-full flex-col gap-3 px-3">
            <SidebarMenuButton text="Главная" />
            <SidebarMenuButton text="Подписки" />
            <SidebarMenuButton text="История" />
            <SidebarMenuButton text="Понравившиеся" />
        </div>
    );
}

function SidebarSubscription() {
    /*
    Button of Sidebar that contains the name and avatar of the channel the user is subscribed to, and when clicked redirects to the channel page
    */

    return (
        <div>
            <button className="bg-green-l clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick flex w-full items-center justify-start gap-2 px-3 py-1">
                <div className="clip-polygon-octagon flex size-8 items-center justify-center bg-white">
                    <UserIcon className="w-7" />
                </div>
                <p className="font-play text-xl">Название канала</p>
            </button>
        </div>
    );
}

export default function Sidebar() {
    /*
    Sidebar of Main Shell contains links to the video pages:
        - Main page
        - Watched videos history page
        - Liked videos page
        - User's videos playlist
        - User's subscriptions
    */

    const { isUserAuthenticated } = useContext(AuthStatusContext);

    return (
        <div className="bg-green-l z-10 flex w-64 flex-col items-start gap-5 overflow-auto py-5">
            <SidebarMenu />
            {isUserAuthenticated == null ? (
                <div></div>
            ) : (
                isUserAuthenticated && (
                    <>
                        <div className="h-px w-full bg-black"></div>
                        <div className="flex w-full flex-col gap-3 px-3">
                            <p className="font-play text-left text-3xl">
                                Подписки
                            </p>
                            <SidebarSubscription />
                        </div>
                    </>
                )
            )}
        </div>
    );
}
