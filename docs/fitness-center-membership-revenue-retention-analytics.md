# Fitness Center Membership, Revenue & Retention Analytics

**Onyx Data Challenge | MyGym Fitness Center | Power BI | Power Query | Python | Jupyter Notebook | DAX | ZoomCharts**

## 1. Project overview

A multi-page Power BI challenge project representing MyGym Fitness Center. The report explores membership revenue, subscription attributes, churn indicators, member engagement, demographics and gym-location performance. This is challenge work, not a commercial deployment for an actual fitness business.

The supplied project brief identifies Power BI, Power Query, Python, Jupyter Notebook, DAX and ZoomCharts. The available assets include the PBIX and one Executive Summary screenshot. No fitness notebook or source-data file was found. The report layout exposes visual titles and field references, but the inspected archive did not expose complete DAX formulas, model relationships or a complete Power Query mashup. This documentation marks those details as not verified rather than reconstructing them.

## 2. Business context and objectives

Fitness businesses commonly monitor member revenue, subscription models, pricing, retention and engagement alongside demographic and location segments. The dashboard is designed to explore revenue trends and membership contributions; compare subscription models, prices, discounts and churn labels; examine acquisition and tenure; review visit and training indicators; and compare displayed measures by gym location, member type and demographic group.

The report is descriptive. It does not establish causes for churn, predict future retention or prove that a dashboard pattern produced a business outcome. Revenue, discounts and churn comparisons need to be interpreted in the applicable filter context.

## 3. Dataset and data structure

The supplied partial Power Query code names `cleaned_fitness_data.csv` as its input and configures a 29-column comma-delimited CSV with encoding 1252 and `QuoteStyle.None`. This does not establish the upstream source or how the cleaned file was created. Record count, complete column inventory, source provenance and data-quality statistics are **Not verified from available project files**.

The PBIX report queries reference one entity, `cleaned_fitness_data`. Visuals use fields including join date, home gym location, membership type, subscription model and price, final and adjusted price, discount rate/type, tenure days, visit frequency, access hours, time in gym, personal training hours, group lessons, drink subscriptions, sauna use, age, gender, churn risk and location coordinates. These are fields visible in report queries, not a complete schema or verified field dictionary.

No Jupyter Notebook or source-data file was present among the inspected project assets. The project description names Python and Jupyter Notebook, but their exact workflow is not demonstrated in the available files.

## 4. Power Query workflow

The following is a partial M extract supplied with the project. Its input and header-promotion steps are:

```powerquery
Source = Csv.Document(
    File.Contents("...cleaned_fitness_data.csv"),
    [Delimiter=",", Columns=29, Encoding=1252, QuoteStyle=QuoteStyle.None]
),
#"Promoted Headers" = Table.PromoteHeaders(Source)
```

The visible later sequence constructs a temporary identifier, converts it to text, removes it, renames the existing Index column to `Members ID`, and removes duplicate rows:

```powerquery
#"Added Custom1" = Table.AddColumn(
    #"Renamed Columns",
    "Members ID",
    each Text.Start([home_gym_location], 3)
        & Text.From([join_date], "yyyyMMdd")
        & Text.From([Index])
),
#"Changed Type4" = Table.TransformColumnTypes(
    #"Added Custom1", {{"Members ID", type text}}
),
#"Removed Columns1" = Table.RemoveColumns(
    #"Changed Type4", {"Members ID"}
),
#"Renamed Columns1" = Table.RenameColumns(
    #"Removed Columns1", {{"Index", "Members ID"}}
),
#"Removed Duplicates" = Table.Distinct(#"Renamed Columns1")
```

The custom value combines the first three characters of `home_gym_location`, `join_date` formatted as `yyyyMMdd`, and `Index`. The constructed column is then removed. The final visible `Members ID` is the renamed Index column, not that custom value. This sequence does not prove that the final field is unique, stable across refreshes or a durable business key. `Table.Distinct` is not shown with a subset-of-columns key, so no additional deduplication semantics are claimed.

The supplied extract notes that additional transformations exist, but those steps were omitted. The PBIX package did not expose a complete query for inspection; omitted type, null, duplicate or formatting steps are **Not verified from available project files**.

