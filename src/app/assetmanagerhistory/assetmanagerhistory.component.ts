import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-assetmanagerhistory',
  templateUrl: './assetmanagerhistory.component.html',
  styleUrls: ['./assetmanagerhistory.component.css']
})
export class AssetmanagerhistoryComponent implements OnInit {

  constructor(private hs: HeroService) {}

  ngOnInit(): void {
   this.dataTable();
   this.getAllocationTeamFunction();
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
            'GetAssetManPendingRqsts',
            'http://schemas.cordys.com/amsWSAppServerPackage',
            {}
          )
          .then((resp: any) => {
            console.log('resp',resp);
            
            this.tableData = this.hs.xmltojson(resp, 'ams_asset_request');
            console.log(this.tableData);
            callback({
              recordsTotal: this.tableData.length,
              recordsFiltered: this.tableData.length,
              data: this.tableData,
            });
          });

        callback({
          recordsTotal: this.tableData.length,
          recordsFiltered: this.tableData.length,
          data: this.tableData,
        })
      },
     
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
       
        $(row)
          .find('.editbtn')
          .on('click', () => {
         
           this.populateForm(data);
          });

        $(row)
          .find('.closebtn')
          .on('click', () => {
       //     this.populateDeleteModal(data);
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
        // {
        //   title: 'ext_warranty',
        //   data: 'ext_warranty',
        // },
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

  teamAllocIdData: any = [];
  teamAllocIdModel = '';

  getTeamAllocfunction() {
    this.hs
      .ajax(
        'Getidbynameinallocation',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          member_name : this.teamMemberModel
        }
      )
      .then((resp: any) => {
        //console.log(resp);
        this.teamAllocIdData = this.hs.xmltojson(resp, 'ams_allocation_team');
        if (!this.teamAllocIdData || this.teamAllocIdData.length === 0) {
          this.teamAllocIdData = [];
        }
        this.teamAllocIdData = Array.isArray(this.teamAllocIdData)
        ? this.teamAllocIdData
        : [this.teamAllocIdData];
       // console.log('this.teamAllocIdData',this.teamAllocIdData);
        console.log('this.teamAllocIdData.member_id',this.teamAllocIdData[0].member_id);
        
      });
  }


  currentRowData: any;
  matrixStatus:any = '';
  returnStatus:any = '';
  populateForm(data: any) {
    console.log('data',data); 
    this.currentRowData = data;
    //debugger
    $('#AssetType').val(this.currentRowData.ams_subcat_master.asset_type);
    $('#CategoryId').val(this.currentRowData.ams_category_master.category);
    $('#SubCategoryId').val(this.currentRowData.ams_subcat_master.subcategory);
    $('#Username').val(this.currentRowData.ams_user_master.user_name);
    $('#Units').val(this.currentRowData.units_required);
    $('#WarrantyYearse').val(this.currentRowData.ext_warranty);
    $('#RequestDate').val(this.currentRowData.request_date);
    console.log(this.currentRowData.request_id);
    this.getTaskIdfunction(this.currentRowData.request_id)
    //console.log('approval matrix status',this.currentRowData.ams_approval_matrix.status);
    this.matrixStatus = this.currentRowData.ams_approval_matrix.status

    this.returnStatus = this.currentRowData.ams_approval_matrix.returnstatus
    console.log('this.returnStatus',this.returnStatus);
    
    console.log('this.matrixStatus',this.matrixStatus);
    console.log('this.currentRowData.req_id',this.currentRowData.req_id);
    //console.log('this.currentRowData.ams_product_details.product_status',this.currentRowData.ams_product_details.product_status)
    // this.allocatedproductsFunction(this.currentRowData.ams_approval_matrix.request_id,this.currentRowData.ams_product_details.product_status)
    this.allocatedproductsFunction(this.currentRowData.ams_approval_matrix.request_id)
    $('#exampleModal').modal('show');
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
 
 
 newProdArray:any = [];
  editApproveDetails() {
    if(this.returnStatus == 'Approved By Allocation Team')
      {
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
                  returnstatus: 'Successfully Completed',
                  ret_mgr_remarks: $('#Remarks').val(),
                 
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
          for (let product of this.GetRetExtProductsData) {
            console.log('product',product);
            this.newProdArray = product;
            this.processProductId(this.newProdArray.prod_id);  
        }
          return
        });
      }
      if(this.returnStatus == 'Rejected By Allocation Team')
        {
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
                    returnstatus: 'Unsuccessful',
                    ret_mgr_remarks: $('#Remarks').val(),
         
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
            for (let product of this.GetRetExtProductsData) {
              console.log('product',product);
              this.newProdArray = product;
              this.newprocessProductId(this.newProdArray.prod_id);  
          }
            return
          });
        }
      if(this.returnStatus == 'Return Request Initiated')
        {
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
                    returnstatus: 'Approved By Asset Manager',
                    remarks_manager: $('#Remarks').val(),
                    team_member : this.teamAllocIdData[0].member_id
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
            return;
          });
        }
  
    if(this.matrixStatus == 'Approved By Allocation Team')
      {
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
                  status: 'Successfully Completed',
                  remarks_manager: $('#Remarks').val(),
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
          return
        });
      }
    if(this.matrixStatus == 'Rejected By Allocation Team')
        {
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
                    status: 'Unsuccessful',
                    remarks_manager: $('#Remarks').val()
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
            return
          });
        }
        else{
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
                    status: 'Pending with Allocation Team',
                    remarks_manager: $('#Remarks').val(),
                    team_member : this.teamAllocIdData[0].member_id
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

 
    // this.hs
    //   .ajax(
    //     'UpdateAms_approval_matrix',
    //     'http://schemas.cordys.com/amsWSAppServerPackage',
    //     {
    //       tuple: {
    //         old: {
    //           ams_approval_matrix  : {
    //             id: this.currentRowData.ams_approval_matrix.id,
    //           },
    //         },
    //         new: {
    //           ams_approval_matrix : {
    //             status: 'Pending with Allocation Team',
    //             remarks_manager: $('#Remarks').val(),
    //             team_member : this.teamAllocIdData[0].member_id
    //           },
    //         },
    //       },
    //     }
    //   )
    //   .then((resp: any) => {
    //     console.log('edit details response', resp);
    //     $('#toastElement').toast('show');
    //     this. performTaskBpm();
        
    //     if (this.dtElement && this.dtElement.dtInstance) {
    //       this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //         dtInstance.ajax.reload();
    //       });
    //     }
    //   });

    $('#exampleModal').modal('hide');
  }

  processProductId(prod_id: string) {

    console.log("Processing product ID:", prod_id);
  
    this.UpdateProductDetails(prod_id);
  }

  newprocessProductId(prod_id: string) {

    console.log("Processing product ID:", prod_id);
  
    this.ReturnRejUpdateProductDetails(prod_id);
  }

  UpdateProductDetails(id:any) {
    console.log('id',id);
    
    this.hs
      .ajax(
        'UpdateAms_product_details',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          tuple: {
            old: {
              ams_product_details   : {
                prod_id: id,
              },
            },
            new: {
              ams_product_details : {
                product_status: 'Available',
                reqst_id : ''
              },
            },
          },
        }
      )
      .then((resp: any) => {
        console.log('edit details response', resp);
        $('#toastElement').toast('show');
      
      });
  
    $('#exampleModal').modal('hide');
  }

  ReturnRejUpdateProductDetails(id:any) {
    console.log('id',id);
    
    this.hs
      .ajax(
        'UpdateAms_product_details',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          tuple: {
            old: {
              ams_product_details   : {
                prod_id: id,
              },
            },
            new: {
              ams_product_details : {
                product_status: 'Allocated',
              },
            },
          },
        }
      )
      .then((resp: any) => {
        console.log('edit details response', resp);
        $('#toastElement').toast('show');
      
      });
  
    $('#exampleModal').modal('hide');
  }

  teamMemberData: any = [];
  teamMemberModel = '';

  getAllocationTeamFunction() {
    this.hs
      .ajax(
        'Getallallocationteamdata',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {}
      )
      .then((resp: any) => {
        //console.log(resp);
        this.teamMemberData = this.hs.xmltojson(resp, 'ams_allocation_team');
        if (!this.teamMemberData || this.teamMemberData.length === 0) {
          this.teamMemberData = [];
        }
        this.teamMemberData = Array.isArray(this.teamMemberData)
        ? this.teamMemberData
        : [this.teamMemberData];
        console.log('this.teamMemberData',this.teamMemberData);
        
      });
  }


    allocatedproductsData: any = [];
    // allocatedproductsFunction(id:any,status:any){
    //   //debugger
    //   console.log('id in fxn',id);
    //   console.log('status id in fxn',status);
      
      
    //   this.hs
    //   .ajax(
    //     'GetRetExtProducts',
    //     'http://schemas.cordys.com/amsWSAppServerPackage',
    //     {
    //       reqst_id : id,
    //       product_status : status
    //     }
    //   )
    //   .then((resp: any) => {
    //     console.log('resp',resp);
        
    //     this.allocatedproductsData = this.hs.xmltojson(resp, 'ams_product_details');
    //     if (!this.allocatedproductsData || this.allocatedproductsData.length === 0) {
    //       this.allocatedproductsData = [];
    //     }
    //     this.allocatedproductsData = Array.isArray(this.allocatedproductsData)
    //     ? this.allocatedproductsData
    //     : [this.allocatedproductsData];
    //     console.log(' this.allocatedproductsData',this.allocatedproductsData);
            
    //   });
    // }

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





  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

}
