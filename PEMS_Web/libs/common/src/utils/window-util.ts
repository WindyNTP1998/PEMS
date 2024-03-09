import { BravoStyleSheetUtil } from './style-sheet-util';

export class BravoWindowUtil {
    public static defaultPopupSizeScale = 0.9;

    public static getViewportWidth() {
        return window.innerWidth > 0
            ? window.innerWidth
            : document.documentElement != undefined && document.documentElement.clientWidth > 0
            ? document.documentElement.clientWidth
            : screen.width;
    }

    public static getViewportHeight() {
        return window.innerHeight > 0
            ? window.innerHeight
            : document.documentElement != undefined && document.documentElement.clientHeight > 0
            ? document.documentElement.clientHeight
            : screen.height;
    }

    public static getPopupCenterFeatures(popupWidthInPxOrScale?: number, popupHeightInPxOrScale?: number): string {
        // Fixes dual-screen position                           Most browsers       Firefox
        const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

        const viewportWidth = BravoWindowUtil.getViewportWidth();
        const viewportHeight = BravoWindowUtil.getViewportHeight();
        const popupWidth =
            popupWidthInPxOrScale != undefined
                ? popupWidthInPxOrScale > 1
                    ? popupWidthInPxOrScale
                    : popupWidthInPxOrScale * viewportWidth
                : viewportWidth * BravoWindowUtil.defaultPopupSizeScale;
        const popupHeight =
            popupHeightInPxOrScale != undefined
                ? popupHeightInPxOrScale > 1
                    ? popupHeightInPxOrScale
                    : popupHeightInPxOrScale * viewportHeight
                : viewportHeight * BravoWindowUtil.defaultPopupSizeScale;

        const left = viewportWidth / 2 - popupWidth / 2 + dualScreenLeft;
        const top = viewportHeight / 2 - popupHeight / 2 + dualScreenTop;
        return (
            'scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,' +
            'width=' +
            popupWidth +
            ', height=' +
            popupHeight +
            ', top=' +
            top +
            ', left=' +
            left
        );
    }

    public static popupCenterByUrl(
        url: string,
        popupWidthInPxOrScale?: number,
        popupHeightInPxOrScale?: number
    ): Window | undefined {
        const newWindow = window.open(
            url,
            '_blank',
            BravoWindowUtil.getPopupCenterFeatures(popupWidthInPxOrScale, popupHeightInPxOrScale)
        );
        if (newWindow != undefined) newWindow.focus();
        return <Window | undefined>newWindow;
    }

    public static popupCenterByEl(
        el: HTMLElement,
        popupWidthInPxOrScale?: number,
        popupHeightInPxOrScale?: number,
        additionHeadInnerHtml?: string
    ): Window | undefined {
        const newWindow = window.open(
            '',
            '_blank',
            BravoWindowUtil.getPopupCenterFeatures(popupWidthInPxOrScale, popupHeightInPxOrScale)
        );
        if (newWindow != undefined) {
            newWindow.document.open();
            newWindow.document.write(`
            <html>
                <head>
                    ${BravoStyleSheetUtil.getCurrentDocumentStyleElementsAsString()}
                    ${additionHeadInnerHtml != undefined ? additionHeadInnerHtml : ''}
                </head>
                <body>
                    ${el.outerHTML}
                </body>
            </html>`);
            newWindow.document.close();
        }
        if (newWindow != undefined) newWindow.focus();
        return <Window | undefined>newWindow;
    }
}
