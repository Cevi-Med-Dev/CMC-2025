var Airtable = require('airtable');


console.log("Loaded API Key:", process.env.AIRTABLE_API_KEY); // Debug log

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
export default async function HomePage() {
  

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
try {
    const callLogs = await base('Call log')
    const trips = await base('Trips').select({fields: ["fldmrJexa9uCvZmjv", "fldreS4sSbdP4sIAw", "fldWbdKHVh1AwaTjw","fldnukPmJ1c238BsL","fldJvRrPwcUAj8OkD","fldDNSn509tcsFVbU","fldFuLbHvBLKcOJaQ","fldWoHM1UiBFIzezY", "fldxJelcAHsn3RNkO", "fldxJelcAHsn3RNkO","fldpWfWnpACuRaZXM", "fldPuTKyi2IXXj6Md", "fldkPcMScig2GwlWF"]}).firstPage();
  
    const invoices = await base('Invoices').select({fields: ["Name", "Order #","Phone","Customer", "Date", "Item", "EA Price","fldKPEpBfa6Ysr5kg"]}).firstPage();
    console.log(base,callLogs,trips,invoices)
    
    // Map the records to extract only needed data
    records = invoices.map(record => ({
      id: record.id,
      fields: record.fields,
    }));
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
  }

  return (
    <div>
      <h1>Airtable Data</h1>
      {records.length > 0 ? (
        <ul>
          {records.map((record) => (
            <li key={record.id}>{JSON.stringify(record.fields)}</li>
          ))}
           <h1>Airtable Data</h1>
     
        {/* {invoiceData.map(item => (
          <li key={item.id}>{JSON.stringify(item.fields)}</li>
        ))}
        {tripData.map(item => (
          <li key={item.id}>{JSON.stringify(item.fields)}</li>
        ))} */}
      </ul>
   
        
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}