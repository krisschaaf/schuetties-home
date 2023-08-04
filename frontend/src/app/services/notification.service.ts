import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  notify(message: string) {
    this.snackBar.open(message, 'Schließen', {
      duration: 4000
    });
  }

  notifyError() {
    this.notify('Etwas ist schiefgelaufen - bitte versuch es noch einmal.');
  }
}
