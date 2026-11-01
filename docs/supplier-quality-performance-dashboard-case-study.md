# Supplier Quality & Performance Dashboard
**Power BI | Power Query | DAX | Data Modelling**

### Project Overview
A supplier quality analysis project developed in Power BI to explore product defects, supplier performance, plant-level quality issues and production downtime. The dashboard provides an interactive view of quality-related metrics to support supplier monitoring and operational decision-making.

### Objective
To examine defect patterns and production downtime across vendors, plants, material types and defect categories, making it easier to explore where quality issues occur and their potential operational impact.

### My Contribution
This was a tutorial-based Power BI project completed as part of a four-part Power BI Project Marathon. My work involved preparing the data, creating dimension tables, building the analytical data structure, developing DAX measures and designing the interactive dashboard.

### Tools & Process

**1. Data Preparation:** Used Power Query to import the Supplier Quality worksheet, promote column headers, assign appropriate data types and remove duplicate records.

**2. Data Modelling:** Created six lookup tables for Vendor, Plant, Category, Material Type, Defect Type and Defect. Generated unique identifiers and merged these tables into the Supplier Fact query using inner joins.

**3. DAX Measures:** Developed measures to calculate total defect quantity, downtime hours and downtime cost using an hourly cost parameter.

**4. Visualisation:** Built interactive report pages to explore supplier quality and operational performance from different perspectives.

### Dashboard Analysis

- **Overview:** Presents the main quality and downtime indicators.
- **Vendor:** Explores defect and quality performance across suppliers.
- **Plant:** Examines quality issues across production locations.
- **Material:** Provides a breakdown of defects by material-related categories.
- **Impact:** Examines the distribution of recorded quality impacts.

### Key Observations
The dashboard displays a total defect quantity of approximately **2.60 billion**, downtime hours of approximately **215.81K**, and an estimated downtime cost of **$2.16 million**, based on the configured hourly cost parameter of $10.

The impact classification visual shows:

- Impact: 31.71%
- No Impact: 39.86%
- Rejected: 28.43%

### Recommendations

- Prioritise further investigation of suppliers and plants with high recorded defect levels.
- Review recurring defect categories to identify opportunities for quality improvement.
- Monitor downtime and associated costs to support operational planning.

### What I Learned
This project strengthened my practical experience in Power Query transformations, dimensional data modelling, DAX calculations and developing interactive Power BI reports.
