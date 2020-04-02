var baseUrl = "https://api.covid19api.com/";

function getConfirmed(country) {
  const endpoint = `country/${country}/status/confirmed`;

  const response = UrlFetchApp.fetch(baseUrl + endpoint);
  const content = response.getContentText();

  return content;
}

function run() {
  console.log(getConfirmed("new-zealand"));
}