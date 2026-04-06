import Product from '../models/Product';

const products = [
  {
    name: 'CeraVe Foaming Cleanser',
    description: 'Очищающий гель для жирной и комбинированной кожи',
    price: 1400,
    category: 'cleanser' as const,  // ✅ Добавь 'as const'
    skinType: ['oily', 'combination'],
    problems: ['acne', 'blackheads'],
    goal: ['cleansing'],
    imageUrl: '/images/product/CeraVe.jpg',
    buyLink: 'https://www.ozon.ru/product/cerave'
  },
  {
    name: 'La Roche-Posay Effaclar',
    description: 'Очищающий крем-гель для чувствительной кожи',
    price: 1190,
    category: 'cleanser' as const,  // ✅
    skinType: ['oily', 'sensitive'],
    problems: ['acne'],
    goal: ['cleansing'],
    imageUrl: '/images/product/effaclar.jpg',
    buyLink: 'https://www.ozon.ru/product/effaclar'
  },
  {
    name: 'The Ordinary Niacinamide',
    description: 'Сыворотка с ниацинамидом 10% + цинк 1%',
    price: 650,
    category: 'serum' as const,  // ✅
    skinType: ['oily', 'combination', 'normal'],
    problems: ['acne', 'pores', 'oiliness'],
    goal: ['treatment', 'pores'],
    imageUrl: '/images/product/The Ordinary.jpg',
    buyLink: 'https://www.ozon.ru/product/the-ordinary'
  },
  {
    name: 'CeraVe Moisturizing Cream',
    description: 'Увлажняющий крем для лица и тела',
    price: 1600,
    category: 'moisturizer' as const,  // ✅
    skinType: ['dry', 'normal'],
    problems: ['dryness'],
    goal: ['moisturizing'],
    imageUrl: '/images/product/CeraVe.jpg',
    buyLink: 'https://www.ozon.ru/product/cerave-cream'
  },
  {
    name: 'La Roche-Posay Anthelios',
    description: 'Солнцезащитный крем SPF 50+',
    price: 1390,
    category: 'sunscreen' as const,  // ✅
    skinType: ['all'],
    problems: [],
    goal: ['protection'],
    imageUrl: '/images/product/sanskrin.jpg',
    buyLink: 'https://www.ozon.ru/product/anthelios'
  }
];

export async function seedProductsIfEmpty() {
  try {
    const count = await Product.count();
    
    if (count === 0) {
      console.log('🌱 Database is empty, seeding products...');
      await Product.bulkCreate(products);
      console.log(`✅ Seeded ${products.length} products successfully!`);
    } else {
      console.log(`✅ Database already has ${count} products, skipping seed`);
    }
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
}