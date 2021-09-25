import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import {
  faEdit,
  faTrash,
  faSearch,
  faAddressCard,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { DrugsService } from 'src/app/services/drugs.service';
import { User } from 'src/app/services/user.model';

let endPointDrugs = environment.api + 'drugs';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css'],
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

  constructor(public http: HttpService, public drugService: DrugsService) {}

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
}
