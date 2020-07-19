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
  const createProjectElement = (project) => {
    //display projects in slider if they are 'featured' projects. Value in googlesheets
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

  data.forEach((project) => {
    //*projects slider, used SwiperJS library
    //initialize once data is recieved
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
    const $projBox = createProjectElement(project);
    $(".swiper-wrapper").append($projBox);
  });
};

//*function to automatically close hamburger menu when you choose a link
const closeMenu = () => {
  const $burgerLink = $(".nav a");
  const $input = $("input");

  $burgerLink.on("click", () => {
    $input.prop("checked", false);
  });
};
closeMenu();

//*scroll to page section when chosen, only for navbar not hamburger
//code inspired by: https://dev.to/attacomsian/smooth-scroll-to-page-section-with-jquery-2jng#:~:text=Here%20is%20a%20little%20jQuery,This%20value%20is%20in%20milliseconds.
$(document).on("click", '.navbar a[href^="#"]', function (e) {
  e.preventDefault();
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 80, //offset by height of the navbar to scroll to correct position
      },
      "slow"
    );
});

//*back to top scrolling animation
$(".fa-caret-up").click(function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

//*change icon from sun to moon on click
const $darkLight = $(".theme-switch-wrapper label");
$darkLight.on("click", () => {
  $darkLight.toggleClass("fa-sun fa-moon");
});

//*Dark & Light mode toggle
const toggleSwitch = document.querySelector(
  '.theme-switch-wrapper input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    //when checkbox is checked will will switch to light theme
    document.documentElement.setAttribute("data-theme", "light");
    $(".logo img").attr(
      "src",
      "https://res.cloudinary.com/wjclavell/image/upload/v1594847186/WC_logo.png"
    ); //change the logo image/color
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    $(".logo img").attr(
      "src",
      "https://res.cloudinary.com/wjclavell/image/upload/v1594847322/WC_logo_red.png"
    );
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
