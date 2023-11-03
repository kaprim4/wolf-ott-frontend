import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';

@Component({
  selector: 'app-ui-tabs-accordions',
  templateUrl: './tabs-accordion.component.html',
  styleUrls: ['./tabs-accordion.component.scss']
})
export class TabsAccordionComponent implements OnInit {


  tabs1: number = 1;
  tabs2: number = 2;
  tabs3: number = 2;
  tabs4: number = 1;
  tabs5: number = 1;
  tabs6: number = 2;
  tabs7: number = 1;
  tabs8: number = 1;

  dynamicTabs: number[] = [1, 2, 3, 4, 5];
  counter: number = 0;

  isCollapsed: boolean = false;
  horizontalCollapse: boolean = true;

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Tabs & Accordions",
      breadCrumbItems: [{ label: 'Base UI', path: '.' }, { label: 'Tabs & Accordions', path: '.', active: true }]
    });
    this.counter = this.dynamicTabs.length + 1;
  }

  /**
  * prevents opening of tab
  * @param changeEvent navchange event
  */
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  /**
   * closes tab
   * @param event event
   * @param toRemove remove index
   */
  close(event: MouseEvent, toRemove: number) {
    this.dynamicTabs = this.dynamicTabs.filter((id: number) => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  /**
   * add new tab
   * @param event event
   */
  add(event: MouseEvent) {
    this.dynamicTabs.push(this.counter++);
    event.preventDefault();
  }

}
