// const router = require("../routes/data");

// var PdfTable = require("voilab-pdf-table"),
//   PdfDocument = require("pdfkit");




// module.exports = {
//   create: function () {
//     // create a PDF from PDFKit, and a table from PDFTable
//     var pdf = new PdfDocument({
//         autoFirstPage: false,
//       }),
//       table = new PdfTable(pdf, {
//         bottomMargin: 30,
//       });

//     table
//       // add some plugins (here, a 'fit-to-width' for a column)
//       .addPlugin(
//         new (require("voilab-pdf-table/plugins/fitcolumn"))({
//           column: "description",
//         })
//       )
//       // set defaults to your columns
//       .setColumnsDefaults({
//         headerBorder: "B",
//         align: "right",
//       })
//       // add table columns
//       .addColumns([
//         {
//           id: "description",
//           header: "Product",
//           align: "left",
//         },
//         {
//           id: "gas",
//           header: "Gas",
//           width: 50,
//         },
//         {
//           id: "clean",
//           header: "Clean",
//           width: 40,
//         },
//         {
//           id: "phone",
//           header: "Phone",
//           width: 40,
//         },
//         {
//           id: "rescue",
//           header: "Rescue",
//           width: 70,
//           renderer: function (tb, data) {
//             return "CHF " + data.total;
//           },
//         },
//       ])
//       // add events (here, we draw headers on each new page)
//       .onPageAdded(function (tb) {
//         tb.addHeader();
//       });

//     // if no page already exists in your PDF, do not forget to add one
//     pdf.addPage();

//     // draw content, by passing data to the addBody method

    
//       table.addBody([
//         {
//           description: "Product 1",
//           gas: "h",
//           clean: "h",
//           phone: "h",
//           rescue: "h",
//         },
//       ]);
    
//   },
// };


const puppeteer = require("puppeteer");


const generatePDF= async (html = "") => {
  console.log('Running')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({
    preferCSSPageSize: true,
    printBackground: true
});

  await page.close();
  await browser.close();

  return pdfBuffer;
};


module.exports=generatePDF