## 5. Data model and DAX

The report layout exposes visual queries against `cleaned_fitness_data`, with references to both named measures and implicit field aggregations. The available report metadata does not expose the DAX expressions, model relationships, cardinality or filter direction. These details are **Not verified from available project files**.

| Displayed metric | Visible report reference | Formula status |
|---|---|---|
| Total Revenue | `Total Revenue` measure reference | DAX formula not verified. |
| Average Final Price | Average of `final_price` on the Executive Summary card | The visual-level aggregation is visible; no custom DAX formula verified. |
| Total Active Revenue | `Total Active Revenue` measure reference | Formula and “active” definition not verified. |
| Loss Revenue | Card title maps to `Projected Lost Revenue` | Formula not verified; this does not establish realized cash loss. |
| Churn Rate | `Churn Rate` measure reference | Formula and denominator not verified. |
| Churn Risk Score | `Churn Risk Score` measure reference | Formula, thresholds and label logic not verified. |
| Average Subscription | `Average Subscription Price` measure reference | Formula and units not verified. |
| Revenue per Day | Card query uses a summed `Revenue per Day` field; `Total Revenue per Day` is referenced elsewhere | Exact field/measure relationship and formula not verified. |
| Average Tenure Days | Average of `tenure_days` | Visible aggregation; tenure definition not verified. |
| Drink Subscription Rate | `Drink Subscription Rate` measure reference | Formula and denominator not verified. |
| Average Discount Rate | Average of `discount_rate` | Visible aggregation; missing/zero-value handling not verified. |
| Member Count | Count of `Members ID` | Count is visible; distinct-member semantics are not verified. |
| Projected Loss | `Projected Lost Revenue` measure reference | Formula and interpretation not verified. |

The report also references trend-icon measures and `Personal Training Adoption Rate`; their formulas are not exposed in the inspected project files.

## 6. Dashboard architecture

The PBIX contains seven pages: **Executive Summary**, **Revenue**, **Subscription**, **Membership Analysis**, **Engagement & Usage**, **Geographic Analysis** and **General Analysis**. Action buttons appear in the report layout to support page navigation. Slicer references include home gym location, join year/month, subscription model, age group and self-identified gender; General Analysis also references a drink-subscription filter. These fields do not necessarily appear on every page.

## 7. Page-by-page walkthrough

### Executive Summary

The available screenshot displays Total Revenue of approximately **$68.9K**, Average Final Price of **$34.5**, Total Active Revenue of approximately **$33.8K**, and a Loss Revenue card of approximately **$35.1K**. The report query maps the last card to `Projected Lost Revenue`; its calculation and meaning are not verified.

Other visuals include Total Revenue by Month (New Subscribers), revenue by age group and membership type, a member-segment table by membership and gender, revenue by membership type, and member/revenue contribution by gender and membership type. These support month and segment comparisons but do not establish causes.

### Revenue

The page contains cards for Average Tenure Days, Revenue per Day, average discount rate and Drink Subscription Rate. It also includes location/member-type performance, revenue by location and membership type, revenue versus Projected Lost Revenue by gender, age/membership revenue contribution, and discount-type comparisons using Total Revenue and Average Final Price.

### Subscription

Visuals compare average discount rate, subscription price, revenue and churn by subscription model, and include location/subscription performance and a membership hierarchy with value and behaviour measures. The supplied dashboard description reports Average Subscription **40.1**, Churn Rate **50.6%** and a Churn Risk Score of **Low Risk**. The churn and risk formulas and thresholds are unavailable, so the consistency and meaning of the label cannot be validated.

### Membership Analysis

This page includes churn rate by age group and membership type, member count, revenue by subscription model, monthly new-member acquisition, engagement versus tenure, gender/membership breakdowns, average personal-training hours by membership type and subscription-price comparisons. A ZoomCharts time visual is used for member acquisition, with additional ZoomCharts and native visuals.

### Engagement & Usage

The PBIX contains visuals for average visits per week by membership type and access hours, age group versus time in the gym, a Python visual titled **Personal Trainer Usage Vs Group Lessons**, average personal-training hours by gender and membership type, Average Duration in Gym, Peak Usage Time, earliest average check-in, latest average check-out, Average Visit per Week and Personal Training Adoption Rate. The report-layout title confirms a Python visual; its notebook code and calculation details are unavailable.

