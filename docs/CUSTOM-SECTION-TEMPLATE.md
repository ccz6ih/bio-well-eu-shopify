# Custom Section Template

Use this as a starting point when building new sections for the Bio-Well EU theme.

---

## Starter Template

Copy this file to `sections/your-section-name.liquid` and customize.

```liquid
{%- liquid
  assign section_id = '#section-' | append: section.id
-%}

{{ 'custom.css' | asset_url | stylesheet_tag }}

<style>
  {{ section_id }} {
    {%- render 'section-variables', section: section -%}
    {%- render 'section-spacing-style', property: 'padding', direction: 'block', start: section.settings.padding_top, end: section.settings.padding_bottom -%}
    {%- render 'section-gap-style', value: section.settings.gap -%}
  }
</style>

<div
  id="section-{{ section.id }}"
  class="section color-section"
  style="padding-block: var(--padding-block-start) var(--padding-block-end);"
>
  <div class="{% if section.settings.section_width == 'narrow' %}page-width--narrow{% elsif section.settings.section_width == 'page' %}page-width{% endif %}">

    {%- if section.settings.heading != blank -%}
      <div class="section__header text-{{ section.settings.heading_alignment }}">
        <{{ section.settings.heading_tag }} class="section__heading {{ section.settings.heading_size }}">
          {%- render 'heading-content',
            content: section.settings.heading,
            style: section.settings.highlighted_text,
            scribble: section.settings.highlighted_scribble
          -%}
        </{{ section.settings.heading_tag }}>

        {%- if section.settings.subheading != blank -%}
          <p class="section__subheading">{{ section.settings.subheading }}</p>
        {%- endif -%}
      </div>
    {%- endif -%}

    <div class="section__content">
      {%- for block in section.blocks -%}
        {%- case block.type -%}

          {%- when 'text_block' -%}
            <div class="section__block" {{ block.shopify_attributes }}>
              {%- if block.settings.title != blank -%}
                <h3 class="block__title">{{ block.settings.title }}</h3>
              {%- endif -%}
              {%- if block.settings.text != blank -%}
                <div class="block__text">{{ block.settings.text }}</div>
              {%- endif -%}
              {%- if block.settings.button_label != blank -%}
                {%- render 'button',
                  label: block.settings.button_label,
                  link: block.settings.button_link,
                  style: block.settings.button_style
                -%}
              {%- endif -%}
            </div>

          {%- when 'image_block' -%}
            <div class="section__block" {{ block.shopify_attributes }}>
              {%- if block.settings.image != blank -%}
                {%- render 'background-image', image: block.settings.image -%}
              {%- endif -%}
            </div>

        {%- endcase -%}
      {%- endfor -%}
    </div>

  </div>
</div>

{% schema %}
{
  "name": "t:sections.your-section.name",
  "class": "your-section",
  "settings": [
    {
      "type": "header",
      "content": "t:sections.global.settings.header.heading"
    },
    {
      "type": "inline_richtext",
      "id": "heading",
      "label": "t:sections.global.settings.heading.label",
      "default": "Your Section Heading"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "t:sections.global.settings.subheading.label"
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
    },
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
    },
    {
      "type": "header",
      "content": "t:sections.global.settings.header.layout"
    },
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
    },
    {
      "type": "range",
      "id": "gap",
      "label": "t:sections.global.settings.gap.label",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "default": 28
    },
    {
      "type": "header",
      "content": "t:sections.global.settings.header.colors"
    },
    {
      "type": "color",
      "id": "color_text",
      "label": "t:sections.global.settings.color.text"
    },
    {
      "type": "color_background",
      "id": "color_background",
      "label": "t:sections.global.settings.color.background"
    },
    {
      "type": "color_background",
      "id": "gradient_background",
      "label": "t:sections.global.settings.color.gradient_background"
    },
    {
      "type": "color",
      "id": "color_highlight",
      "label": "t:sections.global.settings.color.highlight"
    },
    {
      "type": "color_background",
      "id": "gradient_highlight",
      "label": "t:sections.global.settings.color.gradient_highlight"
    },
    {
      "type": "color_background",
      "id": "color_button",
      "label": "t:sections.global.settings.color.button"
    },
    {
      "type": "color",
      "id": "color_button_text",
      "label": "t:sections.global.settings.color.button_text"
    },
    {
      "type": "header",
      "content": "t:sections.global.settings.header.padding"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "t:sections.global.settings.padding.top",
      "min": 0,
      "max": 120,
      "step": 4,
      "unit": "px",
      "default": 40
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "t:sections.global.settings.padding.bottom",
      "min": 0,
      "max": 120,
      "step": 4,
      "unit": "px",
      "default": 40
    }
  ],
  "blocks": [
    {
      "type": "text_block",
      "name": "t:sections.your-section.blocks.text_block.name",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "t:sections.global.settings.heading.label",
          "default": "Block Title"
        },
        {
          "type": "richtext",
          "id": "text",
          "label": "t:sections.global.settings.text.label",
          "default": "<p>Block description text goes here.</p>"
        },
        {
          "type": "text",
          "id": "button_label",
          "label": "t:sections.global.settings.button.label"
        },
        {
          "type": "url",
          "id": "button_link",
          "label": "t:sections.global.settings.button.link"
        },
        {
          "type": "select",
          "id": "button_style",
          "label": "t:sections.global.settings.button.style",
          "default": "primary",
          "options": [
            { "value": "primary", "label": "t:sections.global.settings.button.style_options.primary" },
            { "value": "secondary", "label": "t:sections.global.settings.button.style_options.secondary" },
            { "value": "link", "label": "t:sections.global.settings.button.style_options.link" }
          ]
        }
      ]
    },
    {
      "type": "image_block",
      "name": "t:sections.global.blocks.image.name",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "t:sections.global.settings.image.label"
        }
      ]
    },
    {
      "type": "@app"
    }
  ],
  "presets": [
    {
      "name": "t:sections.your-section.name",
      "category": "t:categories.custom",
      "blocks": [
        { "type": "text_block" },
        { "type": "text_block" }
      ]
    }
  ],
  "disabled_on": {
    "templates": ["password"]
  }
}
{% endschema %}
```

