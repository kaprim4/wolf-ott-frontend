import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';


@Component({
  selector: 'app-form-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  validationGroup1!: FormGroup;
  validationGroup2!: FormGroup;


  constructor (private fb: FormBuilder, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Form Validation",
      breadCrumbItems: [{ label: 'Forms', path: '.' }, { label: 'Form Validation', path: '.', active: true }]
    });

    // initialize form config
    this.validationGroup1 = this.fb.group({
      firstName: ['Mark', Validators.required],
      lastName: ['Otto', Validators.required],
      userName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.validationGroup2 = this.fb.group({
      firstName: ['Mark', Validators.required],
      lastName: ['Otto', Validators.required],
      userName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }


  // convenience getter for easy access to form fields
  get form1() { return this.validationGroup1.controls; }
  get form2() { return this.validationGroup2.controls; }

}
