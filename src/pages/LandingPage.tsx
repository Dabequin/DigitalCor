import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
      {/* TopAppBar */}
      <header className="bg-surface border-b border-outline-variant shadow-sm sticky top-0 z-40 flex justify-between items-center w-full px-lg py-sm">
        <div className="flex items-center gap-md">
          <span className="font-headline-md text-headline-md font-bold text-primary">DigitalCor</span>
        </div>
        <nav className="hidden md:flex items-center gap-lg">
          <a
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="#features"
          >
            Características
          </a>
          <a
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="#pricing"
          >
            Precios
          </a>
        </nav>
        <div className="flex items-center gap-md">
          <button
            onClick={handleStart}
            className="hidden md:inline-flex items-center justify-center font-label-md text-label-md px-lg py-sm rounded-full text-primary hover:bg-surface-container transition-colors duration-200"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={handleStart}
            className="inline-flex items-center justify-center font-label-md text-label-md px-lg py-sm rounded-full bg-primary text-on-primary hover:bg-primary-container transition-colors duration-200 font-semibold"
          >
            Empieza gratis
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-xl pb-[120px] px-md md:px-xl overflow-hidden">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <div className="z-10 flex flex-col gap-lg">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-semibold">
                Confianza y Crecimiento
              </span>
              <h1 className="font-headline-xl text-headline-xl text-on-background leading-tight">
                Digitaliza tu negocio en Córdoba
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                Herramientas digitales a tu alcance por solo $25.000 COP al mes. Gestiona ventas, inventario y clientes de forma fácil y segura.
              </p>
              <div className="flex flex-wrap gap-md mt-sm">
                <button
                  onClick={handleStart}
                  className="inline-flex items-center justify-center font-label-md text-label-md h-[44px] px-lg rounded-full bg-primary text-on-primary hover:bg-primary-container transition-colors duration-200 shadow-sm font-semibold"
                >
                  Empieza gratis
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center font-label-md text-label-md h-[44px] px-lg rounded-full border border-outline text-primary hover:bg-surface-container transition-colors duration-200 font-semibold"
                >
                  <span className="material-symbols-outlined mr-sm text-[20px]">play_circle</span>
                  Ver demo
                </a>
              </div>
            </div>
            <div className="relative z-10 w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-outline-variant bg-surface-container-low card-hover-effect">
              <img
                alt="Dueño de negocio usando herramientas digitales"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz0TeRhfy06Qh3PmvU-EUnzLRGOEat7a7xRBE6FmD8yUoCkAj35uP6x1HMMHrlxDvd9UluCufC_IvU_ArJ79kPD0zkKls8bxOX2RTN0zT2K9x5yyFDxaxLkTmIqxqCOUW2Zz4jyVuSjpZj9dIgT5WiDCnlGS9aWRVFy9ewlCGvA4dtPemBDSpVkBtMaY07wIAZhcnEQ0tMAkqjv7kzRmw4RIlLXsfBxz0GKzoUg_6QSPnM95F693wBqbUVEjSr8G3wPuTa4beRO0M"
              />
            </div>
          </div>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 z-0 pointer-events-none"></div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-xl px-md md:px-xl bg-surface-container-low" id="features">
          <div className="max-w-container-max mx-auto flex flex-col gap-xl">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">
                Todo lo que necesitas para crecer
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Un sistema completo diseñado específicamente para las necesidades del comercio local.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              
              {/* Feature 1 */}
              <div className="bg-surface p-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex flex-col gap-md md:col-span-2 card-hover-effect">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    point_of_sale
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background font-semibold">Punto de Venta Ágil</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-1">
                  Registra tus ventas en segundos. Una interfaz limpia y rápida que no te hará perder el tiempo frente al cliente.
                </p>
                <div className="mt-auto h-40 bg-surface-container rounded-lg border border-outline-variant overflow-hidden flex items-center justify-center">
                  <img
                    alt="Interfaz de punto de venta"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3tdbi2p6dBO6h1heqKnnCSBO8O8twMGfJeUQiPuGG3osOlSSdJh39hkfsi_Ucvc3WaQa2oZ1f2B0YB9npZOXpS6nr8iKYQOF06BDDzh4t6YTjBZks45tmJYTDDUYpsDrOWzqTEMQC4wTfilRgpNB7QqmGObwg8gepPT3ugT3uZ1iwVdHaSW8K-WgegvzvkUjGJOo09dV5MJBmKjPKJBd4G4Pzy1lsaHRhJjyHarLCGdZjiIVIJzyxJa7_ambn9J57u4qEEU1cBro"
                  />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-surface p-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex flex-col gap-md card-hover-effect">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    inventory_2
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background font-semibold">Control de Inventario</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Sabe exactamente qué tienes y qué falta. Alertas automáticas cuando el stock es bajo para que nunca detengas tus ventas.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-surface p-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex flex-col gap-md card-hover-effect">
                <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    group
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background font-semibold">Gestión de Clientes</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Conoce a tus mejores clientes, historial de compras, saldos pendientes y ofrece un servicio personalizado de confianza.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-surface p-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex flex-col gap-md md:col-span-2 card-hover-effect">
                <div className="w-12 h-12 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    receipt_long
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background font-semibold">Facturación Simplificada</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Genera facturas claras y profesionales en un clic. Mantén tus finanzas y reportes de caja organizados sin ninguna complicación contable.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-xl px-md md:px-xl" id="pricing">
          <div className="max-w-container-max mx-auto flex flex-col gap-xl">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Planes transparentes</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Elige el plan que mejor se adapte al tamaño de tu negocio.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg max-w-5xl mx-auto w-full pt-lg">
              
              {/* Basic Plan */}
              <div className="bg-surface p-lg rounded-xl border border-outline-variant flex flex-col gap-md card-hover-effect">
                <h3 className="font-headline-md text-headline-md text-on-background font-semibold">Básico</h3>
                <div className="flex items-baseline gap-xs">
                  <span className="font-headline-xl text-headline-xl text-primary font-bold">$25.000</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">COP / mes</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant border-b border-outline-variant pb-md">
                  Ideal para empezar a digitalizar.
                </p>
                <ul className="flex flex-col gap-sm py-md flex-1">
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-background">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                    1 Usuario
                  </li>
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-background">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                    Punto de Venta
                  </li>
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-background">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                    Inventario Básico
                  </li>
                </ul>
                <button
                  onClick={handleStart}
                  className="w-full inline-flex items-center justify-center font-label-md text-label-md h-[44px] rounded-full border border-primary text-primary hover:bg-surface-container transition-colors duration-200 mt-auto font-semibold"
                >
                  Elegir Básico
                </button>
              </div>

              {/* Pro Plan (Highlighted) */}
              <div className="bg-primary p-lg rounded-xl border border-primary shadow-lg flex flex-col gap-md relative transform md:-translate-y-4 hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-on-secondary font-label-md text-[12px] px-md py-xs rounded-full uppercase tracking-wider font-bold">
                  Recomendado
                </div>
                <h3 className="font-headline-md text-headline-md text-on-primary font-semibold">Pro</h3>
                <div className="flex items-baseline gap-xs">
                  <span className="font-headline-xl text-headline-xl text-on-primary font-bold">$45.000</span>
                  <span className="font-body-sm text-body-sm text-primary-fixed-dim">COP / mes</span>
                </div>
                <p className="font-body-sm text-body-sm text-primary-fixed-dim border-b border-primary-container pb-md">
                  Para negocios en crecimiento.
                </p>
                <ul className="flex flex-col gap-sm py-md flex-1">
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-primary">
                    <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                    3 Usuarios
                  </li>
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-primary">
                    <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                    Todo lo Básico +
                  </li>
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-primary">
                    <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                    Gestión de Clientes
                  </li>
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-primary">
                    <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                    Reportes Avanzados
                  </li>
                </ul>
                <button
                  onClick={handleStart}
                  className="w-full inline-flex items-center justify-center font-label-md text-label-md h-[44px] rounded-full bg-on-primary text-primary hover:bg-surface-container transition-colors duration-200 mt-auto shadow-sm font-bold"
                >
                  Empezar con Pro
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-surface p-lg rounded-xl border border-outline-variant flex flex-col gap-md card-hover-effect">
                <h3 className="font-headline-md text-headline-md text-on-background font-semibold">Empresarial</h3>
                <div className="flex items-baseline gap-xs">
                  <span className="font-headline-xl text-headline-xl text-primary font-bold">$85.000</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">COP / mes</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant border-b border-outline-variant pb-md">
                  Solución completa sin límites.
                </p>
                <ul className="flex flex-col gap-sm py-md flex-1">
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-background">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                    Usuarios Ilimitados
                  </li>
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-background">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                    Multitienda
                  </li>
                  <li className="flex items-center gap-sm font-body-sm text-body-sm text-on-background">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                    Soporte Prioritario 24/7
                  </li>
                </ul>
                <button
                  onClick={handleStart}
                  className="w-full inline-flex items-center justify-center font-label-md text-label-md h-[44px] rounded-full border border-primary text-primary hover:bg-surface-container transition-colors duration-200 mt-auto font-semibold"
                >
                  Contactar Ventas
                </button>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant py-xl px-md md:px-xl mt-auto">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex items-center gap-sm">
            <span className="font-headline-md text-headline-md font-bold text-primary">DigitalCor</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-left">
            © 2026 DigitalCor. Construyendo el futuro del comercio local en Córdoba.
          </p>
        </div>
      </footer>
    </div>
  );
};
