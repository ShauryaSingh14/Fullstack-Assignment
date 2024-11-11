import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { baseUrl, rowPerPage } from '../../config';
import { Detail } from '../interfaces/detail';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomepageComponent implements OnInit {
  rows: Detail[] = [];
  rowPerPage: number = rowPerPage;
  currentPage: number = 0;
  totalPages: number = 0;
  showCreateAlert = false;
  data: any;

  newCompound = {
    chemical_name: '',
    chemical_description: '',
    chemical_image: '',
    chemical_image_attribution: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChemicals();
  }

  fetchChemicals(): void {
    this.http.get<Detail[]>(`${baseUrl}/getChemicals`).subscribe((data) => {
      this.rows = data;
      this.totalPages = Math.ceil(this.rows.length / this.rowPerPage) - 1;
    });
  }

  openCreateAlert(): void {
    this.showCreateAlert = true;
  }

  closeCreateAlert(): void {
    this.showCreateAlert = false;
    this.resetNewCompound();
  }

  resetNewCompound(): void {
    this.newCompound = {
      chemical_name: '',
      chemical_description: '',
      chemical_image: '',
      chemical_image_attribution: '',
    };
  }

  createNewCompound(): void {
    const chemicalName = prompt('Enter the chemical name:');
    if (!chemicalName) {
      alert('Name is required!');
      return;
    }

    const chemicalDescription = prompt('Enter the chemical description:');
    if (!chemicalDescription) {
      alert('Description is required!');
      return;
    }

    const chemicalImage = prompt('Enter the chemical image URL (optional):');
    const newCompound = {
      chemical_name: chemicalName,
      chemical_description: chemicalDescription,
      chemical_image: chemicalImage || '',
      chemical_image_attribution: '',
    };

    this.createNewChemical(newCompound);
  }

  createNewChemical(data: any): void {
    this.http.post<Detail>(`${baseUrl}/createChemicals`, data)
      .subscribe({
        next: (response) => {
          console.log("Compound created successfully:", response);
          this.rows.push(response);
          this.closeCreateAlert();
        },
        error: (error) => {
          console.error("Error creating compound:", error);
        }
      });
  }
}
