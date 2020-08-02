// access firebase-admin package
const firebase = require("firebase-admin");

// exceljs package
const Excel = require('exceljs');

// excel file path
const excel_file_path = 'excel_templates/products_excel_file.xlsx'

// firebase 'Products' table reference
const firebaseDatabaseRef = firebase.database().ref();
      const productsRef = firebaseDatabaseRef.child("Products");

// get Products table from FirebaseS
productsRef.once("value",function(snapData){

        var count = snapData.numChildren();
        console.log('count : '+count);

        readWriteToExcelfile(snapData);

    },function(errorObj){

        console.log('function(errorObj)')

    });

function readWriteToExcelfile(snapData) {

  // create a workbook variable
  var workbook = new Excel.Workbook();

  // read excel file from the path
  workbook.xlsx.readFile(excel_file_path)
    .then(function() {
     // access the excel sheet
        var worksheet = workbook.getWorksheet('Sheet1');

        addRowsToExcelSheet(snapData,workbook,worksheet);
   });

}


// code to write data into excel sheet
function addRowsToExcelSheet(snapData,workbook,worksheet){

  // for loop to read each record from Products table
  snapData.forEach(function(data){

    // get value for the record
    const val = data.val()

    // Add a row by sparse Array (assign to columns)
              var rowValues = [];
              rowValues[1]=val.itemId       // itemId
              rowValues[2]=val.itemName          // itemName
              rowValues[3]=val.price               // price
              rowValues[4]=val.stockIndicator         // GroupCode

    // add row to worksheet
    worksheet.addRow(rowValues);
  })

  //write file function to save all the data to the excel template file.
        workbook.xlsx.writeFile(ocrd_file_path)
            .then(function () {
                console.log("saved to excel file successfully");
            });
}

