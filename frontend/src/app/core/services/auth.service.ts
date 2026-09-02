import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

interface MeResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface JwtPayload {
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly apiUrl =
    'http://localhost:3000/api/auth';

  private expirationTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.initializeSession();
  }

  login(
    email: string,
    password: string
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    ).pipe(

      tap(response => {

        localStorage.setItem(
          'control-gastos-token',
          response.token
        );

        localStorage.setItem(
          'control-gastos-user',
          JSON.stringify(response.user)
        );

        this.startExpirationTimer(
          response.token
        );

      })

    );
  }

  register(
    name: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      {
        name,
        email,
        password
      }
    );
  }

  me(): Observable<MeResponse> {

    return this.http.get<MeResponse>(
      `${this.apiUrl}/me`
    );
  }

  getToken(): string | null {

    return localStorage.getItem(
      'control-gastos-token'
    );
  }

  getUser(): {
    id: number;
    name: string;
    email: string;
  } | null {

    const user = localStorage.getItem(
      'control-gastos-user'
    );

    if (!user) {
      return null;
    }

    try {

      return JSON.parse(user);

    } catch {

      return null;

    }
  }

  isAuthenticated(): boolean {

    const token = this.getToken();

    if (!token) {
      return false;
    }

    const payload = this.decodeToken(token);

    if (!payload?.exp) {

      this.logout(false);

      return false;

    }

    const expirationTime =
      payload.exp * 1000;

    if (
      Date.now() >= expirationTime
    ) {

      this.logout(true);

      return false;

    }

    return true;
  }

  logout(
    expired: boolean = false
  ): void {

    this.clearExpirationTimer();

    localStorage.removeItem(
      'control-gastos-token'
    );

    localStorage.removeItem(
      'control-gastos-user'
    );

    if (expired) {

      localStorage.setItem(
        'control-gastos-session-expired',
        'Su sesión ha expirado. Por seguridad, debe iniciar sesión nuevamente.'
      );

    }

    this.router.navigate(['/login']);

  }

  private initializeSession(): void {

    const token = this.getToken();

    if (!token) {
      return;
    }

    const payload = this.decodeToken(token);

    if (!payload?.exp) {

      this.logout(false);

      return;

    }

    const expirationTime =
      payload.exp * 1000;

    const remainingTime =
      expirationTime - Date.now();

    if (remainingTime <= 0) {

      this.logout(true);

      return;

    }

    this.startExpirationTimer(token);

  }

  private startExpirationTimer(
    token: string
  ): void {

    this.clearExpirationTimer();

    const payload =
      this.decodeToken(token);

    if (!payload?.exp) {
      return;
    }

    const expirationTime =
      payload.exp * 1000;

    const remainingTime =
      expirationTime - Date.now();

    if (remainingTime <= 0) {

      this.logout(true);

      return;

    }

    this.expirationTimer =
      setTimeout(() => {

        this.logout(true);

      }, remainingTime);

  }

  private clearExpirationTimer(): void {

    if (this.expirationTimer !== null) {

      clearTimeout(
        this.expirationTimer
      );

      this.expirationTimer = null;

    }

  }

  private decodeToken(
    token: string
  ): JwtPayload | null {

    try {

      const parts =
        token.split('.');

      if (parts.length !== 3) {
        return null;
      }

      const payload =
        JSON.parse(
          atob(
            parts[1]
              .replace(/-/g, '+')
              .replace(/_/g, '/')
          )
        );

      return payload;

    } catch {

      return null;

    }

  }

}