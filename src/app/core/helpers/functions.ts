import {VoucherTemp} from "../interfaces/voucher";

export function isNumeric(s: any) {
    if (typeof s !== 'string') {
        return false;
    }
    //We return false if the string is ""
    return !isNaN(Number(s)) && !isNaN(parseFloat(s));
}

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes)
        return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function padLeft(text:string, padChar:string, size:number): string {
    return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
}

export function splitToNChunks(array:VoucherTemp[], n:number) {
    const chunkSize = n;
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunks.push(chunk);
    }
    return chunks;
}
