import { makeAutoObservable,} from 'mobx';

interface FavoriteItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  buyLink: string;
  addedAt: Date;
}

class FavoriteStore {
  items: FavoriteItem[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  addItem(product: any) {
    const exists = this.items.find(item => item.id === product.id);
    if (!exists) {
      this.items.push({
        ...product,
        addedAt: new Date(),
      });
      this.persistFavorites();
    }
  }

  removeItem(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    this.persistFavorites();
  }

  isFavorite(productId: number): boolean {
    return this.items.some(item => item.id === productId);
  }

  toggleFavorite(product: any) {
    if (this.isFavorite(product.id)) {
      this.removeItem(product.id);
    } else {
      this.addItem(product);
    }
  }

  get totalCount(): number {
    return this.items.length;
  }

  private persistFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.items));
  }

  private loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch (e) {
        console.error('Error loading favorites:', e);
        this.items = [];
      }
    }
  }
}

export const favoriteStore = new FavoriteStore();