---

## Adding Translations

After creating your section, add the corresponding translation keys.

### 1. Schema Translations (`locales/en.default.schema.json`)

Add under the `sections` key:

```json
{
  "sections": {
    "your-section": {
      "name": "Your Section",
      "blocks": {
        "text_block": {
          "name": "Text block"
        }
      }
    }
  }
}
```

### 2. Storefront Translations (`locales/en.default.json`)

If your section has any storefront-facing strings (not just editor labels), add them:

```json
{
  "sections": {
    "your-section": {
      "view_all": "View all",
      "learn_more": "Learn more"
    }
  }
}
```

Then use in Liquid:

```liquid
{{ 'sections.your-section.view_all' | t }}
```

### 3. Other Languages

For each supported language, add translations to the corresponding locale file (e.g., `locales/fr.json`, `locales/de.json`). At minimum, update the primary market languages for the Bio-Well EU store.

---

## Section Checklist

Before submitting a new section:

- [ ] File saved as `sections/your-section-name.liquid`
- [ ] Schema includes translated `name` with `t:` prefix
- [ ] All setting labels use `t:` translation keys
- [ ] Standard color settings present (text, background, gradient, highlight, button)
- [ ] Standard padding settings present (top, bottom)
- [ ] `section-variables` snippet rendered for colors
- [ ] `section-spacing-style` snippet rendered for padding
- [ ] `presets` defined with `name` and `category`
- [ ] `disabled_on` set to exclude password template
- [ ] Translations added to `locales/en.default.schema.json`
- [ ] Any storefront strings added to `locales/en.default.json`
- [ ] Tested in Shopify theme editor (settings visible, blocks addable)
- [ ] Tested on mobile viewport
- [ ] Tested with RTL language (switch to Arabic/Hebrew)
- [ ] No hardcoded colors or spacing - all via CSS variables
- [ ] `block.shopify_attributes` included on block containers (enables editor click-to-select)
- [ ] Accessibility: proper heading hierarchy, alt text on images, focus states
