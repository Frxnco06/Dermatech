import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiService {
  // Canal para avisar que se debe abrir el modal
  private abrirModalSource = new Subject<void>();
  abrirModal$ = this.abrirModalSource.asObservable();

  dispararAbrirModal() {
    this.abrirModalSource.next();
  }
}