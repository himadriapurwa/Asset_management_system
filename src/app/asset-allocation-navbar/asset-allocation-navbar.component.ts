import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-allocation-navbar',
  templateUrl: './asset-allocation-navbar.component.html',
  styleUrls: ['./asset-allocation-navbar.component.css']
})
export class AssetAllocationNavbarComponent implements OnInit {

  constructor(private router:Router){}

  userDetails: any;
  a: any;

  active_class():any {
    $('li').on('click', function(){
      $('li').removeClass('active');
      // $(this).toggleClass('active');
    })
  }


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
  toAssetInventory(){
    this.router.navigate(['/assetInventory'])
  }
}




