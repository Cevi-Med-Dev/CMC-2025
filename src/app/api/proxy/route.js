import { NextResponse } from 'next/server';
import base from '../../lib/airtable'; // Import Airtable config

export async function GET() {
  try {
    const invoices = await base('Invoices').select({fields: ["Name", "Order #","Phone","Customer", "Date", "Item", "EA Price","Address"]}).firstPage();
    const trips = await base('Trips').select({fields: ["Name", "Order #","Phone","Customer", "Date", "Item", "EA Price","Address"]}).firstPage();
    // const callLogs = await base('Call log').select({}).firstPage();

    const invoiceData = invoices.map(invoice => ({
      id: invoice.id,
      fields: invoice.fields,
    }));
    const tripData = trips.map(trip => ({
      id: trip.id,
      fields: trip.fields,
    }));
console.log(tripData)
    return NextResponse.json(invoiceData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
