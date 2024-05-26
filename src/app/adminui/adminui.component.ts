import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-adminui',
  templateUrl: './adminui.component.html',
  styleUrls: ['./adminui.component.css']
})
export class AdminuiComponent implements OnInit {

  
  userDetails: any;
  a: any;

  constructor(private router:Router, private hs:HeroService){}

  ngOnInit(): void {
  }

  active_class():any {
    $('li').on('click', function(){
      $('li').removeClass('active');
    })
  }

  toCategory(){
    this.router.navigate(['/category'])

  }

  toSubcategory(){
    this.router.navigate(['/subcategory'])

  }

  toTeamMember(){
    this.router.navigate(['/teamMember']);
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
