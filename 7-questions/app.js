//method 1:using selectors inside the element
const questions = document.querySelectorAll(".question");

//we are adding show text to question instead of questions. 
//also question text(div) and question title(div) are in same question(article)
questions.forEach(function (question) {
  const btn = question.querySelector(".question-btn");
  // use query selector from question to select the button in a question

  btn.addEventListener("click", function () {
    // console.log(question);

    //remove show-text from questions apart from out current item
    questions.forEach(function (item) {
      if (item !== question) {
        item.classList.remove("show-text");
      } 
    });

    question.classList.toggle("show-text");
  });
});

//method 2:traversing the dom
// const btns = document.querySelectorAll(".question-btn");

// btns.forEach(function (btn) {
//   btn.addEventListener("click", function (e) {
//     const question = e.currentTarget.parentElement.parentElement; this travese up the dom tree

//     question.classList.toggle("show-text");
//   });
// });
