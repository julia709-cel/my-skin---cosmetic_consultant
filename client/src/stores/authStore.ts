import { makeAutoObservable, runInAction } from 'mobx';
import { authService } from '../services/authService';

class AuthStore {
  user: {
    id: number;
    email: string;
    name: string;
  } | null = null;

  isAuthenticated = false;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  async checkAuth() {
    if (!authService.isAuthenticated()) {
      return;
    }

    try {
      const data = await authService.getMe();
      runInAction(() => {
        this.user = data.user;
        this.isAuthenticated = true;
      });
    } catch (error) {
      runInAction(() => {
        this.user = null;
        this.isAuthenticated = false;
        authService.logout();
      });
    }
  }

  async login(email: string, password: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await authService.login({ email, password });
      runInAction(() => {
        this.user = data.user;
        this.isAuthenticated = true;
        authService.setToken(data.token);
      });
      return true;
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.error || 'Ошибка входа';
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async register(email: string, password: string, name?: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await authService.register({ email, password, name });
      runInAction(() => {
        this.user = data.user;
        this.isAuthenticated = true;
        authService.setToken(data.token);
      });
      return true;
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.error || 'Ошибка регистрации';
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  logout() {
    authService.logout();
    runInAction(() => {
      this.user = null;
      this.isAuthenticated = false;
    });
  }
}

export const authStore = new AuthStore();