import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Set data in local storage
  set(key: string, data: any): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(data));
      resolve(true);
    });
  }
  // Get data from local storage
  get(key: string): Promise<any> {
    return new Promise((resolve) => {
      const data = localStorage.getItem(key);
      resolve(data ? JSON.parse(data) : null);
    });
  }

  // Remove a specific key from local storage
  remove(key: string): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.removeItem(key);
      resolve(true);
    });
  }

  // Clear all local storage (use with caution)
  clear(): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.clear();
      resolve(true);
    });
  }
}