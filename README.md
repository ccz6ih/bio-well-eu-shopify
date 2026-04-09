# Bio-Well EU Shopify Theme

**Base Theme:** Concept v5.3.2 by RoarTheme
**Documentation:** https://roartheme.co/blogs/concept
**Support:** https://haloroar.ticksy.com

---

## Overview

This is the Bio-Well EU Shopify storefront, built on the Concept theme. The theme supports 38 languages, RTL text direction, and is structured for extensive customization through Shopify's section/block architecture.

The store sells Bio-Well bioenergy measurement devices and accessories including cameras, sensors, filter packs, starter packs, therapist packs, and calibration units.

---

## Directory Structure

```
Bio-well-EU-Shopify/
├── assets/        # CSS, JS, and static assets (45 files)
├── blocks/        # Reusable block definitions (22 files)
├── config/        # Theme settings schema and active data
│   ├── settings_schema.json   # All theme-level setting definitions
│   └── settings_data.json     # Active configuration values + presets
├── docs/          # Development documentation (this project)
├── layout/        # Page layouts
│   ├── theme.liquid           # Primary layout (all pages)
│   └── password.liquid        # Password/launch page layout
├── locales/       # Translation files (38 languages)
├── sections/      # Section definitions (103 files)
├── snippets/      # Reusable Liquid components (97 files)
└── templates/     # Page templates (51 files, JSON + Liquid)
    └── customers/ # Customer account templates (7 files)
```

---

## Quick Start

### Prerequisites

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) installed
- Access to the Bio-Well EU Shopify store admin
- Node.js 18+ (for Shopify CLI)

### Local Development

```bash
# Login to Shopify store
shopify theme dev --store bio-well-eu.myshopify.com

# Pull latest theme from store
shopify theme pull --store bio-well-eu.myshopify.com

# Push changes to development theme
shopify theme push --store bio-well-eu.myshopify.com --unpublished

# Open theme editor
shopify theme open --store bio-well-eu.myshopify.com
```

### Deploying Changes

```bash
# Push to specific theme by ID
shopify theme push --theme <theme-id>

# Push only specific files
shopify theme push --only sections/my-section.liquid

# Push and publish (CAUTION: goes live immediately)
shopify theme push --live
```

---

## Theme Architecture

### Layouts

| File | Purpose |
|------|---------|
| `theme.liquid` | Main layout for all pages. Loads CSS/JS, renders header/footer groups, handles page transitions and accessibility. |
| `password.liquid` | Simplified layout for password-protected store state. |

### Section Groups

The theme uses Shopify's section groups for persistent global elements:

- **`header-group.json`** - Header, announcement bar, search drawer, help drawer
- **`footer-group.json`** - Footer, footer copyright
- **`overlay-group.json`** - Newsletter popup, cookie banner, age verifier, mobile dock

### Templates

Templates are JSON-based (Shopify 2.0 architecture) and define which sections appear on each page type. Notable custom product templates:

| Template | Use Case |
|----------|----------|
| `product.json` | Standard product page |
| `product.bio-well-elements.json` | Bio-Well element products |
| `product.camera-3-0.json` | Camera 3.0 products |
| `product.sputnik.json` | Sputnik antenna products |
| `product.water-sensor.json` | Water sensor products |
| `product.starter-pack.json` | Starter pack bundles |
| `product.therapist-pack.json` | Therapist pack bundles |
| `product.calibration-unit.json` | Calibration unit products |
| `product.pre-order.json` | Pre-order products |

### Sections (103 total)

Sections are the primary building blocks. See [docs/SECTION-SCHEMA-GUIDE.md](docs/SECTION-SCHEMA-GUIDE.md) for the full schema reference.

**Categories:**
- **Main sections** (`main-*.liquid`) - Core page content (product, collection, cart, blog, etc.)
- **Feature sections** - Reusable content blocks (slideshow, testimonials, FAQ, etc.)
- **Marketing sections** - Newsletter, countdown, announcement bar
- **Layout sections** - Header, footer, custom section, empty space

### Snippets (97 total)

Reusable Liquid components rendered with `{% render %}`. Key categories:

- **Layout system** - `section-variables`, `section-layout-class`, `section-spacing-style`, `section-size-style`, `section-gap-style`, `section-border-style`, `section-overlay`
- **Product components** - `product-card`, `product-price`, `product-variant-picker`, `buy-buttons`
- **UI components** - `button`, `heading-content`, `icon`, `alert`
- **Navigation** - `header-nav-desktop`, `header-nav-drawer`, `header-nav-mega`
- **Search/Filtering** - `facets`, `predictive-search`, `pagination`

