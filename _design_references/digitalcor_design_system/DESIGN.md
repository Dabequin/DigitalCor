---
name: DigitalCor Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444653'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#611e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#872d00'
  on-tertiary-container: '#ffa583'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#802a00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered to empower microenterprises in Córdoba, Colombia, bridging the gap between local traditional commerce and digital efficiency. The aesthetic is **Corporate Modern**: a blend of institutional stability and startup agility. 

The visual narrative focuses on "Confianza y Crecimiento" (Trust and Growth). We achieve this through a clean, high-contrast interface that prioritizes functional clarity over decorative flair. Generous whitespace is used to reduce cognitive load for users who may be transitioning to digital management tools for the first time. The interface feels established yet welcoming, mirroring the professional aspirations of a growing local business.

## Colors

This design system utilizes a palette rooted in reliability and action:

*   **Azul Corporativo (Primary):** Used for navigation, primary actions, and headers to establish authority and trust.
*   **Verde Éxito (Secondary):** Reserved for positive financial indicators, completion states, and "growth" metrics.
*   **Ámbar (Accent):** Applied sparingly for notifications, warnings, or highlighting specific "Premium" features and pending tasks.
*   **Neutrals:** A range of cool grays derived from the blue primary to maintain a cohesive, professional atmosphere. 

Color contrast must strictly adhere to WCAG 2.1 AA standards to ensure accessibility for all business owners, regardless of visual acuity or hardware quality.

## Typography

The typography strategy prioritizes legibility in Spanish, accounting for longer word lengths. **Hanken Grotesk** is used for headlines to provide a sharp, contemporary edge that distinguishes the platform from generic legacy software. **Inter** is the workhorse for all UI and body text, chosen for its exceptional x-height and clarity on low-resolution screens.

Hierarchy is established through weight and scale rather than decorative styles. All labels and functional text must be at least 14px to remain accessible.

## Layout & Spacing

The design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

*   **Rhythm:** A strict 8px baseline grid ensures vertical consistency across all components.
*   **Margins:** Desktop screens use 40px external margins; mobile screens use 16px to maximize screen real estate.
*   **Sidebar:** The navigation resides in a fixed 260px left-hand sidebar on desktop, collapsing into a bottom-tab bar or hamburger menu on mobile devices.
*   **Whitespace:** "Espacio para respirar" (Room to breathe) is a core tenet; use `lg` and `xl` spacing between sections to prevent the feeling of a cluttered spreadsheet.

## Elevation & Depth

Visual hierarchy is communicated through **Tonal Layers** and **Ambient Shadows**.

1.  **Level 0 (Background):** #F8FAFC. The canvas on which all content sits.
2.  **Level 1 (Cards/Sidebar):** White (#FFFFFF) with a subtle 1px border (#E2E8F0) and a soft, low-opacity shadow (0px 4px 6px rgba(30, 64, 175, 0.05)).
3.  **Level 2 (Modals/Dropdowns):** White with a more pronounced elevation shadow to indicate interactivity and temporary focus.

Avoid heavy gradients or skeuomorphism. Depth should feel "digital-first" and lightweight.

## Shapes

The shape language is defined by **Friendly Geometry**. A standard radius of 8px to 12px is applied to all interactive elements.

*   **Buttons & Inputs:** 8px radius for a crisp, professional look.
*   **Cards & Containers:** 12px radius to soften the larger layout blocks.
*   **Status Tags:** Fully rounded (pill) to distinguish them from actionable buttons.

This moderate roundedness strikes the balance between the "seriousness" of a financial tool and the "approachability" of a modern service.

## Components

*   **Botones (Buttons):** High-contrast filled buttons for primary actions (Primary Blue). Use secondary green for "Guardar" (Save) or "Vender" (Sell). Ensure a minimum height of 44px for touch targets.
*   **Tarjetas de Estadísticas (Stat Cards):** Clean containers featuring a large Hanken Grotesk number and a small trend indicator using the Secondary or Accent color.
*   **Campos de Entrada (Inputs):** Clear labels above the field, 1px border, and a 2px Primary Blue focus ring. Error states must include both a red color change and an icon for accessibility.
*   **Navegación Lateral (Sidebar):** Simple, icon-led list. Active states use a subtle blue background tint and a 4px left-border accent.
*   **Tablas de Datos (Data Tables):** Low-contrast horizontal dividers only. Avoid vertical lines to keep the view clean. Use "Zebra striping" for complex datasets.