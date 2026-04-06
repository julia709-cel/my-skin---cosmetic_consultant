import sequelize from '../config/database';
import Product from '../models/Product';
import dotenv from 'dotenv';

dotenv.config();

// Интерфейс для новых товаров
interface ProductInput {
  name: string;
  description: string;
  price: number;
  category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen';
  skinType: string[];
  problems: string[];
  goal: string[];
  imageUrl?: string;
  buyLink?: string;
}

// ========== НОВЫЕ ТОВАРЫ (22 штуки) ==========
// ⚠️ Категория должна быть из ENUM: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen'
const newProducts: ProductInput[] = [
  // 💧 УВЛАЖНЯЮЩИЕ (moisturizer)
  {
    name: "Увлажняющий крем CeraVe",
    description: "Лёгкий крем с церамидами и гиалуроновой кислотой",
    price: 1400,
    category: "moisturizer",
    imageUrl: "/images/products/cerave-cream.jpg",
    buyLink: "https://goldapple.ru/search?q=cerave+cream",
    skinType: ["normal", "combination", "dry"],
    problems: ["dryness", "sensitivity"],
    goal: ["hydration"]
  },
  {
    name: "Крем La Roche-Posay Effaclar H",
    description: "Увлажняющий крем для жирной кожи",
    price: 1690,
    category: "moisturizer",
    imageUrl: "/images/products/lrp-effaclar.jpg",
    buyLink: "https://goldapple.ru/search?q=la+roche+posay+effaclar",
    skinType: ["oily", "combination"],
    problems: ["acne", "dryness"],
    goal: ["hydration", "cleansing"]
  },
  {
    name: "Крем Avene Tolerance Control",
    description: "Для очень чувствительной кожи",
    price: 2190,
    category: "moisturizer",
    imageUrl: "/images/products/avene-tolerance.jpg",
    buyLink: "https://goldapple.ru/search?q=avene+tolerance",
    skinType: ["sensitive", "dry"],
    problems: ["sensitivity", "dryness"],
    goal: ["hydration", "protection"]
  },

  // 🧼 ОЧИЩАЮЩИЕ (cleanser)
  {
    name: "Гель для умывания CeraVe",
    description: "Мягкое очищение с церамидами",
    price: 1200,
    category: "cleanser",
    imageUrl: "/images/products/cerave-cleanser.jpg",
    buyLink: "https://goldapple.ru/search?q=cerave+cleanser",
    skinType: ["normal", "dry", "combination"],
    problems: ["dryness", "sensitivity"],
    goal: ["cleansing"]
  },
  {
    name: "Пенка для умывания La Roche-Posay",
    description: "Глубокое очищение для жирной кожи",
    price: 1590,
    category: "cleanser",
    imageUrl: "/images/products/lrp-foam.jpg",
    buyLink: "https://goldapple.ru/search?q=la+roche+posay+foam",
    skinType: ["oily", "combination"],
    problems: ["acne", "sensitivity"],
    goal: ["cleansing"]
  },
  {
    name: "Мицеллярная вода Bioderma",
    description: "Деликатное снятие макияжа",
    price: 1890,
    category: "cleanser",
    imageUrl: "/images/products/bioderma.jpg",
    buyLink: "https://goldapple.ru/search?q=bioderma",
    skinType: ["normal", "dry", "combination", "oily", "sensitive"],
    problems: ["sensitivity", "acne"],
    goal: ["cleansing"]
  },

  // ⭐ СЫВОРОТКИ (serum)
  {
    name: "Сыворотка с гиалуроновой кислотой The Ordinary",
    description: "Интенсивное увлажнение для всех типов кожи",
    price: 890,
    category: "serum",
    imageUrl: "/images/products/ordinary-serum.jpg",
    buyLink: "https://goldapple.ru/search?q=the+ordinary+hyaluronic",
    skinType: ["normal", "dry", "combination", "oily"],
    problems: ["dryness", "wrinkles"],
    goal: ["hydration", "anti-aging"]
  },
  {
    name: "Сыворотка Vichy Minéral 89",
    description: "Укрепляющая сыворотка с гиалуроновой кислотой",
    price: 2490,
    category: "serum",
    imageUrl: "/images/products/vichy-89.jpg",
    buyLink: "https://goldapple.ru/search?q=vichy+mineral+89",
    skinType: ["normal", "dry", "combination"],
    problems: ["dryness", "wrinkles", "sensitivity"],
    goal: ["hydration", "anti-aging"]
  },
  {
    name: "Сыворотка The Ordinary Niacinamide",
    description: "Сужает поры и контролирует себум",
    price: 790,
    category: "serum",
    imageUrl: "/images/products/ordinary-niacinamide.jpg",
    buyLink: "https://goldapple.ru/search?q=the+ordinary+niacinamide",
    skinType: ["oily", "combination"],
    problems: ["acne", "pigmentation"],
    goal: ["cleansing", "protection"]
  },
  {
    name: "Сыворотка с витамином С La Roche-Posay",
    description: "Осветляет и выравнивает тон кожи",
    price: 3290,
    category: "serum",
    imageUrl: "/images/products/lrp-vitamin-c.jpg",
    buyLink: "https://goldapple.ru/search?q=la+roche+vitamin+c",
    skinType: ["normal", "dry", "combination"],
    problems: ["pigmentation", "wrinkles"],
    goal: ["anti-aging", "protection"]
  },
  {
    name: "Ночная сыворотка The Ordinary Retinol",
    description: "Антивозрастной уход с ретинолом",
    price: 1190,
    category: "serum",
    imageUrl: "/images/products/ordinary-retinol.jpg",
    buyLink: "https://goldapple.ru/search?q=the+ordinary+retinol",
    skinType: ["normal", "dry", "combination"],
    problems: ["wrinkles", "pigmentation"],
    goal: ["anti-aging"]
  },

  // 🛡️ ЗАЩИТНЫЕ (sunscreen)
  {
    name: "Санскрин La Roche-Posay Anthelios SPF50",
    description: "Максимальная защита от UV-лучей",
    price: 1990,
    category: "sunscreen",
    imageUrl: "/images/products/lrp-sunscreen.jpg",
    buyLink: "https://goldapple.ru/search?q=la+roche+anthelios",
    skinType: ["normal", "dry", "combination", "oily"],
    problems: ["pigmentation", "wrinkles", "sensitivity"],
    goal: ["protection", "anti-aging"]
  },
  {
    name: "Санскрин Garnier Ambre Solaire SPF50",
    description: "Лёгкий флюид для лица",
    price: 890,
    category: "sunscreen",
    imageUrl: "/images/products/garnier-spf.jpg",
    buyLink: "https://goldapple.ru/search?q=garnier+ambre+solaire",
    skinType: ["normal", "combination", "oily"],
    problems: ["pigmentation"],
    goal: ["protection"]
  },

  // 🧴 ТОНЕРЫ (toner)
  {
    name: "Лосьон CeraVe SA",
    description: "Отшелушивающий с салициловой кислотой",
    price: 1590,
    category: "toner",
    imageUrl: "/images/products/cerave-sa.jpg",
    buyLink: "https://goldapple.ru/search?q=cerave+sa",
    skinType: ["oily", "combination"],
    problems: ["acne", "pigmentation"],
    goal: ["cleansing"]
  },
  {
    name: "Термальная вода La Roche-Posay",
    description: "Успокаивает и увлажняет кожу",
    price: 1190,
    category: "toner",
    imageUrl: "/images/products/lrp-thermal.jpg",
    buyLink: "https://goldapple.ru/search?q=la+roche+thermal",
    skinType: ["normal", "dry", "combination", "oily", "sensitive"],
    problems: ["sensitivity", "dryness"],
    goal: ["hydration", "protection"]
  },

  // 🎁 БОНУСНЫЕ ТОВАРЫ
  {
    name: "Тканевая маска Garnier",
    description: "Увлажняющая маска с гиалуроновой кислотой",
    price: 150,
    category: "serum",
    imageUrl: "/images/products/garnier-mask.jpg",
    buyLink: "https://goldapple.ru/search?q=garnier+mask",
    skinType: ["normal", "dry", "combination"],
    problems: ["dryness"],
    goal: ["hydration"]
  },
  {
    name: "Ночная маска Laneige Water Sleeping",
    description: "Интенсивное увлажнение на ночь",
    price: 2890,
    category: "moisturizer",
    imageUrl: "/images/products/laneige-mask.jpg",
    buyLink: "https://goldapple.ru/search?q=laneige+sleeping+mask",
    skinType: ["normal", "dry", "combination"],
    problems: ["dryness", "wrinkles"],
    goal: ["hydration", "anti-aging"]
  },
  {
    name: "Крем для глаз La Roche-Posay",
    description: "Против тёмных кругов и отёков",
    price: 1890,
    category: "moisturizer",
    imageUrl: "/images/products/lrp-eye.jpg",
    buyLink: "https://goldapple.ru/search?q=la+roche+eye",
    skinType: ["normal", "dry", "combination"],
    problems: ["wrinkles", "pigmentation"],
    goal: ["anti-aging"]
  },
  {
    name: "Патчи для глаз Petitfee",
    description: "Гидрогелевые патчи с золотом",
    price: 1290,
    category: "serum",
    imageUrl: "/images/products/petitfee-patches.jpg",
    buyLink: "https://goldapple.ru/search?q=petitfee+patches",
    skinType: ["normal", "dry", "combination"],
    problems: ["wrinkles", "dryness"],
    goal: ["hydration", "anti-aging"]
  },
  {
    name: "Гель Effaclar Duo+ La Roche-Posay",
    description: "Корректирующий уход против акне",
    price: 1890,
    category: "cleanser",
    imageUrl: "/images/products/lrp-duo.jpg",
    buyLink: "https://goldapple.ru/search?q=effaclar+duo",
    skinType: ["oily", "combination"],
    problems: ["acne"],
    goal: ["cleansing", "protection"]
  },
  {
    name: "Патчи от прыщей COSRX",
    description: "Гидроколлоидные патчи для точечного ухода",
    price: 890,
    category: "cleanser",
    imageUrl: "/images/products/cosrx-patches.jpg",
    buyLink: "https://goldapple.ru/search?q=cosrx+pimple+patch",
    skinType: ["oily", "combination"],
    problems: ["acne"],
    goal: ["cleansing"]
  },
  {
    name: "Ночной крем CeraVe",
    description: "Восстанавливающий крем с ретинолом",
    price: 1790,
    category: "moisturizer",
    imageUrl: "/images/products/cerave-night.jpg",
    buyLink: "https://goldapple.ru/search?q=cerave+night",
    skinType: ["normal", "dry", "combination"],
    problems: ["wrinkles", "dryness"],
    goal: ["anti-aging", "hydration"]
  }
];

