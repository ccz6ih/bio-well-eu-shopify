# Section Schema Guide

Complete reference for building custom sections in the Bio-Well EU Shopify theme (Concept v5.3.2).

---

## Schema Structure Overview

Every section file ends with a `{% schema %}` JSON block that defines how the section appears and behaves in the theme editor.

```json
{% schema %}
{
  "name": "t:sections.my-section.name",
  "class": "optional-css-class",
  "tag": "section",
  "max_blocks": 10,
  "settings": [ ... ],
  "blocks": [ ... ],
  "presets": [ ... ],
  "disabled_on": { "templates": ["password"] },
  "enabled_on": { "groups": ["footer"] }
}
{% endschema %}
```

### Top-Level Properties

| Property | Required | Description |
|----------|----------|-------------|
| `name` | Yes | Display name in editor. Use `t:` prefix for translations. |
| `class` | No | CSS class added to the section wrapper element. |
| `tag` | No | HTML tag for section wrapper (default: `section`). |
| `max_blocks` | No | Maximum number of blocks allowed. |
| `settings` | No | Array of section-level settings. |
| `blocks` | No | Array of block type definitions. |
| `presets` | No | Default configurations for the theme editor "Add section" menu. |
| `disabled_on` | No | Templates/groups where this section cannot be used. |
| `enabled_on` | No | Templates/groups where this section can be used (mutually exclusive with `disabled_on`). |

---

## Setting Types Reference

### Text Input Types

```json
// Plain text
{ "type": "text", "id": "heading", "label": "t:sections.global.settings.heading.label", "default": "My Heading" }

// Rich text (multi-line with formatting)
{ "type": "richtext", "id": "description", "label": "t:sections.global.settings.text.label", "default": "<p>Description here</p>" }

// Inline rich text (single line with formatting)
{ "type": "inline_richtext", "id": "title", "label": "t:sections.global.settings.heading.label" }

// HTML (raw code)
{ "type": "html", "id": "custom_html", "label": "Custom HTML" }

// Liquid (raw Liquid code)
{ "type": "liquid", "id": "custom_liquid", "label": "Custom Liquid" }
```

### Selection Types

```json
// Dropdown select
{
  "type": "select",
  "id": "layout",
  "label": "t:sections.global.settings.layout.label",
  "default": "grid",
  "options": [
    { "value": "grid", "label": "t:sections.global.settings.layout.options.grid" },
    { "value": "list", "label": "t:sections.global.settings.layout.options.list" }
  ]
}

// Text alignment
{ "type": "text_alignment", "id": "text_alignment", "label": "t:sections.global.settings.text_alignment.label", "default": "center" }

// Range slider
{
  "type": "range",
  "id": "padding_top",
  "label": "t:sections.global.settings.padding.top",
  "min": 0,
  "max": 120,
  "step": 4,
  "unit": "px",
  "default": 40
}

// Checkbox
{ "type": "checkbox", "id": "show_title", "label": "Show title", "default": true }
```

### Color Types

```json
// Simple color picker
{ "type": "color", "id": "color_text", "label": "t:sections.global.settings.color.text" }

// Color with gradient support
{ "type": "color_background", "id": "color_background", "label": "t:sections.global.settings.color.background" }

// Color with alpha/opacity
{ "type": "color", "id": "color_overlay", "label": "Overlay color", "alpha": true }
```

### Resource Picker Types

```json
// Image upload
{ "type": "image_picker", "id": "image", "label": "t:sections.global.settings.image.label" }

// Collection picker
{ "type": "collection", "id": "collection", "label": "t:sections.global.settings.collection.label" }

// Product picker
{ "type": "product", "id": "product", "label": "Product" }

// Product list (multiple)
{ "type": "product_list", "id": "products", "label": "Products", "limit": 12 }

// Collection list (multiple)
{ "type": "collection_list", "id": "collections", "label": "Collections", "limit": 6 }

// Blog picker
{ "type": "blog", "id": "blog", "label": "Blog" }

// Menu/link list
{ "type": "link_list", "id": "menu", "label": "Menu", "default": "main-menu" }

// Page picker
{ "type": "page", "id": "page", "label": "Page" }

// URL
{ "type": "url", "id": "button_link", "label": "t:sections.global.settings.button.link" }

// Video URL (YouTube/Vimeo)
{ "type": "video_url", "id": "video_url", "label": "Video URL", "accept": ["youtube", "vimeo"] }

// Shopify-hosted video
{ "type": "video", "id": "video", "label": "Video" }
```

