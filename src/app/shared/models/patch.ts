export interface Patch {
    op: 'replace'|'add'|'remove',
    path: string,
    value: Object
}
