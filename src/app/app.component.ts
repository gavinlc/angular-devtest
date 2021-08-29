import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Data } from './data.model';

import { DateTime } from 'luxon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'devtest-nontimed';

  public data: Data[] = [];
  public filteredData: Data[] = [];

  public displayedColumns: string[] = [
    'name',
    'age',
    'registered',
    'activeMinutes',
  ];

  public range: { start: DateTime | null; end: DateTime | null } = {
    start: null,
    end: null,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Data[]>('assets/members.json').subscribe((data) => {
      this.data = this.processData(data);
      this.filteredData = this.data;
    });
  }

  updateDateRange(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'start' && event.value)
      this.range.start = DateTime.fromJSDate(event.value);
    if (type === 'end' && event.value)
      this.range.end = DateTime.fromJSDate(event.value);
    if (this.range.start && this.range.end) this.filterResults();
  }

  filterResults() {
    this.filteredData = this.data.filter((member) => {
      if (member.registeredDate && this.range.start && this.range.end) {
        return (
          member.registeredDate >= this.range.start &&
          member.registeredDate <= this.range.end
        );
      } else {
        return true;
      }
    });
  }

  processData(data: Data[]) {
    //run through members and convert & extract data
    const processedData = [...data];
    processedData.map((member) => {
      //remove space to date to make it parsable
      const date = member.registered.split(' ').join('');
      member.registeredDate = DateTime.fromISO(date);
      member.activeMinutes = this.extractDataFromString(member.message);
    });

    return processedData;
  }

  extractDataFromString(input: string): number {
    const match = input.match(/[0-9]+/g);
    // TODO: one entry is entered as "twenty", so will result in no match
    if (match?.length) {
      const number = parseInt(match[0]);
      return number;
    } else {
      return 0;
    }
  }
}
