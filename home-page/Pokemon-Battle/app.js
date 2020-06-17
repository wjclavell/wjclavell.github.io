//pokemon choice
const player = {
    choice: null
  }
  const computer = {
    choice: null
  }
  //attack choice
  const pAttack = {
    choice: null
  }
  const cAttack = {
    choice: null
  }
  //array of objects for each pokemon
  let pokemonList = [
    {
      name: "Pikachu",
      image: "https://pngimg.com/uploads/pokemon/pokemon_PNG14.png",
      type: "Electric",
      attacks: ["Quick Attack", "Thunderbolt", "Thunder"],
      health: 8,
      damage: 2,
    },
    {
      name: "Charmander",
      image: "https://pngimage.net/wp-content/uploads/2018/06/pokemon-charmander-png-3.png",
      type: "Fire",
      attacks: ["Ember", "Flamethrower", "Fire Spin"],
      health: 6,
      damage: 3,
    },
    {
      name: "Bulbasaur",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1f619ed0-b566-4538-8392-bf02ca7a76cd/dck5gvr-d1a822f4-cb27-46b3-a0ad-5538b486b6f5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMWY2MTllZDAtYjU2Ni00NTM4LTgzOTItYmYwMmNhN2E3NmNkXC9kY2s1Z3ZyLWQxYTgyMmY0LWNiMjctNDZiMy1hMGFkLTU1MzhiNDg2YjZmNS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.AxQ83TIhcLMIarRNSxzh_zdUegELMfFgT_BkTdsUiBY",
      type: "Grass/Poison",
      attacks: ["Vine Whip", "Razor Leaf", "Solar Beam"],
      health: 14,
      damage: 1,
    },
    {
      name: "Squirtle",
      image: "https://cdn.bulbagarden.net/upload/3/39/007Squirtle.png",
      type: "Water",
      attacks: ["Water Gun", "Aqua Tail", "Hydro Pump"],
      health: 10,
      damage: 1.5,
    }
  ];
  //player selection
  function playerSelect () {
  player.choice = pokemonList[prompt("Choose a Pokemon: \nPikachu(0), Charmander(1), Bulbasaur(2), or Squirtle(3)")];
  }
  //computer random selection
  function computerSelect () {
  const randomChoice = Math.floor(Math.random() * pokemonList.length);
  computer.choice = pokemonList[randomChoice];
  }
  
  //player chooses attack on button click
  function playerAttackSelect () {
  const attack1 = document.createElement('button');
  attack1.setAttribute('class', 'attackbuttons');
  attack1.setAttribute('onClick', 'playerAttack()');
  attack1.innerHTML = `${player.choice.attacks[0]}`;
  document.body.append(attack1);
  const attack2 = document.createElement('button');
  attack2.setAttribute('class', 'attackbuttons');
  attack2.setAttribute('onClick', 'playerAttack()');
  attack2.innerHTML = `${player.choice.attacks[1]}`;
  document.body.append(attack2);
  const attack3 = document.createElement('button');
  attack3.setAttribute('class', 'attackbuttons');
  attack3.setAttribute('onClick', 'playerAttack()');
  attack3.innerHTML = `${player.choice.attacks[2]}`;
  document.body.append(attack3);
  }
  //attack phase
  function playerAttack() {
    while (computer.choice.health > 0 || player.choice.health > 0) {
        computer.choice.health -= player.choice.damage;
        let PA = document.createElement('h1');
        PA.innerHTML = `${player.choice.name} attacked and did ${player.choice.damage} damage! ${computer.choice.name} has ${computer.choice.health} health remaining.`;
        document.body.append(PA);
        computerAttack();
        player.choice.health -= computer.choice.damage;
        let CA = document.createElement('h1');
        CA.innerHTML = `${computer.choice.name} used ${cAttack.choice} and did ${computer.choice.damage} damage! ${player.choice.name} has ${player.choice.health} health remaining.`;
        document.body.append(CA);
      if (computer.choice.health > 0 || player.choice.health > 0) {
        playerAttackSelect();
        break;
      } else if (computer.choice.health <= 0) {
          let EG = document.createElement('h1');
          EG.innerHTML = `${computer.choice.name} has fainted.\n<span class = "endgame" >YOU WIN !</span>`;
          document.body.append(EG);
          break;
        } else if (player.choice.health <= 0) {
          let EG = document.createElement('h1');
          EG.innerHTML = `${player.choice.name} has fainted.\n<span class = "endgame" >YOU LOSE !</span>`;
          document.body.append(EG);
          break;
        }
      }
      }
  
  //computer attack
  function computerAttack () {
    const randomChoice = Math.floor(Math.random() * computer.choice.attacks.length);
    cAttack.choice = computer.choice.attacks[randomChoice];
  }
  
  //battle phase PA = Player Attack, CA = Computer Attack, EG = End Game
  function playGame() {
    playerSelect();
    computerSelect();
    const pokeimg1 = document.createElement('img');
    pokeimg1.src = `${player.choice.image}`;
    pokeimg1.style.height = '250px';
    document.body.append(pokeimg1);
    const versus = document.createElement('img');
    versus.src = "https://www.pngmart.com/files/11/Versus-PNG-Clipart.png";
    versus.style.height = '100px';
    document.body.append(versus);
    const pokeimg2 = document.createElement('img');
    pokeimg2.src = `${computer.choice.image}`;
    pokeimg2.style.height = '250px';
    document.body.append(pokeimg2);
    computerAttack();
    playerAttackSelect();
  }