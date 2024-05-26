import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent  {

  constructor(private hs: HeroService, private formBuilder: FormBuilder,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllAssetsfunction();
    this.dataTable();

    this.yourForm = this.formBuilder.group({
      assetType: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['',  [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z]{3,}$'
        ),
      ],],
      totalqty: ['', Validators.required,
      ],
    
    });

  }

  yourForm: any = FormGroup;
  submitted = false;

  get f() {
    return this.yourForm.controls;
  }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

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
              'GetSubcategoriesAngular',
              'http://schemas.cordys.com/amsWSAppServerPackage',
              {}
            )
            .then((resp: any) => {
             // console.log('resp',resp);
              
              this.tableData = this.hs.xmltojson(resp, 'ams_subcat_master');
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
            <span class='editbtn' data-bs-target='#editModal' data-bs-toggle='modal'> <i class="far fa-edit" style="color: #143c80;"></i></span>
             
              `;
            },
            className: 'text-center',
          },
          
         
          
          
        ],
      };
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
    console.log('this.cateryIdData[0].cat_id',this.cateryIdData[0].cat_id);
    console.log('this.addSubCategoryModel',this.addSubCategoryModel);
    console.log('this.addTotalQtyModel',this.addTotalQtyModel);
    console.log('this.assetTypeModel',this.assetTypeModel);

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
   
       this.hs
        .ajax(
          'UpdateAms_subcat_master',
          'http://schemas.cordys.com/amsWSAppServerPackage',
          {
            tuple: {
              new: {
                ams_subcat_master  : {
                  cat_id: this.cateryIdData[0].cat_id,
                  subcategory:this.addSubCategoryModel,
                  inital_qty: this.addTotalQtyModel,
                  asset_type: this.assetTypeModel
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('submit resp',resp);
          if (this.dtElement && this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.ajax.reload();
            });
          }
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: "Form Submitted successfully.",
            showConfirmButton: false,
            toast: true,
            timer: 2000,
          });
          
        });

    }

    this.clearForm();
   
  }


  clearForm() {
    this.submitted = false;
    this.yourForm.reset();
  }

  editCategoryNameModel:any = ''
  editSubCategoryNameModel:any = '';
  editTotalQtyModel:any = ''

  currentRowData: any;
  populateForm(data: any) {
   
    
    this.currentRowData = data;
    console.log('currentRowData',this.currentRowData);
    $('#EditAssetTypeID').val(this.currentRowData.asset_type);
    $('#EditCategoryID').val(this.currentRowData.ams_category_master.category);
    $('#EditSubcategoryID').val(this.currentRowData.subcategory);
    $('#EditTotalQtyID').val(this.currentRowData.inital_qty);
    
    console.log('this.currentRowData.subcat_id',this.currentRowData.subcat_id);
    
  
    $('#exampleModal').modal('show');
  }

  EditSubCategoryFunction(){
    console.log(this.editSubCategoryNameModel);
    console.log(this.editTotalQtyModel);
    this.hs
        .ajax(
          'UpdateAms_subcat_master',
          'http://schemas.cordys.com/amsWSAppServerPackage',
          {
            tuple: {
              old: {
                ams_subcat_master: {
                  subcat_id: this.currentRowData.subcat_id,
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
