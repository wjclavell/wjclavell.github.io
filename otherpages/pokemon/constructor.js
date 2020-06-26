//*Pokemon Constructor
class Pokemon {
  constructor(name, image = {}, type, attacks = [], health, damage) {
    this.name = name;
    this.image = image;
    this.type = type;
    this.attacks = attacks;
    this.health = health;
    this.damage = damage;
  }
  //test to see that information is being stored correctly and object is being created with set parameters
  displayStats() {
    console.table(this);
  }
}
//testing creating a new pokemon
const ash = new Pokemon(
  "Ash",
  {
    main:
      "https://www.nicepng.com/png/detail/139-1394970_ash-ketchum-png-photo-original-ash-ketchum.png",
    front:
      "https://cdn.bulbagarden.net/upload/thumb/3/3a/Ash_OS_2.png/160px-Ash_OS_2.png",
    back: "",
  },
  "normal",
  ["punch", "kick", "headbutt", "sleep"],
  10,
  2
);

//array of objects for each pokemon with their stats and descriptions
let pokemonList = [
  {
    name: "Pikachu",
    image: {
      main: "assets/pikachu_main.png",
      front: "assets/pikachu_front.gif",
      back: "assets/pikachu_back.gif",
    },
    type: "Electric",
    attacks: ["Quick Attack", "Thunderbolt", "Thunder", "Shock Wave"],
    health: {
      currentHP: 8,
      totalHP: 8,
    },
    damage: 2,
  },
  {
    name: "Charmander",
    image: {
      main: "assets/charmander_main.png",
      front: "assets/charmander_front.gif",
      back: "assets/charmander_back.gif",
    },
    type: "Fire",
    attacks: ["Ember", "Flamethrower", "Fire Spin", "Fire Blast"],
    health: {
      currentHP: 6,
      totalHP: 6,
    },
    damage: 3,
  },
  {
    name: "Bulbasaur",
    image: {
      main: "assets/bulbasaur_main.png",
      front: "assets/bulbasaur_front.gif",
      back: "assets/bulbasaur_back.gif",
    },
    type: "Grass/Poison",
    attacks: ["Vine Whip", "Razor Leaf", "Solar Beam", "Leaf Blade"],
    health: {
      currentHP: 14,
      totalHP: 14,
    },
    damage: 1,
  },
  {
    name: "Squirtle",
    image: {
      main: "assets/squirtle_main.png",
      front: "assets/squirtle_front.gif",
      back: "assets/squirtle_back.gif",
    },
    type: "Water",
    attacks: ["Water Gun", "Aqua Tail", "Hydro Pump", "Bubble Beam"],
    health: {
      currentHP: 10,
      totalHP: 10,
    },
    damage: 1.5,
  },
];
