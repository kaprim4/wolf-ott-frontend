import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface productsData {
  id: number;
  imagePath: string;
  pname: string;
  cimagePath: string;
  cname: string;
  email: string;
  priority: string;
  progress: string;
  reviews: string;
  date: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/product-5.png',
    pname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    cimagePath: 'assets/images/profile/user-1.jpg',
    cname: 'Arlene McCoy',
    email: 'macoy@arlene.com',
    priority: 'confirmed',
    progress: 'primary',
    date: 'Sep 29',
    reviews:
      'Mocetko adte me doj afta kaj mi fi li lugeb golo zuvgigsu vazjakej kezzuiha fihdos gaojo narojo vo. Basap bo jesihef upa anisaf cuvedode ba giebu gijacag mepiv weume de na to.',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/product-6.png',
    pname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    cimagePath: 'assets/images/profile/user-2.jpg',
    cname: 'Jerome Bell',
    email: 'belljerome@yahoo.com',
    priority: 'pending',
    progress: 'accent',
    date: 'Sep 29',
    reviews:
      'Mocetko adte me doj afta kaj mi fi li lugeb golo zuvgigsu vazjakej kezzuiha fihdos gaojo narojo vo. Basap bo jesihef upa anisaf cuvedode ba giebu gijacag mepiv weume de na to.',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/product-7.png',
    pname: 'PlayStation 5 DualSense Wireless Controller',
    cimagePath: 'assets/images/profile/user-3.jpg',
    cname: 'Jacob Jones',
    email: 'jones009@hotmail.com',
    priority: 'cancelled',
    progress: 'warn',
    date: 'Sep 29',
    reviews:
      'Mocetko adte me doj afta kaj mi fi li lugeb golo zuvgigsu vazjakej kezzuiha fihdos gaojo narojo vo. Basap bo jesihef upa anisaf cuvedode ba giebu gijacag mepiv weume de na to.',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/product-8.png',
    pname: 'Amazon Basics Mesh, Mid-Back, Swivel Office De...',
    cimagePath: 'assets/images/profile/user-4.jpg',
    cname: 'Annette Black',
    email: 'blackanne@yahoo.com',
    priority: 'pending',
    progress: 'accent',
    date: 'Sep 29',
    reviews:
      'Mocetko adte me doj afta kaj mi fi li lugeb golo zuvgigsu vazjakej kezzuiha fihdos gaojo narojo vo. Basap bo jesihef upa anisaf cuvedode ba giebu gijacag mepiv weume de na to.',
  },
  {
    id: 5,
    imagePath: 'assets/images/products/product-9.png',
    pname: 'Sony X85J 75 Inch Sony 4K Ultra HD LED Smart G...',
    cimagePath: 'assets/images/profile/user-5.jpg',
    cname: 'Albert Flores',
    email: 'albertflo9@gmail.com',
    priority: 'pending',
    progress: 'accent',
    date: 'Sep 29',
    reviews:
      'Mocetko adte me doj afta kaj mi fi li lugeb golo zuvgigsu vazjakej kezzuiha fihdos gaojo narojo vo. Basap bo jesihef upa anisaf cuvedode ba giebu gijacag mepiv weume de na to.',
  },
];

interface month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-latest-reviews',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './latest-reviews.component.html',
})
export class AppLatestReviewsComponent {
  displayedColumns: string[] = [
    'select',
    'products',
    'customer',
    'reviews',
    'status',
    'date',
    'action',
  ];
  dataSource = new MatTableDataSource<productsData>(ELEMENT_DATA);
  selection = new SelectionModel<productsData>(true, []);

  months: month[] = [
    { value: 'mar', viewValue: 'March 2023' },
    { value: 'apr', viewValue: 'April 2023' },
    { value: 'june', viewValue: 'June 2023' },
  ];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: productsData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.pname + 1
    }`;
  }
}
