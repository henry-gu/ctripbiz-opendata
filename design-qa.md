# Design QA

- Accepted source: `/Users/henrygu/.codex/generated_images/019fffd1-20f8-7631-991b-6d9550c4ee2a/exec-9fc4724e-2336-4fd9-baaf-ed7befb204d0.png`
- Latest implementation capture: `/Volumes/GUEXTSSD/projects/ctripbiz-opendata/design-qa-latest.png`
- Side-by-side comparison: `/Volumes/GUEXTSSD/projects/ctripbiz-opendata/design-qa-comparison.png`
- Browser surface: Codex in-app browser
- Viewport: 1440 × 1024
- State: `http://127.0.0.1:8787/`, selected `大连`, real `高新区` SuggestKeyword result ranking, diagnostics open

## Comparison

1. Structure retains the selected explorer layout while reducing navigation to the single active `酒店查询` entry.
2. Keyword search exposes its required city context inline; the result panel preserves the source hierarchy and overlay behavior.
3. The main query area keeps the source's narrow parameter panel and dense, wide results table.
4. Hotel rows preserve hotel ID, location, star, price, rating, availability, and detail action density without image placeholders.
5. Developer diagnostics remain docked to the bottom with request/response tabs, timing, request ID, status, method, and cache state.
6. Color, border, typography, spacing, and control radius stay within the source's restrained enterprise visual language.

## Copy and intentional deviations

- Copy is adapted from the mockup to the implemented Ctrip Business scope.
- Sidebar contains only the first-release hotel query entry.
- Diagnostics explicitly says `无数据库 · 仅内存缓存`; this is a product requirement and is not present in the source visual.
- The diagnostics payload uses a compact two-column layout so request data and runtime metadata remain legible at 1440 × 1024.
- Hotel rows intentionally contain data only; all thumbnail and empty-image placeholders are omitted.
- City selection is intentionally embedded beside the keyword field instead of requiring users to switch to fuzzy-location mode.

## Verification history

- Fixed the initial narrow two-column suggestion surface to match the selected six-column explorer layout.
- Added true nationwide fuzzy-location mode after clearing the selected city.
- Corrected endpoint-specific Ctrip success-code handling found during a real hotel-list request.
- Verified the top search clear action resets all query conditions and results, while `清空结果` preserves conditions.
- Verified switching between the SuggestKeyword ranked location list and the SuggestDestination fuzzy-location list.
- Verified the keyword result list preserves API order, numbers each row, and labels landmark, business-zone, and metro types.
- Verified that clearing the city disables the keyword field, opens an inline city selector, and re-enables SuggestKeyword immediately after city selection.
- Verified fuzzy destination search, destination selection, advanced filters, hotel list, hotel detail drawer, pagination controls, diagnostics tabs, collapse/restore, and empty/loading/error boundaries.
- Browser console: no application warnings or errors in final capture.
- Automated tests: 10 passed.

final result: passed

---

# Prompt Settings Workspace QA

- Selected source visual truth: `/Users/henrygu/.codex/generated_images/019fffd1-20f8-7631-991b-6d9550c4ee2a/exec-45f67b29-8d5e-468b-950a-020c67c871ac.png`
- Implementation: `http://127.0.0.1:4173/` → 设置 → 智能推荐设置 (Codex in-app Browser capture)
- Viewport: 1280 × 720 CSS px; browser device scale 1.
- State: 条件提取提示词已选中；模型已就绪；保存栏无未保存修改。

## Comparison

The implementation follows the selected prompt-workspace direction: a left in-page prompt menu, one focused wide editor, compact model metadata, and a persistent bottom action bar. The selected mock uses a larger 1440 × 1024 frame, so the implementation naturally uses a shorter editor viewport at 1280 × 720 while retaining page-level and editor-level scrolling.

### Fidelity surfaces

- **Fonts and typography:** Product-system sans-serif hierarchy is retained; editor content intentionally uses a monospace font to improve prompt editing and differs from the mock's rendered line-number treatment.
- **Spacing and layout rhythm:** 246px in-page navigation, broad editable content area, restrained border radius, and aligned sticky footer closely follow the selected hierarchy.
- **Colors and tokens:** Existing light gray workspace, white panels, blue selected state, green ready state, and subtle borders match the product's established visual language.
- **Image quality and assets:** No raster image assets are part of this settings workflow. Existing Tabler UI icons are retained as product controls.
- **Copy and content:** Labels, local file location, character count, and prompt descriptions reflect the implemented two-prompt model rather than the mock's illustrative three-prompt content.

## Interaction evidence

- Switched from “条件提取提示词” to “对话回复提示词”; the focused editor, title, help copy, and character count updated.
- Added a character to the focused editor; the save control enabled.
- Restored the focused prompt default; the save control returned to disabled after matching saved state.
- Browser console had no application warnings or errors.

## Findings

- No actionable P0, P1, or P2 differences. The source's line-number gutter is an acceptable P3 omission because the editor remains readable, editable, and independently scrollable without synthetically generated line numbers.

## Verification history

- Replaced vertically stacked prompt fields with a focused workspace and in-page prompt menu.
- Added page-level scrolling, an independently scrollable/resizable editor, wide responsive content layout, and a sticky action bar.
- Verified the desktop primary interaction loop in the in-app browser.
- Automated tests: `npm test` passed (12 API tests, web build, and Sites tests).

final result: passed
