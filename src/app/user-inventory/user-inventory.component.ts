import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.css']
})
export class UserInventoryComponent implements OnInit {

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
        //  this.populateForm(data);
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
            title : 'rem_qty',
            data : 'rem_qty'
          }
          // {
          //   title: 'Action',
          //   data: null,
          //   render: function (data, type, row) {
          //     return `
          //   <span class='editbtn' data-bs-target='#editModal' data-bs-toggle='modal'> <i class="far fa-edit" style="color: #143c80;"></i></span>
             
          //     `;
          //   },
          //   className: 'text-center',
          // },
 
        ],
      };
    }
    
    ngAfterViewInit(): void {
      this.dtTrigger.next(null);
    }


}
