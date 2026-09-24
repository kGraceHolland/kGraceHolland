# Sandy pricing tool

Single-file internal app (`index.html`): React 18 + in-browser Babel, no build step. Open the file in a browser to run it. Internal only.

## Layout

| Path | Purpose |
|---|---|
| `index.html` | The tool |
| `deals/` | Saved deals (`*.trinitydeal.json`, from the tool's Save button) |

## Views

| Sidebar | Component | Use |
|---|---|---|
| Build a quote | `DealView` | Configure a deal, review, export proposal PDF, copy for HubSpot, draft email |
| Price guide | `PriceGuideView` | Customer-facing guide, generated from the engine |
| Pricing engine | `PricingEngineView` / `EngineOverview` | Edit every pricing lever; reference prices re-price live |
| Check signed deals | `CheckDealsView` | Re-prices `SIGNED_DEALS` through the current engine, ±10/15% tolerance |
| Price calculator | `PriceCalculatorView` | Customer-style calculator on the current deal |
| Value case | `ValueCaseView` | Carbon, Scope 3, regen premium, natural capital ROI |
| Feature / SOW | `SOWView` | Feature pricing from role day rates |

## Where the numbers live

| Constant | Controls |
|---|---|
| `DEFAULT_ENGINE` | All engine levers: arable anchor curve, ratios, modules, regions, segments, cost model, org/programme model |
| `NAVIGATOR_PLANS`, `NAVIGATOR_CAPS` | Plan ladder (N1 £620 to E3 £15,750) and hectare caps |
| `FIXED_BANDS` | Livestock and facility rates |
| `SIGNED_DEALS` | Calibration set for the signed-deal check |
| `calcPricing` (in `App`) | The single pricing path every view uses |

Engine edits in the UI are session-only. To change defaults, edit `DEFAULT_ENGINE` and commit.
