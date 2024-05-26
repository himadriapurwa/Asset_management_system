import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { HeroService } from '../hero.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  data: any=[];
  constructor(private hs: HeroService) { }
  ngOnInit(): void {
    this.ViewAsset();
    this.StatusMasterGraph();
    
  }
  public chart: any;

  public chart2 : any;


createChart(labels: any, values: any){
  
  console.log('labels',labels);
  console.log('values',values);
  
  this.chart = new Chart("MyChart", {
    type: 'bar', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: labels,
       datasets: [
        {
          label: "Number of Availability",
          data: values,
          backgroundColor: 
          ["#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"]
        },
        
      ]
    },
    options: {
      aspectRatio:2.5
    }
    
  });
}

  ViewAsset(){
    this.hs.ajax('Getchartsdata2','http://schemas.cordys.com/amsWSAppServerPackage',{ })
    .then((resp: any) =>
     {
      this.data = this.hs.xmltojson(resp, 'ams_subcat_master');
      // this.data=resp;
     console.log("resp",resp);
     const labels = this.data.map((entry: { columns: any; }) => entry.columns);
     const values = this.data.map((entry: { values: any; }) => entry.values);
        console.log('labels data',labels);
        
        this.createChart(labels, values);
     console.log("response",this.data)
    }
     );
  }

  StatusMasterGraph(){
    this.hs.ajax(
      'Getchartsdataformatrix',
      'http://schemas.cordys.com/amsWSAppServerPackage',
      { }
    )
    .then((resp: any) =>
     {
      this.data = this.hs.xmltojson(resp, 'ams_approval_matrix');
      // this.data=resp;
     console.log("resp",resp);
     const labels = this.data.map((entry: { columns: any; }) => entry.columns);
     const values = this.data.map((entry: { values: any; }) => entry.values);
        console.log('labels data',labels);
        
        this.createChart2(labels, values);
     console.log("response",this.data)
    }
     );
  }

  createChart2(labels: any, values: any){
  
    console.log('labels',labels);
    console.log('values',values);
    
    this.chart = new Chart("MyChart2", {
      type: 'pie', //this denotes tha type of chart
  
      data: {// values on X-Axis
        labels: labels,
         datasets: [
          {
            label: "Number of Availability",
            data: values,
            backgroundColor: 
            ["#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"]
          },
          
        ]
      },
      options: {
        responsive: true,
      maintainAspectRatio: true,
        aspectRatio:2.5,
        
      }
      
    });
  }

}
