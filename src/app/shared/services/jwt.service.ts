import { Injectable } from '@angular/core';
import { Principal } from '../models/principal';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor() {}

  saveTokens(accessToken: string, refreshToken?: string|null): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired(token);
  }

  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getPayload(): Principal | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const payloadB64 = token.split('.')[1];
    const payload = atob(payloadB64);
    return JSON.parse(payload) as Principal;  // Use the Principal interface
  }

  isTokenExpired(token: string): boolean {
    const payload = this.getPayload();
    return payload?.exp ? (Math.floor(Date.now() / 1000) >= payload.exp) : true;
  }

  getValidAccessToken(callback?: () => Promise<string | null>): string | null {
    const token = this.getAccessToken();

    if (!token || this.isTokenExpired(token)) {
      if (callback) {
        const payload = this.getPayload();
        if (payload?.exp) {
          const expiryTime = payload.exp * 1000;
          const currentTime = Date.now();
          const timeUntilExpiry = expiryTime - currentTime;
          const refreshTime = timeUntilExpiry > 0 ? timeUntilExpiry - 60000 : 0; // 1 minute before expiry

          // Set a timeout to call the callback before the token expires
          setTimeout(() => {
            callback().then(newToken => {
              if (newToken) {
                this.saveTokens(newToken, this.getRefreshToken());
              }
            });
          }, refreshTime);
        }
      }
      return null; // Return null if token is expired and no valid callback
    }

    return token; // Return the valid token
  }
}
