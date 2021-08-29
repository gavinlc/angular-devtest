import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from './data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public dataArray: Data[] = [];
  public title = 'devtest-nontimed';
  public displayedColumns: string[] = ['name', 'age'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Data[]>('assets/members.json').subscribe((data) => {
      this.dataArray = data;
    });
  }

  processData() {
    //run through members and extract data
  }

  extractDataFromString() {}
}
