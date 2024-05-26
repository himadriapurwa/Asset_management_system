import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset-alloc-req',
  templateUrl: './asset-alloc-req.component.html',
  styleUrls: ['./asset-alloc-req.component.css']
})
export class AssetAllocReqComponent implements OnInit {

  constructor(private hs: HeroService) {}

  ngOnInit(): void {
    this.dataTable();
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
              'GetTeamAllocPendingRqsts',
              'http://schemas.cordys.com/amsWSAppServerPackage',
              {}
            )
            .then((resp: any) => {
              console.log('resp',resp);
              
              this.tableData = this.hs.xmltojson(resp, 'ams_asset_request');
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
            title: 'subcategory',
            data: 'ams_subcat_master.subcategory',
          },
          {
            title: 'user_name',
            data: 'ams_user_master.user_name',
          },
          {
            title: 'priority',
            data: 'priority',
          },
          {
            title: 'units_required',
            data: 'units_required',
          },
          {
            title: 'ext_warranty',
            data: 'ext_warranty',
          },
          // {
          //   title: 'warranty_expiry_date',
          //   data: 'warranty_expiry_date',
          // },
          {
            title: 'request_date',
            data: 'request_date',
          },
          {
            title: 'user remarks',
            data: 'remarks',
          },
          {
            title: 'dept head remarks',
            data: 'ams_approval_matrix.remarks_team_lead',
          },
          {
            title: 'manager remarks',
            data : 'ams_approval_matrix.remarks_manager'
          },
          {
            title: 'asset_manager',
            data: 'asset_manager',
          },
          {
            title: 'Action',
            data: null,
            render: function (data, type, row) {
              return `
            <span class='editbtn' data-bs-target='#exampleModal' data-bs-toggle='modal'> <i class="far fa-edit" style="color: #143c80;"></i></span>
             
              `;
            },
            className: 'text-center',
          },
          
         
          
          
        ],
      };
    }

    taskIdDataData: any = [];
    taskIdModel = '';
 
   getTaskIdfunction(data:any) {
     this.hs
       .ajax(
         'Getidbyrequestid',
         'http://schemas.cordys.com/amsWSAppServerPackage',
         {
           request_id : data
         }
       )
       .then((resp: any) => {
         //console.log(resp);
         this.taskIdDataData = this.hs.xmltojson(resp, 'ams_approval_matrix');
         if (!this.taskIdDataData || this.taskIdDataData.length === 0) {
           this.taskIdDataData = [];
         }
         this.taskIdDataData = Array.isArray(this.taskIdDataData)
         ? this.taskIdDataData
         : [this.taskIdDataData];
         console.log('this.taskIdDataData',this.taskIdDataData[0].taskid);
         
       });
   }

   performTaskBpm() {
    this.hs.ajax(
      'PerformTaskAction',
      'http://schemas.cordys.com/notification/workflow/1.0',
      {
        TaskId: this.taskIdDataData[0].taskid,
        Action: 'COMPLETE',
      }
    );
  }
 

    
    currentRowData: any;
    populateForm(data: any) {
      console.log('data',data); 
      this.currentRowData = data;
      $('#AssetType').val(this.currentRowData.ams_subcat_master.asset_type);
      $('#CategoryId').val(this.currentRowData.ams_category_master.category);
      $('#SubCategoryId').val(this.currentRowData.ams_subcat_master.subcategory);
      $('#Username').val(this.currentRowData.ams_user_master.user_name);
      $('#Units').val(this.currentRowData.units_required);
      $('#WarrantyYearse').val(this.currentRowData.ext_warranty);
      $('#RequestDate').val(this.currentRowData.request_date);
      $('#WarrantyExpiryDate').val(this.currentRowData.warranty_expiry_date);
      this.getTaskIdfunction(this.currentRowData.request_id);
     // console.log('this.currentRowData.ams_approval_matrix.returnstatus',this.currentRowData.ams_approval_matrix.returnstatus)
      this.returnStatus = this.currentRowData.ams_approval_matrix.returnstatus
      console.log('this.returnStatus', this.returnStatus);
      this.allocatedproductsFunction(this.currentRowData.ams_approval_matrix.request_id)
      $('#exampleModal').modal('show');
    }

    returnStatus:any = '';

   

    allocatedproductsData: any = [];
    allocatedproductsFunction(id:any){
      //debugger
      console.log('id in fxn',id);
      
      this.hs
      .ajax(
        'GetAllocatedProducts',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          request_id : id,
        }
      )
      .then((resp: any) => {
        console.log('resp',resp);
        
        this.allocatedproductsData = this.hs.xmltojson(resp, 'ams_product_details');
        if (!this.allocatedproductsData || this.allocatedproductsData.length === 0) {
          this.allocatedproductsData = [];
        }
        this.allocatedproductsData = Array.isArray(this.allocatedproductsData)
        ? this.allocatedproductsData
        : [this.allocatedproductsData];
        console.log('this.allocatedproductsData',this.allocatedproductsData);
       // console.log('this.allocatedproductsData.product_status',this.allocatedproductsData[0].product_status);
        console.log('this.allocatedproductsData.reqst_id',this.allocatedproductsData[0].reqst_id);
        this.statusCheck = this.allocatedproductsData[0].product_status
        console.log('this.statusCheck',this.statusCheck);
        this.GetRetExtProductsFunction(this.allocatedproductsData[0].reqst_id,this.statusCheck)
      });
    }

    statusCheck:any = ''; 

    GetRetExtProductsData: any = [];
    GetRetExtProductsFunction(id:any,status:any){
      //debugger
      console.log('id in fxn',id);
      console.log('status id in fxn',status);
      
      
      this.hs
      .ajax(
        'GetRetExtProducts',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          reqst_id : id,
          product_status : status
        }
      )
      .then((resp: any) => {
        console.log('resp',resp);
        
        this.GetRetExtProductsData = this.hs.xmltojson(resp, 'ams_product_details');
        if (!this.GetRetExtProductsData || this.GetRetExtProductsData.length === 0) {
          this.GetRetExtProductsData = [];
        }
        this.GetRetExtProductsData = Array.isArray(this.GetRetExtProductsData)
        ? this.GetRetExtProductsData
        : [this.GetRetExtProductsData];
        console.log(' this.GetRetExtProductsData',this.GetRetExtProductsData);
            
      });
    }


  

    approveFunction() {
      if(this.returnStatus == 'Approved By Asset Manager'){
        this.hs
        .ajax(
          'UpdateAms_approval_matrix',
          'http://schemas.cordys.com/amsWSAppServerPackage',
          {
            tuple: {
              old: {
                ams_approval_matrix  : {
                  id: this.currentRowData.ams_approval_matrix.id,
                },
              },
              new: {
                ams_approval_matrix : {
                  returnstatus: 'Approved By Allocation Team',
                  ret_team_remarks: $('#Remarks').val(),
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('edit details response', resp);
          $('#toastElement').toast('show');
          this. performTaskBpm();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: "Submitted Successfully.",
            showConfirmButton: false,
            toast: true,
            timer: 2000,
          });
          
          if (this.dtElement && this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.ajax.reload();
            });
          }
        });
      }
      else{
        this.hs
          .ajax(
            'UpdateAms_approval_matrix ',
            'http://schemas.cordys.com/amsWSAppServerPackage',
            {
              tuple: {
                old: {
                  ams_approval_matrix  : {
                    id: this.currentRowData.ams_approval_matrix.id,
                  },
                },
                new: {
                  ams_approval_matrix : {
                    remarks_allocation_team: $('#allocRemarks').val(),
                    status: 'Approved By Allocation Team',
                  },
                },
              },
            }
          )
          .then((resp: any) => {
            console.log('edit details response', resp);
            $('#toastElement').toast('show');
           this.performTaskBpm();
            if (this.dtElement && this.dtElement.dtInstance) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.ajax.reload();
              });
            }
          });
      }
  
      $('#exampleModal').modal('hide');
    }


    rejectFunction() {
      if(this.returnStatus == 'Approved By Asset Manager'){
        this.hs
        .ajax(
          'UpdateAms_approval_matrix',
          'http://schemas.cordys.com/amsWSAppServerPackage',
          {
            tuple: {
              old: {
                ams_approval_matrix  : {
                  id: this.currentRowData.ams_approval_matrix.id,
                },
              },
              new: {
                ams_approval_matrix : {
                  returnstatus: 'Rejected By Allocation Team',
                  ret_team_remarks: $('#Remarks').val(),
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('edit details response', resp);
          $('#toastElement').toast('show');
          this. performTaskBpm();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: "Submitted Successfully.",
            showConfirmButton: false,
            toast: true,
            timer: 2000,
          });
          
          if (this.dtElement && this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.ajax.reload();
            });
          }
        });
      }
      this.hs
        .ajax(
          'UpdateAms_approval_matrix ',
          'http://schemas.cordys.com/amsWSAppServerPackage',
          {
            tuple: {
              old: {
                ams_approval_matrix  : {
                  id: this.currentRowData.ams_approval_matrix.id,
                },
              },
              new: {
                ams_approval_matrix : {
                  status: 'Rejected with Allocation Team',
                  remarks_allocation_team: $('#allocRemarks').val(),
                  
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('edit details response', resp);
          $('#toastElement').toast('show');
          this.performTaskBpm();
          
          if (this.dtElement && this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.ajax.reload();
            });
          }
        });
  
      $('#exampleModal').modal('hide');
    }
  

    ngAfterViewInit(): void {
      this.dtTrigger.next(null);
    }
    

}
