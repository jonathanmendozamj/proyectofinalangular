import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleError(error: HttpErrorResponse){
    let mensaje = '';

    if(error.error instanceof ErrorEvent){
        console.error('Error del lado del cliente', error.error.message);
        mensaje = error.error.message;
    } else {
        console.error('Error del lado del servidor', error.status, error.message)
        mensaje = `Hubo un error de comunicación, intente de nuevo. ${ error.status } - ${ error.message }`;
    }
    return throwError(() => new Error(mensaje));
}