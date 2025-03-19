var Airtable = require("airtable");

console.log("Loaded API Key:", process.env.AIRTABLE_API_KEY); // Debug log

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

let numberCalling = "4794220072"//this needs to be retrieved by a ringcentral trigger / API


export default async function HomePage(numberCalling) {
  //  console.log(invoices,trips)
  //      const invoiceData = invoices.map(invoice => ({
  //        id: invoice.id,
  //        fields: invoice.fields,
  //      }));
  //      const tripData = trips.map(trip => ({
  //        id: trip.id,
  //        fields: trip.fields,
  //      }));
  //  console.log(invoiceData,tripData)

  let records = [];
  let invoiceRecords;
  let callLogRecords;
  let tripRecords;
  try {
    const callLogs = await base("Call log")
      .select({
        fields: [
          "fldX6kgsLzbzQTu0n",
          "fldJXJ1X65ShQ9dxW",
          "fld56ZrUxqU3s9l0q",
          "fld4I0UsRygHHgRd7",
          "fldTw8vKEaK9CyLqz",
          "fld8tQVMjplEGuTaG",
          "fldP7hACnpFcAKQLB",
        ],
      })
      .firstPage();
    const trips = await base("Trips")
      .select({
        fields: [
          "fldmrJexa9uCvZmjv",
          "fldreS4sSbdP4sIAw",
          "fldWbdKHVh1AwaTjw",
          "fldnukPmJ1c238BsL",
          "fldJvRrPwcUAj8OkD",
          "fldDNSn509tcsFVbU",
          "fldFuLbHvBLKcOJaQ",
          "fldWoHM1UiBFIzezY",
          "fldxJelcAHsn3RNkO",
          "fldxJelcAHsn3RNkO",
          "fldpWfWnpACuRaZXM",
          "fldPuTKyi2IXXj6Md",
          "fldkPcMScig2GwlWF",
        ],
      })
      .firstPage();
    const invoices = await base("Invoices")
      .select({
        fields: [
          "Name",
          "Order #",
          "Phone",
          "Customer",
          "Date",
          "Item",
          "EA Price",
          "fldKPEpBfa6Ysr5kg",
        ],
      })
      .firstPage();

    console.log(base, callLogs, trips, invoices);

    // Map the records to extract only needed data
    invoiceRecords = invoices.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
    callLogRecords = callLogs.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
    tripRecords = trips.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
  }

  return (
    <div>
      <h1>Airtable Data</h1>
      {invoiceRecords.length > 0 ? (
        <ul>
          <h2>Invoice Data</h2>
          {invoiceRecords.map((record) => (
            (JSON.stringify(record.fields["Phone"]) === numberCalling) && <li key={record.id}>{JSON.stringify(record.fields["Phone"])}</li> 
          ))}

          <h2>Call Data</h2>

          {callLogRecords.map((item) => (
            <li key={item.id}>{JSON.stringify(item.fields)}</li>
          ))}
          <h2>Trip Data</h2>

          {tripRecords.map((item) => (
            <li key={item.id}>{JSON.stringify(item.fields)}</li>
          ))}
        </ul>
      ) : (
        <p>No Previous Purchases.</p>
      )}
    </div>
  );
}
