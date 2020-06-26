/*William Clavell, Pokemon Battle, Jun. 24, 2020
This is a game where you chose your pokemon and battle a random cpu pokemon to the death! Click on an attack buttons to inflict damage to the opposing Pokemon*/
//Blog Post documentation: https://wjclavellblog.wordpress.com/2020/06/24/final-project-documentation-part-1/

//play music when page loads
window.onload = () => {
  const music = document.querySelector("audio");
  music.play();
};

//current pokemon choice
const player = {
  choice: null,
};
const computer = {
  choice: null,
};
//current attack choice
const pAttack = {
  choice: null,
};
const cAttack = {
  choice: null,
};

//*player selection screen
//grab the pokemon class from html
const pokemon = document.querySelector(".pokemon");

//loop through the pokemonList array to display each pokemon choice along with their name and stats on hover
function generatePokemon() {
  setTimeout(() => {
    alert("Choose Your Pokemon!");
  }, 100);
  for (let i in pokemonList) {
    // create the pokemon list
    $(".pokemon").append(
      '<div class="poke-container"><img src="' +
        pokemonList[i].image.main +
        '"><ul><li>Type: ' +
        pokemonList[i].type +
        "</li><li>Health: " +
        pokemonList[i].health.totalHP +
        "</li><li>Damage: " +
        pokemonList[i].damage +
        "</ul><h2>" +
        pokemonList[i].name +
        '</h2><span class="type ' +
        pokemonList[i].type +
        '"></span></div>'
    );
  }
}
//*assign whatever pokemon is clicked to the player choice
function playerSelect() {
  $(".pokemon .poke-container").click(function () {
    // get the name of the clicked pokemon and compare it to the name in pokemonList array
    let name = $(this).children("h2").text();
    for (let i in pokemonList) {
      if (pokemonList[i].name === name) {
        // find and save the chosen pokemon as the player's choice
        player.choice = pokemonList[i];
        //hide the pokemon list
        pokemon.style.display = "none";
        //after selecting pokemon, generate the pokemon in the battle arena, along with the user attacks
        createPoke($(".arena .player"), player.choice);
        createPoke($(".arena .computer"), computer.choice);
        attackList();
      }
    }
  });
}

//// playerSelect();
//// function playerSelect() {
////   player.choice =
////     pokemonList[
////       prompt(
////         "Choose a Pokemon: \nPikachu(0), Charmander(1), Bulbasaur(2), or Squirtle(3)"
////       )
////     ];
//// }

//*computer random pokemon selection
function computerSelect() {
  //choose a random number between 0 and array length (4)
  const randomChoice = Math.floor(Math.random() * pokemonList.length);
  //assign that random number to the index in pokemonList array
  computer.choice = pokemonList[randomChoice];
}

//*build the battle arena
//create battle pokemon
function createPoke(location, poke) {
  //which image to use. Back for user, and Front for computer
  let direction = "front";
  if (poke === player.choice) {
    direction = "back";
  }
  //pokemon image along with their name and HP displays
  location.append(
    '<section class="poke"><img src="' +
      poke.image[direction] +
      '"><aside class="data"><h2>' +
      poke.name +
      '</h2><div><progress max="' +
      poke.health.totalHP +
      '"></progress><p><span>' +
      poke.health.currentHP +
      "</span>/" +
      poke.health.totalHP +
      "</p></div></aside></section>"
  );
  //set health bar to full for both Pokemon
  $(".arena .computer progress").val(computer.choice.health.totalHP);
  $(".arena .player progress").val(player.choice.health.totalHP);
}
//reduce computer health by player attack damage
function setCHealth() {
  computer.choice.health.currentHP -= player.choice.damage;
  //display updated health information
  $(".arena .computer .data p span").text(computer.choice.health.currentHP);
  $(".arena .computer progress").val(computer.choice.health.currentHP);
}
//reduce player health by computer attack damage
function setPHealth() {
  player.choice.health.currentHP -= computer.choice.damage;
  //display updated health information
  $(".arena .player .data p span").text(player.choice.health.currentHP);
  $(".arena .player progress").val(player.choice.health.currentHP);
}

//*player chooses attack on button click
//create a list of attacks to choose from
function attackList() {
  for (let i in player.choice.attacks) {
    // create list of attacks and assign it an onclick attribute to call the player attack function
    $(".attacks-list").append(
      '<li onclick="playerAttack()"><p class="attack-name"><strong>' +
        player.choice.attacks[i] +
        "</strong></p></li>"
    );
  }
}
// //animate Pokemon when attacking
// function animation() {
//   $('.arena .player img').animate(
//     {
//     'right': '20vw',
//     'bottom': '15vh'
//   },50,'swing');
//   $('.arena .player img').animate(
//     {
//     'right': '25vw',
//     'bottom': '10vh'
//   },50,'swing');
// }

//*ATTACK PHASE
function playerAttack() {
  while (
    //game loop will run as long as the Pokemon have health remaining
    computer.choice.health.currentHP > 0 &&
    player.choice.health.currentHP > 0
  ) {
    //reduce computer health after player attacks
    setCHealth();
    //time delay to allow user to attack first
    setTimeout(() => {
      //computer's turn to attack
      computerAttack();
      //reduce player health when computer attacks
      setPHealth();
      //show what attack the computer used
      alert(
        `${computer.choice.name} used ${cAttack.choice} and did ${computer.choice.damage} damage to ${player.choice.name}!`
      );
    }, 400);
    //*conditionals to stop the loop and either continue game or stop the game
    //if both pokemon have health remaing break the loop and wait for next player attack
    if (
      computer.choice.health.currentHP > 0 &&
      player.choice.health.currentHP > 0
    ) {
      break;
      //if computer has no health, game ends and player wins
    } else if (computer.choice.health.currentHP <= 0) {
      //display win message and end result of game
      $(".win h3").append(
        `${computer.choice.name} has fainted<br>Refresh to try again.`
      );
      document.querySelector(".win").style.display = "inline-block";
      break;
      //if player has no health, game ends and player loses
    } else if (player.choice.health.currentHP <= 0) {
      //display lose message and end result of game
      $(".lose h3").append(
        `${pokemon.choice.name} has fainted<br>Refresh to try again.`
      );
      document.querySelector(".lose").style.display = "inline-block";
      break;
    }
  }
}

//*computer attacks by choosing a random attack from array
function computerAttack() {
  const randomChoice = Math.floor(
    Math.random() * computer.choice.attacks.length
  );
  //set that random choice as the value of cAttack to store what attack the computer used
  cAttack.choice = computer.choice.attacks[randomChoice];
}

//*function to play the actual game after pressing start button, first generate the selection screen, choose a pokemon, computer randomly chooses as well,then enter battle phase with turn based attacks until one pokemon has no more health
function playGame() {
  document.getElementById("start").style.display = "none";
  generatePokemon();
  playerSelect();
  computerSelect();
}

//?How do I restart this game...
//restart the game by refreshing page, not the best method but hey, it works
function restart() {
  location.reload();
}
