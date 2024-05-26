import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-categoryscreen',
  templateUrl: './categoryscreen.component.html',
  styleUrls: ['./categoryscreen.component.css']
})
export class CategoryscreenComponent implements OnInit {

    constructor(private hs: HeroService, private formBuilder: FormBuilder,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dataTable();
    this.getAllAssetsfunction();

    this.yourForm = this.formBuilder.group({
      assetType: ['', Validators.required],
      category: ['',  [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z]{3,}$'
        ),
      ],],
    });
  }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  yourForm: any = FormGroup;
  submitted = false;

  get f() {
    return this.yourForm.controls;
  }


 addCategoryModel:any = '';

  tableData: any = [];
  dataTable() {
      this.dtOptions = {
        pagingType: 'full',
        pageLength: 5,
        lengthMenu: [5, 10, 15, 20],
        processing: false,
        responsive: true,
        ordering: false,
        ajax: (dataTablesParameters: any, callback) => {
          this.hs
            .ajax(
              'GetCategoryAndAssetType',
              'http://schemas.cordys.com/amsWSAppServerPackage',
              {}
            )
            .then((resp: any) => {
             // console.log('resp',resp);
              
              this.tableData = this.hs.xmltojson(resp, 'ams_category_master');
              console.log('this.tableData',this.tableData);
              if (!this.tableData || this.tableData.length === 0) {
                this.tableData = [];
              }
              this.tableData = Array.isArray(this.tableData)
              ? this.tableData
              : [this.tableData];

              callback({
                recordsTotal: this.tableData.length,
                recordsFiltered: this.tableData.length,
                data: this.tableData,
              });
            });
        },
       
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
         
          $(row)
            .find('.editbtn')
            .on('click', () => {
           this.populateForm(data);
            });
        
          return row;
        },
  
        columns: [
          
          {
            title: 'asset_type',
            data: 'ams_asset_master.asset_type',
          },
          {
            title: 'category',
            data: 'category',
          },
          {
            title: 'Action',
            data: null,
            render: function (data, type, row) {
              return `
            <span class='editbtn' data-bs-target='#editModal' data-bs-toggle='modal'> <i class="far fa-edit" style="color: #143c80;"></i></span>
             
              `;
            },
            className: 'text-center',
          },
        
        ],
      };
    }


    currentRowData: any;
  populateForm(data: any) {
    //debugger;
    
    this.currentRowData = data;
    console.log('currentRowData',this.currentRowData);
    $('#EditAssetTypeID').val(this.currentRowData.ams_asset_master.asset_type);
    $('#EditCategoryID').val(this.currentRowData.category);
    
    console.log('this.currentRowData.a_id',this.currentRowData.cat_id);
    
  
    $('#exampleModal').modal('show');
  }

 
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

  assetIdData:any = [];
  getAssetIdfunction() {
    this.hs
      .ajax(
        'GetAssetIdFromType',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          asset_type: this.assetTypeModel
        }
      )
      .then((resp: any) => {
        //console.log(resp);
        this.assetIdData = this.hs.xmltojson(resp, 'ams_asset_master');
        if (!this.assetIdData || this.assetIdData.length === 0) {
          this.assetIdData = [];
        }
        this.assetIdData = Array.isArray(this.assetIdData)
        ? this.assetIdData
        : [this.assetIdData];
        console.log('this.assetIdData',this.assetIdData);
        
        console.log('this.assetIdData.a_id',this.assetIdData[0].a_id);
        
      });
  }

// add in future 
  addCategoryFunction(){

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
    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: "Form Submitted successfully.",
        showConfirmButton: false,
        toast: true,
        timer: 2000,
      });
     this.clearForm();

    }

    


    // this.hs
    //     .ajax(
    //       'UpdateAms_category_master',
    //       'http://schemas.cordys.com/amsWSAppServerPackage',
    //       {
    //         tuple: {
    //           new: {
    //             ams_category_master : {
    //               ast_master_id: this.assetIdData[0].a_id ,
    //               category:this.addCategoryModel,
                  
        
    //             },
    //           },
    //         },
    //       }
    //     )
    //     .then((resp: any) => {
    //       console.log('submit resp',resp);
    //       if (this.dtElement && this.dtElement.dtInstance) {
    //         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //           dtInstance.ajax.reload();
    //         });
    //       }
          
    //     });
        
  }


  clearForm() {
    this.submitted = false;
    this.yourForm.reset();
  }

  editCategoryNameModel:any = '';
  EditCategoryFunction(){
    this.hs
        .ajax(
          'UpdateAms_category_master',
          'http://schemas.cordys.com/amsWSAppServerPackage',
          {
            tuple: {
              old: {
                ams_category_master: {
                  cat_id: this.currentRowData.cat_id,
                },
              },
              new: {
                ams_category_master : {
                  category:this.editCategoryNameModel,
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('edit resp',resp);
          if (this.dtElement && this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.ajax.reload();
            });
          }
          
        });
  }

  
    
  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }
}
