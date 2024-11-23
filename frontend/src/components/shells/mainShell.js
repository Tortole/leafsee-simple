import { ReactComponent as BurgerMenuButton } from "../../static/svg/burger_menu_button.svg";

function BurgerButtonSidebar() {
    return (
        <button class="clip-polygon-octagon hover:bg-green-l-hover active:bg-green-l-onclick float-left flex size-10 items-center justify-center">
            <BurgerMenuButton class="w-8" />
        </button>
    );
}

function MainShell() {
    return (
        <div>
            <BurgerButtonSidebar />
        </div>
    );
}

export default MainShell;
