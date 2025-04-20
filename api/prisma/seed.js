import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing records
  await prisma.menuItem.deleteMany({});

  // Add menu items
  const menuItems = [
    {
        id: 1,
        name: "Greek Salad",
        description: "Fresh Mediterranean salad with cherry tomatoes, cucumber, red onion, olives, and feta cheese drizzled with olive oil.",
        price: 10.99,
        category: "Starters",
        image: "/greek-salad.jpg"
    },
    {
        id: 2,
        name: "Bruschetta",
        description: "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and extra virgin olive oil.",
        price: 8.99,
        category: "Starters",
        image: "/bruschetta.jpg"
    },
    {
        id: 3,
        name: "Lemon Herb Chicken",
        description: "Grilled chicken breast marinated in Mediterranean herbs and lemon, served with roasted vegetables.",
        price: 18.99,
        category: "Main Courses",
        image: "/lemon-chicken.jpg"
    },
    {
        id: 4,
        name: "Grilled Sea Bass",
        description: "Fresh Mediterranean sea bass grilled to perfection with lemon, herbs, and olive oil.",
        price: 22.99,
        category: "Main Courses",
        image: "/sea-bass.jpg"
    },
    {
        id: 5,
        name: "Pasta Primavera",
        description: "Fresh fettuccine tossed with seasonal vegetables in a light olive oil and herb sauce.",
        price: 15.99,
        category: "Main Courses",
        image: "/pasta.jpg"
    },
    {
        id: 6,
        name: "Mediterranean Pizza",
        description: "Thin crust pizza topped with olives, feta, sun-dried tomatoes, and fresh herbs.",
        price: 14.99,
        category: "Main Courses",
        image: "/pizza.jpg"
    },
    {
        id: 7,
        name: "Baklava",
        description: "Traditional Mediterranean dessert made with layers of filo, honey, and chopped nuts.",
        price: 4.99,
        category: "Desserts",
        image: "/baklava.jpg"
    },
    {
        id: 8,
        name: "Lemon cake",
        description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
        price: 5.99,
        category: "Desserts",
        image: "/lemon-cake.jpg"
    },
    {
        id: 9,
        name: "House Wine",
        description: "Selection of red or white wine from local Mediterranean vineyards.",
        price: 8.99,
        category: "Drinks",
        image: "/wine.jpg"
    },
    {
        id: 10,
        name: "Turkish Coffee",
        description: "Traditional Turkish coffee served with Turkish delight.",
        price: 4.99,
        category: "Drinks",
        image: "/coffee.jpg"
    }
];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item
    });
  }

  // Create a test user
  await prisma.user.create({
    data: {
        username: 'testuser',
        password: 'password123',
        name: 'Test User'
    }
  });

}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });