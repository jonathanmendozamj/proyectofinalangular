import { Inscription } from "../models/inscription.model";

export interface DialogDataInscription {
    inscription: Inscription;
    title: string;
    modify: boolean;
};