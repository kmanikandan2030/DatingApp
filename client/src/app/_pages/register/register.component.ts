import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
currentDate = new Date().toJSON().slice(0, 10);
//console.log(currentDate); // "2022-06-17"

model: any = {
  doj: this.currentDate
}
@Output() cancelRegister = new EventEmitter()
accountService = inject(AccountService);

register(){
  this.accountService.register(this.model).subscribe({
    next:(result)=>this.cancel()
  });
}
cancel(){
  this.cancelRegister.emit(false);
}
}
