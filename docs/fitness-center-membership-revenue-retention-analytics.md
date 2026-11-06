# Fitness Center Membership, Revenue & Retention Analytics

**Onyx Data Challenge | MyGym Fitness Center | Power BI | Power Query | Python | Jupyter Notebook | DAX | ZoomCharts**

## Project overview

This challenge project uses a multi-page Power BI dashboard to explore how membership, subscriptions, revenue, retention indicators and gym usage can be understood together. It represents MyGym Fitness Center and is an analytical project, not a commercial deployment for a real fitness business.

The goal was to bring common fitness-business questions into one report: where revenue comes from, how subscription and membership groups compare, what the available churn indicators show, how members use the gym, and how results differ by location.

## Data Preparation

Before building the dashboard, I prepared the fitness centre dataset to make it suitable for analysis in Power BI. The preparation process involved working with the CSV dataset, organising the columns, assigning appropriate data types and preparing the member records for reporting.

### 1. Importing the data

I imported the prepared fitness dataset, `cleaned_fitness_data.csv`, into Power BI using Power Query. The dataset contained information about members, membership types, gym locations, visits, subscriptions and other fitness-related activities.

### 2. Organising the dataset

I promoted the first row to become the column headers, making the fields easier to identify and work with. I also assigned appropriate data types to the columns. For example, age and visit frequency were treated as numerical values, membership information as text, and attendance-related fields according to their data types.

This helped ensure that the information could be used appropriately in calculations, comparisons and dashboard visuals.

### 3. Preparing membership records

I worked on the member identification field to provide each record with an identifier for reporting purposes. The Power Query process included creating a temporary identifier using the gym location, joining date and row index. This temporary column was subsequently removed, and the existing index column was renamed to `Members ID`.

### 4. Removing duplicate records

I applied Power Query's duplicate-removal operation to the prepared dataset. This helped prevent identical records from appearing more than once in the final dataset. The exact number of duplicate records removed was not documented.

### 5. Preparing the data for analysis

After preparation, the dataset was ready to support the dashboard analysis. The fields were organised to help explore membership performance, revenue, subscription patterns, member engagement, retention and differences across gym locations.

The prepared data was then used to develop the Power BI report, with DAX measures and visualisations supporting the different areas of analysis.

### Outcome

The preparation process provided a more organised dataset for analysis and reporting. It established a foundation for examining how membership activity, revenue and customer behaviour relate to the overall performance of the fitness centre.

## Business questions

The analysis is designed to help explore:

- How is reported revenue distributed across membership types and member groups?
- How do subscription models, prices and discounts compare?
- What churn and churn-risk indicators does the report display?
- How do visit patterns, time in the gym and training activity vary?
- How do revenue, subscriptions and usage differ across gym locations?

## Dashboard pages

The report has seven sections.

### Executive Summary

Brings headline revenue and pricing indicators together with monthly revenue from new subscribers and breakdowns by age, membership type and gender. It helps decision-makers get an initial view of performance and see which member groups to explore further.

### Revenue

Includes tenure, revenue-per-day, discount and drink-subscription indicators, alongside revenue comparisons by location, membership type, age, gender and discount type. These views can help teams identify patterns and questions to investigate before adjusting offers or prioritising segments.

### Subscription

Compares subscription price, revenue, discounts and displayed churn measures across subscription models and locations. This can inform a closer review of plan differences and retention, while the underlying measure definitions should be confirmed before decisions are made.

### Membership Analysis

Looks at member counts, monthly new-member acquisition, membership mix, churn by age and membership type, tenure and selected engagement indicators such as personal-training hours. It helps teams understand how the member base is changing and where follow-up retention analysis may be useful.

### Engagement & Usage

Brings together visits per week, gym duration and peak usage indicators, check-in and check-out times, and personal-training and group-lesson activity. This can help a fitness business understand how members use its services and where engagement or resource-planning questions merit further study.

### Geographic Analysis

Uses location comparisons and maps for revenue, projected loss and churn, alongside subscription, age, sauna and drink-subscription views. It gives operators a way to explore differences between gyms; no location ranking is claimed here.

### General Analysis

Combines comparisons of drink subscriptions, sauna use, discounts and personal-training adoption and performance, with filters for member and location attributes. It supports flexible exploration of questions that span several parts of the business.

### 5. What the Dashboard Reveals

The dashboard provides an overview of the fitness centre's revenue performance, membership activity and potential retention challenges.

- **Revenue Performance:** Total revenue of $68.9K shows the overall revenue represented in the analysis, while the $34.50 average final price gives management a reference for the price members pay. Total active revenue of $33.8K highlights revenue associated with active memberships. The $35.1K in projected lost revenue points to potential revenue exposure, helping management consider the value of maintaining active memberships alongside current revenue.
- **Membership and Subscriptions:** An average subscription value of 40.1 provides context for interpreting subscription performance alongside membership revenue. It helps management understand the subscription component of the revenue picture and consider whether current offerings meet members' needs.
- **Member Retention:** The reported 50.6% churn rate and Low Risk churn-risk classification are indicators that make retention worth investigating and monitoring. They can prompt management to keep reviewing member activity and retention, while considering both measures together.
- **Revenue and Membership Patterns:** Comparing membership types, subscription models, age groups, gender, discounts and gym locations helps management understand how revenue and membership activity vary across customer segments. These comparisons can guide further questions about member needs and business performance without assuming that any specific group or location performs best.
- **Business Implication:** The revenue, subscription and retention views can inform decisions about membership pricing, subscription offerings, customer engagement and retention strategies. Management can use these findings to identify areas for closer analysis and evaluate potential actions against the centre's goals.

#### Executive Takeaway

The dashboard brings revenue and membership activity into one view, helping management identify where to investigate and make more informed decisions about pricing, subscriptions and member retention.

## Practical recommendations

The dashboard suggests areas for follow-up analysis, not proven business outcomes:

- **Revenue improvement:** Review revenue alongside member volumes and membership mix to identify segments or offers for closer investigation.
- **Membership retention:** Validate the churn-rate definition and the “Low Risk” thresholds, then use clearly defined member-level measures to guide retention discussions.
- **Subscription pricing:** Compare subscription prices and discounts with membership uptake and revenue before testing changes to plans or offers.
- **Member engagement:** Examine visits, gym time and training indicators by membership type to identify services that may merit further engagement initiatives.
- **Gym location performance:** Compare locations using consistent measures and time periods before deciding where to direct operational attention.

## Conclusion

This project organizes membership, revenue, subscription, retention and usage questions into an interactive report. Its value is in helping a fitness business explore its data from several perspectives and identify sensible next questions—while treating displayed measures as starting points for investigation rather than proof of business outcomes.
