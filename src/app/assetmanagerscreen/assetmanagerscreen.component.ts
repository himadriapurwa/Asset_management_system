import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-assetmanagerscreen',
  templateUrl: './assetmanagerscreen.component.html',
  styleUrls: ['./assetmanagerscreen.component.css']
})
export class AssetmanagerscreenComponent implements OnInit {

  constructor(private hs: HeroService, private formBuilder: FormBuilder,
    private fb: FormBuilder) {}

  yourForm: any = FormGroup;
  submitted = false;

  subCatForm: any = FormGroup;
  submitted2 = false;

  editCatForm:any = FormGroup;
  submitted3 = false;


  editSubCatForm:any = FormGroup;
  submitted4 = false;


  get f() {
    return this.yourForm.controls;
  }

  get f1() {
    return this.subCatForm.controls;
  }

  get f3() {
    return this.editCatForm.controls;
  }

  get f4() {
    return this.editSubCatForm.controls;
  }

  ngOnInit(): void {
    this.dataTable();
    this.getAllAssetsfunction();
    this.subdataTable();
     $('#subcategory-container').hide();
     
    this.yourForm = this.formBuilder.group({
      assetType: ['', Validators.required],
      category: ['',  [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z]{3,}$'
        ),
      ],],
    });

    this.editCatForm = this.formBuilder.group({
      editcategory: ['', Validators.required],
    });

    this.subCatForm = this.formBuilder.group({
      assetType: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['',  [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z]{3,}$'
        ),
      ],],
      totalqty: ['',       [
        Validators.required,
        Validators.pattern(
          '^[1-9]\d*$'
        ),
      ],],
    });

  }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  dtElement1: DataTableDirective | undefined;

  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();



 

 addCategoryModel:any = '';

  tableData: any = [];
  dataTable() {
    // debugger;
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

    }

    this.clearForm();

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

  displayContainers() {
    if ($('#selectBox').val() === "Category") {
        $('#category-container').show();
        $('#subcategory-container').hide();
    } 
    if ($('#selectBox').val() === "SubCategory") {
        $('#subcategory-container').show();
        $('#category-container').hide();
    }
}


subTableData: any = [];
   subdataTable() {
  // debugger;
    this.dtOptions2 = {
      pagingType: 'full',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
      processing: false,
      responsive: true,
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.hs
          .ajax(
            'GetSubcategoriesAngular',
            'http://schemas.cordys.com/amsWSAppServerPackage',
            {}
          )
          .then((resp: any) => {
           // console.log('resp',resp);
            
            this.subTableData = this.hs.xmltojson(resp, 'ams_subcat_master');
            console.log('this.tableData',this.subTableData);
            if (!this.subTableData || this.subTableData.length === 0) {
              this.subTableData = [];
            }
            this.subTableData = Array.isArray(this.subTableData)
            ? this.subTableData
            : [this.subTableData];

            callback({
              recordsTotal: this.subTableData.length,
              recordsFiltered: this.subTableData.length,
              data: this.subTableData,
            });
          });
      },
     
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
       
        $(row)
          .find('.editbtn')
          .on('click', () => {
        this.populateForm2(data);
          });
      
        return row;
      },

      columns: [
        
        {
          title: 'asset_type',
          data: 'asset_type',
        },
        {
          title: 'category',
          data: 'ams_category_master.category',
        },
        {
          title: 'subcategory',
          data: 'subcategory',
        },
        {
          title: 'inital_qty',
          data: 'inital_qty'

        },
        {
          title: 'Action',
          data: null,
          render: function (data, type, row) {
            return `
          <span class='editbtn' data-bs-target='#editSubCatModal' data-bs-toggle='modal'> <i class="far fa-edit" style="color: #143c80;"></i></span>
           
            `;
          },
          className: 'text-center',
        },
        
       
        
        
      ],
    };
  }

  assetcategoryData: any = [];
  assetcategoryModel = '';

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

  addSubCategoryModel:any = '';
  addTotalQtyModel:any = '';

  cateryIdData: any = [];
  getCategoryIdfunction() {
    this.hs
      .ajax(
        'GetCatIdFromCategory',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          category : this.assetcategoryModel
        }
      )
      .then((resp: any) => {
        //console.log(resp);
        this.cateryIdData = this.hs.xmltojson(resp, 'ams_category_master');
        if (!this.cateryIdData || this.cateryIdData.length === 0) {
          this.cateryIdData = [];
        }
        this.cateryIdData = Array.isArray(this.cateryIdData)
        ? this.cateryIdData
        : [this.cateryIdData];
        console.log('this.cateryIdData.cat_id',this.cateryIdData[0].cat_id);
        
      });
  }

  addSubCategoryFunction(){
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
    }

    // this.hs
    //     .ajax(
    //       'UpdateAms_subcat_master',
    //       'http://schemas.cordys.com/amsWSAppServerPackage',
    //       {
    //         tuple: {
    //           new: {
    //             ams_subcat_master  : {
    //               cat_id: this.cateryIdData[0].cat_id,
    //               subcategory:this.addSubCategoryModel,
    //               inital_qty: this.addTotalQtyModel,
    //               asset_type: this.assetTypeModel
    //             },
    //           },
    //         },
    //       }
    //     )
    //     .then((resp: any) => {
    //       console.log('submit resp',resp);
    //       var table = $('#tableData2').DataTable();
    //       table.ajax.reload();
          
    //     });


  }

  clearSubcatForm() {
    this.submitted2 = false;
    this.subCatForm.reset();
  }

  currentSubRowData: any;
  populateForm2(data: any) {
   
    
    this.currentSubRowData = data;
    console.log('currentSubRowData',this.currentSubRowData);
    $('#EditAssetTypeID2').val(this.currentSubRowData.asset_type);
    $('#editcategory2').val(this.currentSubRowData.ams_category_master.category);
    $('#editsubcategory').val(this.currentSubRowData.subcategory);
    $('#editTotalQty').val(this.currentSubRowData.inital_qty);
    
    console.log('this.currentSubRowData.subcat_id',this.currentSubRowData.subcat_id);
    
  
    $('#exampleModal').modal('show');
  }

  editNewCategoryNameModel:any = ''
  editSubCategoryNameModel:any = '';
  editTotalQtyModel:any = ''

  EditSubCategoryFunction(){
    console.log(this.currentSubRowData);
    console.log(this.currentSubRowData);
    this.hs
        .ajax(
          'UpdateAms_subcat_master',
          'http://schemas.cordys.com/amsWSAppServerPackage',
          {
            tuple: {
              old: {
                ams_subcat_master: {
                  subcat_id: this.currentSubRowData.subcat_id,
                },
              },
              new: {
                ams_subcat_master : {
                  subcategory:this.editSubCategoryNameModel,
                  inital_qty : this.editTotalQtyModel
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('edit resp',resp);
          var table = $('#tableData2').DataTable();
          table.ajax.reload();
          
        });
  }




  
    ngAfterViewInit(): void {
      this.dtTrigger.next(null);
      this.dtTrigger2.next(null);
    }


}
