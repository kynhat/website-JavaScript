const endPoint = "https://icanhazdadjoke.com/";
const endPoint1 = "https://picsum.photos/v2/list";

//chuyển dư liêu từ dạng html sang kiểu json

const btn = document.querySelector(".btn-app");
const text = document.querySelector(".text");
// const loading = document.querySelector(".loading");
//cach 1
// promiseData
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// sự dụng async
async function getData() {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const promiseData = await fetch(endPoint, { headers });
  const database = await promiseData.json();
  return database;
}

async function changeData() {
  // cách 1
  try {
    const data = await getData();
    document.querySelector(".text").textContent = data?.joke ?? "";
  } catch (error) {
   console.log(error)
  }
}

function handleError(err) {
  console.log(err)
}

function imagesTemplate(url) {
  const template = `<div class="image-item">
  <img src="${url}" alt=""/>
 </div>`;

  document
    .querySelector(".imageList")
    .insertAdjacentHTML("beforeend", template);
}

async function getApiImage() {
  const res = await fetch(endPoint1);
  const images = await res.json();

  if (images.length > 0 && Array.isArray(images)) {
    images.forEach(value => {
      imagesTemplate(value.download_url);
    });
  }
}

// cách 2
// changeData()
// .then()
// .catch(handleError)

btn.addEventListener("click", changeData);
