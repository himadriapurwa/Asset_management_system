import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.css']
})
export class UserhistoryComponent implements OnInit {

  constructor(private hs: HeroService) {}

  ngOnInit(): void {
   // this.getUserAssetDetails();
   this.dataTable();
   this.hideConnectedTrips();
  }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  tableData: any = [];
  getUserAssetDetails(){
    this.hs
    .ajax(
      'GetUserAssetDetails',
      'http://schemas.cordys.com/amsWSAppServerPackage',
      {
        user_id : '1'
      }
    )
    .then((resp: any) => {
     // console.log('resp',resp);
      
      this.tableData = this.hs.xmltojson(resp, 'ams_asset_request');
      console.log(this.tableData);
          
    });
  }





  
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
            'GetUserAssetDetails',
            'http://schemas.cordys.com/amsWSAppServerPackage',
            {
              user_id : '1'
            }
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
        // {
        //   title: 'asset_id',
        //   data: 'asset_id',
        // },
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
        {
          title: 'warranty_expiry_date',
          data: 'warranty_expiry_date',
        },
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
      $('#Username').val(this.currentRowData.ams_user_master.user_name);
      $('#SubCategoryId').val(this.currentRowData.ams_subcat_master.subcategory);
      $('#RequestDate').val(this.currentRowData.request_date);
    //  $('#WarrantyExpiryDate').val(this.currentRowData.warranty_expiry_date);
     // this.getTaskIdfunction(this.currentRowData.request_id)
     console.log(this.currentRowData.ams_approval_matrix.request_id)
     console.log('this.currentRowData.req_id',this.currentRowData.req_id);
     

     this.allocatedproductsFunction(this.currentRowData.ams_approval_matrix.request_id)
      $('#exampleModal').modal('show');
    }

    checkedProducts: { product_seq_id: string; warranty_upto: string }[] = [];
    uncheckedProducts: { product_seq_id: string; warranty_upto: string }[] = [];

    handleProductCheckboxChange(
      product: { product_seq_id: string; warranty_upto: string },
      event: Event
  ) {
      const checkbox = event.target as HTMLInputElement;
  
      if (checkbox.checked) {
          this.checkedProducts.push(product);
          const index = this.uncheckedProducts.indexOf(product);
          if (index !== -1) {
              this.uncheckedProducts.splice(index, 1);
          }
          console.log('this.checkedProducts',this.checkedProducts);
          
      } else {
          this.uncheckedProducts.push(product);
          const index = this.checkedProducts.indexOf(product);
          if (index !== -1) {
              this.checkedProducts.splice(index, 1);
          }
          console.log('this.uncheckedProducts',this.uncheckedProducts);
          
      }
  }

    allocatedproductsData: any = [];
    allocatedproductsFunction(id:any){
      this.hs
      .ajax(
        'GetAllocatedProducts',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          request_id : id
        }
      )
      .then((resp: any) => {
       // console.log('resp',resp);
        
        this.allocatedproductsData = this.hs.xmltojson(resp, 'ams_product_details');
        if (!this.allocatedproductsData || this.allocatedproductsData.length === 0) {
          this.allocatedproductsData = [];
        }
        this.allocatedproductsData = Array.isArray(this.allocatedproductsData)
        ? this.allocatedproductsData
        : [this.allocatedproductsData];
        console.log(' this.allocatedproductsData',this.allocatedproductsData);
            
      });
    }

    


  editDetails() {
    this.hs
      .ajax(
        'UpdateAms_asset_request',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {
          tuple: {
            old: {
              ams_asset_request : {
                req_id: this.currentRowData.req_id,
              },
            },
            new: {
              ams_asset_request: {
                ext_warranty: $('#WarrantyYearse').val(),
             
              },
            },
          },
        }
      )
      .then((resp: any) => {
        console.log('edit details response', resp);
        $('#toastElement').toast('show');
        if (this.dtElement && this.dtElement.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
          });
        }
      });

    $('#exampleModal').modal('hide');
  }

  displayConnectedTrips() {
    const item = document.getElementById('warrantySelectId');
    if (item != null) {
      item.style.display = 'block';
    }
  }

  hideConnectedTrips() {
    const item = document.getElementById('warrantySelectId');
    if (item != null) {
      item.style.display = 'none';
    }
  }

  checkAvailability() {

    var radioButton = document.querySelector('input[name="availabilityRadio"]:checked') as HTMLInputElement;

    if (radioButton) {
        var availability = radioButton.value;

        if (availability === "yes") {
            console.log("yes");
            this.editExtApproveDetails();
          } else {
            console.log("no");
            this.editApproveDetails();
        }
    } else {
        console.log("No radio button is selected.");
    }
}

newProdArray:any = [];
editApproveDetails() {
  console.log('inside edit');
  

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
              returnstatus: 'Return Request Initiated',
            },
          },
        },
      }
    )
    .then((resp: any) => {
      console.log('edit details response', resp);
      for (let product of this.checkedProducts) {
        console.log('product',product);
        this.newProdArray = product;
        this.processProductId(this.newProdArray.prod_id);  
    }
    
  });
  
  this.mainBpm();
  $('#exampleModal').modal('hide');
}

editExtApproveDetails() {
  

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
              extend_status: 'Extend Request Initiated',
            },
          },
        },
      }
    )
    .then((resp: any) => {
      console.log('edit details response', resp);
      this.editExtApproveDetailsInAssetRequest();
 
  
    });

  $('#exampleModal').modal('hide');
}

editExtApproveDetailsInAssetRequest() {
  console.log('inside edit');
  
  this.hs
    .ajax(
      'UpdateAms_asset_request',
      'http://schemas.cordys.com/amsWSAppServerPackage',
      {
        tuple: {
          old: {
            ams_asset_request   : {
              req_id: this.currentRowData.req_id,
            },
          },
          new: {
            ams_asset_request : {
              ext_warranty: $('#warrantyYearsSelect').val(),
            },
          },
        },
      }
    )
    .then((resp: any) => {
      console.log('edit details response', resp);
      for (let product of this.checkedProducts) {
        console.log('product',product);
        this.newProdArray = product;
        this.newprocessProductId(this.newProdArray.prod_id);  
    }
   
  
    });
    this.mainBpm();

  $('#exampleModal').modal('hide');
}



processProductId(prod_id: string) {

  console.log("Processing product ID:", prod_id);

  this.UpdateProductDetails(prod_id);
}

newprocessProductId(prod_id: string) {

  console.log("Processing product ID:", prod_id);

  this.ExtUpdateProductDetails(prod_id);
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
              product_status: 'Return Request Initiated',
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

ExtUpdateProductDetails(id:any) {
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
              product_status: 'Extend Request Initiated',
            },
          },
        },
      }
    )
    .then((resp: any) => {
      console.log('edit details response', resp);
      $('#toastElement').toast('show');
   //   this.mainBpm();
    
    });

  $('#exampleModal').modal('hide');
}

mainBpm() {
  console.log('this.currentRowData.ams_approval_matrix.request_id '+'AMS'+this.currentRowData.ams_approval_matrix.request_id);;
  
  this.hs
    .ajax('angular_return_flow', 'http://schemas.cordys.com/default', {
      request_id: this.currentRowData.ams_approval_matrix.request_id,
    })
    .then((resp: any) => {
      console.log('main bpm response', resp);
    });
}

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

}
