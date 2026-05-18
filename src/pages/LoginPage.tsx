import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

export const LoginPage: React.FC = () => {
  const { login } = useAppState();
  const navigate = useNavigate();
  const [email, setEmail] = useState('administrador@digitalcor.co');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setIsLoading(true);

    // Simulate standard secure authorization delay
    setTimeout(() => {
      login();
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-md relative overflow-hidden antialiased">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 z-0 pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[440px] bg-surface-container-lowest border border-outline-variant shadow-xl rounded-xl p-lg md:p-xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Brand header */}
        <div className="flex flex-col items-center text-center mb-lg">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md mb-md">
            <span className="material-symbols-outlined font-bold text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              storefront
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-extrabold text-primary">DigitalCor</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Plataforma de digitalización de comercios
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          {error && (
            <div className="p-sm bg-error-container text-on-error-container rounded border border-error/20 text-body-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          {/* Email input */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface">Correo Electrónico</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                mail
              </span>
              <input
                type="email"
                placeholder="Ej. correo@negocio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline-variant"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-xs">
            <div className="flex justify-between items-center">
              <label className="font-label-md text-label-md text-on-surface">Contraseña</label>
              <a href="#" className="font-label-md text-[12px] text-primary hover:underline">
                ¿La olvidaste?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                lock
              </span>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline-variant"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-sm mt-xs">
            <input
              type="checkbox"
              id="remember"
              defaultChecked
              className="rounded text-primary border-outline-variant focus:ring-primary"
            />
            <label htmlFor="remember" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none">
              Recordar mi sesión
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded-lg flex items-center justify-center gap-sm transition-all duration-200 active:scale-95 shadow-sm mt-md font-semibold min-h-[46px] disabled:opacity-75"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-sm">
                <svg className="animate-spin h-5 w-5 text-on-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Iniciando Sesión...
              </span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">login</span>
                Ingresar al Sistema
              </>
            )}
          </button>
        </form>

        {/* Test Credentials Info Card */}
        <div className="mt-md p-md bg-surface-container rounded-lg border border-outline-variant/60">
          <p className="font-label-md text-label-md text-primary font-bold mb-xs flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px]">info</span>
            Credenciales de Prueba:
          </p>
          <div className="flex flex-col gap-xs font-body-sm text-[12px] text-on-surface-variant font-semibold">
            <p>Usuario: <span className="text-on-surface select-all">administrador@digitalcor.co</span></p>
            <p>Contraseña: <span className="text-on-surface select-all">admin123</span></p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-lg border-t border-outline-variant/60 pt-md">
          <button
            onClick={() => navigate('/')}
            className="font-label-md text-body-sm text-primary hover:text-primary-container transition-colors flex items-center justify-center gap-xs mx-auto"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver al inicio
          </button>
        </div>

      </div>
    </div>
  );
};
