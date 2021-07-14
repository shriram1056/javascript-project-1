const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  } // i<6 for 6 digit in hex code
  // console.log(hexColor);

  color.textContent = hexColor;//span for color code in html
  document.body.style.backgroundColor = hexColor;
});

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}
