import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HeroService } from '../hero.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generaterequest',
  templateUrl: './generaterequest.component.html',
  styleUrls: ['./generaterequest.component.css']
})
export class GeneraterequestComponent  {

  constructor(private hs: HeroService, private formBuilder: FormBuilder,  private fb: FormBuilder) {}


  ngOnInit(): void {
    this.inputDisabled = true;
    this.isDocDisabled = true;

   this.getAllAssetsfunction();
   this.GetLastRequestId();
  
    this.today = this.getTodaysDate();
   console.log('today',this.today);

  this.yourForm = this.formBuilder.group({

    assetType: ['', Validators.required],
    category: ['', Validators.required],
    subcategory: ['', Validators.required],
 
    numofunits: [
      '',
      [Validators.required, Validators.pattern(/^[1-9]\d*$/)],
    ],
  
    priority: ['', Validators.required],
    extendWarranty: ['', Validators.required],
    approvedByManager : ['', Validators.required],
    remarks : ['', Validators.required],
 

  });

  }
    
  yourForm: any = FormGroup;
  submitted = false;

  get f() {
    return this.yourForm.controls;
  }


  today = '';
  inputDisabled: boolean = true;
  isDocDisabled:boolean = true;

  onWarrantyChange(): void {
    if (this.askExtendWarrantyModel === 'Yes') {
      this.inputDisabled = false;
    } else {
      this.inputDisabled = true;
      this.yearsModel = ''; 
    }

  }

  managerApprovalModel:any = '';
  docname:any = '';
  approvalMatrixStatus:any = '';

  onApproveDocumentSelect(): void {
    if (this.managerApprovalModel === 'Yes') {
      this.isDocDisabled = false;
      this.docname = 'doc name'
   //   this.approvalMatrixStatus = 'Pending With Asset Manager'
    } else {
      this.isDocDisabled = true;
      this.docname = 'No Document'
   //   this.approvalMatrixStatus = 'Pending with Department Head'
     // this.yearsModel = ''; 
    }
  }
  

  requestFormObj = {
    "request_id": "",
    "asset_id": "",
    "user_id": "",
    "priority": "",
    "units_required": "",
    "ext_warranty": 1,
    "warranty_expiry_date": "2024-05-04",
    "request_date": "",
    "document": "doc",
    "remarks": "",
    "asset_manager": ""
  }

  // inventoryData: any = [];
  // getInventoriesfunction() {
  //   this.hs
  //     .ajax(
  //       'Getallinventorymasterdata ',
  //       'http://schemas.cordys.com/amsWSAppServerPackage',
  //       {}
  //     )
  //     .then((resp: any) => {
  //       //console.log(resp);
  //       this.inventoryData = this.hs.xmltojson(resp, 'ams_inventory_master');
  //       console.table('this.inventoryData',this.inventoryData);
  //     });
  // }
  
  assetTypeData: any = [];
  assetTypeModel = '';

  getAllAssetsfunction() {
    this.hs
      .ajax(
        'GetAllAssetMasterData',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {}
      )
      .then((resp: any) => {
        //console.log(resp);
        this.assetTypeData = this.hs.xmltojson(resp, 'ams_asset_master');
        if (!this.assetTypeData || this.assetTypeData.length === 0) {
          this.assetTypeData = [];
        }
        this.assetTypeData = Array.isArray(this.assetTypeData)
        ? this.assetTypeData
        : [this.assetTypeData];
        console.log('this.assetTypeData',this.assetTypeData);
        
      });
  }

  assetcategoryData: any = [];
  assetcategoryModel = '';


  AssetTypeChangeFunction(){
  this.getCategoriesfunction();
  this.getAssetTypeManagerfunction();
  }

