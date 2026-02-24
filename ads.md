# Google AdSense Integration - Auraboost

## Publisher ID

```
ca-pub-2779698672601493
```

## Current Setup

### 1. Site Ownership Verification (meta tag)

Located in `app/layout.tsx` inside `<head>`:

```html
<meta name="google-adsense-account" content="ca-pub-2779698672601493" />
```

### 2. AdSense Script

Located in `app/layout.tsx` inside `<head>`:

```html
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2779698672601493"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

Both are loaded on every page via the root layout.

---

## Approval Status

- **Current status:** Getting ready (under review)
- **Dashboard:** https://adsense.google.com
- **Typical approval time:** A few days to 2 weeks

### Requirements for approval

- Site must be live and publicly accessible
- Must have original, high-quality content
- Must comply with [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- Site must have clear navigation (privacy policy, terms of service, contact page)
- No prohibited content (adult, violent, hacking, etc.)

---

## After Approval — Showing Ads

### Option A: Auto Ads (Recommended for start)

1. Go to https://adsense.google.com
2. Navigate to **Ads > By site**
3. Toggle **Auto ads** ON for `auraboost.gg`
4. Google will automatically place ads across all pages
5. No additional code changes needed

### Option B: Manual Ad Units

If you want control over where ads appear:

#### Step 1 — Create an ad unit in AdSense

1. Go to **Ads > By ad unit**
2. Choose a format (Display, In-feed, In-article, Multiplex)
3. Copy the generated `data-ad-slot` value

#### Step 2 — Create a reusable AdUnit component

Create `src/components/AdUnit.tsx`:

```tsx
"use client";

import { useEffect } from "react";

interface AdUnitProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: "block" },
}: AdUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-2779698672601493"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  );
}
```

#### Step 3 — Use the component

```tsx
import AdUnit from "@/src/components/AdUnit";

// In any page or component:
<AdUnit adSlot="1234567890" />

// With custom styles:
<AdUnit
  adSlot="1234567890"
  style={{ display: "block", textAlign: "center" }}
  adFormat="rectangle"
/>
```

---

## Common Ad Placements

| Location | Recommended Format |
| --- | --- |
| Between content sections | Display (responsive) |
| Inside blog/docs articles | In-article |
| Sidebar | Display (fixed size) |
| Between list items | In-feed |
| End of page | Multiplex |

---

## Troubleshooting

| Problem | Solution |
| --- | --- |
| Ads not showing | Check approval status in AdSense dashboard |
| Blank ad spaces | AdSense may not have ads to fill — this is normal early on |
| Console errors about `adsbygoogle` | Make sure the AdSense script is loaded before ad units |
| Ads blocked by browser | Ad blockers will prevent ads — this is expected |
| Low ad fill rate | Increases over time as Google learns your traffic |

## Important Rules

- Do NOT click your own ads — this violates AdSense policies and can get you banned
- Do NOT encourage users to click ads
- Do NOT place ads on pages with no content
- Maximum 3 ad units per page (recommended)
- Ads must be clearly distinguishable from site content
- Do NOT modify the ad code output by Google

---

## Files Modified

| File | Change |
| --- | --- |
| `app/layout.tsx` | Added AdSense meta tag and script in `<head>` |

## Files to Create (after approval, if using manual ads)

| File | Purpose |
| --- | --- |
| `src/components/AdUnit.tsx` | Reusable ad unit component |
