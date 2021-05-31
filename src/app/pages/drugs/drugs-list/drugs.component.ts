import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { faEdit, faTrash, faSearch, faAddressCard, faPlus } from '@fortawesome/free-solid-svg-icons';

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

  faEdit = faEdit;
  faTrash = faTrash;
  faSearch = faSearch;
  faPlus = faPlus;

  constructor(public http: HttpService) {}

  ngOnInit(): void {
    this.getAllDrugs();
  }

  getAllDrugs() {
    this.http.get(endPointDrugs).subscribe((result) => {
      this.drugs = result;
      this.isLoadingResults = false;
      this.resultsLength = this.drugs.total_count;
      console.log(this.drugs);
    });
  }
}
