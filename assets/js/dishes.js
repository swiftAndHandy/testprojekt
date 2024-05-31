const burgers = [
    {
        name: 'Classic Burger',
        description: 'unser amerikanischer Klassiker mit saftigem Patty und feinstem Gouda',
        price: 8.99
    },
    {
        name: 'Big Papa\'s Favorite',
        description: 'mit amerikanischem Burger-Patty nach Wahl, Käse nach Wahl, gegrillten Champignons, Blattspinat, Knoblauch, Ketchup und hausgemachter Sauce 150g',
        price: 11.49
    },
    {
        name: 'Mr. Eggplant',
        description: 'mit amerikanischem Burger-Patty nach Wahl, Käse nach Wahl, gegrillter Aubergine, Knoblauch, Ketchup und hausgemachter Walnusssauce 150g',
        price: 9.99
    }
];


const fries = [
    {
        name: 'Classic Fries',
        description: 'klassische Pommes. Ohne Schnickschnack, dafür mit Ketchup.',
        price: 2.99
    },
    {
        name: 'Curly Fries',
        description: 'weil gekringelt schweinisch geil ist.',
        price: 3.49
    },
    {
        name: 'Sweet Potato Fries',
        description: 'für den Hippster, der sonst schon alles hat.',
        price: 19.99
    }
];

const drinks = [
    {
        name: 'Big Papa\'s Cola',
        description: 'wie eine Coke, nur mit mehr lecker. 330 ml.',
        price: 2.49
    }, 
    {
        name: 'Kiba',
        description: 'Kirsch- trifft Bananensaft. Jedes Restaurant, das keinen Kiba auf der Karte hat, verdient den Wirtschaftstot. 0.5 Liter.',
        price: 3.99
    },
    {
        name: 'Wasser',
        description: 'Für den Hippster, der sonst schon alles hat. Preise wie auf der Apfelplantage. 100 ml',
        price: 10.99
    }
];



const categorys = [
    {
        name: 'Beliebte Gerichte',
        image: false,
        alt: '',
        dishes: [burgers[1], fries[2], drinks[1]]
    },
    {
        name: 'Burger',
        image: 'drei_burger.webp',
        alt: 'Burger-Kategorie',
        dishes: burgers
    },
    {
        name: 'Beilagen',
        image: 'pommes.webp',
        alt: 'Pommes-Kategorie',
        dishes: fries
    },
    {
        name: 'Getränke',
        image: 'softdrinks.webp',
        alt: 'Getränke-Kategorie',
        dishes: drinks
    }
];