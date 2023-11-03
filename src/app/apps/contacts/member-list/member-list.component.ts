import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { Member } from 'src/app/shared/widget/member-card/member.model';

// data
import { CONTACTS } from './data';

@Component({
  selector: 'app-contacts-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  members: Member[] = [];

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    position: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]]
  })

  formSubmitted: boolean = false;

  @ViewChild('content', { static: true }) content: any;

  constructor (
    public activeModal: NgbModal,
    private eventService: EventService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Contacts List",
      breadCrumbItems: [{ label: 'Contacts', path: '.' }, { label: 'Contacts List', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.members = CONTACTS;
  }

  /**
   * opens modal
   */
  openModal(): void {
    this.activeModal.open(this.content, { centered: true });
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formValues() { return this.contactForm.controls; }

  /**
  * On submit form
  */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      this.activeModal.dismissAll();
      this.contactForm.reset();
    }
  }

}
