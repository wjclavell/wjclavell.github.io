//*function to display complete about me on mobile
function readMore() {
  const $dots = $("#dots");
  const $more = $("#more");
  const $buttontxt = $("#read-more");
  let showAll = false;

  if (showAll === false) {
    $dots.css("display", "none");
    $buttontxt.remove();
    $(".about-flex").append(
      '<button onclick="readLess()" id="read-less">read less <i class="fas fa-chevron-up"></i></button>'
    );
    $more.css("display", "inline");
  } // else if (showAll === true) {
  //   $dots.css("display", "inline");
  //   $buttontxt.text("read more");
  //   $more.css("display", "none");
  // }
}
//*function to hide about me text
function readLess() {
  const $dots = $("#dots");
  const $more = $("#more");
  const $buttontxt = $("#read-less");
  let showAll = true;

  if (showAll === true) {
    $dots.css("display", "inline");
    $buttontxt.remove();
    $(".about-flex").append(
      '<button onclick="readMore()" id="read-more">read more <i class="fas fa-chevron-down"></i></button>'
    );
    $more.css("display", "none");
  }
}
//* array of images to populate my skills section
let skills = [
  "https://techcrunch.com/wp-content/uploads/2010/07/github-logo.png",
  "https://avatars3.githubusercontent.com/u/18133?s=200&v=4",
  "https://www.w3.org/html/logo/downloads/HTML5_Badge_512.png",
  "https://cdn.iconscout.com/icon/free/png-256/css-131-722685.png",
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "https://openjsf.org/wp-content/uploads/sites/84/2019/10/jquery-logo-vertical_large_square.png",
  "https://pluspng.com/img-png/nodejs-logo-png--435.png",
  "https://cdn.iconscout.com/icon/free/png-512/heroku-5-569467.png",
  "https://cdn.freebiesupply.com/logos/large/2x/after-effects-cc-logo-png-transparent.png",
  "https://img.pngio.com/buy-adobe-education-contact-multiblue-and-receive-discounts-for-logo-adobe-illustrator-png-600_600.png",
  "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_adobe_photoshop-512.png",
];
//*loop to populate skills section with logos of my skills
for (logo in skills) {
  $(".skill-container").append(`<img src="${skills[logo]}">`);
}

//*projects slider
//initialize
let mySwiper = new Swiper(".swiper-container", {
  //add cube effect and set params
  effect: "cube",
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 15,
    shadowScale: 0.74,
  },
  //show pagination dots
  pagination: {
    el: ".swiper-pagination",
  },
  //show buttons
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//*pull projects from googlesheets and populate projects slider with 'featured' projects
const url =
  "https://spreadsheets.google.com/feeds/list/18r08nO91byLTxZ8zVRghWGyLtIKrXzBa8P6sGM9T19M/od6/public/values?alt=json";

fetch(url) //starts fetch process, to get the data
  .then((response) => response.json()) //returns JSON data as a JS object
  .then((data) => {
    // console.log(data.feed.entry);
    const projects = data.feed.entry.map((entry) => {
      return {
        title: entry.gsx$title.$t,
        image: entry.gsx$image.$t,
        description: entry.gsx$description.$t,
        url: entry.gsx$url.$t,
        category: entry.gsx$category.$t,
        featured: entry.gsx$featured.$t,
      };
    });
    app(projects); // calls the application with your new projects array as argument
  });

const app = (data) => {
  console.log("app is running!");
  console.log(data);

  const createProjectElement = (project) => {
    if (project.featured === "TRUE") {
      const $projBox = $(`<div class="swiper-slide">
    <div class="proj-head">
      <a href="${project.url}"
        ><h1>${project.title}</h1></a
      >
      <p>
        ${project.description}
      </p>
    </div>
    <a href="${project.url}">
      <img
        class="project-shown"
        src="${project.image}"
    /></a>
  </div>`);

      return $projBox;
    }
  };
  //   $("body").append(createProjectElement(data[5]));

  data.forEach((project) => {
    const $projBox = createProjectElement(project);
    $(".swiper-wrapper").append($projBox);
  });
};

//*function to automatically close hamburger menu when you choose a link
const closeMenu = () => {
  const $link1 = $("#link1");
  const $link2 = $("#link2");
  const $link3 = $("#link3");
  const $link4 = $("#link4");
  const $input = $("input");

  $link1.on("click", () => {
    $input.prop("checked", false);
  });
  $link2.on("click", () => {
    $input.prop("checked", false);
  });
  $link3.on("click", () => {
    $input.prop("checked", false);
  });
  $link4.on("click", () => {
    $input.prop("checked", false);
  });
};
closeMenu();

//*back to top scrolling animation
$(".fa-caret-up").click(function (event) {
  event.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
