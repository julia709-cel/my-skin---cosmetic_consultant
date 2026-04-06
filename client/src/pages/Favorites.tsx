import { observer } from 'mobx-react-lite';
import { favoriteStore } from '../stores/favoriteStore';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const Favorites = observer(() => {
  const handleRemove = (id: number) => {
    favoriteStore.removeItem(id);
  };

  if (favoriteStore.items.length === 0) {
    return (
      <div className="favorites-empty">
        <Heart size={64} className="empty-icon" />
        <h2>Ваше избранное пусто</h2>
        <p>Добавляйте понравившиеся товары из результатов подбора</p>
        <Link to="/quiz" className="btn-gradient">
          Пройти квиз
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <h1 className="page-title">
          <Heart className="heart-filled" size={32} />
          Избранное ({favoriteStore.totalCount})
        </h1>

        <div className="favorites-grid">
          {favoriteStore.items.map((item) => {
            const productImage = getProductImage(item.name, item.id);
            const productLink = getProductBuyLink(
              item.name,
              item.id,
              item.category
            );

            return (
              <div key={item.id} className="favorite-card">
                {/* Изображение товара */}
                <div className="favorite-image-wrapper">
                  <img
                    src={productImage}
                    alt={item.name}
                    className="favorite-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/images/product/default.jpg';
                    }}
                  />
                </div>

                <div className="favorite-info">
                  <h3 className="favorite-name">{item.name}</h3>
                  <p className="favorite-desc">{item.description}</p>

                  <div className="favorite-meta">
                    <span className="category">{item.category}</span>
                    <span className="price">{item.price} ₽</span>
                  </div>

                  <div className="favorite-actions">
                    {/* ✅ Кнопка "Купить" с правильной ссылкой */}
                    <a
                      href={productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-buy"
                    >
                      <ShoppingBag size={16} />
                      Купить
                    </a>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn-remove"
                    >
                      <Trash2 size={16} />
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Favorites;