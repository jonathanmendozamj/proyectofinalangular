import { Inscription } from "./inscription.model";

export interface InscriptionState {
    loading: boolean;
    inscriptions: Inscription[];
}