const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;//for setting the images side by side
});
let counter = 0;
nextBtn.addEventListener("click", function () {
  counter++;//hide next button when the slides is at the end to avoid showing empty slide
  carousel();
});

prevBtn.addEventListener("click", function () {
  counter--;//hide prev button when the slides is at the beginning to avoid showing empty slide
  carousel();
});

function carousel() {
  // working with slides
  // if (counter === slides.length) {
  //   counter = 0;
  // }
  // if (counter < 0) {
  //   counter = slides.length - 1;
  // }
  // working with buttons

  //display next btn
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }
  //display previous btn
  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }
  //all slides move left or right
  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

prevBtn.style.display = "none";
