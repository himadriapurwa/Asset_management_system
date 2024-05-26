import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  constructor(private router:Router, private hs: HeroService){}

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

  

  toForm(){
    this.router.navigate(['/generaterequest'])

  }

  toHistory(){
    this.router.navigate(['/userhistory'])

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

}
