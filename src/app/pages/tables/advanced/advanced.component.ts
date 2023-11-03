import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// types
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { Employee } from './advance.model';

// data
import { EMPLOYEES } from './data';

@Component({
  selector: 'app-table-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class TableAdvancedComponent implements OnInit {

  records: Employee[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Advanced Table",
      breadCrumbItems: [{ label: 'Tables', path: '.' }, { label: 'Advanced Table', path: '.', active: true }]
    });
    this._fetchData();
    this.initTableCofig();
  }

  /**
 * fetches table records
 */
  _fetchData(): void {
    this.records = EMPLOYEES;
  }

  /**
   * initialize advanced table columns
   */
  initTableCofig(): void {
    this.columns = [
      {
        name: 'name',
        label: 'Name',
        formatter: (record: Employee) => record.name,
        width: 245,
      },
      {
        name: 'position',
        label: 'Position',
        formatter: (record: Employee) => record.position,
        width: 360,
      },
      {
        name: 'office',
        label: 'Office',
        formatter: (record: Employee) => record.office,
        width: 180
      },
      {
        name: 'age',
        label: 'Age',
        formatter: (record: Employee) => record.age,
      },
      {
        name: 'date',
        label: 'Date',
        formatter: (record: Employee) => record.date,
      },
      {
        name: 'salary',
        label: 'Salary',
        formatter: (record: Employee) => record.salary,

      }
    ];
  }

  // compares two cell values
  compare(v1: string | number, v2: string | number): any {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  /**
   * Sort the table data
   * @param event column name, sort direction
   */
  onSort(event: SortEvent): void {
    if (event.direction === '') {
      this.records = EMPLOYEES;
    } else {
      this.records = [...this.records].sort((a, b) => {
        const res = this.compare(a[event.column], b[event.column]);
        return event.direction === 'asc' ? res : -res;
      });
    }
  }

  /**
 * Match table data with search input
 * @param row Table row
 * @param term Search the value
 */
  matches(row: Employee, term: string) {
    return row.name.toLowerCase().includes(term)
      || row.position.toLowerCase().includes(term)
      || row.office.toLowerCase().includes(term)
      || String(row.age).includes(term)
      || row.date.toLowerCase().includes(term)
      || row.salary.toLowerCase().includes(term);
  }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = EMPLOYEES;

      //  filter
      updatedData = updatedData.filter(record => this.matches(record, searchTerm));
      this.records = updatedData;
    }

  }


}
