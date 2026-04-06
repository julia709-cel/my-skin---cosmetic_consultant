import { observer } from 'mobx-react-lite';
import { quizStore } from '../stores/quizStore';
import { authStore } from '../stores/authStore';
import { favoriteStore } from '../stores/favoriteStore';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  RefreshCw,
  ShoppingBag,
  Star,
  Heart,
} from 'lucide-react';

const Quiz = observer(() => {
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

    return '/images/product-default.jpg';
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
      3: 'https://goldapple.ru/19000010892-tolerance-control?utm_source=yandex&utm_medium=cpc&utm_campaign=ru_cpc_ga_ya_search_lowm&utm_content=707941949_5728542472_1904161020398695450&utm_term=&etext=2202.mxPbxcsQLYtO2L1EFsRGlc19FuvVOTCaDiRNjpm06rhTtvoz6FIwUS6IfHd04S_4IKxI68hxr4k0x1z-l4I4wGZ1cWpkZGFmdWNoeGJzcms.b6cfbd310a71dc9529f7d28403cdac8b2a6557e9&yclid=13905881447207272447',
      4: 'https://www.letu.ru/product/cerave-uvlazhnyayushchii-krem-dlya-ochen-suhoi-kozhi-moisturizing-cream-dry-to-very-dry-skin/152201803/sku/167604999',
      5: 'https://apteka-april.ru/product/190550-lyarosh_micellyarnaya_penka_ochishchayushchaya_150ml?ysclid=mnniiztntk743840126',
      6: 'https://goldapple.ru/89270300021-sebium-h2o?admitad_uid=216f85673668de3260623d82720996ef&utm_source=admitad&utm_medium=cpa&utm_campaign=2101843',
      7: 'https://www.ordinary-cosmetics.ru/niacinamide10zinc1?ysclid=mmurza17qr859267387',
      8: 'https://goldapple.ru/89312300001-mineral-89?admitad_uid=131be36ea8af42e84f15e3ccb64f3657&utm_source=admitad&utm_medium=cpa&utm_campaign=2101843',
      9: 'https://www.ordinary-cosmetics.ru/niacinamide10zinc1?ysclid=mmurza17qr859267387',
      10: 'https://apteka.ru/product/la-roche-posay-vitamin-c12-serum-antioksidantnaya-syvorotka-dlya-obnovleniya-kozhi-30-ml-68fb6589fc076f42782fef3d/?ysclid=mmus1fcykt891016046',
      11: 'https://market.yandex.ru/card/the-ordinary-retinol-serum-1-in-squalane-antivozrastnaya-syvorotka-dlya-litsa-s-retinolom-1-i-skvalanom-30-ml/103201196255?do-waremd5=VPbG2WMm7vI0lRvBANXrpg&clid=1651&ysclid=mmus36ollt200311533&ogV=-12',
      12: 'https://goldapple.ru/19000275598-anthelios?admitad_uid=67f5956b02c9b9bab89f4959ee8bf7b8&utm_source=admitad&utm_medium=cpa&utm_campaign=2101843',
      13: 'https://apteka.ru/novosibirsk/product/garnier-ambre-solaire-molochko-solnczezashhitnoe-dlya-licza-i-tela-spf50-50-ml-67d7cb6c63406d6d01c0af81/?ysclid=mmuscoj21w1145828',
      14: 'https://www.ozon.ru/product/cerave-loson-dlya-gruboy-i-nerovnoy-kozhi-cerave-lotion-for-rough-bumpy-skin-237ml-1273739540/',
      15: 'https://goldapple.ru/89320100001-eau-thermale?admitad_uid=2aed931c9c1a9cc8656a9ef39e52649b&utm_source=admitad&utm_medium=cpa&utm_campaign=2101843',
      16: 'https://www.letu.ru/product/garnier-tkanevaya-maska-dlya-litsa-uvlazhnenie-akva-bomba-c-gialuronovoi-p-anisovoi-kislotami-ekstraktom-granata-super-uvlazhnyayushchaya-i-toniziruyushchaya-dlya-vseh-tipov-kozhi/45500089/sku/59800077?yadiscount=eyJhIjoxMDAwLCJkcCI6MSwibHQiOjEyMCwicCI6NSwidCI6MSwidHMiOjE3NzM3NjI3MTF9&ysclid=mmusiy72t286625924',
      17: 'https://www.wildberries.ru/catalog/306469709/detail.aspx?utm_source=yandex&utm_medium=feed&utm_campaign=feed',
      18: 'https://apteka.ru/novosibirsk/product/la-roche-posay-redermic-retinol-krem-gel-dlya-kontura-glaz-intensivnyj-konczentrirovannyj-15-ml-5e3271cfca7bdc00019316bb/?ysclid=mmusnp5e9p168280991',
      19: 'https://randewoo.ru/product/petitfee-gidrogelevye-patchi-dlya-oblasti-vokrug-glaz-black-pearl-gold-hydrogel-eye-patch?ysclid=mmusq8mfoo684862930',
      20: 'https://goldapple.ru/19000237056-effaclar?admitad_uid=7120d3693abe860f6b305e6032988acb&utm_source=admitad&utm_medium=cpa&utm_campaign=2101843',
      21: 'https://goldapple.ru/97560200023-acne-pimple-master-patch?ysclid=mmustxwdyn792893076',
      22: 'https://www.ozon.ru/product/krem-dlya-litsa-nochnoy-cerave-skin-renewing-night-cream-48g-1556320235/?at=28t0G03JJu6nENZMIlQxmZ9hOJqEYTE8Q7Lf520pBB',
    };

    if (linksById[productId]) return linksById[productId];

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

  // ========== ПРОВЕРКА АВТОРИЗАЦИИ ==========
  if (!authStore.isAuthenticated) {
    return (
      <div className="quiz-container">
        <div className="quiz-content">
          <div className="auth-required">
            <h2>Требуется авторизация</h2>
            <p>
              Пожалуйста, войдите в аккаунт или зарегистрируйтесь,
              чтобы пройти квиз
            </p>
            <div className="auth-buttons">
              <a href="/login" className="btn-gradient">
                Войти
              </a>
              <a href="/register" className="btn-secondary">
                Регистрация
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== ДАННЫЕ ДЛЯ АНКЕТЫ ==========
  const skinTypes = [
    { value: 'oily', label: 'Жирная', description: 'Блеск, расширенные поры' },
    { value: 'dry', label: 'Сухая', description: 'Шелушения, стянутость' },
    { value: 'normal', label: 'Нормальная', description: 'Без проблем' },
    {
      value: 'combination',
      label: 'Комбинированная',
      description: 'Жирная Т-зона',
    },
  ];

  const problems = [
    { value: 'acne', label: 'Акне/Высыпания' },
    { value: 'wrinkles', label: 'Морщины' },
    { value: 'dryness', label: 'Сухость' },
    { value: 'pigmentation', label: 'Пигментация' },
    { value: 'sensitivity', label: 'Чувствительность' },
  ];

  const goals = [
    { value: 'hydration', label: 'Увлажнение' },
    { value: 'anti-aging', label: 'Омоложение' },
    { value: 'cleansing', label: 'Очищение' },
    { value: 'protection', label: 'Защита' },
  ];

  // ========== ШАГ 1: ТИП КОЖИ ==========
  const renderStep1 = () => (
    <div className="quiz-step fade-in">
      <div className="step-header">
        <span className="step-number">1</span>
        <h2 className="step-title">Какой у вас тип кожи?</h2>
        <p className="step-subtitle">Выберите один вариант</p>
      </div>
      <div className="options-grid">
        {skinTypes.map((type) => (
          <button
            key={type.value}
            onClick={() =>
              quizStore.setSkinType(
                type.value as 'oily' | 'dry' | 'normal' | 'combination'
              )
            }
            className={`option-card ${
              quizStore.answers.skinType === type.value ? 'selected' : ''
            }`}
          >
            <div className="option-title">{type.label}</div>
            <div className="option-desc">{type.description}</div>
            {quizStore.answers.skinType === type.value && (
              <div className="checkmark">
                <Check size={20} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  // ========== ШАГ 2: ПРОБЛЕМЫ ==========
  const renderStep2 = () => (
    <div className="quiz-step fade-in">
      <div className="step-header">
        <span className="step-number">2</span>
        <h2 className="step-title">Какие проблемы вас беспокоят?</h2>
        <p className="step-subtitle">
          Выберите все подходящие варианты
        </p>
      </div>
      <div className="options-grid">
        {problems.map((problem) => {
          const isSelected = quizStore.answers.problems.includes(
            problem.value
          );
          return (
            <button
              key={problem.value}
              onClick={() => quizStore.toggleProblem(problem.value)}
              className={`option-card ${
                isSelected ? 'selected' : ''
              }`}
            >
              <div className="option-title">{problem.label}</div>
              {isSelected && (
                <div className="checkmark">
                  <Check size={20} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  // ========== ШАГ 3: ЦЕЛЬ ==========
  const renderStep3 = () => (
    <div className="quiz-step fade-in">
      <div className="step-header">
        <span className="step-number">3</span>
        <h2 className="step-title">Какова ваша главная цель?</h2>
        <p className="step-subtitle">Выберите один вариант</p>
      </div>
      <div className="options-grid">
        {goals.map((goal) => (
          <button
            key={goal.value}
            onClick={() =>
              quizStore.setGoal(
                goal.value as
                  | 'hydration'
                  | 'anti-aging'
                  | 'cleansing'
                  | 'protection'
              )
            }
            className={`option-card ${
              quizStore.answers.goal === goal.value ? 'selected' : ''
            }`}
          >
            <div className="option-title">{goal.label}</div>
            {quizStore.answers.goal === goal.value && (
              <div className="checkmark">
                <Check size={20} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  // ========== РЕЗУЛЬТАТЫ ПОДБОРА ==========
  const renderResults = () => (
    <div className="quiz-results fade-in">
      <div className="results-header">
        <div className="results-icon">
          <Sparkles size={48} />
        </div>
        <h2 className="results-title">
          Ваша персональная рутина готова!
        </h2>
        <p className="results-subtitle">
          Мы подобрали {quizStore.recommendations.length} товаров
          специально для вас
        </p>
      </div>

      <div className="recommendations-list">
        {quizStore.recommendations.map((rec, index) => {
          const productImage = getProductImage(
            rec.product.name,
            rec.product.id
          );
          const productLink = getProductBuyLink(
            rec.product.name,
            rec.product.id,
            rec.product.category
          );
          const isFavorite = favoriteStore.isFavorite(rec.product.id);

          return (
            <div
              key={rec.product.id}
              className="product-card slide-in"
            >
              <div className="product-rank">#{index + 1}</div>
              <div className="product-content">
                {/* Изображение + кнопка избранного */}
                <div className="product-image-wrapper">
                  <img
                    src={productImage}
                    alt={rec.product.name}
                    className="product-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/images/product-default.jpg';
                    }}
                  />

                  {/* ❤️ Кнопка избранного */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      favoriteStore.toggleFavorite(rec.product);
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
                      fill={isFavorite ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                {/* Информация о товаре */}
                <div className="product-header">
                  <h3 className="product-name">{rec.product.name}</h3>
                  <div className="product-score">
                    <Star size={16} fill="#FFC0CB" color="#FFC0CB" />
                    <span>{rec.score}%</span>
                  </div>
                </div>

                <p className="product-desc">
                  {rec.product.description}
                </p>

                <div className="product-meta">
                  <span className="product-category">
                    {rec.product.category}
                  </span>
                  <span className="product-price">
                    {rec.product.price} ₽
                  </span>
                </div>

                <div className="product-reason">
                  <Sparkles size={14} />
                  <span>{rec.reason}</span>
                </div>

                {/* Кнопка купить */}
                <a
                  href={productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-buy"
                >
                  <ShoppingBag size={18} />
                  <span>Купить</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Кнопка "Пройти ещё раз" по центру */}
      <div className="results-actions">
        <button
          onClick={() => quizStore.reset()}
          className="btn-secondary"
        >
          <RefreshCw size={18} />
          Пройти ещё раз
        </button>
      </div>
    </div>
  );

  // ========== ОТПРАВКА АНКЕТЫ ==========
  const handleSubmit = async () => {
    await quizStore.submitQuiz();
  };

  // ========== ОСНОВНОЙ РЕНДЕР ==========
  return (
    <div className="quiz-container">
      <div className="quiz-content">
        {!quizStore.isComplete ? (
          <>
            {/* Индикатор прогресса */}
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(quizStore.currentStep / 3) * 100}%`,
                  }}
                />
              </div>
              <div className="progress-text">
                Шаг {quizStore.currentStep} из 3
              </div>
            </div>

            {/* Шаги квиза */}
            {quizStore.currentStep === 1 && renderStep1()}
            {quizStore.currentStep === 2 && renderStep2()}
            {quizStore.currentStep === 3 && renderStep3()}

            {/* Навигация */}
            <div className="quiz-navigation">
              {quizStore.currentStep > 1 && (
                <button
                  onClick={() => quizStore.prevStep()}
                  className="btn-back"
                >
                  <ArrowLeft size={18} />
                  Назад
                </button>
              )}

              {quizStore.currentStep < 3 ? (
                <button
                  onClick={() => quizStore.nextStep()}
                  className="btn-gradient"
                  disabled={!quizStore.answers.skinType}
                >
                  Далее
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={
                    quizStore.isLoading ||
                    quizStore.answers.problems.length === 0
                  }
                  className="btn-gradient"
                >
                  {quizStore.isLoading ? (
                    <>
                      <RefreshCw size={18} className="spin" />
                      Подбираем...
                    </>
                  ) : (
                    <>
                      Получить рекомендации
                      <Sparkles size={18} />
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        ) : (
          renderResults()
        )}

        {quizStore.error && (
          <div className="error-message">{quizStore.error}</div>
        )}
      </div>
    </div>
  );
});

export default Quiz;