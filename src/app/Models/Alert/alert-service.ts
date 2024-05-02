import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openAlert(message: string): void {
    this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: message
    });
  }
}
