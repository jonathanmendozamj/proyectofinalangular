export interface DialogData {
    message: string;
    buttons?: {
        ok?: string;
        cancel?: string;
    }
}