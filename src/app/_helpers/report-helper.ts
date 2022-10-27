export class ReportHelper {
    public base64ToBlob(base64: string)
    {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; ++i)
        {
            bytes[i] = binaryString.charCodeAt(i);
        }

        return new Blob([bytes], { type: 'application/pdf' });
    };
}