const picContainer = $(".picture-container");
const picButtons = $(".pic-button");
const counter = $(".counter");

counter.append(`<h1>0</h1>`);

let currentCodePosition = parseInt(counter[0].innerText);
console.log(counter[0].innerText);
const code = [5, 2, 5, 4];

function displayAnswer() {
  picContainer.empty();
  picContainer.append(
    `<h1 class="solved">YOU DID IT!</h1>
    <h4 class="solved-message">screenshot and send to Joel to claim your prize</h4>`
  );
}

// function enterCode() {
//   while (currentCodePosition !== 4) {
//     switch (currentCodePosition) {
//       case 0:
//         console.log("you entered case 0");
//         if (imgNumber === "5") {
//           currentCodePosition++;
//           console.log(
//             "u guessed right ",
//             imgNumber,
//             "current postion increase ",
//             currentCodePosition
//           );
//         } else {
//           currentCodePosition = 0;
//         }
//       case 1:
//         if (imgNumber === "2") {
//           currentCodePosition++;
//         } else {
//           currentCodePosition = 0;
//         }
//       case 2:
//         if (imgNumber === "5") {
//           currentCodePosition++;
//         } else {
//           currentCodePosition = 0;
//         }
//       case 3:
//         if (imgNumber === "4") {
//           displayAnswer();
//           currentCodePosition++;
//         } else {
//           currentCodePosition = 0;
//         }
//     }
//   }
// }

picButtons.on("click", (e) => {
  let imgNumber = e.target.parentNode.id;
  console.log("position: ", currentCodePosition);

  if (counter[0].innerText === "0") {
    console.log("you entered case 0");
    if (imgNumber === "5") {
      return (counter[0].innerText = "1");
      console.log(
        "u guessed right ",
        imgNumber,
        "current postion increase ",
        currentCodePosition
      );
    } else {
      return (counter[0].innerText = "0");
    }
  }
  if (counter[0].innerText === "1") {
    if (imgNumber === "2") {
      return (counter[0].innerText = "2");
    } else {
      return (counter[0].innerText = "0");
    }
  }
  if (counter[0].innerText === "2") {
    if (imgNumber === "5") {
      return (counter[0].innerText = "3");
    } else {
      return (counter[0].innerText = "0");
    }
  }
  if (counter[0].innerText === "3") {
    if (imgNumber === "4") {
      displayAnswer();
    } else {
      return (counter[0].innerText = "0");
    }
  }
  console.log(imgNumber);
});