### Geographic Analysis

The page includes Drink Subscription Rate by Member Segment, Sauna Usage & Revenue by Location, Location & Age Performance Breakdown, a **Revenue & Loss by Gym Location** map, a churn-rate map by home gym location, and a location/membership subscription-price comparison. It supports location comparisons, but no location ranking is verified from the single available screenshot.

### General Analysis

This page includes Drink Subscription Rate by Membership Type and Gender, a Sauna Usage & Revenue table, revenue/final-price analysis by discount type, a Personal Training Adoption & Revenue table, and Personal Training Performance by Location. The report layout also shows location, join date, subscription, age, drink subscription and gender filter references.

Only the Executive Summary screenshot was available among the project image assets. The other page descriptions are based on PBIX page names, visual titles and query field references, not fabricated screenshots.

## 8. Analytical findings

- The Executive Summary screenshot displays $68.9K Total Revenue, $34.5 Average Final Price, $33.8K Total Active Revenue and $35.1K on the Loss Revenue card. The last field is named Projected Lost Revenue in the report query.
- The supplied dashboard description reports a 50.6% Churn Rate alongside a Low Risk score. Without the formula and label thresholds, these are displayed outputs, not a validated risk conclusion.
- The report includes revenue and member comparisons by subscription model, age group, membership type, gender, location and discount type. The available evidence establishes these analysis dimensions but does not support a ranking of strongest segments.
- Attendance, gym-duration, training and location visuals are present, but no quantified engagement or location finding is verified by the available screenshot.

## 9. Business recommendations

These are follow-up investigation areas, not outcomes demonstrated by the challenge dashboard:

- Confirm the churn-rate denominator and Low Risk thresholds before using the score to prioritise retention work.
- Review subscription pricing and discount comparisons alongside membership volumes and verified measure definitions.
- Compare locations and member types under comparable filter contexts before prioritising a site or segment.
- Validate attendance, training and tenure definitions before changing engagement programmes.
- Confirm the Projected Lost Revenue calculation before describing it as actual financial loss.

## 10. Design and visualisation

The Executive Summary screenshot shows a dark navy navigation rail, light neutral canvas, branded header, action-button navigation, KPI cards, charts and a detailed table. The PBIX packages ZoomCharts Facet Chart, Pie Chart, Time Chart, Drill Down Pie, Drill Down Combo Bar and Advanced Waterfall visual types. Native cards, tables, slicers, maps, line/area, bar, donut, scatter and Python visuals are also present; not every report visual is a ZoomCharts visual.

## 11. Limitations

- Only the Executive Summary screenshot is available; other page summaries are based on the PBIX layout.
- DAX formulas and measure definitions are unavailable. Churn, risk-score and projected-loss interpretations require formula verification.
- Relationships, cardinality, filter direction and the complete table structure are not verified.
- The visible member-identifier code removes the constructed ID and renames Index. Uniqueness and refresh stability are not established.
- The partial query does not establish a formal duplicate investigation or all data-quality steps.
- Dataset provenance, row count, missing-value handling and other cleaning statistics are not verified. No fitness notebook was available.
- Revenue comparisons should be read with membership volume and filter context; dashboard associations do not demonstrate causation.
- No validated predictive churn model, prediction accuracy or intervention outcome is established.
- “Loss Revenue” is associated with `Projected Lost Revenue`; neither name proves realized cash loss without a verified formula.

## 12. Skills and conclusion

The project demonstrates multi-page Power BI report design; inspection of report-level measure and field references; Power Query CSV import and identifier logic as shown in the partial M extract; analysis dimensions for membership, revenue, subscription, churn, engagement and geography; interactive navigation and filtering; and evidence-based communication of technical uncertainty. The supplied project description also identifies Python, Jupyter Notebook and DAX, but their specific implementation is not verified from the available assets.

The challenge report brings membership, revenue and usage questions into a navigable interface. This case study documents what the PBIX and supplied M extract show, while clearly identifying formulas, relationships, upstream cleaning steps and notebook implementation that require further source evidence.
