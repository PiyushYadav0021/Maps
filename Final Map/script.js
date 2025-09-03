// Simple search filter
const searchInput = document.getElementById("searchInput");
const mapGrid = document.getElementById("mapGrid");
const cards = mapGrid.getElementsByClassName("card");

searchInput.addEventListener("keyup", function () {
  const filter = searchInput.value.toLowerCase();
  
  for (let i = 0; i < cards.length; i++) {
    const text = cards[i].querySelector("p").textContent.toLowerCase();
    if (text.includes(filter)) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
});
