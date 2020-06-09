export enum AuditAction {
    Add,
    Edit,
    Delete
};


export interface IAuditing {
    id: number;
    action: AuditAction;
    name: string;
    url: string;
};