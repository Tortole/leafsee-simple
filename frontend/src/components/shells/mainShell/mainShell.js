import { useState, createContext } from "react";

import Topbar from "./topbar.js";
import NotificationMenu from "./notificationMenu.js";
import UserSubmenu from "./userSubmenu.js";
import Sidebar from "./sidebar.js";
import LoginPanel from "./loginPanel.js";
import RegisterPanel from "./registerPanel.js";

export const inputDefaultColorClass = "bg-green-l";
export const inputErrorColorClass = "bg-red-l";

export const MainShellPanelsVisibilityContext = createContext();

export default function MainShell(props) {
    const [isNotificationsPanelVisible, setIsNotificationsPanelVisible] =
        useState(false);
    const [isTopbarMenuPanelVisible, setIsTopbarMenuPanelVisible] =
        useState(false);
    const [isLoginPanelVisible, setIsLoginPanelVisible] = useState(false);
    const [isRegisterPanelVisible, setIsRegisterPanelVisible] = useState(false);

    return (
        <div>
            <MainShellPanelsVisibilityContext.Provider
                value={{
                    setIsNotificationsPanelVisible,
                    setIsTopbarMenuPanelVisible,
                    setIsLoginPanelVisible,
                    setIsRegisterPanelVisible,
                }}
            >
                <Topbar />
                {isLoginPanelVisible && <LoginPanel />}
                {isRegisterPanelVisible && <RegisterPanel />}
            </MainShellPanelsVisibilityContext.Provider>
            <div className="top-12 flex h-[calc(100vh-3rem)] w-full">
                <Sidebar />
                <main className="bg-gray-n z-0 h-full flex-grow overflow-auto p-4">
                    {props.children}
                </main>
            </div>
            {isNotificationsPanelVisible && <NotificationMenu />}
            {isTopbarMenuPanelVisible && <UserSubmenu />}
        </div>
    );
}
