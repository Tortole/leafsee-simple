import axios from "axios";
import { useState, useContext } from "react";

import { MainShellPanelsVisibilityContext } from "./mainShell.js";

function LoginForm() {
    const [errorDisplayText, setErrorDisplayText] = useState("");

    function submitForm(formData) {
        console.log(formData);

        // axios
        //     .post("/auth/login", formData, {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     })
        //     .catch((error) => setErrorDisplayText(error));
    }

    return (
        <form
            id="login-form"
            className="flex flex-col items-center gap-5"
            onSubmit={(event) => {
                event.preventDefault();
                console.log(event);
            }}
            action={submitForm}
        >
            <p
                id="login-error-text"
                className="font-play text-red-l w-[500px] text-left"
            >
                {errorDisplayText}
            </p>

            <div
                id="login-login-inputwraper"
                className="login-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
            >
                <div className="clip-polygon-steep-2 flex flex-row">
                    <label
                        className="bg-green-l font-play h-full w-[210px] text-center"
                        for="login"
                    >
                        Логин или E-mail
                    </label>
                    <input
                        id="login"
                        className="w-[350px] pl-2 pr-5 outline-none"
                        type="text"
                        name="login"
                        required
                    />
                </div>
            </div>

            <div
                id="login-password-inputwraper"
                className="login-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
            >
                <div className="clip-polygon-steep-2 flex flex-row">
                    <label
                        className="bg-green-l font-play h-full w-[210px] text-center"
                        for="password"
                    >
                        Пароль
                    </label>
                    <input
                        id="password"
                        className="w-[350px] pl-2 pr-5 outline-none"
                        type="password"
                        name="password"
                        required
                    />
                </div>
            </div>

            <button
                className="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick w-36 text-xl outline-none"
                type="submit"
            >
                Вход
            </button>
        </form>
    );
}

export default function LoginPanel() {
    const { setIsLoginPanelVisible, setIsRegisterPanelVisible } = useContext(
        MainShellPanelsVisibilityContext,
    );

    return (
        <div
            id="login-form-wrapper"
            className="absolute left-0 top-0 z-[100] flex h-full w-full justify-center bg-black bg-opacity-50 pt-24"
            onClick={() => setIsLoginPanelVisible(false)}
        >
            <div
                className="clip-polygon-right-2 z-[110] size-max"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="bg-gray-d flex h-max w-full flex-row">
                    <div className="clip-polygon-right-top bg-gray-n font-play w-1/2 py-3 text-center text-3xl">
                        Вход
                    </div>
                    <button
                        className="font-play w-1/2 py-3 text-3xl"
                        onClick={() => {
                            setIsRegisterPanelVisible(true);
                            setIsLoginPanelVisible(false);
                        }}
                    >
                        Регистрация
                    </button>
                </div>
                <div className="bg-gray-n size-max min-h-[300px] min-w-[800px] p-14">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
