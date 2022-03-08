let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

favorites.forEach(function (favorite) {
  setTimeout(() => {
    if(document.getElementById(favorite) != null) {
      document.getElementById(favorite).classList.add("like");
    }
  }, 500);
});

function favoriteItem(e) {
  let id = e.id,
    item = e,
    index = favorites.indexOf(id);

  if (!id) return;
  // item is not favorite
  if (index === -1) {
    favorites.push(id);
    item.classList.add("like");
    // item is already favorite
  } else {
    favorites.splice(index, 1);
    item.classList.remove("like");
  }
  // store array in local storage
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
