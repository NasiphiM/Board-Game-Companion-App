import { Component, OnInit } from '@angular/core';
import { AdminService,scriptFace } from '../admin-service/admin.service';

@Component({
  selector: 'board-game-companion-app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  // private name: string;
  scripts: scriptFace[]=[];
  currently: scriptFace[]=[];
  running: scriptFace[]=[];
  flagged: scriptFace[]=[];

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.scripts = this.adminService.getScripts();
  }

  // currentMonth(month:string): void{
  //   this.currentMonth = this.adminService.getScripts();
  //   this.scripts.splice(0);
  //   for(let index=0; index<this.currentMonth.length; index++){
  //     if(this.currentMonth[index])
  //       this.scripts.push();
  //   }
  // }

  // runningScripts(status:string): void{

  // }

  // flaggedScripts(status:string): void{

  // }

}