  getCategoriesfunction() {
    this.hs
      .ajax(
        'GetCategoryFromAssetType ',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          asset_type : this.assetTypeModel
        }
      )
      .then((resp: any) => {
        //console.log(resp);
        this.assetcategoryData = this.hs.xmltojson(resp, 'ams_category_master');
        if (!this.assetcategoryData || this.assetcategoryData.length === 0) {
          this.assetcategoryData = [];
        }
        this.assetcategoryData = Array.isArray(this.assetcategoryData)
        ? this.assetcategoryData
        : [this.assetcategoryData];
        console.log('this.assetcategoryData',this.assetcategoryData);
        
      });
  }



  assetTypeManagerData: any = [];
  assetTypeManagerModel = '';

  getAssetTypeManagerfunction() {
    this.hs
      .ajax(
        'GetAssetManFromCategory',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          asset_category : this.assetTypeModel
        }
      )
      .then((resp: any) => {
        //console.log(resp);
        this.assetTypeManagerData = this.hs.xmltojson(resp, 'ams_asset_manager');
        if (!this.assetTypeManagerData || this.assetTypeManagerData.length === 0) {
          this.assetTypeManagerData = [];
        }
        this.assetTypeManagerData = Array.isArray(this.assetTypeManagerData)
        ? this.assetTypeManagerData
        : [this.assetTypeManagerData];
       // console.log('this.assetTypeManagerData[0].manager_name',this.assetTypeManagerData[0].manager_name);
        console.log('this.assetTypeManagerData[0].manager_name',this.assetTypeManagerData[0].manager_name);
        
      });
  }

  assetsubCategoryData: any = [];
  assetsubCategoryModel = '';

  getSubCategoriesfunction() {
    this.hs
      .ajax(
        'GetSelectedSubCategories',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          category : this.assetcategoryModel
        }
      )
      .then((resp: any) => {
        //console.log(resp);
        this.assetsubCategoryData = this.hs.xmltojson(resp, 'ams_subcat_master');
        if (!this.assetsubCategoryData || this.assetsubCategoryData.length === 0) {
          this.assetsubCategoryData = [];
        }
        this.assetsubCategoryData = Array.isArray(this.assetsubCategoryData)
        ? this.assetsubCategoryData
        : [this.assetsubCategoryData];
        console.log('this.assetcategoryData',this.assetsubCategoryData);
        
      });
  }


  assetIdData: any = [];
  // assetsubCategoryModel = '';
  remQty:any = '';

  getAssetIdfunction() {
    this.hs
      .ajax(
        'GetSubCatID',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          subcategory : this.assetsubCategoryModel
        }
      )
      .then((resp: any) => {
        //console.log(resp);
        this.assetIdData = this.hs.xmltojson(resp, 'ams_subcat_master');       
        console.log('this.assetIdData',this.assetIdData);
        console.log('rem_qty',this.assetIdData.rem_qty);
        console.log('subcat_id',this.assetIdData.subcat_id);
        
      });
  }


  lastReqIdData: any = [];
  // assetsubCategoryModel = '';

  GetLastRequestId() {
    this.hs
      .ajax(
        'GetLastRequestId',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {}
      )
      .then((resp: any) => {
        //console.log(resp);
        this.lastReqIdData = '';
        this.lastReqIdData = this.hs.xmltojson(resp, 'ams_asset_request');       
        console.log('this.lastReqIdData',this.lastReqIdData);
        console.log('this.lastReqIdData.req_id',this.lastReqIdData.req_id);
        
      });
  }

  extendWarrantyCheck(){

  }

  numOfYears:any = "";
  document:any = "";

  submitRequestFunction(){
   // debugger
    this.submitted = true;
    if (this.yourForm.invalid) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: "Form is invalid.",
        showConfirmButton: false,
        toast: true,
        timer: 2000,
      });
      return;
    } else {
    
      if(this.askExtendWarrantyModel === "Yes"){
        if( $('#numOfYearsId').val() === ""){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: "Number of years is missing.",
            showConfirmButton: false,
            toast: true,
            timer: 2000,
          });
        }
