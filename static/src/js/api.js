export function handleError() {
  console.log("Something wrong with your api");
}

export default async function getSearchList(param = "GSFC", date = "") {
  const headers = {
    Accept: "application/json",
  };
  
  let dataTime = '';
  if(date != '') {
    dataTime = "%" + date;
  }

  const strSearch = "https://images-api.nasa.gov/search?keywords=" + param + dataTime;
  const promiseData = await fetch(strSearch, { headers });
  const database = await promiseData.json();
  return database;
}