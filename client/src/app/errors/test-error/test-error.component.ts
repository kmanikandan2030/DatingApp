import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css'
})
export class TestErrorComponent implements OnInit {
    baseUrl = "https://localhost:5001/api";
    validationErrors: string[] = [];

    httpClient = inject(HttpClient);
    
    ngOnInit(): void {      
    }

    get500Error(){
      this.httpClient.get(`${this.baseUrl}/buggy/server-error`).subscribe({
        error: (err)=> {
          console.log(err)                  
        }
      })
    }
    get400Error(){
      this.httpClient.get(`${this.baseUrl}/buggy/bad-request`).subscribe({
        error: (err)=> console.log('T400')        
      })
    }
    get401Error(){
      this.httpClient.get(`${this.baseUrl}/buggy/auth`).subscribe({
        error: (err)=> console.log('T401')        
      })
    }
    get404Error(){
      this.httpClient.get(`${this.baseUrl}/buggy/not-found`).subscribe({
        error: (err)=> console.log('T404')        
      })
    }
    get400ValidationError(){
      this.httpClient.post(`${this.baseUrl}/account/register`,{}).subscribe({
        error: (err)=> {
          console.log(err);
          this.validationErrors = err;
        }        
      })
    }
}
