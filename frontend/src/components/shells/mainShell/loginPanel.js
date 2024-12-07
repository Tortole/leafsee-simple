function LoginForm() {
    return (
        <form
            id="login-form"
            class="flex flex-col items-center gap-5"
            method="POST"
            action="{% url 'login' %}"
        >
            <p
                id="login-error-text"
                class="font-play text-red-l w-[500px] text-left"
            ></p>

            <div
                id="login-login-inputwraper"
                class="login-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
            >
                <div class="clip-polygon-steep-2 flex flex-row">
                    <label
                        class="bg-green-l font-play h-full w-[210px] text-center"
                        for="login"
                    >
                        Логин или E-mail
                    </label>
                    <input
                        id="login"
                        class="w-[350px] pl-2 pr-5 outline-none"
                        type="text"
                        name="login"
                        required
                    />
                </div>
            </div>

            <div
                id="login-password-inputwraper"
                class="login-inputwraper bg-green-l clip-polygon-steep-2 size-max p-[2px]"
            >
                <div class="clip-polygon-steep-2 flex flex-row">
                    <label
                        class="bg-green-l font-play h-full w-[210px] text-center"
                        for="password"
                    >
                        Пароль
                    </label>
                    <input
                        id="password"
                        class="w-[350px] pl-2 pr-5 outline-none"
                        type="password"
                        name="password"
                        required
                    />
                </div>
            </div>

            <button
                class="bg-green-l font-play clip-polygon-steep-2 hover:bg-green-l-hover active:bg-green-l-onclick w-36 text-xl outline-none"
                type="submit"
            >
                Вход
            </button>
            <input type="hidden" name="next" value="{% url 'main' %}" />
        </form>
    );
}

export default function LoginPanel() {
    return (
        <div
            id="login-form-wrapper"
            class="absolute left-0 top-0 z-[100] flex h-full w-full justify-center bg-black bg-opacity-50 pt-24"
            onclick="toggleElement('login-form-wrapper')"
        >
            <div
                class="clip-polygon-right-2 z-[110] size-max"
                onclick="stopPropagation(event)"
            >
                <div class="bg-gray-d flex h-max w-full flex-row">
                    <div class="clip-polygon-right-top bg-gray-n font-play w-1/2 py-3 text-center text-3xl">
                        Вход
                    </div>
                    <button
                        class="font-play w-1/2 py-3 text-3xl"
                        onclick="switchLoginRegister()"
                    >
                        Регистрация
                    </button>
                </div>
                <div class="bg-gray-n size-max min-h-[300px] min-w-[800px] p-14">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
