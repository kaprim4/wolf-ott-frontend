import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';


@Component({
  selector: 'app-file-uploads',
  templateUrl: './file-uploads.component.html',
  styleUrls: ['./file-uploads.component.scss']
})
export class FileUploadsComponent implements OnInit {

  files: File[] = [];

  constructor (private sanitizer: DomSanitizer, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "File Uploads",
      breadCrumbItems: [{ label: 'Forms', path: '.' }, { label: 'File Uploads', path: '.', active: true }]
    });
  }

  /**
   * adds new file in uploaded files
   * @param event event
   */
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  /**
   * removes file from uploaded files
   * @param event event
   */
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  /**
  * Formats the size
  */
  getSize(f: File) {
    const bytes = f.size;
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];

  }

  /**
   * returns preview url of file
   * @param f file
   */
  getPreviewUrl(f: File) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(URL.createObjectURL(f)));
  }


}
