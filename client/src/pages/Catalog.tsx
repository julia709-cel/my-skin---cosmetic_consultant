import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { productService, type Product } from '../services/productService';
import { Search, Filter, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Catalog = observer(() => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');

  const categories = ['all', 'cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen'];
  const skinTypes = ['all', 'oily', 'dry', 'normal', 'combination'];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, selectedSkinType, products]);

  const loadProducts = async () => {
    try {
      const result = await productService.getAll();
      setProducts(result.products);
      setFilteredProducts(result.products);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedSkinType !== 'all') {
      filtered = filtered.filter(p => p.skinType.includes(selectedSkinType));
    }

    setFilteredProducts(filtered);
  };

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      cleanser: 'Очищение',
      toner: 'Тонер',
      serum: 'Сыворотка',
      moisturizer: 'Увлажнение',
      sunscreen: 'SPF защита',
    };
    return names[category] || category;
  };

  const getSkinTypeLabel = (skinType: string) => {
    const labels: { [key: string]: string } = {
      oily: 'Жирная',
      dry: 'Сухая',
      normal: 'Нормальная',
      combination: 'Комбинированная',
    };
    return labels[skinType] || skinType;
  };

  return (
    <div className="catalog-page">
      <div className="catalog-container">
        {/* Header */}
        <div className="catalog-header fade-in">
          <h1 className="catalog-title">Каталог товаров</h1>
          <p className="catalog-subtitle">
            Найдите идеальные средства для вашей кожи
          </p>
        </div>

        {/* Filters */}
        <div className="filters-section fade-in">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">
                <Filter size={16} />
                Категория
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">Все категории</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{getCategoryName(cat)}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Тип кожи</label>
              <select
                value={selectedSkinType}
                onChange={(e) => setSelectedSkinType(e.target.value)}
                className="filter-select"
              >
                <option value="all">Все типы</option>
                {skinTypes.filter(s => s !== 'all').map(type => (
                  <option key={type} value={type}>{getSkinTypeLabel(type)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Count */}
        <div className="products-count">
          Найдено товаров: <strong>{filteredProducts.length}</strong>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <span>Загрузка товаров...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>Товары не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card slide-in">
                <div className="product-image">
                  <div className="image-placeholder">
                    <ShoppingBag size={48} />
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-category">
                    {getCategoryName(product.category)}
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-tags">
                    {product.skinType.slice(0, 2).map(type => (
                      <span key={type} className="tag tag-skin">
                        {getSkinTypeLabel(type)}
                      </span>
                    ))}
                  </div>

                  <div className="product-footer">
                    <div className="product-price">{product.price} ₽</div>
                    <button className="btn-cart-primary">
                      <ShoppingBag size={18} />
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="catalog-cta fade-in">
          <h2>Не уверены, что выбрать?</h2>
          <p>Пройдите квиз и получите персональные рекомендации</p>
          <button onClick={() => navigate('/quiz')} className="btn-gradient">
            Пройти квиз
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default Catalog;