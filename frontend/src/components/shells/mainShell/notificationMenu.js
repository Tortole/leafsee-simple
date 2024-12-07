function NotificationMenuLine() {
    return (
        <div className="clip-polygon-right-2 hover:bg-green-ll-hover active:bg-green-ll-onclick px-4 py-2">
            <p className="font-play font-bold">Вам ответили на комментарий</p>
            <p className="font-play text-sm">
                Пользователь rubiroit ответил вам на комментарий “Если я не
                ошибаюсь, то вилка не подходит для зам...”
            </p>
        </div>
    );
}

export default function NotificationMenu() {
    let isNotifications = false;

    return (
        <div className="bg-green-l clip-polygon-right-2 absolute right-8 top-16 z-20 flex h-[520px] w-[400px] items-center justify-center">
            <div className="bg-green-ll clip-polygon-right-2 h-[calc(100%-4px)] w-[calc(100%-4px)]">
                {isNotifications ? (
                    <div className="flex h-full w-full flex-col justify-start px-4 py-3">
                        <NotificationMenuLine />
                    </div>
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <p className="font-play text-center text-5xl opacity-50">
                            Уведомлений <br />
                            нет
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
