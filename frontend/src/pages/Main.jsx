/*
Main page components that should be loaded by default unless another page is requested
*/

import MainShell from "components/shells/mainShell/mainShell";

function Main() {
    /*
    Main page component with grid with recommended videos
    */

    return (
        <div>
            <MainShell>
                <h1 className="w-24">This is Home page</h1>
            </MainShell>
        </div>
    );
}

export default Main;
