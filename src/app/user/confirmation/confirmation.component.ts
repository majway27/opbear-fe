import { environment } from '../../../environments/environment';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  constructor( private authService: AuthService ) { }

  confirmationCode = new FormControl('', [Validators.required, Validators.maxLength(6)]);
  
  submitCodeValue() {
    this.authService.confirm(this.confirmationCode.value);
  }
  
  regenerateMyConfirmationCode() {
    this.authService.regenerateConfirmationCode();
  }

}
