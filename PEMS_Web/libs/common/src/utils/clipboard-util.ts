export class BravoClipboardUtil {
    public static copyTextToClipboard(text: string) {
        const clipboard = (<any>navigator).clipboard;
        if (!clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        clipboard.writeText(text);

        function fallbackCopyTextToClipboard(text: string) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.display = 'none';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
}
