import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
currentDate = new Date().toJSON().slice(0, 10);
toastr = inject(ToastrService);
//console.log(currentDate); // "2022-06-17"

model: any = {
  doj: this.currentDate
}
@Output() cancelRegister = new EventEmitter()
accountService = inject(AccountService);
validationErrors: string[] = [];

register(){
  this.accountService.register(this.model).subscribe({
    next:(result)=>this.cancel(),
    error: (err)=> {
      console.log(err);
      this.validationErrors = err;
    }        
  });
}
cancel(){
  this.cancelRegister.emit(false);
}
}
