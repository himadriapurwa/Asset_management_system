import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assetmanagernav',
  templateUrl: './assetmanagernav.component.html',
  styleUrls: ['./assetmanagernav.component.css']
})
export class AssetmanagernavComponent implements OnInit {

  userDetails: any;
  a: any;

  active_class():any {
    $('li').on('click', function(){
      $('li').removeClass('active');
     
    })
  }

  constructor(private router:Router){}

  ngOnInit(): void {
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

  toDashboard(){
    this.router.navigate(['/assetdashboard'])
  }

  toAssets(){
    this.router.navigate(['/assetmanager'])
  }

  toRequests(){
    this.router.navigate(['/assetmanrequests'])
  }

}
