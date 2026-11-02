# Apple Stock Market Trend Analysis Using Python
**Practical Financial Data Analysis | Python | Jupyter Notebook | yfinance**

### Project Overview
Historical market data helps analysts describe how an asset's price has changed, compare movement over different time horizons, and communicate the shape of a time series. This project uses Apple (AAPL) historical prices as the primary series and rolling averages as descriptive references for short-, medium- and longer-window price behaviour.

The notebook requests data for Apple alongside six other stocks and market indices, inspects the downloaded data, prepares an Apple price series, calculates 20-, 50- and 200-day simple rolling means, and visualises the result. It is a historical trend exploration project: it does not establish why prices moved, evaluate an investment's return, predict future prices, or recommend a trade.

### Project Context & Objectives
The analytical task is to turn historical daily price observations into a view that is easier to inspect across time. A shorter moving-average window responds more quickly to recent observations; longer windows average more observations and therefore provide smoother, more lagged historical context. Viewing these lines together helps an analyst compare near-term variation with broader historical direction without treating any line as a forecast.

The notebook's scope is the retrieval, inspection, preparation and visualisation workflow. It does not demonstrate a backtest, buy/sell rules, return calculations, causal analysis or predictive modelling.

### Tools & Technologies

- **Python and Jupyter Notebook:** Notebook-based environment for running and documenting the analysis.
- **yfinance:** Used to request historical data for the listed tickers.
- **Pandas:** Used with the downloaded data to inspect columns and rows, select Apple price fields, fill missing values and calculate rolling means.
- **Matplotlib:** Used for static line charts.
- **Plotly Express:** Used for an interactive historical-price line chart.
- **Plotly Graph Objects:** Used to assemble the final interactive chart from individual traces and set its layout.
- **NumPy and Seaborn:** Checked during environment setup; the notebook does not demonstrate analytical use of NumPy or Seaborn.
- **scikit-learn and statsmodels:** Checked during environment setup only. They are not used to build models in this notebook.

### Data Sources & Acquisition
The notebook calls `yfinance.download()` for seven instruments:

| Ticker | Instrument |
|---|---|
| `AAPL` | Apple |
| `GOOGL` | Alphabet |
| `MSFT` | Microsoft |
| `^GSPC` | S&P 500 |
| `TSLA` | Tesla |
| `^FTSE` | FTSE 100 |
| `^N225` | Nikkei 225 |

The additional tickers make other stocks and indices available in the downloaded dataset for inspection. The subsequent price-preparation and moving-average analysis focus on Apple.

The start and end dates are calculated at run time: the end date is the current date, and the start date is calculated as five times 365 days earlier. The call groups columns by ticker and disables threaded downloads:

```python
end_date = datetime.today().strftime('%Y-%m-%d')
start_date = (datetime.today() - timedelta(days=5*365)).strftime('%Y-%m-%d')

data = yf.download(
    tickers,
    start=start_date,
    end=end_date,
    group_by='ticker',
    threads=False
)
```

No explicit interval, `auto_adjust`, retry policy or fixed date range is supplied in this call; behaviour for parameters not specified is therefore left to the installed `yfinance` version.

### Data Inspection & Preparation
The notebook inspects samples using `.head()` (for Apple, Tesla, the full downloaded data, and a larger data preview). For Apple's downloaded frame it prints `.columns`, uses `len()` to count rows and calls `.isnull().sum()` to count missing values by field.

It then selects Apple's `Adj Close` field if that field exists; otherwise it selects `Close`. The selected field is copied into its own frame and renamed `Adjusted_Close`. Missing values are forward-filled using the last available observation, after which any remaining missing rows are dropped:

```python
if 'Adj Close' in data['AAPL'].columns:
    aapl = data['AAPL'][['Adj Close']].copy()
    aapl.rename(columns={'Adj Close': 'Adjusted_Close'}, inplace=True)
else:
    aapl = data['AAPL'][['Close']].copy()
    aapl.rename(columns={'Close': 'Adjusted_Close'}, inplace=True)
    print("⚠️ Using Close price because 'Adj Close' not found.")

aapl.fillna(method='ffill', inplace=True)
aapl.dropna(inplace=True)
```

This fallback is important when describing the series: `Adjusted_Close` is the notebook's common output column name, but the selected source field depends on which columns are returned by the download. In the saved preparation-cell output, the fallback message indicates that `Close` was selected.

The saved notebook outputs need to be interpreted cautiously. The multi-ticker download cell records a Yahoo Finance rate-limit error and seven failed downloads, while later saved cells show a populated Apple sample, a count of 1,299 rows, and 45 missing values before cleaning. These saved outputs do not establish a clean, consistent end-to-end rerun. In the displayed preparation output, the missing-value count is zero after forward filling and dropping remaining nulls. The row count and missing-value counts describe those saved outputs, not a guaranteed result for a future run.

### Technical Workflow & Code Examples

#### Stage 1 – Environment setup
The first setup cell attempts to import `yfinance`, `pandas`, `numpy`, `matplotlib`, `seaborn`, `plotly`, `sklearn` and `statsmodels` with `importlib`. A follow-up cell collects packages whose imports fail, then runs `pip install` through the active notebook interpreter (`sys.executable -m pip install ...`) and rechecks imports. The saved output says `yfinance` was missing, the installation command completed, and the packages were then importable. The notebook does not use scikit-learn or statsmodels for modelling.

#### Stage 2 – Financial data acquisition
The notebook imports `yfinance` and Pandas, calculates dates dynamically with `datetime` and `timedelta`, then calls `yf.download()` for the seven tickers. `group_by='ticker'` requests ticker-grouped columns, and `threads=False` disables threaded downloads. The Apple series is the focus of the downstream work.

