**Source Visual Truth**
- PDF render pages: `/Users/bvtpink/Documents/Codex/2026-07-02/nik/work/pdf-render/page-21.png`, `page-16.png`, `page-13.png`, `page-14.png`, `page-15.png`.

**Implementation Evidence**
- Screenshots: `/Users/bvtpink/Documents/Codex/2026-07-02/nik/work/screenshots/home-final.png`, `contacts.png`, `square-fixed.png`, `hometown-final.png`, `mine.png`.
- Full-view comparison evidence: `/Users/bvtpink/Documents/Codex/2026-07-02/nik/work/screenshots/design-comparison-final.png`.
- Viewport: 390 x 844.
- State: five main tab pages, default scroll position.
- Focused region comparison: not needed for this pass because the combined comparison shows the full first viewport for each primary tab and all important typography, bottom navigation, cards, imagery, and state colors are readable at target width.

**Findings**
- No actionable P0/P1/P2 mismatches remain.
- [P3] Minor pixel differences remain in vertical rhythm between the PDF long screenshots and browser viewport.
  Location: top spacing and lower visible content on the home and hometown tabs.
  Evidence: source pages are exported as long mobile screenshots with varying heights; implementation uses a real scrollable 390 x 844 browser viewport with a fixed bottom tab bar.
  Impact: the overall design language and hierarchy match, while exact y-position parity varies slightly.
  Fix: optional follow-up tuning after reviewing on the target phone model.

**Required Fidelity Surface Check**
- Fonts and typography: Noto Sans SC is used throughout; headings, labels, prices, and small meta text preserve the heavy, compact hierarchy from the PDF. No visible text overflow remains after the home heading fix.
- Spacing and layout rhythm: rounded hero panels, floating nav, card spacing, section gaps, and scrollable content match the mobile app structure. Remaining spacing drift is P3 due to viewport/export differences.
- Colors and visual tokens: red, green, black, gold, and snow-white themes map to the five requested tab meanings and match the PDF palette closely.
- Image quality and asset fidelity: visible photo assets are cropped from the provided PDF render and stored locally under `public/mockup-assets/`; no placeholder image boxes remain.
- Copy and content: primary titles, labels, prices, alumni names, event text, and settings/service copy follow the PDF screens and the user's tab meaning brief.

**Patches Made Since Previous QA**
- Reduced home title size and forced the greeting line to stay on one line.
- Removed duplicated square-card tags when the cropped PDF image already includes the tag.
- Added `aria-label` values to bottom navigation buttons.
- Shortened the home service gap and hometown gold header height to better match the source rhythm.
- Second iteration: reduced synthetic heavy font weights by using 400/500/600/700 only.
- Second iteration: changed the bottom tab bar to the reference interaction where inactive tabs show icon only and the selected tab shows an icon-plus-label capsule at the lower nav height.
- Second iteration: added the remaining PDF secondary pages as navigable prototype screens, including notifications, product list, project list/detail, donation list/detail, alumni card/detail, publish/my supply, contact info, post detail, settings, login, profile completion, certification, activities, service hub, news list, and article detail.
- Second iteration: recropped product, activity, project, donation, and article images from the PDF render for local static assets.
- Apple alignment pass: used Apple Human Interface Guidelines as the system reference, with emphasis on system typography, restrained color, grouped backgrounds, material-style translucency, safe touch targets, and clearer visual hierarchy.
- Apple alignment pass: normalized app-level tokens, bottom navigation, card/list surfaces, search fields, segmented controls, detail headers, primary actions, and secondary-page list/detail layouts.
- Apple alignment pass: reduced saturated theme colors while preserving the five tab meanings from the user brief.
- WeChat home pass: removed simulated phone time/status icons and added a global right-side mini-program capsule control.
- WeChat home pass: rebuilt the home top area as a red gradient with full-width banner imagery, overlaid title, and "带我回家" call-to-action, then removed the old official activity card.
- WeChat home pass: made the home avatar navigate to the Mine tab, removed the "校友服务" and "校园动态" section headers, and changed the home feed into mixed recent news/activity rows with title, thumbnail, tag, publisher, and time.

**Implementation Checklist**
- Build passes with `npm run build`.
- Five bottom tabs switch correctly in-browser.
- Local PDF-derived assets render from `public/mockup-assets/`.
- Key secondary-page routes were opened in-browser and screenshots were captured under `/Users/bvtpink/Documents/Codex/2026-07-02/nik/work/screenshots-v2/`.
- Apple alignment pass screenshots were captured at 390 x 844 under `/Users/bvtpink/Documents/Codex/2026-07-02/nik/work/screenshots-apple-pass/`, covering all five tabs plus event detail, services, and products.
- WeChat home pass screenshots were captured at 390 x 844 under `/Users/bvtpink/Documents/Codex/2026-07-02/nik/work/screenshots-wechat-home/`, including the final home page and avatar-to-mine navigation check.
- final result: passed
