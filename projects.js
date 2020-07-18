//*pull projects from googlesheets and populate projects section using jQuery
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
    const $projBox = $(`<div class="all-wrapper"><a href="${project.url}">
    <img
      class="all-img"
      src="${project.image}"
  /></a><a href="${project.url}"
      ><h1>${project.title}</h1></a
    >
    <p>
      ${project.description}
    </p>
    
  </div>`);

    return $projBox;
  };
  //   $("body").append(createProjectElement(data[5]));

  data.forEach((project) => {
    const $projBox = createProjectElement(project);
    $(".all-projects").append($projBox);
  });
};

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
    document.documentElement.setAttribute("data-theme", "light");
    $(".logo img").attr(
      "src",
      "https://res.cloudinary.com/wjclavell/image/upload/v1594847186/WC_logo.png"
    );
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    $(".logo img").attr(
      "src",
      "https://res.cloudinary.com/wjclavell/image/upload/v1594847322/WC_logo_red.png"
    );
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
