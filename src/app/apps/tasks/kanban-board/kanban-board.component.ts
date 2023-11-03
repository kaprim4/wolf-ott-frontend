import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortableOptions } from 'sortablejs';

// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { TaskItem } from '../tasks.model';

// data
import { KANBANTASKS } from '../data';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {

  allTasks: TaskItem[] = [...KANBANTASKS];
  upcomingTasks: TaskItem[] = [];
  inprogressTasks: TaskItem[] = [];
  completedTasks: TaskItem[] = [];
  options: SortableOptions = {};
  newTaskStatus: string = 'upcoming';

  newTask: FormGroup = this.fb.group({
    name: ['', Validators.required],
    assignTo: [''],
    priority: [''],
    startDate: [''],
    dueDate: ['']
  });

  formSubmitted: boolean = false;


  @ViewChild('content', { static: true }) content: any;

  constructor (public activeModal: NgbModal, private eventService: EventService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Task Details",
      breadCrumbItems: [{ label: 'Tasks', path: '.' }, { label: 'Kanban Board', path: '.', active: true }]
    });
    this.options = {
      group: 'kanban-tasks'
    }
    this._fetchData();
  }


  /**
   * convenience getter for easy access to form fields
   */
  get formValues() { return this.newTask.controls; }


  /**
   * fetches data
   */
  _fetchData(): void {
    this.upcomingTasks = this.allTasks.filter(t => t.status === 'Upcoming');
    this.inprogressTasks = this.allTasks.filter(t => t.status === 'Inprogress');
    this.completedTasks = this.allTasks.filter(t => t.status === 'Completed');
  }

  /**
   * opens modal
   */
  openModal(taskStatus: string): void {
    this.newTaskStatus = taskStatus;
    this.activeModal.open(this.content, { centered: true });
  }

  /**
 * On submit form
 */
  onSubmit(): void {
    this.formSubmitted = true;

    if (this.newTask.valid) {
      let task: TaskItem = {
        id: this.allTasks.length + 1,
        avatar: 'assets/images/users/user-1.jpg',
        username: this.formValues['assignTo'].value,
        title: this.formValues['name'].value,
        totalTasks: 1,
        totalComments: 1,
        status: this.newTaskStatus
      }
      if (this.formValues['priority'].value !== '') {
        task = { ...task, priority: this.formValues['priority'].value }
      }

      this.allTasks = [...this.allTasks, task];
      this.activeModal.dismissAll();
      this._fetchData();
      this.newTask.reset();
      this.formSubmitted = false;
    }
  }


}
