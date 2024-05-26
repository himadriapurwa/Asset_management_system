import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent  {

  constructor(private hs: HeroService, private formBuilder: FormBuilder,
    private fb: FormBuilder) {}


    yourForm: any = FormGroup;
    submitted = false;
  
    get f() {
      return this.yourForm.controls;
    }

  ngOnInit(): void {

    // this.dataTable();
    // this.getCategoriesfunction();

    this.yourForm = this.formBuilder.group({
      addMemberNameModel: ['', Validators.required],
      assetcategoryModel: ['', Validators.required],
      addMailIdModel: ['', 
              [
        Validators.required,
        Validators.pattern(
          '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$'
        ),
      ],
      ],
    
    });

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
              'Getallallocationteamdata',
              'http://schemas.cordys.com/amsWSAppServerPackage',
              {}
            )
            .then((resp: any) => {
             // console.log('resp',resp);
              
              this.tableData = this.hs.xmltojson(resp, 'ams_allocation_team');
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
            title: 'member_name',
            data: 'member_name',
          },
          {
            title: 'category',
            data: 'category',
          },
          {
            title: 'mail_id',
            data: 'mail_id',
          },
         
          {
            title: 'Action',
            data: null,
            render: function (data, type, row) {
              return `
            <span class='editbtn' data-bs-target='#EditTeamMemberModal' data-bs-toggle='modal'> <i class="far fa-edit" style="color: #143c80;"></i></span>
             
              `;
            },
            className: 'text-center',
          },
          
         
          
          
        ],
      };
    }

    addMemberNameModel:any = ''
    addMailIdModel:any =''

    assetcategoryData: any = [];
  assetcategoryModel = '';

  getCategoriesfunction() {
    this.hs
      .ajax(
        'Getallcategorydata',
        'http://schemas.cordys.com/amsWSAppServerPackage',
        {}
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


  submitRequestFunction(){

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
      //       'UpdateAms_allocation_team',
      //       'http://schemas.cordys.com/amsWSAppServerPackage',
      //       {
      //         tuple: {
      //           new: {
      //             ams_allocation_team: {
      //               member_name: this.addMemberNameModel,
      //               category: this.assetcategoryModel,
      //               mail_id: this.addMailIdModel,
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
      //       Swal.fire({
      //         position: 'top-end',
      //         icon: 'success',
      //         text: "Form Submitted successfully.",
      //         showConfirmButton: false,
      //         toast: true,
      //         timer: 2000,
      //       });
         
            
      //     });


  }

  clearForm() {
    this.submitted = false;
    this.yourForm.reset();
  }

  

  editcategoryModel:any = '';

  currentRowData: any;
  populateForm(data: any) {
   
    
    this.currentRowData = data;
    console.log('currentRowData',this.currentRowData);
    $('#editInputName1').val(this.currentRowData.member_name);
    $('#editCategoryId').val(this.currentRowData.category);
    $('#editInputEmail1').val(this.currentRowData.mail_id);
    console.log('this.currentRowData.member_id',this.currentRowData.member_id);
    
  
    $('#exampleModal').modal('show');
  }

  EditTeamMemberFunction(){
    this.hs
        .ajax(
          'UpdateAms_allocation_team',
          'http://schemas.cordys.com/amsWSAppServerPackage',
          {
            tuple: {
              old: {
                ams_allocation_team: {
                  member_id: this.currentRowData.member_id,
                },
              },
              new: {
                ams_allocation_team : {
                  category: this.editcategoryModel,
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
