/*
File with the roundViewsCount function for converting a views count to an abbreviated form
*/

export default function roundViewsCount(viewsCount) {
    /*
    Convert a views count in string type to an abbreviated form with a letter postfix

    Params:
        viewsCount - string - views count in string type

    Return:
        roundViewsCount - string - rounded views count in abbreviated form with a letter postfix
    */

    const viewsCountStr = viewsCount.toString();
    switch (viewsCountStr.length) {
        case 1: // ones
        case 2: // tens
        case 3: // hundreds
            return viewsCountStr;

        case 4: // ones of thousands
            return viewsCountStr[0] + (viewsCountStr[1] ? "." + viewsCountStr[1] : "") + "K";
        case 5: // tens of thousands
            return viewsCountStr.substring(0, 2) + "K";
        case 6: // hundreds of thousands
            return viewsCountStr.substring(0, 3) + "K";

        case 7: // ones of millions
            return viewsCountStr[0] + (viewsCountStr[1] ? "." + viewsCountStr[1] : "") + "M";
        case 8: // tens of millions
            return viewsCountStr.substring(0, 2) + "M";
        case 9: // hundreds of millions
            return viewsCountStr.substring(0, 3) + "M";

        case 10: // ones of billions
            return viewsCountStr[0] + (viewsCountStr[1] ? "." + viewsCountStr[1] : "") + "B";
        case 11: // tens of billions
            return viewsCountStr.substring(0, 2) + "B";
        case 12: // hundreds of billions
            return viewsCountStr.substring(0, 3) + "B";

        default: // more than trillion
            return ">1T";
    }
}
