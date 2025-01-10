import axios from "axios";
import { useContext, useState, useEffect, useActionState } from "react";

import {
    inputDefaultColorClass,
    inputErrorColorClass,
    MainShellPanelsVisibilityContext,
} from "./mainShell.js";

function RegistrationInput({
    inputName,
    inputType,
    labelText,
    labelColor,
    isKeepValueAfterSubmit = false,
    isRequired = false,
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
                    htmlFor={`registration-${inputName}`}
                >
                    {labelText}
                </label>
                <input
                    id={`registration-${inputName}`}
                    className="w-[350px] pl-2 pr-5 outline-none"
                    type={inputType}
                    name={inputName}
                    {...(isKeepValueAfterSubmit && {
                        value: inputValue,
                        onChange: keepValue,
                    })}
                    required={isRequired}
                />
            </div>
        </div>
    );
}

function RegistrationForm() {
    const [errorMessages, setErrorMessages] = useState([]);

    const [usernameColor, setUsernameColor] = useState(inputDefaultColorClass);
    const [passwordColor, setPasswordColor] = useState(inputDefaultColorClass);
    const [emailColor, setEmailColor] = useState(inputDefaultColorClass);
    const [nicknameColor, setNicknameColor] = useState(inputDefaultColorClass);
    const [firstNameColor, setFirstNameColor] = useState(
        inputDefaultColorClass,
    );
    const [lastNameColor, setLastNameColor] = useState(inputDefaultColorClass);

    // Post request to registration
    async function registration(prevState, formData) {
        let errors = await axios
            .post(
                "/auth/registration",
                {
                    username: formData.get("username"),
                    password1: formData.get("password1"),
                    password2: formData.get("password2"),
                    email: formData.get("email"),
                    nickname: formData.get("nickname"),
                    first_name: formData.get("first_name"),
                    last_name: formData.get("last_name"),
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
    const [errors, registrationAction] = useActionState(registration, {});

    // Display errors, if any
    useEffect(() => {
        // Clear the error text box and remove the error color from the input fields
        setErrorMessages([]);

        setUsernameColor(inputDefaultColorClass);
        setPasswordColor(inputDefaultColorClass);
        setEmailColor(inputDefaultColorClass);
        setNicknameColor(inputDefaultColorClass);
        setFirstNameColor(inputDefaultColorClass);
        setLastNameColor(inputDefaultColorClass);

        for (const [field, errorsList] of Object.entries(errors)) {
            // Color field with error
            switch (field) {
                case "__all__":
                    setUsernameColor(inputErrorColorClass);
                    setPasswordColor(inputErrorColorClass);
                    setEmailColor(inputErrorColorClass);
                    setNicknameColor(inputErrorColorClass);
                    setFirstNameColor(inputErrorColorClass);
                    setLastNameColor(inputErrorColorClass);
                    break;
                case "username":
                    setUsernameColor(inputErrorColorClass);
                    break;
                case "password1":
                case "password2":
                    setPasswordColor(inputErrorColorClass);
                    break;
                case "email":
                    setEmailColor(inputErrorColorClass);
                    break;
                case "nickname":
                    setNicknameColor(inputErrorColorClass);
                    break;
                case "first_name":
                    setFirstNameColor(inputErrorColorClass);
                    break;
                case "last_name":
                    setLastNameColor(inputErrorColorClass);
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
        <form
            className="flex flex-col items-center gap-5"
            action={registrationAction}
        >
            <div className="font-play text-red-l w-[500px] text-left">
                {errorMessages.map((message) => (
                    <p>{message}</p>
                ))}
            </div>

            <div className="bg-green-l clip-polygon-right-2 p-[1px]">
                <div className="bg-gray-n clip-polygon-right-2 flex size-max flex-col items-center gap-5 p-5">
                    <p className="font-play w-full text-left text-xs">
                        Обязательные поля
                    </p>

                    <RegistrationInput
                        inputName="username"
                        inputType="text"
                        labelText="Имя пользователя"
                        labelColor={usernameColor}
                        isKeepValueAfterSubmit={true}
                        isRequired={true}
                    />
                    <RegistrationInput
                        inputName="password1"
                        inputType="password"
                        labelText="Пароль"
                        labelColor={passwordColor}
                        isKeepValueAfterSubmit={false}
                        isRequired={true}
                    />
                    <RegistrationInput
                        inputName="password2"
                        inputType="password"
                        labelText="Пароль ещё раз"
                        labelColor={passwordColor}
                        isKeepValueAfterSubmit={false}
                        isRequired={true}
                    />
                </div>
            </div>

            <div className="bg-green-l clip-polygon-right-2 p-[1px]">
                <div className="bg-gray-n clip-polygon-right-2 flex size-max flex-col items-center gap-5 p-5">
                    <p className="font-play w-full text-left text-xs">
                        Необязательные поля
                    </p>

                    <RegistrationInput
                        inputName="email"
                        inputType="email"
                        labelText="Электронная почта"
                        labelColor={emailColor}
                        isKeepValueAfterSubmit={true}
                        isRequired={false}
                    />
                    <RegistrationInput
                        inputName="nickname"
                        inputType="text"
                        labelText="Никнейм"
                        labelColor={nicknameColor}
                        isKeepValueAfterSubmit={true}
                        isRequired={false}
                    />
                    <RegistrationInput
                        inputName="first_name"
                        inputType="text"
                        labelText="Имя"
                        labelColor={firstNameColor}
                        isKeepValueAfterSubmit={true}
                        isRequired={false}
                    />
                    <RegistrationInput
                        inputName="last_name"
                        inputType="text"
                        labelText="Фамилия"
                        labelColor={lastNameColor}
                        isKeepValueAfterSubmit={true}
                        isRequired={false}
                    />
                </div>
            </div>

            <button
                className="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick w-44 text-xl outline-none"
                type="submit"
            >
                Регистрация
            </button>
        </form>
    );
}

export default function RegistrationPanel() {
    const { setIsLoginPanelVisible, setIsRegistrationPanelVisible } =
        useContext(MainShellPanelsVisibilityContext);

    return (
        <div
            className="absolute left-0 top-0 z-[100] flex h-full w-full justify-center bg-black bg-opacity-50 pt-24"
            onClick={() => setIsRegistrationPanelVisible(false)}
        >
            <div
                className="clip-polygon-right-2 z-[110] size-max"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="bg-gray-d flex h-max w-full flex-row">
                    <button
                        className="font-play w-1/2 py-3 text-3xl"
                        onClick={() => {
                            setIsRegistrationPanelVisible(false);
                            setIsLoginPanelVisible(true);
                        }}
                    >
                        Вход
                    </button>
                    <div className="clip-polygon-right-top bg-gray-n font-play w-1/2 py-3 text-center text-3xl">
                        Регистрация
                    </div>
                </div>
                <div className="bg-gray-n size-max min-h-[300px] min-w-[800px] p-14">
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}
