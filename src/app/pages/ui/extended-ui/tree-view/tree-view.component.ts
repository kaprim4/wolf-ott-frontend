import { Component, OnInit } from '@angular/core';
import { ITreeOptions, ITreeState } from '@circlon/angular-tree-component';

// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

type Tnode = {
  id: number;
  name: string;
  children?: Tnode[]
}

@Component({
  selector: 'app-ui-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  basicNodes: Tnode[] = [];
  checkboxNodes: Tnode[] = [];
  dndNodes: Tnode[] = [];

  options1: ITreeOptions = {
    useCheckbox: true
  };
  options2: ITreeOptions = {
    allowDrag: (node) => node.isLeaf,
    getNodeClone: (node) => ({
      ...node.data,
      name: `copy of ${node.data.name}`
    })
  };

  state: ITreeState = {
    expandedNodeIds: {
      1: true,
      2: true,
      4: true,
      7: true,
      12: true
    },
    hiddenNodeIds: {},
    activeNodeIds: {}
  };

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Tree View",
      breadCrumbItems: [{ label: 'Extended UI', path: '.' }, { label: 'Tree View', path: '.', active: true }]
    });
    this._fetchData();
  }

  _fetchData(): void {
    this.basicNodes = [
      {
        id: 1,
        name: 'Adminto',
        children: [
          {
            id: 2,
            name: 'Assets',
            children: [
              {
                id: 3,
                name: 'Css'
              },
              {
                id: 4,
                name: 'Plugins',
                children: [
                  { id: 5, name: 'Plugin one' },
                  { id: 6, name: 'Plugin two' },
                ]
              }
            ]
          },
          {
            id: 7,
            name: 'Email Template',
            children: [
              { id: 8, name: 'Email one' },
              { id: 9, name: 'Email two' }
            ]
          },
          {
            id: 10,
            name: 'Dashboard'
          },
          {
            id: 11,
            name: 'Typography'
          },
          {
            id: 12,
            name: 'User Interface',
            children: [
              {
                id: 13,
                name: 'Buttons'
              },
              {
                id: 14,
                name: 'Cards'
              }
            ]
          },
          {
            id: 15,
            name: 'Forms'
          },
          {
            id: 16,
            name: 'Tables'
          }
        ]
      },
      {
        id: 17,
        name: 'Frontend'
      }
    ];

    this.checkboxNodes = [
      {
        id: 1,
        name: 'Adminto',
        children: [
          {
            id: 2,
            name: 'Assets',
            children: [
              {
                id: 3,
                name: 'Css'
              },
              {
                id: 4,
                name: 'Plugins',
                children: [
                  { id: 5, name: 'Plugin one' },
                  { id: 6, name: 'Plugin two' },
                ]
              }
            ]
          },
          {
            id: 7,
            name: 'Email Template',
            children: [
              { id: 8, name: 'Email one' },
              { id: 9, name: 'Email two' }
            ]
          },
          {
            id: 10,
            name: 'Dashboard'
          },
          {
            id: 11,
            name: 'Typography'
          },
          {
            id: 12,
            name: 'User Interface',
            children: [
              {
                id: 13,
                name: 'Buttons'
              },
              {
                id: 14,
                name: 'Cards'
              }
            ]
          },
          {
            id: 15,
            name: 'Forms'
          },
          {
            id: 16,
            name: 'Tables'
          }
        ]
      },
      {
        id: 17,
        name: 'Frontend'
      }
    ];

    this.dndNodes = [
      {
        id: 1,
        name: 'Adminto',
        children: [
          {
            id: 2,
            name: 'Assets',
            children: [
              {
                id: 3,
                name: 'Css'
              },
              {
                id: 4,
                name: 'Plugins',
                children: [
                  { id: 5, name: 'Plugin one' },
                  { id: 6, name: 'Plugin two' },
                ]
              }
            ]
          },
          {
            id: 7,
            name: 'Email Template',
            children: [
              { id: 8, name: 'Email one' },
              { id: 9, name: 'Email two' }
            ]
          },
          {
            id: 10,
            name: 'Dashboard'
          },
          {
            id: 11,
            name: 'Typography'
          },
          {
            id: 12,
            name: 'User Interface',
            children: [
              {
                id: 13,
                name: 'Buttons'
              },
              {
                id: 14,
                name: 'Cards'
              }
            ]
          },
          {
            id: 15,
            name: 'Forms'
          },
          {
            id: 16,
            name: 'Tables'
          }
        ]
      },
      {
        id: 17,
        name: 'Frontend'
      }
    ];
  }

}
