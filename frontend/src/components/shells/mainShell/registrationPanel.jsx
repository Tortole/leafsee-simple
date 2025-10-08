/*
Registration panel components for user registration
*/

import axios from "axios";
import { useActionState, useContext, useState } from "react";

import {
    MainShellPanelsVisibilityContext,
    inputDefaultColorClass,
    inputErrorColorClass,
} from "./mainShell";

function RegistrationInput({
    inputName,
    inputType,
    labelText,
    errorFields,
    isKeepValueAfterSubmit = false,
    isRequired = false,
}) {
    /*
    Input field of Registration Form that controls the appearance of the field and its value
    */

    // Keeping Input field values after form submit
    const [inputValue, setInputValue] = useState("");
    function keepValue(event) {
        setInputValue(event.target.value);
    }

    /*
    If the errorFields has "__all__" value or inputName,
    then color the label with the error color,
    otherwise color it with the default color
    */
    const labelColor =
        errorFields.has("__all__") || errorFields.has(inputName)
            ? inputErrorColorClass
            : inputDefaultColorClass;

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
    /*
    Registration Form of Registration Panel that:
        - draws the component of the registration form
        - accepts data entered by the user
        - sends data to the server
        - processes errors returned from the server
    */

    // POST request to registration
    async function registration(prevState, formData) {
        /*
        Sends a POST request to the server for user registration and handles the returned errors, if any

        Params:
            prevState - previous state of the value returned by the function
            formData - form data when the user submits the form

        Returns:
            errorsParsed - parsed form errors returned by the server after receiving the form data
                - messages - all error messages
                - fields - input fields containing errors
        */

        const errorsReturned = await axios
            .post("/auth/registration", Object.fromEntries(formData), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            })
            .then(() => {
                // Refresh the page on successful registration
                window.location.reload();
            })
            .catch((error) => error.response.data.errors);

        // Errors in the parsed form
        const errorsParsed = { messages: [], fields: new Set() };

        // Loop through the names of form input fields containing errors and the list of their errors
        for (const [field, errorsList] of Object.entries(errorsReturned)) {
            /*
                Input fields that should have been highlighted with an error
                The variable field can contain:
                    - __all__ - error in all input fields
                    - <input field name> - error in an input field with the same name
            */
            errorsParsed.fields.add(field);

            // Add name of second password input field, if there is one
            if (field === "password1" || field === "password2") {
                errorsParsed.fields.add("password1");
                errorsParsed.fields.add("password2");
            }

            // Error list processing
            errorsList.forEach((error) => {
                /*
                    Each errorsList item contains:
                        - code - error code
                        - message - error message
                */
                errorsParsed.messages.push(error.message);
            });
        }

        return errorsParsed;
    }

    // Registration action runs the registration function when the user submits the form and passes errors to the errors variable
    const [errors, registrationAction] = useActionState(registration, {
        messages: [],
        fields: new Set(),
    });

    // Form component
    return (
        <form
            className="flex flex-col items-center gap-5"
            action={registrationAction}
        >
            <div className="font-play text-red-l w-[500px] text-left">
                {errors.messages.map((message) => (
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
                        errorFields={errors.fields}
                        isKeepValueAfterSubmit={true}
                        isRequired={true}
                    />
                    <RegistrationInput
                        inputName="password1"
                        inputType="password"
                        labelText="Пароль"
                        errorFields={errors.fields}
                        isKeepValueAfterSubmit={false}
                        isRequired={true}
                    />
                    <RegistrationInput
                        inputName="password2"
                        inputType="password"
                        labelText="Пароль ещё раз"
                        errorFields={errors.fields}
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
                        errorFields={errors.fields}
                        isKeepValueAfterSubmit={true}
                        isRequired={false}
                    />
                    <RegistrationInput
                        inputName="nickname"
                        inputType="text"
                        labelText="Никнейм"
                        errorFields={errors.fields}
                        isKeepValueAfterSubmit={true}
                        isRequired={false}
                    />
                    <RegistrationInput
                        inputName="first_name"
                        inputType="text"
                        labelText="Имя"
                        errorFields={errors.fields}
                        isKeepValueAfterSubmit={true}
                        isRequired={false}
                    />
                    <RegistrationInput
                        inputName="last_name"
                        inputType="text"
                        labelText="Фамилия"
                        errorFields={errors.fields}
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
    /*
    Registration Panel that appears on the top of the page and contains:
        - button to close Registration Panel
        - buttons to switch between Login and Register panels
        - registration form
    */

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