### UI Organizer Types

```json
// Section header (visual divider in editor)
{ "type": "header", "content": "t:sections.global.settings.header.colors" }

// Paragraph (help text in editor)
{ "type": "paragraph", "content": "t:sections.global.settings.help_text" }
```

---

## Common Setting Patterns

### Standard Color Settings

Used by nearly every section in this theme:

```json
{ "type": "header", "content": "t:sections.global.settings.header.colors" },
{ "type": "color", "id": "color_text", "label": "t:sections.global.settings.color.text" },
{ "type": "color_background", "id": "color_background", "label": "t:sections.global.settings.color.background" },
{ "type": "color_background", "id": "gradient_background", "label": "t:sections.global.settings.color.gradient_background" },
{ "type": "color", "id": "color_highlight", "label": "t:sections.global.settings.color.highlight" },
{ "type": "color_background", "id": "gradient_highlight", "label": "t:sections.global.settings.color.gradient_highlight" },
{ "type": "color_background", "id": "color_button", "label": "t:sections.global.settings.color.button" },
{ "type": "color", "id": "color_button_text", "label": "t:sections.global.settings.color.button_text" }
```

### Standard Padding Settings

```json
{ "type": "header", "content": "t:sections.global.settings.header.padding" },
{
  "type": "range",
  "id": "padding_top",
  "label": "t:sections.global.settings.padding.top",
  "min": 0, "max": 120, "step": 4, "unit": "px", "default": 40
},
{
  "type": "range",
  "id": "padding_bottom",
  "label": "t:sections.global.settings.padding.bottom",
  "min": 0, "max": 120, "step": 4, "unit": "px", "default": 40
}
```

### Standard Heading Settings

```json
{
  "type": "inline_richtext",
  "id": "heading",
  "label": "t:sections.global.settings.heading.label",
  "default": "Section heading"
},
{
  "type": "select",
  "id": "heading_size",
  "label": "t:sections.global.settings.heading.size",
  "default": "title-md",
  "options": [
    { "value": "title-sm", "label": "S" },
    { "value": "title-md", "label": "M" },
    { "value": "title-lg tracking-heading", "label": "L" },
    { "value": "title-xl tracking-heading", "label": "XL" }
  ]
},
{
  "type": "select",
  "id": "heading_alignment",
  "label": "t:sections.global.settings.heading.alignment",
  "default": "center",
  "options": [
    { "value": "start", "label": "t:sections.global.settings.heading.alignment_options.left" },
    { "value": "center", "label": "t:sections.global.settings.heading.alignment_options.center" }
  ]
},
{
  "type": "select",
  "id": "heading_tag",
  "label": "t:sections.global.settings.heading.tag",
  "default": "h2",
  "options": [
    { "value": "h2", "label": "H2" },
    { "value": "h3", "label": "H3" },
    { "value": "h4", "label": "H4" },
    { "value": "h5", "label": "H5" },
    { "value": "h6", "label": "H6" },
    { "value": "span", "label": "span" }
  ]
}
```

### Standard Section Width

```json
{
  "type": "select",
  "id": "section_width",
  "label": "t:sections.global.settings.section_width.label",
  "default": "page",
  "options": [
    { "value": "narrow", "label": "t:sections.global.settings.section_width.options.narrow" },
    { "value": "page", "label": "t:sections.global.settings.section_width.options.page" },
    { "value": "full", "label": "t:sections.global.settings.section_width.options.full" }
  ]
}
```

### Highlighted Text Settings

