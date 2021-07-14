const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");
about.addEventListener("click", function (e) {
  //we are dynamically adding elemnt but thaat is not the reason.we want what is being clicked
  
  const id = e.target.dataset.id; // what is actually clicked
  if (id) {
    // remove selected from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    //for button
    e.target.classList.add("active");
    // hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    //for paragraph
    element.classList.add("active");
  }
});
