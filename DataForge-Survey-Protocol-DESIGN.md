---
version: "alpha"
name: "DataForge | Survey Protocol"
description: "Dataforge Survey Dashboard Section is designed for demonstrating application workflows and interface hierarchy. Key features include clear information density, modular panels, and interface rhythm. It is suitable for product showcases, admin panels, and analytics experiences."
colors:
  primary: "#22D3EE"
  secondary: "#06B6D4"
  tertiary: "#2548F6"
  neutral: "#050505"
  background: "#050505"
  surface: "#22D3EE"
  text-primary: "#FFFFFF"
  text-secondary: "#22D3EE"
  border: "#FFFFFF"
  accent: "#22D3EE"
typography:
  display-lg:
    fontFamily: "Geist"
    fontSize: "96px"
    fontWeight: 400
    lineHeight: "96px"
    letterSpacing: "-0.025em"
  body-md:
    fontFamily: "Geist Mono"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
    letterSpacing: "0.1em"
    textTransform: "uppercase"
  label-md:
    fontFamily: "Geist"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
rounded:
  md: "0px"
  full: "9999px"
spacing:
  base: "4px"
  sm: "4px"
  md: "10px"
  lg: "14px"
  xl: "20px"
  gap: "4px"
  card-padding: "20px"
  section-padding: "48px"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "14px"
  button-secondary:
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "10px"
  button-link:
    textColor: "{colors.text-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "0px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Bounded
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses dark mode with #22D3EE as the main accent and #050505 as the neutral foundation.

- **Primary (#22D3EE):** Main accent and emphasis color.
- **Secondary (#06B6D4):** Supporting accent for secondary emphasis.
- **Tertiary (#2548F6):** Reserved accent for supporting contrast moments.
- **Neutral (#050505):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #050505; Surface: #22D3EE; Text Primary: #FFFFFF; Text Secondary: #22D3EE; Border: #FFFFFF; Accent: #22D3EE

## Typography

Typography pairs Geist for display hierarchy with Geist Mono for supporting content and interface copy.

- **Display (`display-lg`):** Geist, 96px, weight 400, line-height 96px, letter-spacing -0.025em.
- **Body (`body-md`):** Geist Mono, 12px, weight 400, line-height 16px, letter-spacing 0.1em, uppercase.
- **Labels (`label-md`):** Geist, 14px, weight 400, line-height 20px.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, bounded structural frame before changing ornament or component styling. Use 4px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / bounded composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Bounded
- **Base unit:** 4px
- **Scale:** 4px, 10px, 14px, 20px, 24px, 28px, 32px, 40px
- **Section padding:** 48px
- **Card padding:** 20px, 22px, 48px
- **Gaps:** 4px, 8px, 12px, 16px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 1px #FFFFFF
- **Blur:** 12px

### Techniques
- **Gradient border shell:** Use a thin gradient border shell around the main card. Wrap the surface in an outer shell with 0px padding and a 0px radius. Drive the shell with repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 8px) so the edge reads like premium depth instead of a flat stroke. Keep the actual stroke understated so the gradient shell remains the hero edge treatment. Inset the real content surface inside the wrapper with a slightly smaller radius so the gradient only appears as a hairline frame.

## Shapes

Shapes rely on a tight radius system anchored by 9999px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles.

### Buttons
- **Primary:** background #FFFFFF, text #000000, radius 9999px, padding 14px, border 0px solid rgb(229, 231, 235).
- **Secondary:** text #FFFFFF, radius 9999px, padding 10px, border 1px solid rgba(255, 255, 255, 0.2).
- **Links:** text #FFFFFF, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 4px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected moderate motion intensity without a deliberate reason.

## Motion

Motion feels controlled and interface-led across text, layout, and section transitions. Timing clusters around 300ms and 2000ms. Easing favors ease and cubic-bezier(0.4. Hover behavior focuses on text and color changes.

**Motion Level:** moderate

**Durations:** 300ms, 2000ms, 150ms

**Easings:** ease, cubic-bezier(0.4, 0, 1), 0.2, 0.6

**Hover Patterns:** text, color, transform
