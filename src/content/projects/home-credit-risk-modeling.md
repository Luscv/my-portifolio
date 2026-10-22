---
title: Home Credit — Credit Risk Modeling
shortTitle: Home Credit Risk Modeling
abstract: Repayment-risk modeling with Home Credit application data, financial ratios, and credit history. A study connecting interpretable logistic regression with gradient boosting through a common evaluation framework.
discipline: Credit risk & statistical learning
order: 1
status: Work in progress
statusDetail: The project spans exploratory analysis, application-level classification, financial feature engineering, credit-history integration, and a comparison of logistic regression with LightGBM.
tags: [Python, pandas, scikit-learn, Logistic regression, LightGBM]
visual: credit
links:
  - label: Credit-Risk-Modeling on GitHub
    url: https://github.com/Luscv/Credit-Risk-Modeling
  - label: Exploratory analysis notebook
    url: https://github.com/Luscv/Credit-Risk-Modeling/blob/main/notebooks/01-EDA.ipynb
  - label: Home Credit Default Risk dataset
    url: https://www.kaggle.com/competitions/home-credit-default-risk/data
---

## Context & objective

Credit assessment involves estimating the likelihood that an applicant will experience repayment difficulty. The challenge combines statistical discrimination with a financial question: how do the requested credit, the applicant’s resources, and their borrowing history inform risk?

This project studies **Home Credit Default Risk** as a binary classification problem. Its methodological scope connects an interpretable application-level baseline with financial ratios, historical credit information, and gradient boosting. The emphasis is on understanding what each modeling choice contributes to the risk-assessment process.

## Data & unit of analysis

The primary source is `application_train.csv`, where the application is the unit of analysis and `TARGET` identifies repayment difficulty. Application attributes describe financial amounts, personal circumstances, and other information available for modeling.

Two complementary sources add historical context: `bureau` contains credit records from other financial institutions, while `previous_application` describes earlier applications to Home Credit. The applicant identifier, `SK_ID_CURR`, connects these sources to the application-level dataset.

## Focused exploratory analysis

The initial exploration concentrates on the questions that shape model preparation: the distribution of the target, missing values, column types, categorical cardinality, and the scale of numerical variables. Financial amounts, age, and employment-related fields provide useful starting points for examining unusual values and encoding conventions.

This focused EDA establishes a working understanding of the data without requiring an exhaustive investigation of every variable. It guides the treatment of missingness, the encoding of categories, and the selection of financially meaningful features.

## Logistic regression baseline

**Logistic regression** provides the application-level baseline. Its role is to connect the explanatory variables to an estimated probability of repayment difficulty through a model with a transparent statistical structure.

The modeling design combines missing-value treatment, categorical encoding, and scaling where appropriate. Preprocessing is fitted within the training partition so that validation observations remain independent of those decisions. A consistent feature representation supports both estimation and the interpretation of model coefficients in their proper context.

The baseline supplies a reference for evaluating additional information and model complexity throughout the study.

## Evaluation & estimated probabilities

Three complementary views organize the evaluation:

- **ROC-AUC** assesses the ranking of applicants across classification thresholds.
- **The confusion matrix** examines the consequences of a selected threshold, including false positives and false negatives.
- **Estimated probabilities** support an examination of the distribution of risk estimates and how a threshold translates them into classifications.

A stratified validation design preserves the target distribution across partitions. Comparisons use the same validation observations and evaluation criteria, keeping differences in data preparation or model choice interpretable. Threshold selection is considered alongside the different consequences of approving a high-risk application and rejecting a lower-risk one.

## Financial feature engineering

Financial ratios put absolute amounts into the context of the applicant’s resources and the structure of the requested credit. The feature design includes:

| Ratio | Definition | Modeling purpose |
| --- | --- | --- |
| Credit to income | `AMT_CREDIT / AMT_INCOME_TOTAL` | Express the requested credit relative to reported income |
| Annuity to income | `AMT_ANNUITY / AMT_INCOME_TOTAL` | Relate the annuity amount to the applicant’s resources |
| Annuity to credit | `AMT_ANNUITY / AMT_CREDIT` | Describe the relationship between the annuity and the credit amount |

The construction accounts for missing inputs and zero denominators. These features are assessed against the application-level baseline under the same validation design, so their contribution can be considered separately from a change in algorithm. Their interpretation also depends on the units and definitions of the underlying amounts.

## Credit-history integration

The `bureau` and `previous_application` tables introduce a one-to-many relationship: an applicant can have multiple credit records or previous applications. The integration therefore summarizes historical records at applicant level before joining them to the modeling table.

Aggregations organize information such as record counts, financial amounts, credit status, and the distribution of previous application outcomes. This produces an application-level feature set while preserving the distinction between an applicant and an individual historical record.

The analysis treats the timing and availability of historical information as part of feature design. Only information appropriate to the application decision belongs in a predictive credit-risk model.

## Logistic regression & LightGBM

**LightGBM** extends the comparison to gradient-boosted decision trees. Its role is to capture nonlinear relationships and interactions that a linear log-odds specification may not express directly.

The comparison holds the validation framework constant and examines the models across the application features, engineered ratios, and aggregated credit history. Logistic regression supplies an interpretable reference; LightGBM introduces greater flexibility. ROC-AUC, threshold-based classifications, and estimated probabilities provide a common language for assessing both approaches.

## Modeling considerations

Credit-risk modeling requires care beyond discrimination alone. Class imbalance affects the interpretation of classification metrics, estimated probabilities require calibration assessment before being treated as reliable risk levels, and coefficients or feature importance do not establish causal effects.

The dataset supports a methodological study. Operational lending decisions also depend on population stability, fairness, governance, and the economic consequences of errors. These considerations frame how a statistical model can inform credit assessment.