// ========== ФУНКЦИЯ ДОБАВЛЕНИЯ ==========
async function addProducts() {
  try {
    // Подключаемся к базе
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected');

    // Синхронизируем модель (создаём таблицу если нет)
    await Product.sync({ alter: true });
    console.log('📦 Таблица Products синхронизирована');
    
    // Считаем существующие товары
    console.log('📊 Проверяем существующие товары...');
    const existingCount = await Product.count();
    console.log(`📦 Сейчас в базе: ${existingCount} товаров`);
    
    // Добавляем новые товары
    console.log('➕ Добавляем 22 новых товара...');
    const inserted = await Product.bulkCreate(newProducts, {
      ignoreDuplicates: true,  // Не добавлять если товар с таким name уже есть
      validate: true           // Проверять валидацию
    });
    
    // Считаем итоговое количество
    const newCount = await Product.count();
    console.log(`✅ Успешно добавлено ${inserted.length} новых товаров!`);
    console.log(`📊 Теперь в базе: ${newCount} товаров`);
    
    // Выводим список добавленных
    console.log('\n📦 Новые товары:');
    inserted.forEach((p: any, i: number) => {
      console.log(`   ${i + 1}. ${p.name} — ${p.price} ₽`);
    });
    
    console.log('\n✅ Готово!');
    process.exit(0);
    
  } catch (error: any) {
    console.error('❌ Ошибка:', error.message);
    console.error('Детали:', error);
    process.exit(1);
  } finally {
    // Закрываем соединение
    await sequelize.close();
  }
}

// Запуск
addProducts();