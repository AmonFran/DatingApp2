import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private router: Router, public accountService: AccountService, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  logIn() {
    this.accountService.logIn(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members')
      }
    });
  }
  logOut() {
    this.accountService.logOut();
    this.router.navigateByUrl('/')
    this.model = {};
  }
  imprimir(a: any) {
    console.log(a);
    
  }
}
