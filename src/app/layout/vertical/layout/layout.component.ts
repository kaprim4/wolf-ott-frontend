import { Component, Input, OnInit, SimpleChange } from '@angular/core';

// utitlity
import { changeBodyAttribute, getLayoutConfig } from '../../shared/helper/utils';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';
import { LayoutType } from '../../shared/config/layout.model';

@Component({
  selector: 'app-vertical-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class VerticalLayoutComponent implements OnInit {

  @Input() layoutColor: string = '';
  @Input() layoutWidth: string = '';
  leftbarPosition: string = "";
  leftbarColor: string = "";
  leftbarSize: string = "";
  topbarColor: string = "";
  showSidebarUserInfo: boolean = false;
  reRender: boolean = true;

  constructor (
    private eventService: EventService
  ) { }

  ngOnInit(): void {

    let config = getLayoutConfig(LayoutType.LAYOUT_VERTICAL);
    this.leftbarPosition = config.leftbarPosition;
    this.leftbarColor = config.leftbarColor;
    this.leftbarSize = config.leftbarSize;
    this.topbarColor = config.topbarColor;
    this.showSidebarUserInfo = config.showSidebarUserInfo;

    // listen to event and change the layout configuarations
    this.eventService.on(EventType.CHANGE_LEFTBAR_POSITION).subscribe(({ payload }) => {
      this.leftbarPosition = payload.toString();
    });

    this.eventService.on(EventType.CHANGE_LEFTBAR_COLOR).subscribe(({ payload }) => {
      this.leftbarColor = payload.toString();
    });

    this.eventService.on(EventType.CHANGE_LEFTBAR_SIZE).subscribe(({ payload }) => {
      this.leftbarSize = payload.toString();
    });

    this.eventService.on(EventType.CHANGE_TOPBAR_COLOR).subscribe(({ payload }) => {
      this.topbarColor = payload.toString();
    });

    this.eventService.on(EventType.TOGGLE_SIDEBAR_USERINFO).subscribe(({ payload }) => {
      this.showSidebarUserInfo = Boolean(payload);
    });
    this.changeLayoutConfig();
  }

  ngAfterViewInit() {
    changeBodyAttribute('data-layout-mode', LayoutType.LAYOUT_VERTICAL);
  }

  /**
   * changes layout configurations 
   */
  ngOnChanges(changes: SimpleChange) {
    this._setRerender();
    this.changeLayoutConfig();
  }

  ngDoCheck(): void {
    this.changeLayoutConfig();
  }

  ngOnDestroy(): void {
    changeBodyAttribute('data-layout-mode', '', 'remove');
  }

  /**
   * controls re-rendering
   */
  _setRerender = () => {
    this.reRender = false;
    setTimeout(() => {
      this.reRender = true;
    }, 20);
  }

  /**
   * changes layout related options
   */
  changeLayoutConfig(): void {
    // light vs dark mode
    changeBodyAttribute('data-layout-color', this.layoutColor);

    // boxed vs fluid
    changeBodyAttribute('data-layout-size', this.layoutWidth);

    // scrollable menus
    changeBodyAttribute('data-leftbar-position', this.leftbarPosition);

    // left sidebar theme
    changeBodyAttribute('data-leftbar-color', this.leftbarColor);

    // left sidebar type
    changeBodyAttribute('data-leftbar-size', this.leftbarSize);

    // topbar theme
    changeBodyAttribute('data-topbar-color', this.topbarColor);
  }


  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    document.body.classList.toggle('sidebar-enable');
  }


}
