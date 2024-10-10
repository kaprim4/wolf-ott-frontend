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
  hrate: number;
  skills: string;
  priority: string;
  progress: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user1.jpg',
    uname: 'Mark J. Freeman',
    position: 'Developer',
    skills: 'HTML',
    hrate: 80,
    priority: 'Available',
    progress: 'success',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user2.jpg',
    uname: 'Nina R. Oldman',
    position: 'Designer',
    skills: 'JavaScript',
    hrate: 70,
    priority: 'On Holiday',
    progress: 'primary',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user3.jpg',
    uname: 'Arya H. Shah',
    position: 'Developer',
    skills: 'React',
    hrate: 40,
    priority: 'Absent',
    progress: 'error',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user4.jpg',
    uname: 'June R. Smith',
    position: 'Designer',
    skills: 'Vuejs',
    hrate: 20,
    priority: 'On Leave',
    progress: 'warning',
  },
  {
    id: 5,
    imagePath: 'assets/images/profile/user5.jpg',
    uname: 'Mark J. Freeman',
    position: 'Developer',
    skills: 'Angular',
    hrate: 65,
    priority: 'Available',
    progress: 'success',
  },
];

@Component({
  selector: 'app-top-employees',
  standalone: true,
  imports: [MaterialModule, CommonModule, MatMenuModule, MatButtonModule],
  templateUrl: './top-employees.component.html',
})
export class AppTopEmployeesComponent {
  displayedColumns: string[] = ['profile', 'hrate', 'skills', 'status'];
  dataSource = ELEMENT_DATA;
}
