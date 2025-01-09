import axios from "axios";
import { useContext, useState, useEffect, useActionState } from "react";

import {
    inputDefaultColorClass,
    inputErrorColorClass,
    MainShellPanelsVisibilityContext,
} from "./mainShell.js";

function LoginInput({
    inputName,
    inputType,
    labelText,
    labelColor,
    isKeepValueAfterSubmit = false,
}) {
    const [inputValue, setInputValue] = useState("");

    function keepValue(event) {
        setInputValue(event.target.value);
    }

    return (
        <div className={`clip-polygon-steep-2 size-max p-[2px] ${labelColor}`}>
            <div className="clip-polygon-steep-2 flex flex-row">
                <label
                    className={`font-play h-full w-[210px] text-center ${labelColor}`}
                    htmlFor={`login-${inputName}`}
                >
                    {labelText}
                </label>
                <input
                    id={`login-${inputName}`}
                    className="w-[350px] pl-2 pr-5 outline-none"
                    type={inputType}
                    name={inputName}
                    {...(isKeepValueAfterSubmit && {
                        value: inputValue,
                        onChange: keepValue,
                    })}
                    required
                />
            </div>
        </div>
    );
}

function LoginForm() {
    const [errorMessages, setErrorMessages] = useState([]);

    const [loginnameColor, setLoginnameColor] = useState(
        inputDefaultColorClass,
    );
    const [passwordColor, setPasswordColor] = useState(inputDefaultColorClass);

    // Post request to login
    async function login(prevState, formData) {
        let errors = await axios
            .post(
                "/auth/login",
                {
                    loginname: formData.get("loginname"),
                    password: formData.get("password"),
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                    },
                },
            )
            .then((response) => {
                window.location.reload();
                return {};
            })
            .catch((error) => {
                return error.response.data["errors"];
            });
        return errors;
    }

    // Get errors, if any
    const [errors, loginAction] = useActionState(login, {});

    // Display errors, if any
    useEffect(() => {
        // Clear the error text box and remove the error color from the input fields
        setErrorMessages([]);
        setLoginnameColor(inputDefaultColorClass);
        setPasswordColor(inputDefaultColorClass);

        for (const [field, errorsList] of Object.entries(errors)) {
            // Color field with error
            switch (field) {
                case "__all__":
                    setLoginnameColor(inputErrorColorClass);
                    setPasswordColor(inputErrorColorClass);
                    break;
                case "email":
                case "username":
                    setLoginnameColor(inputErrorColorClass);
                    break;
                case "password":
                    setPasswordColor(inputErrorColorClass);
                    break;
                default:
                    break;
            }
            // Write error message
            errorsList.forEach((error) => {
                // error["code"]
                setErrorMessages((e) => [...e, error["message"]]);
            });
        }
    }, [errors]);

    // Form
    return (
        <form className="flex flex-col items-center gap-5" action={loginAction}>
            <div className="font-play text-red-l w-[500px] text-left">
                {errorMessages.map((message) => (
                    <p>{message}</p>
                ))}
            </div>

            <LoginInput
                inputName="loginname"
                inputType="text"
                labelText="Логин или E-mail"
                labelColor={loginnameColor}
                isKeepValueAfterSubmit={true}
            />
            <LoginInput
                inputName="password"
                inputType="password"
                labelText="Пароль"
                labelColor={passwordColor}
                isKeepValueAfterSubmit={false}
            />

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
    const { setIsLoginPanelVisible, setIsRegistrationPanelVisible } =
        useContext(MainShellPanelsVisibilityContext);

    return (
        <div
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
                            setIsRegistrationPanelVisible(true);
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