#### Stage 3 – Data inspection
Calls to `.head()` display sample rows; `.columns` reveals available Apple fields; `len(data["AAPL"])` reports the number of Apple rows in the saved output; and `.isnull().sum()` counts missing values by column. These checks are used to inspect the retrieved structure and identify null observations before preparing the single-column price series.

#### Stage 4 – Apple data preparation
The notebook conditionally selects `Adj Close` or `Close`, renames the copied series to `Adjusted_Close`, forward-fills missing values and drops any remaining null rows. The complete selection and cleaning code is shown above. The code uses `fillna(method='ffill')`; the notebook output includes a Pandas `FutureWarning` that this `method` form is deprecated in the runtime used for that saved execution.

#### Stage 5 – Historical price exploration
The notebook plots `Adjusted_Close` against the Apple date index with Matplotlib as a blue static line, titled “Apple (AAPL) Stock Price Trend - Last 5 Years”. Its y-axis label is `"Sock Price (USD)"` in the source code. It then creates a second view with `plotly.express.line`, labels the horizontal axis as Date and the vertical measure as Price (USD), and colours the line red. The first is a static notebook figure; the Plotly Express view is interactive.

#### Stage 6 – Moving-average calculations
The notebook calculates three rolling arithmetic means from `Adjusted_Close`:

```python
aapl['MA20'] = aapl['Adjusted_Close'].rolling(window=20).mean()
aapl['MA50'] = aapl['Adjusted_Close'].rolling(window=50).mean()
aapl['MA200'] = aapl['Adjusted_Close'].rolling(window=200).mean()
```

- **20-day moving average:** averages the latest 20 observations in each rolling window. It responds more quickly to recent price changes and makes shorter-window movement easier to compare.
- **50-day moving average:** averages 50 observations, giving a more smoothed and slower-moving reference than the 20-day line.
- **200-day moving average:** averages 200 observations, giving a still smoother, longer-window historical reference that reacts more slowly.

These are descriptive calculations over historical observations. They do not guarantee future direction or provide a validated trading signal.

#### Stage 7 – Final interactive chart
The final chart uses `plotly.graph_objects` (`go.Figure` and `go.Scatter`) to add four line traces: actual `Adjusted_Close`, `MA20`, `MA50` and `MA200`. Its layout sets a dark Plotly theme, Date x-axis, Price (USD) y-axis, and `hovermode='x unified'`, which presents hover details together at the selected x position.

```python
fig.update_layout(
    title='Apple (AAPL) Stock with 20, 50, and 200-Day Moving Averages',
    xaxis_title='Date',
    yaxis_title='Price (USD)',
    template='plotly_dark',
    hovermode='x unified',
    width=950,
    height=550
)
```

The saved chart asset in this case study is the notebook's dark four-line moving-average visualisation. No additional chart has been fabricated for the website.

### Visual Analysis & Interpretation
In the final visual, the actual price line varies more sharply than the rolling averages. The 20-day line follows changes more closely than the 50-day and 200-day lines because its rolling window includes fewer observations. The 50-day and especially the 200-day lines are smoother historical references and respond with more delay.

The combined chart allows a reader to inspect price movement alongside the three averaging horizons, zoom or move through the date axis, and examine aligned values with the chart's unified hover. The notebook does not report specific crossover dates, percentage gains, investment returns, trading signals or forecast values. Its analysis is visual trend exploration rather than quantified investment-performance evaluation.

### Key Takeaways

- The notebook contains a complete coded workflow for environment checks, multi-ticker data retrieval, Apple-field selection, missing-value handling, rolling calculations and chart construction.
- The final chart brings historical Apple prices and 20-, 50- and 200-observation rolling averages into one interactive view.
- The short window is more responsive to recent movement; longer windows offer smoother, more lagged historical context.
- Saved output cells include a rate-limit failure for the download alongside populated downstream Apple outputs. A reproducible clean download is not verified by the saved notebook state.

### Business Relevance
Historical price and moving-average visualisations can support market-trend monitoring, exploratory technical analysis, comparison of shorter- and longer-window historical direction, and communication of financial time-series data to stakeholders. These are potential applications of the workflow; the notebook itself performs data retrieval and visual exploration and does not carry out investment decisions, trading, backtesting or formal forecasting.

### Limitations & Considerations

- The notebook does not demonstrate a backtested trading strategy or calculate buy/sell signals.
- It does not establish predictive accuracy and does not provide a formal investment recommendation.
- The five-year start date is recalculated from the execution date, so the retrieved window changes over time.
- The selected price field depends on the fields returned by yfinance: `Adj Close` is preferred when present; otherwise the notebook uses `Close`.
- Moving averages are calculations over past observations. They are descriptive and lagging references, not guaranteed predictors.
- The saved download output reports Yahoo Finance rate limiting and failed downloads, while later cells retain populated Apple data. The saved notebook does not verify a clean end-to-end rerun.
- The notebook's saved output shows that its `fillna(method='ffill')` call raised a Pandas deprecation warning in that environment.
- No transaction-cost model, portfolio construction, return/risk evaluation, or formal comparison of the additional tickers is demonstrated.

### Skills Demonstrated

- Financial market data retrieval with the `yfinance` library.
- Data inspection and preparation using Pandas.
- Missing-observation checks, forward filling and removal of remaining null rows.
- Rolling-window calculations for 20-, 50- and 200-day means.
- Historical time-series exploration.
- Static chart creation with Matplotlib.
- Interactive chart development with Plotly Express and Plotly Graph Objects.
- Communicating what a chart shows while distinguishing historical description from prediction or investment advice.
