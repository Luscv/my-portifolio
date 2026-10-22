---
title: Belo Horizonte Traffic Accidents
abstract: Exploring how traffic reports vary across time and place through a relational Tableau workbook connecting incidents, people, vehicles, streets, and geographic coordinates.
discipline: Visual analytics & urban data
order: 4
status: Documented project
statusDetail: Three Tableau worksheets are available in the downloadable workbook. The interactive Tableau Public version is not published yet; refreshing the workbook requires its external Excel data source.
tags: [Tableau, Relational modeling, Temporal analysis, Mapping]
visual: relational
tableau: true
downloads:
  - label: Download the Tableau workbook (.twb)
    file: /projects/pbh/traffic-accidents.twb
galleryTitle: Inside the workbook
figures:
  - image: ../../assets/projects/pbh/annual-reports.png
    alt: Cached preview of the annual report-count bar chart, showing a cropped portion of the worksheet.
    title: Reports by year
    caption: Casos por ano — annual comparison using the report-count measure.
  - image: ../../assets/projects/pbh/monthly-participants.png
    alt: Cached preview of a year-by-month matrix with colored cells and a total row.
    title: A temporal matrix
    caption: Envolvidos Ano x Mês — a monthly matrix of the workbook’s participant measure.
  - image: ../../assets/projects/pbh/accident-locations.png
    alt: Cached preview of geographic marks over the Belo Horizonte street map.
    title: Incidents in space
    caption: Localização acidentes — geographic marks with a regional filter.
galleryNote: Original 192 × 192 previews embedded in the supplied workbook. These cropped thumbnails document the views; they are not full-resolution analytical figures.
---

## Context & questions

Traffic data becomes more useful when time, location, and the people involved can be examined together. This project explores traffic-accident records from **Belo Horizonte, Brazil**, through three connected Tableau views: reports by year, a year-by-month participant matrix, and a geographic view of incidents.

The focus is descriptive: how recorded incidents are distributed, how temporal patterns differ, and how those patterns can be explored geographically. The visualizations do not establish the causes of accidents.

## Data & relational model

The source documentation describes a **prepared dataset derived from PBH open data covering 2016–2019**. The prepared version includes modifications and added geographic information. Its results should therefore be read as properties of that snapshot, rather than as unqualified official city totals.

The workbook connects to `dados_carga_pbh.xlsx` and relates five tables through the report identifier:

| Table | Analytical role |
| --- | --- |
| `boletins` | Report type, date, region, and recorded circumstances |
| `envolvidos` | Records describing the people involved |
| `veiculos` | Vehicle characteristics and involvement |
| `logradouros` | Street and neighborhood information |
| `coordenadas` | Latitude and longitude associated with a report |

The relationships are defined in Tableau’s logical data model, with `boletins` as the shared reference. This preserves the distinction between a report, a person-related record, and a vehicle-related record when designing the analysis.

## Measures & visual methods

### Reports by year

The worksheet **Casos por ano** places year on the horizontal axis and the calculated accident measure on the vertical axis, using labeled bars. The measure stored in the workbook is:

```text
COUNT([numero_boletim])
```

This is a count of non-null report identifiers. Its interpretation as unique accidents depends on checking the report grain and any repeated identifiers.

### Year-by-month participant matrix

**Envolvidos Ano x Mês** organizes months into rows and years into columns. Square marks use both color and text, with totals enabled. Its stored measure is:

```text
SUM([numero_envolvido])
```

The meaning of `numero_envolvido` must be verified against the data before interpreting that sum as a count of distinct people. The workbook exposes the calculation; it does not resolve that semantic question by itself.

### Geographic view

**Localização acidentes** uses latitude and longitude, with the report-count measure encoded by color and size. A regional filter supports geographic exploration, and null longitudes are excluded by a worksheet filter.

## Validation & interpretation

The workbook structure, relationships, calculations, and worksheet encodings were checked directly in the supplied `.twb`. The accompanying data documentation and reference analysis provide context for interpreting the views.

The reference analysis reports that **2019 has the highest annual report count** in the prepared dataset, and identifies **Centro and Carlos Prates** as the two leading neighborhoods in its 2016 comparison. These are findings from the supplied reference analysis, not independently recomputed results from the workbook in this portfolio.

Before a refreshed analysis is published, the data checks should establish:

- Whether each report identifier is unique at the incident grain.
- Whether the participant field represents a count, an identifier, or a sequence.
- The effect of missing coordinates and regional filtering on the displayed population.
- Whether time comparisons use the same observation and filtering rules.

## Views & deliverable

The deliverable is a **three-worksheet Tableau workbook** that combines annual, monthly, and spatial exploration. The original cached previews below show the implemented views without substituting invented charts or values.

The workbook is available for download on this page. It is a `.twb` definition, not a packaged `.twbx` containing its data. Reopening and refreshing it requires reconnecting the external Excel file. A Tableau Public embed can be added when the public version is available.

## Limitations & next steps

The underlying Excel data is not included in the material available for this portfolio, so the calculations cannot yet be rerun here. Cached thumbnails are small, cropped previews and should not be used to read precise values or infer the full extent of a view.

The next steps are to verify the measures against the source data, export legible full-size figures, and publish the interactive version. Descriptive differences by location, weather, or participant characteristics would require further analysis before supporting causal conclusions.

*Source context: PBH open data. Prepared-data documentation and reference analysis: Rodrigo Vitorino Moravia, supplied supporting materials.*
