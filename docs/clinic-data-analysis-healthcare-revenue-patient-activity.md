# Clinic Data Analysis – Healthcare Revenue and Patient Activity Analysis

**EDNA Scholarship learning project | Python | Jupyter Notebook | Power BI | Power Query**

## Project overview

A self-directed healthcare data analysis learning project developed while studying Python through the EDNA Scholarship programme. The work follows clinic records from CSV inspection and preparation in a Jupyter Notebook through exploratory analysis and reporting in Power BI. It focuses on the dataset's financial fields and the timing of patient entries; it is not a client engagement or production healthcare system.

## Background and objective

The source records combine financial fields, patient classifications and event timestamps. The objective was to prepare and explore those fields, derive hour and weekday features, investigate patient-entry and calculated financial patterns, and carry the prepared dataset into Power BI.

The work is descriptive and exploratory. It does not evaluate patient outcomes, diagnose operational causes, or establish that a pattern produced a business result.

## Tools and technologies

- **Python and Jupyter Notebook:** CSV loading, documented transformations and exploratory analysis.
- **Pandas:** Inspection, column preparation, financial conversion, missing-value handling, feature creation, aggregation, pivot tables and CSV export.
- **Matplotlib:** Figure support and the notebook's dark plotting style.
- **Seaborn:** Boxplots, violin plots, heatmaps and two-dimensional KDE density plots.
- **Power Query:** CSV imports, data type assignment and a Python transformation within a query.
- **Power BI:** Financial Class and Doctor Type report pages.

## Dataset overview and source

The notebook loads `hospital_data.csv`. Its saved `data.info()` output reports 29,999 records and 12 source columns: Date, Medication Revenue, Lab Cost, Consultation Revenue, Doctor Type, Financial Class, Patient Type, Entry Time, Post-Consultation Time, Completion Time, Doctor and Patient ID. The initial data inspection reports object/string types for all 12 columns, including the formatted financial values.

## Python data cleaning

The notebook standardises the 12 column names and strips surrounding whitespace. A custom function preserves nulls for subsequent treatment, converts values to strings, removes `$`, `_`, `-`, commas and spaces, then converts the result to numeric using `errors='coerce'`. It is applied to Medication Revenue, Lab Cost and Consultation Revenue.

```python
def clean_text(x):
    if pd.isnull(x):
        return x
    x = str(x)
    x = x.replace('$', '')
    x = x.replace('_', '')
    x = x.replace('-', '')
    x = x.replace(',', '')
    x = x.replace(' ', '')
    x = pd.to_numeric(x, errors='coerce')
    return x

data['Medication Revenue'] = data['Medication Revenue'].apply(clean_text)
data['Lab Cost'] = data['Lab Cost'].apply(clean_text)
data['Consultation Revenue'] = data['Consultation Revenue'].apply(clean_text)
```

The notebook then runs `data = data.fillna(0)` across the entire DataFrame. This applies zero substitution to non-financial fields as well as financial ones. It assumes missing values can be treated as zero; the notebook does not validate this assumption against the source system.

## Calculated field and time features

The notebook derives `Total Revenue` by adding the three named financial columns:

```python
data['Total Revenue'] = (
    data['Medication Revenue']
    + data['Lab Cost']
    + data['Consultation Revenue']
)
```

This is the notebook's row-level sum, including Lab Cost. It does not establish profit or net income, and the field name is not evidence that all operating expenses have been deducted.

The notebook extracts the hour from Entry Time, Post-Consultation Time and Completion Time:

```python
def get_hour(x):
    x = pd.to_datetime(x)
    x = x.hour
    return x

data['Entry Hour'] = data['Entry Time'].apply(get_hour)
data['Post Consultation Hour'] = data['Post-Consultation Time'].apply(get_hour)
data['Completion Hour'] = data['Completion Time'].apply(get_hour)
```

It converts Date to datetime and derives a numeric weekday index and weekday name:

```python
data['Date'] = pd.to_datetime(data['Date'])
data['dayofweek'] = data['Date'].dt.dayofweek
data['weekday name'] = data['Date'].dt.strftime('%A')
```

These features enable weekday/hour grouping and visualisation. The notebook does not calculate waiting time or consultation duration from the timestamps.

## Exploratory analysis

The notebook applies Matplotlib's `dark_background` style and uses Pandas, Matplotlib and Seaborn:

1. Groups the calculated `Total Revenue` by weekday and sums it. The saved output ranges from $97,480.16 on Thursday to $266,648.00 on Monday. These amounts derive from the notebook formula above and are not verified profit or accounting revenue.
2. Uses a Seaborn boxplot to compare the distribution of `Total Revenue` by weekday with outlier markers hidden (`showfliers=False`).
3. Uses a violin plot to show the row-level distribution shape by weekday.
4. Creates a weekday-by-entry-hour revenue pivot, sums `Total Revenue`, and displays it as a heatmap.
5. Creates a corresponding patient-activity pivot by counting `Patient ID` and displays that matrix as a heatmap.
6. Repeats revenue heatmaps with different colour maps.
7. Creates a two-dimensional KDE plot using numeric weekday and Entry Hour to display a smoothed density surface.

