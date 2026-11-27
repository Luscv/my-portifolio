---
title: LendingClub — Credit Risk Modeling
shortTitle: LendingClub Credit Risk Modeling
abstract: Credit-risk data preparation across 466,285 LendingClub loans, transforming employment tenure, loan terms, and credit dates into consistent numerical features.
discipline: Credit risk & data preparation
order: 1
status: Work in progress
statusDetail: A credit-risk modeling project built around reproducible preparation of LendingClub loan records and explicit handling of financial time variables.
tags: [Python, pandas, NumPy, Feature engineering]
visual: lending
links:
  - label: LendingClub project on GitHub
    url: https://github.com/Luscv/creditRiskModeling-LendingClub
  - label: Preprocessing notebook — reviewed version
    url: https://github.com/Luscv/creditRiskModeling-LendingClub/blob/6407dbe8054d674ad8b3817dcd6e45c76572b666/General%20Preprocessing.ipynb
---

## Objective & data scope

Reliable credit-risk modeling depends on consistent representations of loan terms, borrower history, and the timing of financial information. This project prepares LendingClub records for that modeling workflow, with particular attention to employment duration and credit-history dates.

The preprocessing notebook imports the **2007–2014 loan-data extract** and records the following scope:

| Measure | Recorded value |
| --- | ---: |
| Loan records | 466,285 |
| Imported columns | 75 |
| Loan terms represented | 36 and 60 months |
| Usable earliest-credit dates | 466,256 |

These figures describe the source data and its coverage. The imported columns include identifiers, application attributes, and subsequent loan-performance fields; predictor selection must respect which information is available at the lending decision.

## Employment tenure & loan terms

The preparation workflow converts employment-length descriptions into numerical years, including the values `10+ years` and `< 1 year`. It also converts the loan-term strings into integer month counts.

This standardization makes the fields usable in numerical analysis while retaining their financial meaning. Missing employment values remain identifiable instead of being silently presented as observed tenure.

## Credit-history dates

The project parses the earliest credit-line date and loan-issue date, then derives elapsed months from a fixed reference of **December 1, 2017**. A century correction moves parsed earliest-credit dates that fall after the reference back by 100 years, addressing the ambiguity of two-digit years.

The recorded credit-history feature has **466,256 non-missing observations**, leaving 29 records without an earliest-credit date. Loan-issue elapsed months cover all **466,285 records**.

The resulting numerical fields are employment tenure, loan term, months since the earliest credit line, and months since loan issue. The fixed reference makes the historical transformation reproducible; a decision-time implementation would anchor features to the relevant application date.

## Deliverable & evidence

The project’s preprocessing notebook contains the transformation code, data-type checks, source-column inventory, and descriptive summaries of the derived time variables. The figures above are recorded dataset and preparation measures.

The linked notebook preserves the reviewed repository version so that the published scope can be traced to its outputs. Source loan files are referenced by the code and are not redistributed through this portfolio.
