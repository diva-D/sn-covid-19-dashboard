var baseUrl = "https://api.covid19api.com/";

// Returns country summary data from API 
function getSummaryData() {
  const endpoint = `summary`;

  const response = UrlFetchApp.fetch(baseUrl + endpoint);
  const content = response.getContentText();
  // return country array from object
  const data = JSON.parse(content).Countries;

  return data;
}

function updateSummary() {
  // set sheet variable
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName("Summary Data");
  
  // get summary data
  const summaryData = getSummaryData();
  
  // array to hold our values
  let finalArray = [];
  
  // loop through country data to create final array
  summaryData.forEach(function(country) {
    finalArray.push([country.Country, country.NewConfirmed, country.TotalConfirmed, country.NewDeaths, country.TotalDeaths, country.NewRecovered, country.TotalRecovered]);
  });
  
  // clear existing content
  sh.getRange(2, 1, sh.getLastRow()-1, sh.getLastColumn()).clearContent();
  
  // update with new values
  sh.getRange(2, 1, finalArray.length, finalArray[0].length).setValues(finalArray);
}