import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing records
  await prisma.menuItem.deleteMany({});

  // Add menu items
  const menuItems = [
    {
      name: 'Greek Salad',
      description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
      price: 12.99,
      image: '/images/greek-salad.jpg',
      category: 'Starters'
    },
    {
      name: 'Bruschetta',
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
      price: 7.99,
      image: '/images/bruschetta.jpg',
      category: 'Starters'
    },
    {
      name: 'Lemon Dessert',
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      price: 8.99,
      image: '/images/lemon-dessert.jpg',
      category: 'Desserts'
    },
    {
      name: 'Grilled Fish',
      description: 'Fresh Mediterranean fish, grilled to perfection with olive oil, lemon, and herbs.',
      price: 24.99,
      image: '/images/grilled-fish.jpg',
      category: 'Main Courses'
    },
    {
      name: 'Mediterranean Pasta',
      description: 'Fresh pasta tossed with Mediterranean vegetables, olive oil, and fresh herbs.',
      price: 18.99,
      image: '/images/mediterranean-pasta.jpg',
      category: 'Main Courses'
    },
    {
      name: 'Hummus & Pita',
      description: 'Smooth hummus served with warm pita bread and olive oil.',
      price: 6.99,
      image: '/images/hummus-pita.jpg',
      category: 'Starters'
    },
    {
      name: 'Baklava',
      description: 'Layers of flaky phyllo dough filled with chopped nuts and sweetened with syrup.',
      price: 7.99,
      image: '/images/baklava.jpg',
      category: 'Desserts'
    },
    {
      name: 'Mediterranean Pizza',
      description: 'Thin crust pizza topped with Mediterranean vegetables, feta cheese, and fresh herbs.',
      price: 16.99,
      image: '/images/mediterranean-pizza.jpg',
      category: 'Main Courses'
    }
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item
    });
  }

  console.log('Menu items seeded successfully!');

  // Create a test user
  await prisma.user.create({
    data: {
        username: 'testuser',
        password: 'password123',
        name: 'Test User'
    }
  });

  console.log('Test user created successfully!');
}
 
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });