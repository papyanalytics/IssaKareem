# Russian Alcohol Consumption Analysis
**Power BI | Power Query | Data Analysis | Forecasting**

### Project Overview
An analysis of alcohol consumption patterns across Russian regions, exploring historical trends, regional preferences, category performance and future consumption patterns.

### Objective
To identify differences in alcohol consumption across regions, evaluate wine and alcohol growth trends, and highlight regional opportunities through comparative and time-series analysis.

### My Contribution
Sourced and prepared the dataset, transformed it using Power Query, and developed interactive Power BI dashboards to analyse alcohol consumption by year, region and beverage category.

### Data Preparation
Using Power Query, I:

- Imported the Russian alcohol consumption Excel dataset and promoted the first row to headers.
- Assigned appropriate data types to the year, region and consumption fields.
- Removed blank rows and records containing errors in the year field.
- Filtered out records where wine or brandy consumption was null.
- Unpivoted the alcohol category columns while retaining Year and Region.
- Renamed the resulting Attribute and Value columns to `AlcoholType` and `Consumption`.

This transformed the dataset into a consistent structure for comparing consumption across beverage categories, regions and years.

### Dashboard Analysis

- **Regional Overview:** Compared total consumption, average consumption and beverage preferences across regions.
- **Alcohol Category Analysis:** Examined consumption distribution and growth across beer, wine, vodka, brandy and champagne.
- **Wine Performance:** Analysed wine consumption, regional contribution, growth rates and comparisons with Saint Petersburg.
- **Trend & Forecasting:** Explored historical consumption patterns and projected future consumption.

### Key Insights

- Beer accounted for the largest share of overall alcohol consumption in the displayed dashboard.
- Champagne recorded the highest category growth at 7.28%, followed by beer at 3.37% and wine at 2.37%.
- Wine consumption varied considerably across regions, creating opportunities for regional comparison.
- The dashboard highlighted differences in wine growth and consumption share, helping distinguish high-volume regions from faster-growing markets.

### Business Value
The analysis provides a regional view of consumption patterns that can support market comparison, product planning and identification of potential growth opportunities.

### Tools & Skills
Power BI · Power Query · Data Transformation · Time-Series Analysis · Forecasting · Regional Analysis · Data Visualisation

**Forecasting Future Consumption**

Used Power BI's built-in Analytics pane Forecast feature to project future alcohol consumption from historical trends. Configured a 10-point forecast horizon, with seasonality set to automatic. The visual includes a confidence interval to communicate uncertainty around the projected values.
