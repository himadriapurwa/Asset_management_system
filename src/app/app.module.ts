import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';

import { DataTablesModule } from "angular-datatables";

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';


import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgChartsModule } from 'ng2-charts';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { GeneraterequestComponent } from './generaterequest/generaterequest.component';
import { UserhistoryComponent } from './userhistory/userhistory.component';
import { UsernavComponent } from './usernav/usernav.component';
import { DeptheadapprovalComponent } from './deptheadapproval/deptheadapproval.component';
import { DeptheadnavComponent } from './deptheadnav/deptheadnav.component';
import { DeptrqsthstryComponent } from './deptrqsthstry/deptrqsthstry.component';
import { AssetmanagernavComponent } from './assetmanagernav/assetmanagernav.component';
import { AssetmanagerscreenComponent } from './assetmanagerscreen/assetmanagerscreen.component';
import { AssetmanagerdashboardComponent } from './assetmanagerdashboard/assetmanagerdashboard.component';
import { AssetmanagerhistoryComponent } from './assetmanagerhistory/assetmanagerhistory.component';
import { AdminuiComponent } from './adminui/adminui.component';
import { CategoryscreenComponent } from './categoryscreen/categoryscreen.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { AssetAllocationComponent } from './asset-allocation/asset-allocation.component';
import { AssetAllocationNavbarComponent } from './asset-allocation-navbar/asset-allocation-navbar.component';
import { AssetAllocChartsComponent } from './asset-alloc-charts/asset-alloc-charts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AssetAllocReqComponent } from './asset-alloc-req/asset-alloc-req.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserInventoryComponent } from './user-inventory/user-inventory.component';
import { UserrequestsComponent } from './userrequests/userrequests.component';
import { ReturnExtendComponent } from './return-extend/return-extend.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    GeneraterequestComponent,
    UserhistoryComponent,
    UsernavComponent,
    DeptheadapprovalComponent,
    DeptheadnavComponent,
    DeptrqsthstryComponent,
    AssetmanagernavComponent,
    AssetmanagerscreenComponent,
    AssetmanagerdashboardComponent,
    AssetmanagerhistoryComponent,
    AdminuiComponent,
    CategoryscreenComponent,
    SubcategoryComponent,
    TeamMemberComponent,
    AssetAllocationComponent,
    AssetAllocationNavbarComponent,
    AssetAllocChartsComponent,
    FooterComponent,
    AssetAllocReqComponent,
    AdminDashboardComponent,
    UserInventoryComponent,
    UserrequestsComponent,
    ReturnExtendComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    DataTablesModule,
    NgChartsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

  