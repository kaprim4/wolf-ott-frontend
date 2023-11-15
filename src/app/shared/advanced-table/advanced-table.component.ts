import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AdvancedTableService} from './advanced-table.service';
import {NgbSortableHeaderDirective, SortEvent} from './sortable.directive';
import {TokenService} from "../../core/service/token.service";
import {ActivatedRoute} from "@angular/router";


export interface Column {
    name: string;
    label: string;
    formatter: (a: any) => any | string;
    sort?: boolean;
    width?: number;
}

@Component({
    selector: 'app-advanced-table',
    templateUrl: './advanced-table.component.html',
    styleUrls: ['./advanced-table.component.scss'],
    providers: [AdvancedTableService]
})
export class AdvancedTableComponent implements OnInit, AfterViewChecked {
    @Input() pagination: boolean = false;
    @Input() isSearchable: boolean = false;
    @Input() isSortable: boolean = false;
    @Input() pageSizeOptions: number[] = [];
    @Input() tableData: any[] = [];
    @Input() tableClasses: string = '';
    @Input() theadClasses: string = '';
    @Input() hasRowSelection: boolean = false;
    @Input() columns: Column[] = [];
    collectionSize: number = this.tableData.length;
    selectAll: boolean = false;
    isSelected: boolean[] = [];
    @Input() hasActions: boolean = true;

    @Output() search = new EventEmitter<string>();
    @Output() sort = new EventEmitter<SortEvent>();
    @Output() handleTableLoad = new EventEmitter<any>();

    @ViewChildren(NgbSortableHeaderDirective) headers!: QueryList<NgbSortableHeaderDirective>;
    @ViewChildren('advancedTable') advancedTable!: any;

    constructor(
        public service: AdvancedTableService,
        private sanitizer: DomSanitizer,
        private componentFactoryResolver: ComponentFactoryResolver,
        private activated: ActivatedRoute,
    ) {
    }

    ngAfterViewChecked(): void {
        this.handleTableLoad.emit();
    }

    ngOnInit(): void {
        for (let i = 0; i < this.tableData.length; i++) {
            this.isSelected[i] = false;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.paginate();
    }

    paginate(): void {
        this.service.totalRecords = this.tableData.length;
        if (this.service.totalRecords === 0) {
            this.service.startIndex = 0;
        } else {
            this.service.startIndex = ((this.service.page - 1) * this.service.pageSize) + 1;
        }
        this.service.endIndex = Number((this.service.page - 1) * this.service.pageSize + this.service.pageSize);
        if (this.service.endIndex > this.service.totalRecords) {
            this.service.endIndex = this.service.totalRecords;
        }
    }

    searchData(): void {
        this.search.emit(this.service.searchTerm);
    }

    onSort({column, direction}: SortEvent): void {
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
        this.sort.emit({column, direction});
    }

    callFormatter(column: Column, data: any): any {
        return (column.formatter(data));
    }

    checkIntermediate(): boolean {
        let selectedRowCount = this.isSelected.filter(x => x).length;
        return !this.selectAll && selectedRowCount > 0 && selectedRowCount < this.tableData.length;
    }

    selectAllRow(event: any): void {
        this.selectAll = !this.selectAll;
        if (this.selectAll) {
            for (let i = 0; i < this.tableData.length; i++) {
                this.isSelected[i] = true;
            }
        } else {
            for (let i = 0; i < this.tableData.length; i++) {
                this.isSelected[i] = false;
            }
        }
    }

    selectRow(index: number): void {
        this.isSelected[index] = !this.isSelected[index];
        this.selectAll = (this.isSelected.filter(x => x).length === this.tableData.length);
    }
}
