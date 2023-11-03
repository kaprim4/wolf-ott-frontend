import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';

@Component({
  selector: 'app-ui-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {

  signupForm!: FormGroup;
  loginForm!: FormGroup;
  responsiveModalForm!: FormGroup;

  constructor (
    private eventService: EventService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Modals",
      breadCrumbItems: [{ label: 'Base UI', path: '.' }, { label: 'Modals', path: '.', active: true }]
    });
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.responsiveModalForm = this.fb.group({
      name: [''],
      surname: [''],
      address: [''],
      city: [''],
      country: [''],
      zip: [''],
      personalInfo: ['']
    });
  }

  // convenience getter for easy access to form fields
  get form1() { return this.signupForm.controls; }

  get form2() { return this.loginForm.controls; }

  get form3() { return this.responsiveModalForm.controls; }


  /**
* opens modal
* @param content modal content
*/
  open(content: TemplateRef<NgbModal>): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  /**
   * opens different size modals
   * @param content modal content
   * @param size size of modal
   */
  openModalWithSize(content: TemplateRef<NgbModal>, size: string): void {
    this.modalService.open(content, { size: size });
  }

  /**
   * opens scrollable modal for long content
   * @param content modal content
   */
  openScrollableModal(content: TemplateRef<NgbModal>): void {
    this.modalService.open(content, { scrollable: true });
  }

  /**
   * opens static backdrop modal
   * @param content modal content
   */
  openBackdropModal(content: TemplateRef<NgbModal>): void {
    this.modalService.open(content, { backdrop: 'static', keyboard: false });
  }

  /**
   * opens modal based Alerts
   * @param content modal content
   * @param variant color variant
   */
  openAlertModal(content: TemplateRef<NgbModal>, variant: string): void {
    this.modalService.open(content, { size: 'sm', modalDialogClass: 'modal-filled bg-' + variant });
  }

  /**
   * Opens the modal vertically centered
   * @param content modal content
   */
  openVerticallyCentered(content: TemplateRef<NgbModal>): void {
    this.modalService.open(content, { centered: true });
  }

  /**
   * Opens the modal with custom class
   * @param content modal content
   * @param position position of modal
   */
  openCustomPositionedModal(content: TemplateRef<NgbModal>, position: string, size?: string): void {
    this.modalService.open(content, { modalDialogClass: 'modal-' + position, size: size });
  }

  /**
   * opens stacked modal
   * @param model1 modal to be opened
   * @param model2 modal to be closed
   */
  openStackedModal(model1: TemplateRef<NgbModal>, model2?: any): void {
    this.modalService.open(model1);
    if (model2) { model2.close(); }
  }

  /**
   * toggles between two modals
   * @param model1 modal to be opened
   * @param model2 modal to be closed
   */
  openToggleModal(model1: TemplateRef<NgbModal>, model2?: any): void {
    this.modalService.open(model1, { centered: true });
    if (model2) { model2.close(); }
  }



}
