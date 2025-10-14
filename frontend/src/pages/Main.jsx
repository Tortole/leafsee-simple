/*
Main page components that should be loaded by default unless another page is requested
*/

import MainShell from "components/shells/mainShell/mainShell";
import MainPageGrid from "components/videoGrids/mainPageVideoGrid";

function Main() {
    /*
    Main page component with grid with recommended videos
    */

    return (
        <div>
            <MainShell>
                <MainPageGrid></MainPageGrid>
            </MainShell>
        </div>
    );
}

export default Main;
