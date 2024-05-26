import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GeneraterequestComponent } from './generaterequest/generaterequest.component';
import { UserhistoryComponent } from './userhistory/userhistory.component';
import { DeptheadapprovalComponent } from './deptheadapproval/deptheadapproval.component';
import { DeptrqsthstryComponent } from './deptrqsthstry/deptrqsthstry.component';
import { AssetmanagerscreenComponent } from './assetmanagerscreen/assetmanagerscreen.component';
import { AssetmanagerdashboardComponent } from './assetmanagerdashboard/assetmanagerdashboard.component';
import { AssetmanagerhistoryComponent } from './assetmanagerhistory/assetmanagerhistory.component';
import { CategoryscreenComponent } from './categoryscreen/categoryscreen.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { AssetAllocationComponent } from './asset-allocation/asset-allocation.component';
import { AssetAllocChartsComponent } from './asset-alloc-charts/asset-alloc-charts.component';
import { AssetAllocReqComponent } from './asset-alloc-req/asset-alloc-req.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserInventoryComponent } from './user-inventory/user-inventory.component';
import { UserrequestsComponent } from './userrequests/userrequests.component';
import { ReturnExtendComponent } from './return-extend/return-extend.component';
const routes: Routes = [
  {
  path: '',
  component: LandingPageComponent,
  children:[
    
  ]
},
{
  path:'login', component:LoginComponent
},
{
  path: 'raise-request',component:GeneraterequestComponent
},
{
  path: 'user-history', component: UserhistoryComponent
},
{
  path: 'deptheadapproval', component: DeptheadapprovalComponent
},
{
  path: 'deptrqsthstry', component: DeptrqsthstryComponent
},
{
  path: 'category',
  component: CategoryscreenComponent
},
{
  path: 'assetdashboard',
  component: AssetmanagerdashboardComponent
},
{

  path : 'assetmanrequests',
  component :AssetmanagerhistoryComponent
},
{
  path: 'subcategory',
  component : SubcategoryComponent
},
{
  path: 'team-member',
  component: TeamMemberComponent
},
{
  path : 'assetInventory',
  component : AssetAllocationComponent
},
{
  path : 'assetmanager',
  component : AssetmanagerscreenComponent
},
{
  path: 'alloc-dashboard',
  component : AssetAllocChartsComponent

},
{
  path: 'allo-alloc-req',
  component :AssetAllocReqComponent
},
{
  path: 'admin-dashboard',
  component : AdminDashboardComponent
},
{
  path : 'inventory',
  component : UserInventoryComponent
},
{
  path : 'user-requests',
  component : UserrequestsComponent
},
{
  path : 'extend-return-product',
  component : ReturnExtendComponent
}

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
