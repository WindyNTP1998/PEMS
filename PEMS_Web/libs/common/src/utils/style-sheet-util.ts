/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSObject } from 'highcharts';

import { BravoStringUtil } from './string-util';

export class BravoStyleSheetUtil {
    public static addCSSRule(
        styleSheetId: string | undefined,
        selector: string,
        rules: any,
        fromDocument?: Document
    ): number {
        const sheet: CSSStyleSheet = this.getStyleSheetById(styleSheetId, fromDocument);
        const newRuleIndex: number = this.addRules(sheet, selector, rules);
        return newRuleIndex;
    }

    public static addRules(sheet: CSSStyleSheet, selector: string, rules: any, index: number = 0): number {
        const styles: string = typeof rules !== 'string' ? this.toStringStyle(rules) : rules;

        if (sheet.insertRule != undefined && !BravoStringUtil.isNullOrEmpty(styles)) {
            const rule: string = selector + ' {' + styles + '}';
            return sheet.insertRule(rule, sheet.cssRules != undefined ? sheet.cssRules.length : 0);
        }

        if (sheet.addRule != undefined && !BravoStringUtil.isNullOrEmpty(styles)) {
            return sheet.addRule(selector, styles);
        }

        return -1;
    }

    public static updateCssRule(selector: string, rules: object, styleSheetId: string, fromDocument?: Document) {
        const sheet: CSSStyleSheet = this.getStyleSheetById(styleSheetId, fromDocument);
        this.removeExistedRule(sheet, selector);
        return this.addRules(sheet, selector, rules, sheet.cssRules.length + 1);
    }

    public static removeAllRules(styleSheetId: string, fromDocument?: Document) {
        const sheet: CSSStyleSheet = this.getStyleSheetById(styleSheetId, fromDocument);
        for (let i = 0; i < sheet.cssRules.length; i++) {
            sheet.deleteRule(i);
        }
    }

    public static removeExistedRule(sheet: CSSStyleSheet | string, selector: string) {
        if (typeof sheet == 'string') {
            this.removeExistedRule(this.getStyleSheetById(sheet), selector);
        } else {
            for (let i = 0; i < sheet.cssRules.length; i++) {
                const cssStyleRule: CSSStyleRule = sheet.cssRules[i] as CSSStyleRule;
                if (cssStyleRule.selectorText === selector) {
                    sheet.deleteRule(i);
                    return;
                }
            }
        }
    }

    public static getStyleSheetById(styleSheetId?: string, fromDocument?: Document): CSSStyleSheet {
        if (fromDocument == undefined) fromDocument = window.document;
        if (styleSheetId == undefined) {
            return fromDocument.styleSheets.item(0) as CSSStyleSheet;
        }
        if (fromDocument.head == undefined) throw new Error('Document head was undefined');

        let style = fromDocument.getElementById(styleSheetId.toString()) as HTMLStyleElement;
        if (style == undefined) {
            style = fromDocument.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('id', styleSheetId.toString());
            style.appendChild(fromDocument.createTextNode(''));
            fromDocument.head.appendChild(style as Node);
        }

        return style.sheet as CSSStyleSheet;
    }

    public static getStyleSheetCssTextById(styleSheetId?: string, fromDocument?: Document) {
        const styleSheet = this.getStyleSheetById(styleSheetId, fromDocument);
        let cssText = '';
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
            cssText += `${styleSheet.cssRules[i]!.cssText} `;
        }
        return cssText;
    }

    public static toStringStyle(cssObj: CSSObject): string {
        let result: string = '';
        for (const key in cssObj) {
            if (Object.prototype.hasOwnProperty.call(cssObj, key) == true) {
                if (typeof cssObj[key] === 'string' && !BravoStringUtil.isNullOrEmpty(cssObj[key]?.toString()))
                    result += `${key}: ${cssObj[key]};`;
            }
        }
        return result;
    }

    public static getCurrentDocumentStyleElementsAsString() {
        let result = '';
        const allStyleEls = document.getElementsByTagName('style');
        for (let i = 0; i < allStyleEls.length; i++) {
            result += allStyleEls[i]!.outerHTML;
        }

        const allLinkEls = document.getElementsByTagName('link');
        for (let i = 0; i < allLinkEls.length; i++) {
            const clonedLinkNode = <HTMLLinkElement>allLinkEls[i]!.cloneNode(true);
            // eslint-disable-next-line no-self-assign
            clonedLinkNode.href = clonedLinkNode.href; // Reset the href again to update href contain the origin in outerHTML
            result += clonedLinkNode.outerHTML;
        }
        return result;
    }
}
