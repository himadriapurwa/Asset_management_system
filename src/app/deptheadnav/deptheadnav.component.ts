import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deptheadnav',
  templateUrl: './deptheadnav.component.html',
  styleUrls: ['./deptheadnav.component.css']
})
export class DeptheadnavComponent implements OnInit {

  constructor(private router:Router){}

  ngOnInit(): void {
  }

  userDetails: any;
  a: any;

  active_class():any {
    $('li').on('click', function(){
      $('li').removeClass('active');
      // $(this).toggleClass('active');
    })
  }


  toLogIn(){
    this.router.navigate(['/login'])
    localStorage.setItem('isAuthenticate','false')
    this.clearSpecificCookies();
  }
  
  clearSpecificCookies() {
    const cookieNames = ['defaultinst_ct', 'defaultinst_SAMLart', 'defaultinst_AuthContext'];
    for (const cookieName of cookieNames) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }

  toRequests(){
    this.router.navigate(['/deptheadapproval'])
  }

  toHistory(){
    this.router.navigate(['/deptrqsthstry'])
  }

}
