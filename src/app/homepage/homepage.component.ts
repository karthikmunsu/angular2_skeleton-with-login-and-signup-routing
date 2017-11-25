import { Component, OnInit, ViewEncapsulation, AfterViewChecked,  AfterViewInit} from '@angular/core';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomepageService]
})
export class HomepageComponent implements OnInit, AfterViewInit, AfterViewChecked {

    title = 'Demoapp';
constructor( private appService: HomepageService,){}
public images = new Array();
public enable: boolean = true;
public url: any;

public getData() {
  let t1 = 'test';
  this.appService.fetchData(t1).subscribe(
        (res) => {
    for(let i = 0; i < res.length; i++){
      if(this.checkImage(res[i])){
        this.images.push(res[i]);
      }
    }
      }, (err) => {
        console.log(err);
      });
}

public refresh(){
  this.images=null;
  this.getData();
}

public checkImage(data: any) {
  let tmp = data.split('.');
    console.log('check ',tmp);
  if(tmp[tmp.length-1] === 'jpg' || tmp[tmp.length-1] === 'jpeg') {
    return true;
  }else {
  return false;
}
}

public urlAppend(data: any) {
  return 'http://localhost:3000/imgfile/?image='+data;
}

public ngAfterViewInit() {
   this.getData();
}

public ngOnInit() {}
public ngAfterViewChecked(): void {}


public readUrl(event:any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event:any) => {
      this.url = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
    this.enable = false;
  }
}

}
