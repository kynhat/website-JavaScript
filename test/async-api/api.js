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
  return promiseData;
}