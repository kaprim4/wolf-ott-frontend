import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {catchError, debounceTime, of, Subject, switchMap} from 'rxjs';
import {Page} from 'src/app/shared/models/page';
import {PresetDetail, PresetList} from 'src/app/shared/models/preset';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {PresetService} from 'src/app/shared/services/preset.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
    selector: 'app-presets-list',
    templateUrl: './presets-list.component.html',
    styleUrl: './presets-list.component.scss'
})
export class PresetsListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'presetName',
        'presetDescription',
        'bouquets',
        'status',
        'createdAt',
        'action',
    ];

    dataSource = new MatTableDataSource<PresetDetail>([]);
    totalElements = 0;
    pageSize = 10;
    pageIndex = 0;
    sortDirection = 'asc';
    sortActive = 'id';
    loading: boolean = true;

    private searchSubject = new Subject<string>();
    searchValue = '';

    principal: any;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private presetService: PresetService, private notificationService: NotificationService, private tokenService: TokenService) {
        this.loadPresets();
        this.principal = this.tokenService.getPayload();
    }

    ngOnInit(): void {
        this.loadPresets();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.presetService.getPresets<PresetDetail>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadPresets());
        this.paginator?.page.subscribe(() => this.loadPresets());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deletePreset(id: number): void {
        if (confirm('Are you sure you want to delete this record?')) {
            this.presetService.deletePreset(id).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(preset => preset.id !== id);
            });
        }
    }

    loadPresets(): void {
        const page = this.paginator?.pageIndex || this.pageIndex;
        const size = this.paginator?.pageSize || this.pageSize;
        this.loading = true;

        this.presetService.getPresets<PresetDetail>('', page, size).pipe(
            catchError(error => {
                console.error('Failed to load presets', error);
                this.loading = false;
                this.notificationService.error('Failed to load presets. Please try again.');
                return of({content: [], totalPages: 0, totalElements: 0, size: 0, number: 0} as Page<PresetDetail>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            console.log(pageResponse.content);
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }

    extractBouquetCount(bouquetString: string): number {
        try{
            const regex = /PresetBouquet{presetId=\d+, bouquetId=\d+, positionOrder=\d+}/g;
            const matches = bouquetString.match(regex);
            return matches ? matches.length : 0; // Retourne le nombre de bouquets trouvés
        }catch(ex){
            return 0;
        }
    }

    get isAdmin() {
        return !!this.principal?.isAdmin;
    }
}