The pivot logic for the revenue heatmap is:

```python
pivot = pd.pivot_table(
    data,
    index='Entry Hour',
    columns='weekday name',
    values='Total Revenue',
    aggfunc='sum'
)
```

The patient-count pivot is:

```python
pivot = pd.pivot_table(
    data,
    index='Entry Hour',
    columns='weekday name',
    values='Patient ID',
    aggfunc='count'
)
```

The density visual uses:

```python
sns.kdeplot(
    x=data['dayofweek'],
    y=data['Entry Hour'],
    fill=True,
    cmap='magma'
)
```

The notebook does not report verified peak patient counts or explain why any observed pattern occurs.

## Export and Power Query workflow

The prepared DataFrame is exported with:

```python
data.to_csv('cleaned_clinic_data.csv')
```

This makes the prepared dataset available as an input to Power BI. Since `index=False` is not specified, Pandas writes the DataFrame index as well.

The supplied Power Query script for the original CSV uses `Csv.Document` with comma delimiter, 12 columns, encoding 1252 and `QuoteStyle.None`. It promotes headers, assigns data types, replaces `$-` with `0` in Lab Cost, and converts Lab Cost to Currency.Type. This is separate from the notebook's Python cleaning.

The supplied cleaned-file query imports 19 columns, assigns types to the date, financial, category, time, ID and derived hour/weekday fields, and renames the first blank column to `Index`. The project evidence establishes its column name, not a further business meaning.

Python is also used separately inside a Power Query step to create a patient-count pivot from the query's `dataset`:

```python
import pandas as pd

pivot = pd.pivot_table(
    dataset,
    index='Entry Hour',
    columns='weekday name',
    values='Patient ID',
    aggfunc='count'
)

pivot.columns = ['Mon', 'Tue', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun']
pivot = pivot.reset_index()
```

This transformation is distinct from the Jupyter Notebook workflow.

## Power BI dashboard

The PBIX contains two pages: **Financial Class** and **Doctor Type**.

- **Financial Class:** The report view covers Corporate, HMO, Insurance, Medicare and Private categories. The described visuals include patient and revenue KPI cards, a patient-entry trend combining patient count and revenue, a revenue activity heatmap and a patient activity density visual.
- **Doctor Type:** The report view covers Anchor, Floating and Locum categories and the described patient/revenue cards and activity visuals.

The dashboard description supplied with the project reports approximately 22K patients and $843.99K revenue for the Financial Class view, and 30.00K patients and $1.14M revenue for the Doctor Type view. However, the only Clinic dashboard screenshot available in the repository is a Corporate-selected Financial Class capture; its visible cards show 6,915 for Count of Patient ID and $256K for Total Revenue. These values represent different displayed states and must not be added together or treated as distinct patients or non-overlapping revenue. The exact KPI definitions and filter context have not been independently verified.

No separate Doctor Type screenshot was available among the project image files, so the page documents that report view without fabricating an image.

## Analytical questions and interpretation

The notebook and report are structured to explore:

- Which weekdays and hours have relatively high patient-entry activity.
- How the notebook's calculated financial total varies by weekday and entry hour.
- How row-level financial values are distributed across weekdays.
- How clinic activity can be explored by Financial Class and Doctor Type.
- How time-based heatmaps and density views complement summary KPI cards.

These are exploratory questions. The available evidence does not establish staffing shortages, doctor productivity, waiting times, profitability, operational efficiency or cost savings.

## Limitations and data-quality considerations

- `fillna(0)` applies to all columns, including non-financial fields, and its assumptions were not validated against the source system.
- The cleaning function strips hyphens and other characters; its behaviour should be reviewed against the original data format.
- The notebook does not demonstrate a formal duplicate-record investigation or formal outlier investigation.
- No verified patient waiting-time, consultation-duration, doctor-productivity or profitability calculation is shown.
- The `Total Revenue` calculation adds Lab Cost to two fields named as revenue; it is not demonstrated as profit, net income or a verified accounting revenue measure.
- Dashboard screenshots do not define every KPI. Figures from separate report views or filter states are not safe to combine without checking the PBIX calculations.
- The evidence does not show that missing values, duplicates or all other data-quality issues were fully resolved.
- The notebook exports the DataFrame index, which appears as a blank first column in the supplied cleaned-data import and is renamed `Index`.

## Skills demonstrated and learning outcomes

This learning project demonstrates CSV loading and inspection with Pandas; custom text-to-number cleaning; missing-value handling; calculated and time-based fields; grouping and aggregation; heatmap, boxplot, violin and density visualisation; Python in Power Query; and integration of Python preparation with Power BI reporting. It documents practical learning rather than production-level healthcare software development.
