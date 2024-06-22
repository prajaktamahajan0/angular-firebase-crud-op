import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirmation',
  templateUrl: './get-confirmation.component.html',
  styleUrls: ['./get-confirmation.component.scss']
})
export class GetConfirmationComponent implements OnInit {

  constructor(
    private _dialogref: MatDialogRef<GetConfirmationComponent>
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    this._dialogref.close(true)
  }

  cancle() {
    this._dialogref.close(false)
  }
}
