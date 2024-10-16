import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(environment.apiUrl + "/buggy/not-found").subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    })
  }
  get400Error() {
    this.http.get(environment.apiUrl + "/buggy/bad-request").subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    })
  } get500Error() {
    this.http.get(environment.apiUrl + "/buggy/server-error").subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    })
  } get401Error() {
    this.http.get(environment.apiUrl + "/buggy/auth").subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    })
  } get400ValidationError() {
    this.http.post(environment.apiUrl + "/account/register", {}).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
        this.validationErrors = error;
      }
    })
  }

}
