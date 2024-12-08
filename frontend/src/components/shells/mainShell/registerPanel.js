function RegisterForm() {
    return (
        <form
            id="registration-form"
            className="flex flex-col items-center gap-5"
            method="POST"
            action="{% url 'registration' %}"
        >
            <p
                id="registration-error-text"
                className="font-play text-red-l flex w-[500px] flex-col gap-2 text-left"
            ></p>

            <div className="bg-green-l clip-polygon-right-2 p-[1px]">
                <div className="bg-gray-n clip-polygon-right-2 flex size-max flex-col items-center gap-5 p-5">
                    <p className="font-play w-full text-left text-xs">
                        Обязательные поля
                    </p>

                    <div
                        id="registration-username-inputwraper"
                        className="registration-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
                    >
                        <div className="clip-polygon-steep-2 flex flex-row">
                            <label
                                className="bg-green-l font-play h-full w-[210px] text-center"
                                for="username"
                            >
                                Имя пользователя
                            </label>
                            <input
                                id="username"
                                className="w-[350px] pl-2 pr-5 outline-none"
                                type="text"
                                name="username"
                                required
                            />
                        </div>
                    </div>

                    <div
                        id="registration-password1-inputwraper"
                        className="registration-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
                    >
                        <div className="clip-polygon-steep-2 flex flex-row">
                            <label
                                className="bg-green-l font-play h-full w-[210px] text-center"
                                for="password1"
                            >
                                Пароль
                            </label>
                            <input
                                id="password1"
                                className="w-[350px] pl-2 pr-5 outline-none"
                                type="password"
                                name="password1"
                                required
                            />
                        </div>
                    </div>

                    <div
                        id="registration-password2-inputwraper"
                        className="registration-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
                    >
                        <div className="clip-polygon-steep-2 flex flex-row">
                            <label
                                className="bg-green-l font-play h-full w-[210px] text-center"
                                for="password2"
                            >
                                Пароль ещё раз
                            </label>
                            <input
                                id="password2"
                                className="w-[350px] pl-2 pr-5 outline-none"
                                type="password"
                                name="password2"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-green-l clip-polygon-right-2 p-[1px]">
                <div className="bg-gray-n clip-polygon-right-2 flex size-max flex-col items-center gap-5 p-5">
                    <p className="font-play w-full text-left text-xs">
                        Необязательные поля
                    </p>
                    <div
                        id="registration-email-inputwraper"
                        className="registration-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
                    >
                        <div className="clip-polygon-steep-2 flex flex-row">
                            <label
                                className="bg-green-l font-play h-full w-[210px] text-center"
                                for="email"
                            >
                                Электронная почта
                            </label>
                            <input
                                id="email"
                                className="w-[350px] pl-2 pr-5 outline-none"
                                type="text"
                                name="email"
                            />
                        </div>
                    </div>

                    <div
                        id="registration-nickname-inputwraper"
                        className="registration-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
                    >
                        <div className="clip-polygon-steep-2 flex flex-row">
                            <label
                                className="bg-green-l font-play h-full w-[210px] text-center"
                                for="nickname"
                            >
                                Никнейм
                            </label>
                            <input
                                id="nickname"
                                className="w-[350px] pl-2 pr-5 outline-none"
                                type="text"
                                name="nickname"
                            />
                        </div>
                    </div>

                    <div
                        id="registration-first-name-inputwraper"
                        className="registration-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
                    >
                        <div className="clip-polygon-steep-2 flex flex-row">
                            <label
                                className="bg-green-l font-play h-full w-[210px] text-center"
                                for="first-name"
                            >
                                Имя
                            </label>
                            <input
                                id="first-name"
                                className="w-[350px] pl-2 pr-5 outline-none"
                                type="text"
                                name="first_name"
                            />
                        </div>
                    </div>

                    <div
                        id="registration-last-name-inputwraper"
                        className="registration-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
                    >
                        <div className="clip-polygon-steep-2 flex flex-row">
                            <label
                                className="bg-green-l font-play h-full w-[210px] text-center"
                                for="last-name"
                            >
                                Фамилия
                            </label>
                            <input
                                id="last-name"
                                className="w-[350px] pl-2 pr-5 outline-none"
                                type="text"
                                name="last_name"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick w-44 text-xl outline-none"
                type="submit"
            >
                Регистрация
            </button>
            <input type="hidden" name="next" value="{% url 'main' %}" />
        </form>
    );
}

export default function RegisterPanel() {
    return (
        <div
            id="registration-form-wrapper"
            className="absolute left-0 top-0 z-[100] flex h-full w-full justify-center bg-black bg-opacity-50 pt-24"
            onclick="toggleElement('registration-form-wrapper')"
        >
            <div
                className="clip-polygon-right-2 z-[110] size-max"
                onclick="stopPropagation(event)"
            >
                <div className="bg-gray-d flex h-max w-full flex-row">
                    <button
                        className="font-play w-1/2 py-3 text-3xl"
                        onclick="switchLoginRegister()"
                    >
                        Вход
                    </button>
                    <div className="clip-polygon-right-top bg-gray-n font-play w-1/2 py-3 text-center text-3xl">
                        Регистрация
                    </div>
                </div>
                <div className="bg-gray-n size-max min-h-[300px] min-w-[800px] p-14">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
