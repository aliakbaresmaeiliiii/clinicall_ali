import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-dr-project',
  templateUrl: './detail-dr-project.component.html',
  styleUrl: './detail-dr-project.component.scss'
})
export class DetailDrProjectComponent {

  doctors:any[]=[
    {name:'Aliakbar esmaeili',icon:'',},
    {name:'Elahe Saadati',icon:'',},
    {name:'Mehran Naghibi',icon:'',},
    {name:'Elham Saadati',icon:'',}
  ]
}