```json
{
  "type": "select",
  "id": "highlighted_text",
  "label": "t:sections.global.settings.highlighted_text.label",
  "default": "none",
  "options": [
    { "value": "none", "label": "t:sections.global.settings.highlighted_text.options.none" },
    { "value": "text", "label": "t:sections.global.settings.highlighted_text.options.text" },
    { "value": "scribble", "label": "t:sections.global.settings.highlighted_text.options.scribble" }
  ]
},
{
  "type": "select",
  "id": "highlighted_scribble",
  "label": "t:sections.global.settings.highlighted_text.scribble",
  "default": "circle",
  "visible_if": "{{ section.settings.highlighted_text == 'scribble' }}",
  "options": [
    { "value": "circle", "label": "t:sections.global.settings.highlighted_text.scribble_options.circle" },
    { "value": "underline", "label": "t:sections.global.settings.highlighted_text.scribble_options.underline" },
    { "value": "squiggle", "label": "t:sections.global.settings.highlighted_text.scribble_options.squiggle" }
  ]
}
```

---

## Conditional Visibility (`visible_if`)

The `visible_if` property conditionally shows/hides settings in the editor based on other setting values:

```json
// Show only when a specific value is selected
"visible_if": "{{ section.settings.highlighted_text == 'scribble' }}"

// Show when an image is uploaded
"visible_if": "{{ block.settings.image != blank }}"

// Show when a checkbox is checked
"visible_if": "{{ section.settings.enable_parallax == true }}"

// Show when a value is NOT something
"visible_if": "{{ section.settings.section_width != 'full' }}"
```

---

## Block Definitions

### Block Structure

```json
"blocks": [
  {
    "type": "testimonial",
    "name": "t:sections.testimonials.blocks.testimonial.name",
    "limit": 1,
    "settings": [ ... ]
  },
  {
    "type": "@app"
  },
  {
    "type": "@theme"
  }
]
```

### Special Block Types

| Type | Purpose |
|------|---------|
| `@app` | Allows third-party Shopify apps to inject content |
| `@theme` | References shared block definitions from the `blocks/` directory |

### Block Limits

```json
// Section-level: max total blocks
"max_blocks": 9

// Block-level: max instances of this specific type
{ "type": "logo_social", "limit": 1, "settings": [...] }
```

---

## Presets

Presets define default configurations that appear in the "Add section" menu:

```json
"presets": [
  {
    "name": "t:sections.slideshow.name",
    "category": "t:categories.banners",
    "blocks": [
      { "type": "image" },
      { "type": "image" },
      { "type": "image" }
    ]
  }
]
```

### Available Categories

From `en.default.schema.json`:

| Key | Label |
|-----|-------|
| `t:categories.banners` | Banners |
| `t:categories.collections` | Collections |
| `t:categories.content` | Content |
| `t:categories.custom` | Custom |
| `t:categories.image` | Image |
| `t:categories.newsletter` | Newsletter |
| `t:categories.product` | Product |
| `t:categories.testimonials` | Testimonials |
| `t:categories.text` | Text |
| `t:categories.video` | Video |

---

## Placement Control

### `disabled_on`

Prevent section from being used on specific templates:

```json
"disabled_on": {
  "templates": ["password"]
}
```

### `enabled_on`

Restrict section to specific section groups (mutually exclusive with `disabled_on`):

```json
// Only in footer group
"enabled_on": {
  "groups": ["footer"]
}

// Only in header group
"enabled_on": {
  "groups": ["header"]
}

// Only in overlay group
"enabled_on": {
  "groups": ["overlay"]
}
```

---

## Image Ratio Options (Standardized)

Used across sections for consistent image display:

| Value | Description |
|-------|-------------|
| `adapt` | Maintain original aspect ratio |
| `square` | 1:1 ratio |
| `portrait` | 3:4 ratio |
| `landscape` | 4:3 ratio |
| `wide` | 16:9 ratio |
| `rounded` | Square with border-radius |
| `adapt_first` | Match ratio of first image |

---

## Rendering Section Settings in Liquid

### Colors and Variables

```liquid
{%- render 'section-variables', section: section -%}
```

This outputs CSS custom properties for all standard color settings (`color_text`, `color_background`, etc.).

### Spacing

