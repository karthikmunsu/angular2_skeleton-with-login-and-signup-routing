import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
providers: [AppService]
})
export class AppComponent implements OnInit {
  title = 'angular2 skeleton app';
constructor(){}

public ngOnInit() {}
}
