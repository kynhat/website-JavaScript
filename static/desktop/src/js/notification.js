(function () {
  const noti = document.createElement("div");
  noti.classList.add("noti");

  //tạo block img
  const image = document.createElement("img");
  image.classList.add("noti__image");
  image.setAttribute(
    "src",
    "https://picjumbo.com/wp-content/uploads/alone-with-his-thoughts-1080x720.jpg"
  );
  image.setAttribute("alt", "");

  // găn image vào noti
  noti.appendChild(image);

  //tạo block noti__content
  const noti__content = document.createElement("div");
  noti__content.classList.add("noti__content");
  const noti__title = document.createElement("h3");
  noti__title.classList.add("noti__title");
  noti__title.innerText = "welcome to notification";
  const noti__desc = document.createElement("p");
  noti__desc.classList.add("noti__desc");
  noti__desc.innerText =
    "lorem ipsum dolor sit amet consec tetur, adippingsicing elit. Quisquam dolor sit amet consec";

  //gắn noti-title và noti-déc vào noti__content
  noti__content.appendChild(noti__title);
  noti__content.appendChild(noti__desc);

  //gắn noti-content vào noti
  noti.appendChild(noti__content);

  const listDataTitle = ["banana", "apple", "Apricot", "Avocado"];
  const listDataDesc = ["hcm", "da nang", "da lat", "nha trang"];
  const listDataImage = [
    "https://media.istockphoto.com/photos/heart-and-soul-picture-id1216425366?k=20&m=1216425366&s=612x612&w=0&h=2DTHso4Ryo4bobdaKDuLgqArtrgHpAPIq-8-mVGtyHs=",
    "https://s.ws.pho.to/img/index/ai/source.jpg",
    "https://picjumbo.com/wp-content/uploads/alone-with-his-thoughts-1080x720.jpg",
  ];

  function createNotificaton() {
    setInterval(() => {
      // //gắn class noti vào body
      const body = document.body;
      body.appendChild(noti);

      let lastRandomDesc, lastRandomTitle, lastRandomImage;
      const title = document.querySelector(".noti__title");
      const randomTitle =
        listDataTitle[Math.floor(Math.random() * listDataTitle.length)];

      if (lastRandomTitle !== randomTitle) {
        title.textContent = randomTitle;
      }
      lastRandomTitle = randomTitle;

      const desc = document.querySelector(".noti__desc");
      const randomDesc =
        listDataDesc[Math.floor(Math.random() * listDataDesc.length)];

      if (lastRandomDesc !== randomDesc) {
        desc.innerText = randomDesc;
      }
      lastRandomDesc = randomDesc;

      const imges = document.querySelector(".noti__image");
      const randomImage =
        listDataImage[Math.floor(Math.random() * listDataImage.length)];

      if (lastRandomImage !== randomImage) {
        imges.setAttribute("src", randomImage);
      }

      lastRandomImage = randomImage;
    }, 6000);
  }

  var init = () => {
    createNotificaton();
  };

  // giống như ham main()
  window.onload = function () {
    init();
  };
})();
