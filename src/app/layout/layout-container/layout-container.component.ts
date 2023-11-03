import { Component, OnInit } from '@angular/core';

// utility 
import { getLayoutConfig } from '../shared/helper/utils';

// service
import { EventService } from 'src/app/core/service/event.service';

// constatnts
import { EventType } from 'src/app/core/constants/events';
import { LayoutColor, LayoutType, LayoutWidth, SideBarSize, TopbarTheme } from '../shared/config/layout.model';

// types
import { LayoutConfig } from '../shared/models/layout-config.model';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
})
export class LayoutContainerComponent implements OnInit {

  layoutType!: LayoutType;
  layoutConfig!: LayoutConfig;
  layoutSize!: LayoutWidth;
  layoutColor!: LayoutColor;


  constructor (private eventService: EventService) {
  }

  ngOnInit(): void {
    this.layoutType = LayoutType.LAYOUT_VERTICAL;
    this.setLayoutConfig();
    // listen to event and change the layout configuarations
    this.eventService.on(EventType.CHANGE_LAYOUT).subscribe(({ payload }) => {
      this.layoutType = payload as LayoutType;
      // this.setLayoutConfig();
    });

    this.eventService.on(EventType.CHANGE_LAYOUT_COLOR).subscribe(({ payload }) => {
      setTimeout(() => {
        this.layoutColor = payload as LayoutColor;
        if (this.layoutColor === LayoutColor.LAYOUT_COLOR_DARK) {
          this.eventService.broadcast(EventType.CHANGE_TOPBAR_COLOR, TopbarTheme.TOPBAR_THEME_DARK);
        } else {
          this.eventService.broadcast(EventType.CHANGE_TOPBAR_COLOR, TopbarTheme.TOPBAR_THEME_LIGHT);
        }
      }, 20);
    });

    this.eventService.on(EventType.CHANGE_LAYOUT_SIZE).subscribe(({ payload }) => {
      setTimeout(() => {
        this.layoutSize = payload as LayoutWidth;
        if (this.layoutSize === LayoutWidth.LAYOUT_WIDTH_BOXED) {
          this.eventService.broadcast(EventType.CHANGE_LEFTBAR_SIZE, SideBarSize.LEFT_SIDEBAR_TYPE_CONDENSED);
        } else {
          this.eventService.broadcast(EventType.CHANGE_LEFTBAR_SIZE, SideBarSize.LEFT_SIDEBAR_TYPE_DEFAULT);
        }
      }, 20);
    });


  }


  /**
   * set layout config
   */
  setLayoutConfig(): void {
    this.layoutConfig = getLayoutConfig(this.layoutType);
    this.layoutSize = this.layoutConfig.layoutSize;
    this.layoutColor = this.layoutConfig.layoutColor;
  }

  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    return this.layoutType === LayoutType.LAYOUT_VERTICAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === LayoutType.LAYOUT_HORIZONTAL;
  }
}
