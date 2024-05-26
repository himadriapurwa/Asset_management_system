import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data: any = {
    username: '',
    password: '',
  };
  
  constructor(private router: Router, private hs: HeroService) { }

  login() {
    
    console.log('data', this.data);
    $.cordys.authentication.sso
      .authenticate(this.data.username, this.data.password)
      .done((resp: any) => {
        console.log('Done');
         $.cordys.ajax({
           method: 'GetUserDetails',
          namespace: 'http://schemas.cordys.com/UserManagement/1.0/User',
            dataType: '* json',
            
           }).done((resp:any)=>{
            console.log('resp',resp);
            
          
           var x = $.cordys.json.findObjects(resp,"Role");
           localStorage.setItem('currentUserName',this.data.username)

           for (let index = 0; index < x.length; index++) {
            if (x[index].text == 'amsuserrole') {
              // this.router.navigate(['/generaterequest']);
             //  this.router.navigate(['/deptheadapproval']);
             //this.router.navigate(['/category']);
             // this.router.navigate(['/assetInventory']);
             this.router.navigate(['/assetmanager'])
            }                     
         }
         })
         }
         );
      
      console.log("logged in successfully with user :",this.data.username)
   //   this.hs._set('loggedInuser', this.data.username);
      
    //   setTimeout(() => {
       
        
    // }, 5000);
      
     
  }

  ngOnInit(): void {}
}

// ng g c layout
// ng g m layout/dashboard --route dashboard --module app.module

