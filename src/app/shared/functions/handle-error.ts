import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
        console.error('Error del lado del cliente', error.error.message);
    } else {
        console.error('Error del lado del servidor', error.status, error.message)
        alert('Hubo un error de comunicación, intente de nuevo.');
    }
    return throwError(() => new Error('Error en la comunicacion HTTP'));
}