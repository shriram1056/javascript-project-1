// Element.getBoundingClientRect() method returns the size of an element and its position relative to the screen. in close links

// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically. in fixed navbar

// slice extracts a section of a string without modifying original string

//offsetTop - A Number, representing the top position of the element from the screen top of screen, in pixels.this is live as it updates this value 

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;//links height is not set to 0.so this will return the height
  const containerHeight = linksContainer.getBoundingClientRect().height;//div height is explicitly set to 0 .so this returns 0
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
    //we are adding fixed nav bar not just for fixed.also for making the background white
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    console.log("helo");//for the top bottom in the bottom right
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
//it is important to note that the html calclate position at the moment of click and not the transition period 
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;//for the links
    const fixedNav = navbar.classList.contains("fixed-nav");
    //this just scrolls and doesn't not depend on dynamic element.there are 2 calc one for click when nav fixed and the other is not
    let position = element.offsetTop - navHeight;//scroll the screen to with respect to the position of top of a element from the document(not screen,but html document in list format with styling).it places the document from the position it is scrolled to from the top to document till the screen end.

    if (!fixedNav) {
      position = position - navHeight;
      //this is for when nav bar is transparent and not fixed.
      //so it scroll to the position of top of a element from the document instead of subtracting the height of navbar as the position is calc is made when nav is not fixed
    }
    if (navHeight > 82) {
      position = position + containerHeight;      //this is for small screen when toggle is open and closed after click.this calc is made when toggle is open.
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});
// calculate heights
