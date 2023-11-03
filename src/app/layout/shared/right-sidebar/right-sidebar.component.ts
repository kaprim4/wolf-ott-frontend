import { Component, Input, OnInit, Renderer2 } from '@angular/core';

// service
import { EventService } from 'src/app/core/service/event.service';

// constants
import { EventType } from 'src/app/core/constants/events';
import { LayoutColor, LayoutType, LayoutWidth, MenuPositions, SideBarSize, SideBarTheme, TopbarTheme } from '../config/layout.model';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  // layout related config
  @Input() layoutType!: string;
  @Input() layoutColor!: string;
  @Input() layoutWidth!: string;
  @Input() leftbarPosition!: string;
  @Input() leftbarColor!: string;
  @Input() leftbarSize!: string;
  @Input() showSidebarUserInfo: boolean = false;
  @Input() topbarColor!: string;
  disableLeftBarSize: boolean = false;

  rightSidebarClass = 'right-bar-enabled';

  private isShowing: boolean = false;

  constructor (
    private renderer: Renderer2,
    private eventService: EventService
  ) {
    // listen to event and open/hide the right sidebar
    // show
    this.eventService.on(EventType.SHOW_RIGHT_SIDEBAR).subscribe((show) => {
      this.show();
    });

    // hide
    this.eventService.on(EventType.HIDE_RIGHT_SIDEBAR).subscribe((hide) => {
      this.hide();
    });

  }

  ngOnInit(): void {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  ngOnChanges(): void {
    if (this.isShowing) {
      this.renderer.addClass(document.body, this.rightSidebarClass);
    } else {
      this.renderer.removeClass(document.body, this.rightSidebarClass);
    }
  }

  /**
* changes left sidebar type based on screen dimensions
*/
  updateDimensions(): void {
    if (window.innerWidth <= 991) {
      this.disableLeftBarSize = true;
    }
    else if (window.innerWidth > 991) {
      this.disableLeftBarSize = false;
    }
  }

  /**
 * Shows the sidebar
 */
  show(): void {
    this.isShowing = true;
    this.renderer.addClass(document.body, this.rightSidebarClass);
  }

  /**
   * Hide the sidebar
   */
  hide(): void {
    if (document.body.classList.contains(this.rightSidebarClass)) {
      this.renderer.removeClass(document.body, this.rightSidebarClass);
      this.isShowing = false;
    }
  }

  /**
   * Change the given layout
   * @param layout layout name
   */
  changeLayout(layout: string): void {
    this.layoutType = layout;
    this.eventService.broadcast(EventType.CHANGE_LAYOUT, layout as LayoutType);
  }

  /**
   * Change color scheme
   * @param layout width type
   */
  changeColorScheme(color: string): void {
    this.layoutColor = color;
    this.eventService.broadcast(EventType.CHANGE_LAYOUT_COLOR, color as LayoutColor);
  }

  /**
   * Change the width
   * @param layout width type
   */
  changeLayoutWidth(width: string): void {
    this.layoutWidth = width;
    this.eventService.broadcast(EventType.CHANGE_LAYOUT_SIZE, width as LayoutWidth);
  }

  /**
   * Change left menu position
   * @param position position of menu
   */
  changeMenuPosition(position: string): void {
    this.leftbarPosition = position;
    this.eventService.broadcast(EventType.CHANGE_LEFTBAR_POSITION, position as MenuPositions);
  }

  /**
   * Change the side bar theme
   * @param theme name
   */
  changeLeftSidebarTheme(theme: string): void {
    this.leftbarColor = theme;
    this.eventService.broadcast(EventType.CHANGE_LEFTBAR_COLOR, theme as SideBarTheme);
  }

  /**
   * Change the side bar width
   * @param type type of sidebar
   */
  changeLeftSidebarSize(size: string): void {
    this.leftbarSize = size;
    if (this.layoutType === LayoutType.LAYOUT_VERTICAL) {
      this.eventService.broadcast(EventType.CHANGE_LEFTBAR_SIZE, size as SideBarSize);
    }
  }

  /**
 * Change topbar theme
 * @param theme name
 */
  changeTopbarColor(color: string): void {
    this.topbarColor = color;
    this.eventService.broadcast(EventType.CHANGE_TOPBAR_COLOR, color as TopbarTheme);
  }

  /**
   * toggles visibility of sidebar user info
   * @param show true/false
   */
  toggleLeftSidebarUserInfo(show: boolean): void {
    this.showSidebarUserInfo = show;
    if (this.layoutType === LayoutType.LAYOUT_VERTICAL) {
      this.eventService.broadcast(EventType.TOGGLE_SIDEBAR_USERINFO, show);
    }
  }


  /**
   * Reset everything
   */
  reset(): void {
    this.changeLayout(LayoutType.LAYOUT_VERTICAL);
    this.changeLayoutWidth(LayoutWidth.LAYOUT_WIDTH_FLUID);
    this.changeMenuPosition(MenuPositions.MENU_POSITION_FIXED);
    this.changeLeftSidebarSize(SideBarSize.LEFT_SIDEBAR_TYPE_DEFAULT);
    this.changeLeftSidebarTheme(SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT);
    this.toggleLeftSidebarUserInfo(false);
    this.changeTopbarColor(TopbarTheme.TOPBAR_THEME_LIGHT);
  }


}
