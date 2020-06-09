export enum AuditType {
    Add,
    Edit,
    Delete
};


export interface IAuditing {
    id: number;
    date: number;
    action: AuditType;
    name: string;
    url: string;
};