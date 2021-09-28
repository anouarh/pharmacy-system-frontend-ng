import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faEdit,
  faPlus,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { DrugsService } from 'src/app/services/drugs.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { DrugsSearchDialogComponent } from '../drugs-search-dialog/drugs-search-dialog.component';

let endPointDrugs = environment.api + 'drugs';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DrugsComponent implements OnInit {
  drugs: any;
  isLoadingResults = true;
  resultsLength = 0;
  displayedColumns: string[] = [
    'nom',
    'composition',
    'distributeur',
    'ppv',
    'prixHospitalier',
    'codeATC',
    'natureDuProduit',
    'actions',
  ];
  currentUser: any;

  faEdit = faEdit;
  faTrash = faTrash;
  faSearch = faSearch;
  faPlus = faPlus;

  constructor(
    public http: HttpService,
    public drugService: DrugsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getAllDrugs();
  }

  getUserData() {
    const userData: {
      username: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    this.currentUser = userData;
  }

  getAllDrugs() {
    this.drugService
      .getAllByUsername(this.currentUser.username)
      .subscribe((result) => {
        this.drugs = result;
        this.isLoadingResults = false;
        this.resultsLength = this.drugs.total_count;
        console.log(this.drugs);
        localStorage.getItem('userData');
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DrugsSearchDialogComponent, {
      width: '500px',
      height: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
