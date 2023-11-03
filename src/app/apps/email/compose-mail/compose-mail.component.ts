import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {

  mailTo: string = '';
  mailCC: string = '';
  mailBCC: string = '';
  mailSubject: string = '';
  mailBody: string = '';
  quillConfig: QuillModules = {};

  @ViewChild('content', { static: true }) content: any;

  constructor (public activeModal: NgbModal) { }


  ngOnInit(): void {
    this.quillConfig = {
      toolbar: [
        [{ font: [] }, { size: [] }],
        ["bold", "italic", "underline"],
        [{ script: "super" }, { script: "sub" }],
        [{ list: "ordered" }, { list: "bullet" }]
      ]
    }

    this.mailBody = `  
    <h3><span class="ql-size-large">Hello World!</span></h3>
     <p><br></p>
     <h3>This is an simple editable area.</h3>
     <p><br></p>
     <ul>
         <li>
             Select a text to reveal the toolbar.
         </li>
         <li>
             Edit rich document on-the-fly, so elastic!
         </li>
     </ul>
     <p><br></p>
     <p>
         End of simple area
     </p>`
  }

  /**
 * opens modal
 */
  openModal(): void {
    this.activeModal.open(this.content, { centered: true });
  }

}
