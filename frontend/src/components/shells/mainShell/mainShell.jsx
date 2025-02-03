/*
Main Shell components, which are displayed on most pages of the site
*/

import { createContext, useState } from "react";

import LoginPanel from "./loginPanel";
import NotificationMenu from "./notificationMenu";
import RegistrationPanel from "./registrationPanel";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import TopbarUserSubmenu from "./topbarUserSubmenu";

export const inputDefaultColorClass = "bg-green-l";
export const inputErrorColorClass = "bg-red-l";

export const MainShellPanelsVisibilityContext = createContext();

export default function MainShell(props) {
    /*
    Main Shell contains topbar and sidebar for authentication and navigating the site
    */

    const [isNotificationsPanelVisible, setIsNotificationsPanelVisible] =
        useState(false);
    const [isTopbarMenuPanelVisible, setIsTopbarMenuPanelVisible] =
        useState(false);
    const [isLoginPanelVisible, setIsLoginPanelVisible] = useState(false);
    const [isRegistrationPanelVisible, setIsRegistrationPanelVisible] =
        useState(false);

    return (
        <div>
            <MainShellPanelsVisibilityContext.Provider
                value={{
                    setIsNotificationsPanelVisible,
                    setIsTopbarMenuPanelVisible,
                    setIsLoginPanelVisible,
                    setIsRegistrationPanelVisible,
                }}
            >
                <Topbar />
                {isLoginPanelVisible && <LoginPanel />}
                {isRegistrationPanelVisible && <RegistrationPanel />}
            </MainShellPanelsVisibilityContext.Provider>
            <div className="top-12 flex h-[calc(100vh-3rem)] w-full">
                <Sidebar />
                <main className="bg-gray-n z-0 h-full flex-grow overflow-auto p-4">
                    {props.children}
                </main>
            </div>
            {isNotificationsPanelVisible && <NotificationMenu />}
            {isTopbarMenuPanelVisible && <TopbarUserSubmenu />}
        </div>
    );
}
