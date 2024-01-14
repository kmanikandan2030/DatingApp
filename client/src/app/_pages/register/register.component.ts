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

register(){
  this.accountService.register(this.model).subscribe({
    next:(result)=>this.cancel(),
    error: error => {      
      const {errors} = error.error
      Object.values<string>(errors).forEach(element => {
         this.toastr.error(element);
      });
      
    }
  });
}
cancel(){
  this.cancelRegister.emit(false);
}
}
