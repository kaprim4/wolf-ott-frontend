import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  price: number;
  priority: string;
  progress: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/product-5.png',
    uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    position: 'Web Designer',
    productName: 'Elite Admin',
    price: 499,
    priority: 'confirmed',
    progress: 'primary',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/product-6.png',
    uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    price: 200,
    priority: 'pending',
    progress: 'accent',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/product-7.png',
    uname: 'PlayStation 5 DualSense Wireless Controller',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    price: 155,
    priority: 'cancelled',
    progress: 'warn',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/product-8.png',
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office De...',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    price: 190,
    priority: 'pending',
    progress: 'accent',
  },
  {
    id: 5,
    imagePath: 'assets/images/products/product-9.png',
    uname: 'Sony X85J 75 Inch Sony 4K Ultra HD LED Smart G...',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    price: 136,
    priority: 'pending',
    progress: 'accent',
  },
];

interface month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-top-projects',
  standalone: true,
  imports: [MaterialModule, CommonModule, MatMenuModule, MatButtonModule],
  templateUrl: './top-projects.component.html',
})
export class AppTopProjectsComponent {
  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource = ELEMENT_DATA;

  months: month[] = [
    { value: 'mar', viewValue: 'March 2023' },
    { value: 'apr', viewValue: 'April 2023' },
    { value: 'june', viewValue: 'June 2023' },
  ];
}
