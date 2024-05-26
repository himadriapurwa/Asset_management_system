import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-deptheadapproval',
  templateUrl: './deptheadapproval.component.html',
  styleUrls: ['./deptheadapproval.component.css']
})
export class DeptheadapprovalComponent implements OnInit {

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
              'GetDeptHeadPendingRqsts',
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
            title: 'remarks',
            data: 'remarks',
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
      console.log(this.currentRowData.request_id);
      this.getTaskIdfunction(this.currentRowData.request_id)
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

    editApproveDetails() {
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
                  status: 'Approved By Department Head',
                  remarks_team_lead: $('#Remarks').val(),
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('edit details response', resp);
          $('#toastElement').toast('show');
          this.performTaskBpm();
          $('#allocRemarks').val("")
          if (this.dtElement && this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.ajax.reload();
            });
          }
        });
  
      $('#exampleModal').modal('hide');
    }

    editRejectDetails() {
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
                  status: 'Rejected By department head',
                  remarks_team_lead: $('#Remarks').val(),
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('reject details response', resp);
          $('#toastElement').toast('show');
          this.performTaskBpm();
          $('#allocRemarks').val("")
          if (this.dtElement && this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.ajax.reload();
            });
          }
        });
  
      $('#exampleModal').modal('hide');
    }

    sendBackFunction() {
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
                  status: 'Sent Back To Requester',
                  remarks_team_lead: $('#Remarks').val(),
                },
              },
            },
          }
        )
        .then((resp: any) => {
          console.log('edit details response', resp);
          $('#toastElement').toast('show');
          this.performTaskBpm();
          $('#allocRemarks').val("")
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
