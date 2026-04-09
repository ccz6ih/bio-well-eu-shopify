# Translation & Localization Guide

Complete guide to the Bio-Well EU Shopify theme's translation system, including the recommended approach for automatic IP-based language detection.

---

## Table of Contents

1. [How Translations Work](#how-translations-work)
2. [Locale File Structure](#locale-file-structure)
3. [Using Translations in Liquid](#using-translations-in-liquid)
4. [Schema vs Storefront Translations](#schema-vs-storefront-translations)
5. [RTL Language Support](#rtl-language-support)
6. [Current Language Switching](#current-language-switching)
7. [IP-Based Automatic Language Detection](#ip-based-automatic-language-detection)
8. [Adding a New Language](#adding-a-new-language)
9. [Translation Workflow](#translation-workflow)

---

## How Translations Work

Shopify's localization system uses JSON locale files that map string keys to translated text. The theme currently supports **38 languages**.

### Flow

1. Visitor arrives at the store
2. Shopify determines the active locale (from URL, cookie, or manual selection)
3. The corresponding locale file is loaded (e.g., `fr.json` for French)
4. All `{{ 'key' | t }}` calls resolve from that file
5. Missing keys fall back to `en.default.json`

### Key Shopify Objects

| Object | Description |
|--------|-------------|
| `request.locale` | Current active locale |
| `request.locale.iso_code` | Language code (e.g., "fr", "de") |
| `request.locale.endonym_name` | Native name (e.g., "Francais") |
| `localization.language` | Same as `request.locale` |
| `localization.country` | Current country context |
| `localization.available_languages` | All enabled languages |
| `localization.available_countries` | All enabled countries/regions |

---

## Locale File Structure

### Location: `locales/`

| File Pattern | Purpose |
|--------------|---------|
| `en.default.json` | Default English translations (fallback) |
| `{lang}.json` | Storefront translations for each language |
| `en.default.schema.json` | Theme editor label translations (English) |
| `{lang}.schema.json` | Theme editor labels in other languages |

### Top-Level Categories in `en.default.json`

```json
{
  "general": {
    "accessibility": { ... },
    "404": { ... },
    "pagination": { ... },
    "password_page": { ... },
    "breadcrumbs": { ... },
    "social": { ... },
    "newsletter": { ... },
    "search": { ... },
    "cart": { ... },
    "drawer": { ... },
    "date": { ... }
  },
  "sections": {
    "announcement-bar": { ... },
    "header": { ... },
    "footer": { ... },
    "slideshow": { ... },
    "...": "..."
  },
  "blogs": { "article": { ... }, "comments": { ... } },
  "cart": { ... },
  "collections": { ... },
  "localization": { "language_label": "Language", "country_label": "Country/region" },
  "contact": { ... },
  "customer": { "account": { ... }, "order": { ... }, "addresses": { ... } },
  "onboarding": { ... },
  "products": { "product": { ... }, "modal": { ... } },
  "gift_cards": { ... },
  "recipient": { ... }
}
```

### Schema Translation Structure (`en.default.schema.json`)

```json
{
  "categories": {
    "banners": "Banners",
    "collections": "Collections",
    "content": "Content",
    "custom": "Custom",
    "image": "Image",
    "newsletter": "Newsletter",
    "product": "Product",
    "testimonials": "Testimonials",
    "text": "Text",
    "video": "Video"
  },
  "settings_schema": { ... },
  "sections": {
    "global": {
      "settings": {
        "heading": { "label": "Heading", "size": "Heading size", ... },
        "color": { "text": "Text", "background": "Background", ... },
        "padding": { "top": "Top padding", "bottom": "Bottom padding" },
        "...": "..."
      }
    },
    "slideshow": { "name": "Slideshow", "settings": { ... } },
    "...": "..."
  }
}
```

---

## Using Translations in Liquid

### Basic Usage

```liquid
<!-- Simple string -->
{{ 'products.product.add_to_cart' | t }}

<!-- With interpolation -->
{{ 'general.meta.tags' | t: tags: current_tags }}

<!-- In schema labels (automatic) -->
"label": "t:sections.global.settings.heading.label"
```

### In JavaScript (via `js-variables.liquid`)

Translations are passed to the global `theme` object:

```liquid
theme.variantStrings = {
  addToCart: {{ 'products.product.add_to_cart' | t | json }},
  soldOut: {{ 'products.product.sold_out' | t | json }},
  preOrder: {{ 'products.product.pre_order' | t | json }}
};
```

Access in JS: `theme.variantStrings.addToCart`

### Pluralization

Shopify supports `count` for pluralization:

```json
{
  "items": {
    "one": "{{ count }} item",
    "other": "{{ count }} items"
  }
}
```

```liquid
{{ 'cart.items' | t: count: cart.item_count }}
```

---

## Schema vs Storefront Translations

| Aspect | Schema (`.schema.json`) | Storefront (`.json`) |
|--------|------------------------|---------------------|
| Purpose | Theme editor UI labels | Customer-facing text |
| Used by | `t:` prefix in schema JSON | `{{ 'key' \| t }}` in Liquid |
| Visible to | Store admins in editor | Store visitors |
| Required for | Section names, setting labels, option labels | Buttons, messages, headings |

---

## RTL Language Support

The theme detects RTL languages via `snippets/direction.liquid`.

### Supported RTL Languages

ae, ar, arc, bcc, bqi, ckb, dv, fa, glk, ha, he, kwh, ks, ku, mzn, nqo, pnb, ps, sd, ug, ur, yi

### How It Works

```liquid
<!-- In layout/theme.liquid -->
{%- render 'direction' -%}
<html lang="{{ request.locale.iso_code }}" dir="{{ direction }}">

<!-- Conditional RTL stylesheet -->
{%- if direction == 'rtl' -%}
  {{ 'rtl.css' | asset_url | stylesheet_tag }}
{%- endif -%}
```

### RTL Considerations for Custom Sections

- Use `inline-start`/`inline-end` instead of `left`/`right` for CSS
- Use `padding-inline` / `margin-inline` instead of `padding-left` / `margin-right`
- Test all sections in Arabic or Hebrew to verify layout mirrors correctly
- The `rtl.css` file handles most global overrides, but section-specific issues may need fixes

---

## Current Language Switching

The theme provides **manual language selection** in three locations:

### 1. Announcement Bar (`sections/announcement-bar.liquid`)

Dropdown in the top bar showing current language name and available options.

### 2. Mobile Header Drawer (`snippets/header-drawer.liquid`)

Modal-based language selector in the mobile menu footer.

### 3. Footer (`sections/footer-copyright.liquid`)

Select dropdowns for language and country selection.

### Mechanism

All selectors use Shopify's native `localization` form:

```liquid
{%- form 'localization' -%}
  <select name="locale_code">
    {%- for language in localization.available_languages -%}
      <option value="{{ language.iso_code }}"
        {% if language.iso_code == localization.language.iso_code %}selected{% endif %}>
        {{ language.endonym_name }}
      </option>
    {%- endfor -%}
  </select>
  <button type="submit">Update</button>
{%- endform -%}
```

Shopify handles the redirect and sets a cookie to remember the choice.

---

## IP-Based Automatic Language Detection

The theme currently requires **manual language selection**. Below are three approaches to implement automatic language detection based on the visitor's IP/location, ordered from simplest to most robust.

---

### Approach 1: Shopify Markets (Recommended - No Code Required)

**Shopify Markets** is the built-in solution for multi-region selling. It handles language, currency, and pricing per country.

#### Setup Steps

1. Go to **Shopify Admin > Settings > Markets**
2. Create markets for each target region (e.g., "Europe - French", "Europe - German")
3. Assign countries to each market
4. Enable languages per market
5. Enable **"Country/region recommendations"** under Market settings
6. Shopify will auto-detect the visitor's country via IP and show a recommendation popup or redirect

#### Behavior

- Shopify detects the visitor's country via IP geolocation
- If the visitor's country belongs to a market with a different language, Shopify shows a recommendation
- The visitor can accept or dismiss
- URL structure: `/fr/`, `/de/`, etc. (subfolders) or separate domains per market

#### Pros
- Zero custom code - fully managed by Shopify
- Accurate geolocation via Shopify's infrastructure
- Handles currency + language + pricing together
- SEO-friendly with hreflang tags
- GDPR-compliant (Shopify handles data processing)
- Works with the theme's existing localization selectors

#### Cons
- Less control over the detection UI/behavior
- Requires Shopify plan that supports Markets (available on all current plans)

---

### Approach 2: JavaScript Geolocation API (Client-Side)

Use a free geolocation API to detect the visitor's country, then auto-submit the Shopify localization form.

#### Implementation

Create `assets/geo-redirect.js`:

```javascript
(function() {
  // Skip if user has already chosen a language (cookie exists)
  if (document.cookie.includes('locale_redirected=true')) return;

  // Skip if on a non-default locale already (user navigated directly)
  var currentPath = window.location.pathname;
  if (/^\/(fr|de|es|it|ja|ko|zh-cn|zh-tw|ar|nl|pt-br|pt|sv|da|fi|nb|pl|cs|el|hu|ro|sk|tr|uk|vi|hi|id|he|lv|sr|th)\//i.test(currentPath)) return;

  // Country-to-language mapping for Bio-Well EU markets
  var countryLanguageMap = {
    // Western Europe
    'FR': 'fr', 'BE': 'fr', 'LU': 'fr', 'MC': 'fr',  // French-speaking
    'DE': 'de', 'AT': 'de', 'CH': 'de', 'LI': 'de',  // German-speaking
    'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es',  // Spanish-speaking
    'IT': 'it', 'SM': 'it', 'VA': 'it',               // Italian-speaking
    'PT': 'pt-pt', 'BR': 'pt-br',                      // Portuguese-speaking
    'NL': 'nl',                                          // Dutch
    'SE': 'sv',                                          // Swedish
    'DK': 'da',                                          // Danish
    'FI': 'fi',                                          // Finnish
    'NO': 'nb',                                          // Norwegian

    // Central/Eastern Europe
    'PL': 'pl', 'CZ': 'cs', 'GR': 'el', 'HU': 'hu',
    'RO': 'ro', 'SK': 'sk', 'TR': 'tr', 'UA': 'uk',
    'RS': 'sr', 'LV': 'lv',

    // Asia
    'JP': 'ja', 'KR': 'ko', 'CN': 'zh-cn', 'TW': 'zh-tw',
    'TH': 'th', 'VN': 'vi', 'ID': 'id', 'IN': 'hi',

    // Middle East (RTL)
    'SA': 'ar', 'AE': 'ar', 'EG': 'ar', 'IL': 'he'
  };

  fetch('https://ipapi.co/json/')
    .then(function(response) { return response.json(); })
    .then(function(data) {
      var detectedCountry = data.country_code;
      var targetLocale = countryLanguageMap[detectedCountry];

      if (!targetLocale) return; // No mapping found, stay on default

      // Check if current locale already matches
      var shopifyLocale = window.Shopify && window.Shopify.locale;
      if (shopifyLocale === targetLocale) return;

      // Set cookie to prevent future redirects (30 day expiry)
      document.cookie = 'locale_redirected=true; path=/; max-age=' + (30 * 24 * 60 * 60) + '; SameSite=Lax';

      // Redirect to the correct locale
      var newPath = '/' + targetLocale + currentPath;
      window.location.href = newPath;
    })
    .catch(function() {
      // Silently fail - user stays on default language
    });
})();
```

#### Load in Theme

Add to `layout/theme.liquid` before `</head>`:

```liquid
{%- if request.locale.iso_code == request.locale.root_url -%}
  <script src="{{ 'geo-redirect.js' | asset_url }}" defer></script>
{%- endif -%}
```

#### Pros
- Simple implementation
- Works with any Shopify plan
- No app installation needed

#### Cons
- Relies on third-party geolocation API (rate limits, availability)
- Client-side = brief flash of default language before redirect
- Needs fallback handling if API is down
- Free geolocation APIs may have accuracy limitations
- Does not handle currency/pricing (language only)

#### Alternative Free Geolocation APIs

| Service | Free Tier | URL |
|---------|-----------|-----|
| ipapi.co | 1,000/day | `https://ipapi.co/json/` |
| ip-api.com | 45/min (non-commercial) | `http://ip-api.com/json/` |
| ipinfo.io | 50,000/month | `https://ipinfo.io/json` |
| CloudFlare headers | Unlimited (if using CF) | `cf-ipcountry` header |

---

### Approach 3: Shopify App + Cloudflare (Most Robust)

For production-grade accuracy, use a combination of server-side detection and a Shopify app.

#### Option A: Shopify Geolocation App (Free, by Shopify)

Shopify provides an official **Geolocation** app:

1. Install from Shopify App Store: "Geolocation" by Shopify
2. Configure language/country recommendations per region
3. The app adds a popup/banner recommending the correct locale
4. Visitor can accept or dismiss

This works out of the box with the theme's existing localization system.

#### Option B: Cloudflare Workers + Country Header

If the store uses Cloudflare:

1. Cloudflare automatically adds the `CF-IPCountry` header to every request
2. Create a Cloudflare Worker that reads this header and redirects to the correct locale subfolder
3. Zero client-side latency - redirect happens at the CDN edge

```javascript
// Cloudflare Worker example
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const country = request.headers.get('CF-IPCountry');
  const url = new URL(request.url);

  // Skip if already on a locale path
  if (/^\/(fr|de|es|it)\//.test(url.pathname)) {
    return fetch(request);
  }

  const localeMap = {
    'FR': '/fr', 'DE': '/de', 'ES': '/es', 'IT': '/it'
    // ... extend as needed
  };

  const targetLocale = localeMap[country];
  if (targetLocale && !url.pathname.startsWith(targetLocale)) {
    url.pathname = targetLocale + url.pathname;
    return Response.redirect(url.toString(), 302);
  }

  return fetch(request);
}
```

#### Option C: Liquid-Based Detection with Shopify's Built-in Country

Shopify provides `localization.country.iso_code` which is already resolved from IP. Use this in Liquid to show a language recommendation banner without any external API:

```liquid
{%- comment -%} snippets/geo-language-banner.liquid {%- endcomment -%}

{%- liquid
  assign country = localization.country.iso_code
  assign current_lang = request.locale.iso_code
  assign suggested_lang = ''

  case country
    when 'FR', 'BE', 'LU', 'MC'
      assign suggested_lang = 'fr'
    when 'DE', 'AT', 'CH', 'LI'
      assign suggested_lang = 'de'
    when 'ES', 'MX', 'AR', 'CO'
      assign suggested_lang = 'es'
    when 'IT', 'SM'
      assign suggested_lang = 'it'
  endcase

  if suggested_lang == '' or suggested_lang == current_lang
    assign show_banner = false
  else
    assign show_banner = true
  endif
-%}

{%- if show_banner -%}
  <div id="geo-language-banner" class="geo-banner" style="
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
    background: var(--color-base-background); padding: 1rem;
    border-top: 1px solid rgba(0,0,0,0.1); text-align: center;
  ">
    {%- for lang in localization.available_languages -%}
      {%- if lang.iso_code == suggested_lang -%}
        <p>
          {{ 'localization.geo_suggestion' | t: language: lang.endonym_name }}
        </p>
        {%- form 'localization' -%}
          <input type="hidden" name="locale_code" value="{{ suggested_lang }}">
          <button type="submit" class="button button--primary button--sm">
            {{ 'localization.switch_language' | t: language: lang.endonym_name }}
          </button>
        {%- endform -%}
        <button onclick="this.parentElement.remove(); document.cookie='geo_dismissed=1;path=/;max-age=2592000'" class="button button--secondary button--sm" style="margin-left: 0.5rem;">
          {{ 'localization.stay_current' | t }}
        </button>
      {%- endif -%}
    {%- endfor -%}
  </div>
{%- endif -%}
```

Add to `layout/theme.liquid` before `</body>`:

```liquid
{%- unless request.design_mode -%}
  {%- render 'geo-language-banner' -%}
{%- endunless -%}
```

Add translations to `locales/en.default.json`:

```json
{
  "localization": {
    "geo_suggestion": "It looks like you might prefer {{ language }}.",
    "switch_language": "Switch to {{ language }}",
    "stay_current": "Stay in English"
  }
}
```

#### Pros
- Server-side accuracy (Cloudflare) or Shopify's own detection (Liquid)
- No external API dependency with Options A and C
- GDPR-friendly recommendation banner (user opts in)
- No flash of wrong language

#### Cons
- Cloudflare option requires DNS setup
- App option adds a dependency
- Liquid option is a recommendation only (not automatic redirect)

---

### Recommendation for Bio-Well EU

**For most stores, use this priority order:**

1. **First: Enable Shopify Markets** (Approach 1) - Configure markets for your primary EU regions. This handles language + currency + pricing and is the most robust, SEO-friendly solution.

2. **Then: Add the Liquid geo-banner** (Approach 3, Option C) - As a supplement, add the `geo-language-banner` snippet for visitors who land on the wrong locale. This uses Shopify's own country detection with zero external dependencies.

3. **Optional: Shopify Geolocation App** (Approach 3, Option A) - If you want a polished popup UI without custom code, install Shopify's free Geolocation app alongside Markets.

Avoid the pure JavaScript approach (Approach 2) for production unless you specifically need it - it adds latency, third-party dependencies, and a flash of untranslated content.

---

## Adding a New Language

### Step 1: Enable in Shopify Admin

1. Go to **Settings > Languages**
2. Click **Add language**
3. Select the language and publish it

### Step 2: Create Locale File

Copy `locales/en.default.json` to `locales/{lang-code}.json` and translate all strings.

### Step 3: Create Schema Locale (Optional)

Copy `locales/en.default.schema.json` to `locales/{lang-code}.schema.json` and translate editor labels.

### Step 4: Update Country-Language Mappings

If using IP-based detection, update the country-to-language mapping in whichever detection approach you chose.

### Step 5: Test

- Switch to the new language in the theme editor
- Verify all section names display correctly
- Check product pages, cart, checkout, and account pages
- Test RTL if the language is right-to-left
- Verify JavaScript strings load correctly (countdown timers, cart drawer, etc.)

---

## Translation Workflow

### For New Sections

1. Write all strings in English first using `t:` keys in schema
2. Add keys to `locales/en.default.schema.json` (editor labels)
3. Add keys to `locales/en.default.json` (storefront strings)
4. Use a translation service or team to add to other locale files
5. Test in at least 3 languages (English, one European, one RTL)

### For Existing String Changes

1. Find the key in `locales/en.default.json`
2. Update the English value
3. Flag the key for re-translation in other locale files
4. Keep a changelog of modified keys for the translation team

### Quality Checklist

- [ ] No hardcoded English strings in Liquid templates
- [ ] All `t:` keys resolve (no missing translations showing raw keys)
- [ ] Pluralization works where applicable (`one` / `other`)
- [ ] Date formats use locale-appropriate patterns
- [ ] RTL layout verified for Hebrew/Arabic
- [ ] JavaScript strings tested (cart updates, variant picker, countdown)
- [ ] Form validation messages translated
- [ ] Meta tags (title, description) use translated values
- [ ] Currency symbols display correctly per locale

---

## Supported Languages Reference

| Code | Language | Schema File | RTL |
|------|----------|-------------|-----|
| en | English (default) | Yes | No |
| ar | Arabic | No | **Yes** |
| cs | Czech | No | No |
| da | Danish | No | No |
| de | German | Yes | No |
| el | Greek | No | No |
| es | Spanish | Yes | No |
| fi | Finnish | No | No |
| fr | French | Yes | No |
| he | Hebrew | No | **Yes** |
| hi | Hindi | No | No |
| hu | Hungarian | No | No |
| id | Indonesian | No | No |
| it | Italian | Yes | No |
| ja | Japanese | No | No |
| ko | Korean | No | No |
| lv | Latvian | No | No |
| nb | Norwegian | No | No |
| nl | Dutch | No | No |
| pl | Polish | No | No |
| pt-BR | Portuguese (Brazil) | No | No |
| pt-PT | Portuguese (Portugal) | No | No |
| ro | Romanian | No | No |
| sk | Slovak | No | No |
| sr | Serbian | No | No |
| sv | Swedish | No | No |
| th | Thai | No | No |
| tr | Turkish | No | No |
| uk | Ukrainian | No | No |
| vi | Vietnamese | Yes | No |
| zh-CN | Chinese (Simplified) | No | No |
| zh-TW | Chinese (Traditional) | No | No |