return;
      }
      if(this.requestFormObj.units_required > this.assetIdData.rem_qty){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          text: "Available units are " + this.assetIdData.rem_qty + "." ,
          showConfirmButton: false,
          toast: true,
          timer: 2000,
        });

        return;
      }

      // if(this.managerApprovalModel === "Yes"){
      //   if( $('#formFile').val() == ""){
      //     Swal.fire({
      //       position: 'top-end',
      //       icon: 'error',
      //       text: "Document is missing.",
      //       showConfirmButton: false,
      //       toast: true,
      //       timer: 2000,
      //     });
      //     return
      //   }
      // }
      else{
        if( $('#formFile').val() == ""){
           console.log('inside if');
           this.approvalMatrixStatus = 'Pending with Department Head'
           
          this.hs
          .ajax(
              'UpdateAms_asset_request',
              'http://schemas.cordys.com/amsWSAppServerPackage',
              {
                tuple: {
                  new: {
                    ams_asset_request: {
                      request_id: 'AMS_'+this.lastReqIdData.req_id,
                      subcat_id: this.assetIdData.subcat_id,
                      user_id: '1',
                      priority: this.requestFormObj.priority,
                      ext_warranty:$('#numOfYearsId').val(),
                      units_required: this.requestFormObj.units_required,
                      request_date: this.today,
                      remarks: this.requestFormObj.remarks,
                      asset_manager : this.assetTypeManagerData[0].manager_name,
                      document : 'No Document',
                      warranty_expiry_date : ''
                    },
                  },
                },
              }
            )
            .then((resp: any) => {
              console.log('submit resp',resp);
          
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: "Form Submitted successfully.",
                showConfirmButton: false,
                toast: true,
                timer: 2000,
              });
            
              this.updateAssetMatrixStatusFunction();
            });

        }

        else{
          console.log('inside else')
          this.approvalMatrixStatus = 'Pending With Asset Manager'

          this.hs
              .ajax(
                  'UpdateAms_asset_request',
                  'http://schemas.cordys.com/amsWSAppServerPackage',
                  {
                    tuple: {
                      new: {
                        ams_asset_request: {
                          request_id: 'AMS_'+this.lastReqIdData.req_id,
                          subcat_id: this.assetIdData.subcat_id,
                          user_id: '1',
                          priority: this.requestFormObj.priority,
                          ext_warranty:$('#numOfYearsId').val(),
                          units_required: this.requestFormObj.units_required,
                          request_date: this.today,
                          remarks: this.requestFormObj.remarks,
                          asset_manager : this.assetTypeManagerData[0].manager_name,
                          document :  $('#formFile').val(),
                          warranty_expiry_date : ''
                        },
                      },
                    },
                  }
                )
                .then((resp: any) => {
                  console.log('submit resp',resp);
               
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    text: "Form Submitted successfully.",
                    showConfirmButton: false,
                    toast: true,
                    timer: 2000,
                  });
                  this.uploadFileFunction();
                  this.updateAssetMatrixStatusFunction();
                });

        }

      
      }

    }

  }

  mainBpm() {
    console.log('main bpm starts');
    console.log('AMS ID IN BPM '+'AMS'+this.lastReqIdData.req_id);;
    
    this.hs
      .ajax('angular_req_bpm', 'http://schemas.cordys.com/default', {
        request_id: 'AMS_'+this.lastReqIdData.req_id,
      })
      .then((resp: any) => {
       // this.hs.xmltojson(resp, 'mridul_travel_journey_alldetails');
        console.log('main bpm response', resp);
      });
  }

  updateAssetMatrixStatusFunction(){
    this.hs
        .ajax(
          'UpdateAms_approval_matrix',
          'http://schemas.cordys.com/amsWSAppServerPackage',
          {
            tuple: {
           
              new: {
                ams_approval_matrix : {
                  request_id:'AMS_'+this.lastReqIdData.req_id,
                  status: this.approvalMatrixStatus,
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('submit resp',resp);
          this.mainBpm();
          
        });
  }

  getTodaysDate(): string {
    const today: Date = new Date();
    const dd: string = String(today.getDate()).padStart(2, '0');
    const mm: string = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy: number = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
}


  askExtendWarrantyModel = '';
  yearsModel = '';
  yearsCount = '0';

  // getWarrantyFunction(){
  //   if(this.yearsModel == ""){
  //     this.yearsCount = '0'
  //     console.log('this.yearsCount A',this.yearsCount);
      
  //   }
  //   else if(this.yearsModel != ""){
  //     this.yearsCount = this.yearsModel;
  //     console.log('this.yearsCount B',this.yearsCount);
      
  //   }
  // }



   /// validations code

   units_number = /^(?:0|[1-9]\d*)$/;
   validateUnitsNumber() {
   
     if (!this.units_number.test(this.requestFormObj.units_required)) {
       Swal.fire({
         position: 'top-end',
         icon: 'error',
         text: "Numbers should be natural.!!",
         showConfirmButton: false,
         toast: true,
         timer: 2000,
       });
       return;
     } 
   }

   fileList: any;
   fileContent: any;
   base64Content: any;
 
   onFileSelected(event: any) {
     this.fileList = event.target.files;
     this.fileContent = this.fileList[0].name;
     const reader = new FileReader();
     reader.onload = (e) => {
       const temp = reader.result;
       this.base64Content = [];
       this.base64Content.push(String(temp).split(',')[1]);
       console.log(this.base64Content[0]);
       console.log(this.fileList[0].name);
     };
     reader.readAsDataURL(this.fileList[0]);
   }

   uploadFileFunction() {
    this.hs
      .ajax(
        'UploadFile',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          FileName: this.fileList[0].name,
          FileContent: this.base64Content[0],
        }
      )
      .then((resp: any) => {
        console.log('upload file function response', resp);
      });
  }









}
