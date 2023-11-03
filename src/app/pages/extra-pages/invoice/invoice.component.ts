import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { Invoice } from './invoice.model';

@Component({
  selector: 'app-pages-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoiceData!: Invoice;

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Invoice",
      breadCrumbItems: [{ label: 'Extra Pages', path: '.' }, { label: 'Invoice', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetches invoice data
   */
  _fetchData(): void {

    this.invoiceData = {
      invoice_id: '2016-04-23654789',
      customer: 'Stanley Jones',
      notes: 'All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.',
      order_date: ' Jan 17, 2016',
      order_status: 'Pending',
      order_id: '#123456',
      address: {
        owner: 'Twitter, Inc.',
        line_1: '795 Folsom Ave, Suite 600',
        city: 'San Francisco',
        state: 'CA',
        zip: 94107,
        phone: '(123) 456-7890',
      },
      items: [
        {
          id: 1,
          name: 'LCD',
          description: 'Lorem ipsum dolor sit amet.',
          quantity: 1,
          unit_cost: 380,
          total: 380,
        },
        {
          id: 2,
          name: 'Mobile',
          description: 'Lorem ipsum dolor sit amet.',
          quantity: 5,
          unit_cost: 50,
          total: 250,
        },
        {
          id: 3,
          name: 'LED',
          description: 'Lorem ipsum dolor sit amet.',
          quantity: 2,
          unit_cost: 500,
          total: 1000,
        },
        {
          id: 4,
          name: 'LCD',
          description: 'Lorem ipsum dolor sit amet.',
          quantity: 3,
          unit_cost: 300,
          total: 900,
        },
        {
          id: 5,
          name: 'Mobile',
          description: 'Lorem ipsum dolor sit amet.',
          quantity: 5,
          unit_cost: 80,
          total: 400,
        },
      ],
      sub_total: 2930.0,
      discount: 12.9,
      vat: 12.9,
      total: 2930.0,
    };
  }

}
