import { Component, OnInit } from '@angular/core';
import { IAlbum, Lightbox } from 'ngx-lightbox';
// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { GalleryItem } from './gallery.model';

// data
import { MASONARYGALLERY } from './data';

@Component({
  selector: 'app-pages-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryItems: GalleryItem[] = [];
  imageCategory: string = 'all';
  private _albums: IAlbum[] = [];

  constructor (
    private eventService: EventService,
    private _lightbox: Lightbox,
  ) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Gallery",
      breadCrumbItems: [{ label: 'Extra Pages', path: '.' }, { label: 'Gallery', path: '.', active: true }]
    });
    this._fetchData();
  }

  _fetchData(): void {
    this._albums = [];
    this.galleryItems = this.imageCategory === 'all' ? MASONARYGALLERY : MASONARYGALLERY.filter((item) => item.category?.includes(this.imageCategory));
    this.galleryItems.forEach(item => this._albums.push(item.image!));
  }

  /**
  * open lightbox
  * @param index image number
  */
  open(index: number): void {
    this._lightbox.open(this._albums, index, { fadeDuration: 0.1, resizeDuration: 0.1, wrapAround: true, showImageNumberLabel: true, disableScrolling: true, centerVertically: true });
  }

  /**
   * close lightbox programmatically
   */
  close(): void {
    this._lightbox.close();
  }

  /**
   * filter images by category
   * @param category category
   */
  filterImages(category: string) {
    this.imageCategory = category;
    this._fetchData();
  }

}
