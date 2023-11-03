interface InvoiceItem {
    id: number;
    name: string;
    description: string;
    quantity: number;
    unit_cost: number;
    total: number;
}

interface Address {
    owner?: string;
    line_1?: string;
    city?: string;
    state?: string;
    zip?: number;
    phone?: string;
}

export interface Invoice {
    customer?: string;
    notes?: string;
    invoice_date?: string;
    invoice_id?: string;
    invoice_status?: string;
    order_date?: string;
    order_status?: string;
    order_id: string;
    address?: Address;
    items: InvoiceItem[];
    sub_total?: number;
    discount?: number;
    vat?: number;
    total?: number;
};