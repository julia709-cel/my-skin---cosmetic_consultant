import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  Star,
  ShoppingBag,
  Heart,
} from 'lucide-react';
import { favoriteStore } from '../stores/favoriteStore';

// Тип для рекомендации с полными данными о товаре
interface ProductRecommendation {
  productId: number;
  score: number;
  reason: string;
  product?: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    buyLink: string;
  } | null;
}

interface QuizHistory {
  id: number;
  skinType: string;
  problems: string[];
  goal: string;
  recommendations: ProductRecommendation[];
  createdAt: string;
}

const QuizHistoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizHistory | null>(null);
  const [loading, setLoading] = useState(true);

  // ========== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ФОТО ТОВАРА ==========
  const getProductImage = (
    productName: string,
    productId: number
  ): string => {
    const imagesById: { [key: number]: string } = {
      1: '/images/product/CeraVe.jpg',
      2: '/images/product/effaclar.jpg',
      3: '/images/product/Avene_tolerance_control.jpg',
      4: '/images/product/gel_cerave.jpg',
      5: '/images/product/penka_la_rosh.jpg',
      6: '/images/product/mitselar_voda.jpg',
      7: '/images/product/sovorotka_the_ord.jpg',
      8: '/images/product/sivorotka_vishi.jpg',
      9: '/images/product/sivorotka_niaci.jpg',
      10: '/images/product/sivorot_s_vit.jpg',
      11: '/images/product/retinol.jpg',
      12: '/images/product/sanskrin.jpg',
      13: '/images/product/sans_garn.jpg',
      14: '/images/product/SA.jpg',
      15: '/images/product/term_voda.jpg',
      16: '/images/product/maska_garn.jpg',
      17: '/images/product/maska_notch.jpg',
      18: '/images/product/glaza.jpg',
      19: '/images/product/patch.jpg',
      20: '/images/product/gel_la_rosh.jpg',
      21: '/images/product/prish.jpg',
      22: '/images/product/crem_notch_cerave.jpg',
    };

    if (imagesById[productId]) {
      return imagesById[productId];
    }

    if (productName.includes('CeraVe'))
      return '/images/products/CeraVe.jpg';
    if (productName.includes('Сыворотка'))
      return '/images/products/serum.jpg';
    if (productName.includes('La Roche'))
      return '/images/products/lrp.jpg';
    if (productName.includes('Очищающее'))
      return '/images/products/cleanser2.jpg';
    if (productName.includes('Увлажняющий'))
      return '/images/products/moisturizer.jpg';
    if (productName.includes('Антивозрастной'))
      return '/images/products/anti-aging.jpg';
    if (productName.includes('Гиалуроновая'))
      return '/images/products/hyaluronic.jpg';
    if (productName.includes('Защитный'))
      return '/images/products/sunscreen.jpg';
    if (productName.includes('Vichy'))
      return '/images/products/vichy.jpg';
    if (productName.includes('Garnier'))
      return '/images/products/garnier.jpg';
    if (productName.includes('Avene'))
      return '/images/products/avene.jpg';

    return '/images/product/default.jpg';
  };

  // ========== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ССЫЛКИ НА ПОКУПКУ ==========
  const getProductBuyLink = (
    productName: string,
    productId: number,
    category: string
  ): string => {
    const linksById: { [key: number]: string } = {
      1: 'https://www.ozon.ru/product/cerave-foaming-cleanser',
      2: 'https://www.ozon.ru/product/la-roche-posay-effaclar',
      3: 'https://goldapple.ru/19000010892-tolerance-control',
      4: 'https://www.letu.ru/product/cerave-uvlazhnyayushchii-krem',
      5: 'https://apteka-april.ru/product/190550-lyarosh_micellyarnaya_penka',
      6: 'https://goldapple.ru/89270300021-sebium-h2o',
      7: 'https://www.ordinary-cosmetics.ru/niacinamide10zinc1',
      8: 'https://goldapple.ru/89312300001-mineral-89',
      9: 'https://www.ordinary-cosmetics.ru/niacinamide10zinc1',
      10: 'https://apteka.ru/product/la-roche-posay-vitamin-c12-serum',
      11: 'https://market.yandex.ru/card/the-ordinary-retinol-serum',
      12: 'https://goldapple.ru/19000275598-anthelios',
      13: 'https://apteka.ru/novosibirsk/product/garnier-ambre-solaire',
      14: 'https://www.ozon.ru/product/cerave-loson-dlya-gruboy-kozhi',
      15: 'https://goldapple.ru/89320100001-eau-thermale',
      16: 'https://www.letu.ru/product/garnier-tkanevaya-maska',
      17: 'https://www.wildberries.ru/catalog/306469709',
      18: 'https://apteka.ru/novosibirsk/product/la-roche-posay-redermic',
      19: 'https://randewoo.ru/product/petitfee-gidrogelevye-patchi',
      20: 'https://goldapple.ru/19000237056-effaclar',
      21: 'https://goldapple.ru/97560200023-acne-pimple-master-patch',
      22: 'https://www.ozon.ru/product/krem-dlya-litsa-nochnoy-cerave',
    };

    if (linksById[productId]) {
      return linksById[productId];
    }

    if (productName.includes('CeraVe'))
      return 'https://goldapple.ru/search?q=cerave';
    if (productName.includes('Сыворотка'))
      return 'https://goldapple.ru/catalog/syvorotki';

    const categoryLinks: { [key: string]: string } = {
      Moisturizer:
        'https://goldapple.ru/catalog/uvlazhnyayuschie-kremy',
      Serum: 'https://goldapple.ru/catalog/syvorotki',
      Cleanser: 'https://goldapple.ru/catalog/ochishchenie',
      Sunscreen: 'https://goldapple.ru/catalog/solncezashchita',
      Toner: 'https://goldapple.ru/catalog/tonery',
    };

    return categoryLinks[category] || 'https://goldapple.ru';
  };

  // ========== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ НАЗВАНИЯ ТОВАРА ПО ID ==========
  const getProductNameById = (productId: number): string => {
    const namesById: { [key: number]: string } = {
      1: 'CeraVe Foaming Cleanser',
      2: 'La Roche-Posay Effaclar',
      3: 'Avene Tolerance Control',
      4: 'CeraVe Hydrating Cleanser',
      5: 'La Roche-Posay Effaclar H',
      6: 'Bioderma Sébium H2O',
      7: 'The Ordinary Niacinamide 10% + Zinc 1%',
      8: 'Vichy Minéral 89',
      9: 'The Ordinary Niacinamide',
      10: 'La Roche-Posay Vitamin C12',
      11: 'The Ordinary Retinol 1%',
      12: 'La Roche-Posay Anthelios',
      13: 'Garnier Ambre Solaire SPF50',
      14: 'CeraVe SA Lotion',
      15: 'La Roche-Posay Eau Thermale',
      16: 'Garnier Tissue Mask',
      17: 'Notch Tissue Mask',
      18: 'La Roche-Posay Redermic R Eyes',
      19: 'Petitfee Hydrogel Eye Patch',
      20: 'La Roche-Posay Effaclar Gel',
      21: 'COSRX Acne Pimple Master Patch',
      22: 'CeraVe Skin Renewing Night Cream',
    };

    return namesById[productId] || `Товар #${productId}`;
  };

  // ========== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ЦЕНЫ ПО ID ==========
  const getProductPriceById = (productId: number): number => {
    const pricesById: { [key: number]: number } = {
      1: 1400,
      2: 1190,
      3: 2190,
      4: 1350,
      5: 1590,
      6: 890,
      7: 790,
      8: 1890,
      9: 790,
      10: 2490,
      11: 1590,
      12: 1290,
      13: 890,
      14: 1690,
      15: 690,
      16: 150,
      17: 120,
      18: 2390,
      19: 1890,
      20: 1190,
      21: 390,
      22: 1890,
    };

    return pricesById[productId] || 0;
  };

  // ========== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ КАТЕГОРИИ ПО ID ==========
  const getProductCategoryById = (productId: number): string => {
    const categoriesById: { [key: number]: string } = {
      1: 'Cleanser',
      2: 'Cleanser',
      3: 'Moisturizer',
      4: 'Cleanser',
      5: 'Cleanser',
      6: 'Toner',
      7: 'Serum',
      8: 'Serum',
      9: 'Serum',
      10: 'Serum',
      11: 'Serum',
      12: 'Sunscreen',
      13: 'Sunscreen',
      14: 'Moisturizer',
      15: 'Toner',
      16: 'Mask',
      17: 'Mask',
      18: 'Eye Care',
      19: 'Eye Care',
      20: 'Cleanser',
      21: 'Treatment',
      22: 'Moisturizer',
    };

    return categoriesById[productId] || 'Other';
  };

  // ========== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ОПИСАНИЯ ПО ID ==========
  const getProductDescriptionById = (productId: number): string => {
    const descriptionsById: { [key: number]: string } = {
      1: 'Очищающий гель для жирной кожи',
      2: 'Очищающий крем-гель для чувствительной кожи',
      3: 'Успокаивающий крем для очень чувствительной кожи',
      4: 'Увлажняющий очищающий гель',
      5: 'Восстанавливающий очищающий крем-гель',
      6: 'Мицеллярная вода для жирной кожи',
      7: 'Сыворотка с ниацинамидом и цинком',
      8: 'Укрепляющая сыворотка с гиалуроновой кислотой',
      9: 'Сыворотка для выравнивания тона',
      10: 'Антиоксидантная сыворотка с витамином C',
      11: 'Антивозрастная сыворотка с ретинолом',
      12: 'Солнцезащитный флюид SPF50+',
      13: 'Солнцезащитное молочко для лица и тела',
      14: 'Лосьон для грубой и неровной кожи',
      15: 'Термальная вода для чувствительной кожи',
      16: 'Тканевая маска увлажняющая',
      17: 'Тканевая маска восстанавливающая',
      18: 'Крем-гель для контура глаз с ретинолом',
      19: 'Гидрогелевые патчи для области вокруг глаз',
      20: 'Очищающий гель для жирной кожи',
      21: 'Патчи от прыщей',
      22: 'Ночной крем для обновления кожи',
    };

    return descriptionsById[productId] || 'Описание недоступно';
  };

  useEffect(() => {
    loadQuizDetails();
  }, [id]);

  const loadQuizDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:5000/api/quiz/history',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 Получены данные истории:', data);

      const foundQuiz = data.history.find(
        (q: QuizHistory) => q.id === Number(id)
      );

      if (!foundQuiz) {
        console.error('❌ Квиз не найден');
        setLoading(false);
        return;
      }

      console.log(
        `📋 Найдено ${foundQuiz.recommendations.length} рекомендаций`
      );

      // Создаём рекомендации с данными о товарах (без запроса к API)
      const recommendationsWithProducts = foundQuiz.recommendations.map(
        (rec: ProductRecommendation) => ({
          ...rec,
          product: {
            id: rec.productId,
            name: getProductNameById(rec.productId),
            description: getProductDescriptionById(rec.productId),
            price: getProductPriceById(rec.productId),
            category: getProductCategoryById(rec.productId),
            imageUrl: '',
            buyLink: getProductBuyLink(
              getProductNameById(rec.productId),
              rec.productId,
              getProductCategoryById(rec.productId)
            ),
          },
        })
      );

      // Сортируем по score (от большего к меньшему)
      const sortedRecommendations = recommendationsWithProducts.sort(
        (a: ProductRecommendation, b: ProductRecommendation) => b.score - a.score
      );

      setQuiz({
        ...foundQuiz,
        recommendations: sortedRecommendations,
      });

      console.log(
        `✅ Загружено ${sortedRecommendations.length} товаров`
      );
    } catch (error) {
      console.error('❌ Failed to load quiz details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSkinTypeName = (skinType: string) => {
    const names: { [key: string]: string } = {
      oily: 'Жирная',
      dry: 'Сухая',
      normal: 'Нормальная',
      combination: 'Комбинированная',
    };
    return names[skinType] || skinType;
  };

  const getGoalName = (goal: string) => {
    const names: { [key: string]: string } = {
      hydration: 'Увлажнение',
      'anti-aging': 'Омоложение',
      cleansing: 'Очищение',
      protection: 'Защита',
    };
    return names[goal] || goal;
  };

  const getProblemName = (problem: string) => {
    const names: { [key: string]: string } = {
      acne: 'Акне',
      wrinkles: 'Морщины',
      dryness: 'Сухость',
      pigmentation: 'Пигментация',
      sensitivity: 'Чувствительность',
    };
    return names[problem] || problem;
  };

  if (loading) {
    return (
      <div className="quiz-detail-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <span>Загрузка...</span>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="quiz-detail-page">
        <div className="error-state">
          <h2>Квиз не найден</h2>
          <button
            onClick={() => navigate('/profile')}
            className="btn-secondary"
          >
            <ArrowLeft size={18} />
            Назад к профилю
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-detail-page">
      <div className="quiz-detail-container">
        {/* Header */}
        <button
          onClick={() => navigate('/profile')}
          className="btn-back-nav"
        >
          <ArrowLeft size={20} />
          Назад к истории
        </button>

        <div className="detail-header fade-in">
          <div className="detail-icon">
            <Sparkles size={48} />
          </div>
          <h1 className="detail-title">Результаты квиза</h1>
          <div className="detail-date">
            <Calendar size={16} />
            {formatDate(quiz.createdAt)}
          </div>
        </div>

        {/* Quiz Info Cards */}
        <div className="quiz-info-grid fade-in">
          <div className="info-card">
            <div className="info-label">Тип кожи</div>
            <div className="info-value">
              {getSkinTypeName(quiz.skinType)}
            </div>
          </div>
          <div className="info-card">
            <div className="info-label">Проблемы</div>
            <div className="info-value">
              {quiz.problems.map((p) => getProblemName(p)).join(', ') ||
                'Нет'}
            </div>
          </div>
          <div className="info-card">
            <div className="info-label">Цель</div>
            <div className="info-value">{getGoalName(quiz.goal)}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Товаров</div>
            <div className="info-value">
              {quiz.recommendations.length}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="recommendations-section fade-in">
          <h2 className="section-title-with-icon">
            <Star size={24} />
            Рекомендованные товары
          </h2>

          {quiz.recommendations.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#999',
              }}
            >
              <p>Товары не найдены</p>
              <p
                style={{
                  fontSize: '14px',
                  marginTop: '1rem',
                }}
              >
                Проверьте консоль на наличие ошибок
              </p>
            </div>
          ) : (
            <div className="detail-recommendations-list">
              {quiz.recommendations.map((rec, index) => {
                const product = rec.product;
                const productName =
                  product?.name || `Товар #${rec.productId}`;
                const productImage = product
                  ? getProductImage(product.name, product.id)
                  : '/images/product/default.jpg';
                const productLink = product
                  ? getProductBuyLink(
                      product.name,
                      product.id,
                      product.category
                    )
                  : '#';
                const isFavorite = product
                  ? favoriteStore.isFavorite(product.id)
                  : false;

                return (
                  <div
                    key={rec.productId}
                    className="detail-product-card slide-in"
                  >
                    <div className="product-rank">#{index + 1}</div>
                    <div className="product-content">
                      {/* Изображение + кнопка избранного */}
                      <div className="product-image-wrapper">
                        <img
                          src={productImage}
                          alt={productName}
                          className="product-image"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              '/images/product/default.jpg';
                          }}
                        />

                        {/* ❤️ Кнопка избранного */}
                        {product && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              favoriteStore.toggleFavorite(product);
                            }}
                            className={`btn-favorite ${
                              isFavorite ? 'active' : ''
                            }`}
                            title={
                              isFavorite
                                ? 'Удалить из избранного'
                                : 'Добавить в избранное'
                            }
                          >
                            <Heart
                              size={20}
                              fill={
                                isFavorite ? 'currentColor' : 'none'
                              }
                            />
                          </button>
                        )}
                      </div>

                      <div className="product-header">
                        <h3 className="product-name">{productName}</h3>
                        <div className="product-score">
                          <Star size={16} fill="#FFC0CB" color="#FFC0CB" />
                          <span>{rec.score} баллов</span>
                        </div>
                      </div>

                      {product?.description && (
                        <p className="product-desc">
                          {product.description}
                        </p>
                      )}

                      {product && (
                        <div className="product-meta">
                          <span className="product-category">
                            {product.category}
                          </span>
                          <span className="product-price">
                            {product.price} ₽
                          </span>
                        </div>
                      )}

                      <div className="product-reason">
                        <Sparkles size={14} />
                        <span>{rec.reason}</span>
                      </div>

                      {/* Кнопка купить */}
                      {product && (
                        <a
                          href={productLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-buy"
                        >
                          <ShoppingBag size={18} />
                          <span>Купить</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="detail-actions">
          <button
            onClick={() => navigate('/quiz')}
            className="btn-gradient"
          >
            Пройти квиз ещё раз
            <Sparkles size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizHistoryDetail;