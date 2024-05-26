import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-deptrqsthstry',
  templateUrl: './deptrqsthstry.component.html',
  styleUrls: ['./deptrqsthstry.component.css']
})
export class DeptrqsthstryComponent implements OnInit {

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
              'GetDeptHeadHstryRqsts',
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
          // {
          //   title: 'asset_id',
          //   data: 'asset_id',
          // },
          {
            title: 'user_name',
            data: 'ams_user_master.user_name',
          },
          {
            title: 'asset_type',
            data: 'ams_inventory_master.asset_type',
          },
          // {
          //   title: 'category',
          //   data: 'ams_inventory_master.category',
          // },
          // {
          //   title: 'subcategory',
          //   data: 'ams_inventory_master.subcategory',
          // },
          {
            title: 'priority',
            data: 'priority',
          },
          {
            title: 'units_requested',
            data: 'units_required',
          },
          // {
          //   title: 'available_quantity',
          //   data: 'ams_inventory_master.available_quantity',
          // },
          // {
          //   title: 'ext_warranty',
          //   data: 'ext_warranty',
          // },
          {
            title: 'warranty_expiry_date',
            data: 'warranty_expiry_date',
          },
          {
            title: 'request_date',
            data: 'request_date',
          },
          {
            title: 'Dept Head remarks',
            data: 'ams_approval_matrix.remarks_team_lead',
          },
          // {
          //   title: 'asset_manager',
          //   data: 'asset_manager',
          // },
         
          
        ],
      };
    }

    
    currentRowData: any;
    populateForm(data: any) {
      //debugger;
      
      this.currentRowData = data;
      console.log('currentRowData',this.currentRowData);
      $('#Username').val(this.currentRowData.ams_user_master.user_name);
      $('#AssetType').val(this.currentRowData.ams_inventory_master.asset_type);
      $('#CategoryId').val(this.currentRowData.ams_inventory_master.category);
      $('#SubCategoryId').val(this.currentRowData.ams_inventory_master.subcategory);
      $('#Units').val(this.currentRowData.units_required);
      $('#WarrantyYearse').val(this.currentRowData.ext_warranty);

      $('#RequestDate').val(this.currentRowData.request_date);
      // $('#Remarks').val(this.currentRowData.remarks);
      console.log('id to update',this.currentRowData.ams_approval_matrix.id);
      $('#Remarks').val("");
    
      $('#exampleModal').modal('show');
    }

    ngAfterViewInit(): void {
      this.dtTrigger.next(null);
    }
    

}