```liquid
{%- render 'section-spacing-style', property: 'padding', direction: 'block', start: section.settings.padding_top, end: section.settings.padding_bottom -%}
```

### Layout Classes

```liquid
{%- render 'section-layout-class',
  content_direction: section.settings.content_direction,
  horizontal_alignment: section.settings.horizontal_alignment,
  vertical_alignment: section.settings.vertical_alignment,
  vertical_on_mobile: section.settings.vertical_on_mobile
-%}
```

### Gap

```liquid
{%- render 'section-gap-style', value: section.settings.gap -%}
```

### Section Width

```liquid
<div class="{% if section.settings.section_width == 'narrow' %}page-width--narrow{% elsif section.settings.section_width == 'page' %}page-width{% endif %}">
```

---

## Translation Key Conventions

All user-facing strings in schemas should use translation keys:

```
t:sections.{section-name}.name                    - Section name
t:sections.{section-name}.settings.{id}.label     - Setting label
t:sections.{section-name}.settings.{id}.info      - Setting info/help
t:sections.{section-name}.settings.{id}.options.{value} - Option label
t:sections.{section-name}.blocks.{type}.name      - Block type name
t:sections.global.settings.{id}.label             - Shared/reused setting labels
t:categories.{category}                           - Preset categories
```

Add corresponding entries to:
- `locales/en.default.schema.json` for editor labels
- `locales/en.default.json` for storefront-facing strings

---

## Section Inventory by Category

### Content Sections
| Section | Blocks | Max Blocks | Description |
|---------|--------|------------|-------------|
| `rich-text` | spacing, heading, text, icon, image | - | Rich text content |
| `image-with-text` | heading, subheading, text, icon, image, spacing, @app | - | Image + text layout |
| `multicolumn` | column | - | Multi-column content |
| `faq` | question | - | Accordion FAQ |
| `timeline` | event | - | Timeline display |
| `comparison-table` | row | - | Feature comparison |
| `custom-section` | @theme, @app | - | Flexible custom layout |
| `custom-liquid` | - | - | Raw Liquid code |

### Banner/Hero Sections
| Section | Blocks | Max Blocks | Description |
|---------|--------|------------|-------------|
| `slideshow` | image, video | 5 | Image/video carousel |
| `slideshow-hero` | image, video | 5 | Full-width hero carousel |
| `video-hero` | - | - | Full-width video hero |
| `scrolling-banner` | - | - | Horizontally scrolling banner |
| `scrolling-text` | - | - | Scrolling text marquee |

### Product Sections
| Section | Blocks | Max Blocks | Description |
|---------|--------|------------|-------------|
| `featured-collection` | - | - | Collection products grid |
| `featured-product` | multiple | - | Single product showcase |
| `product-bundle` | - | - | Product bundle display |
| `product-comparison` | - | - | Side-by-side products |
| `recently-viewed` | - | - | Recently viewed products |
| `shop-the-look` | product | - | Shoppable image hotspots |

### Social/Marketing Sections
| Section | Blocks | Max Blocks | Description |
|---------|--------|------------|-------------|
| `testimonials` | testimonial | 9 | Customer testimonials |
| `newsletter` | - | - | Email signup |
| `countdown-timer` | - | - | Promotional countdown |
| `logo-list` | logo | - | Brand/partner logos |
| `shop-the-feed` | - | - | Social feed integration |

---

## Checklist for New Sections

- [ ] Section file created in `sections/` directory
- [ ] Schema includes `name` with `t:` translation key
- [ ] All setting labels use `t:` translation keys
- [ ] Standard color settings included (text, background, gradient, highlight, button)
- [ ] Standard padding settings included (top and bottom)
- [ ] `presets` defined with `name` and `category`
- [ ] `disabled_on` or `enabled_on` set appropriately
- [ ] Translation keys added to `locales/en.default.schema.json`
- [ ] Any storefront strings added to `locales/en.default.json`
- [ ] Section renders `section-variables` snippet for colors
- [ ] Section renders `section-spacing-style` for padding
- [ ] Tested in theme editor with various settings
- [ ] Tested on mobile and desktop
- [ ] Tested with RTL languages (if text-heavy)