### Blocks (22 total)

Shared block definitions used across multiple sections:
- Content: `heading`, `text`, `image`, `video`, `button`
- Layout: `accordion`, `group`, `divider`, `spacer`
- Interactive: `countdown-timer`, `number-counter`, `map`, `newsletter`
- Forms: `contact-form`, `custom-field`

---

## Configuration

### Theme Settings (`config/settings_schema.json`)

Global settings organized into groups:

| Group | Controls |
|-------|----------|
| Logo | Desktop/mobile logos, favicon, logo width |
| Colors | Text, background, highlight, button, drawer, status colors |
| Typography | Heading, body, navigation, button, product text fonts |
| Layout | Page width, spacing, border radius |
| Product | Ratings, countdown, quick view, quick add, variant display |
| Cart | Cart type (drawer/page), free shipping bar, gift wrapping |
| Social | Social media profile links |
| Advanced | Page transitions, lazy loading, tab attention |

### Active Settings (`config/settings_data.json`)

Current active configuration plus two design presets:
- **Concept** - Default preset
- **Inova** - Alternative design preset

---

## Localization

The theme supports **38 languages** with full RTL support. See [docs/TRANSLATION-GUIDE.md](docs/TRANSLATION-GUIDE.md) for the complete guide.

**Currently supported languages:**
Arabic, Czech, Danish, German, Greek, English (default), Spanish, Finnish, French, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Latvian, Norwegian, Dutch, Polish, Portuguese (BR & PT), Romanian, Slovak, Serbian, Swedish, Thai, Turkish, Ukrainian, Vietnamese, Chinese (Simplified & Traditional)

**Key files:**
- `locales/en.default.json` - Default English translations
- `locales/en.default.schema.json` - Theme editor label translations
- `snippets/direction.liquid` - RTL/LTR detection

---

## Styling System

See [docs/STYLING-SYSTEM.md](docs/STYLING-SYSTEM.md) for the complete reference.

The theme uses a CSS custom property system with responsive scaling. Key concepts:

- **Section variables** - Per-section color overrides via `section-variables.liquid`
- **Spacing scale** - Proportional spacing system (`--sp-0d5` through `--sp-100`)
- **Responsive scaling** - Values above 20px scale with `--spacing-scale` viewport variable
- **Layout classes** - Tailwind-style flex utilities via `section-layout-class.liquid`
- **Typography scale** - Fluid text sizes from `--text-3xs` through `--text-8xl`

---

## Building Custom Sections

See [docs/SECTION-SCHEMA-GUIDE.md](docs/SECTION-SCHEMA-GUIDE.md) for schema patterns and [docs/CUSTOM-SECTION-TEMPLATE.md](docs/CUSTOM-SECTION-TEMPLATE.md) for a starter template.

**Key rules:**
1. All labels must use translation keys (`t:sections.your-section.name`)
2. Add corresponding entries to locale files (at minimum `en.default.json` and `en.default.schema.json`)
3. Use the standard snippet system for spacing, colors, and layout
4. Include `presets` with a `category` for theme editor discoverability
5. Follow the established naming conventions for setting IDs

---

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Sections | `kebab-case.liquid` | `featured-collection.liquid` |
| Main sections | `main-{page-type}.liquid` | `main-product.liquid` |
| Snippets | `kebab-case.liquid` | `product-card.liquid` |
| Templates | `{type}.{variant}.json` | `product.starter-pack.json` |
| Locales | `{lang-code}.json` | `fr.json` |
| Schema locales | `{lang-code}.schema.json` | `fr.schema.json` |
| CSS | `{feature}.css` | `collection.css` |
| JS | `{feature}.js` | `cart.js` |

---

## Development Guidelines

1. **Never edit `vendor.js` or `theme.js` directly** - These are compiled assets
2. **Use `custom.css` and `custom.js`** for store-specific customizations
3. **Always test RTL** when adding new sections (Arabic, Hebrew)
4. **Add translations** for all user-facing strings
5. **Use the snippet system** - Don't reinvent spacing/color/layout patterns
6. **Test all product templates** - Multiple product types exist with different layouts
7. **Keep `settings_data.json` in sync** - Back up before major changes

---

## Related Documentation

- [Section Schema Guide](docs/SECTION-SCHEMA-GUIDE.md) - Complete schema reference for building sections
- [Custom Section Template](docs/CUSTOM-SECTION-TEMPLATE.md) - Boilerplate for new sections
- [Translation Guide](docs/TRANSLATION-GUIDE.md) - Localization system and IP-based detection
- [Styling System](docs/STYLING-SYSTEM.md) - CSS variables, spacing, and layout reference
