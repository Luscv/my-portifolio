---
title: Home Credit — Credit Risk Modeling
shortTitle: Home Credit Risk Modeling
abstract: A credit-risk modeling project that combines application data, financial ratios, and credit history to estimate repayment difficulty, using logistic regression and LightGBM within a consistent validation framework.
discipline: Credit risk & statistical learning
order: 1
status: Work in progress
statusDetail: Credit-risk modeling pipeline covering data preparation, financial feature engineering, credit-history integration, model training, and probability-based evaluation.
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

## Problem & project objective

Lending decisions require an assessment of repayment risk. Application details, financial amounts, and borrowing history provide different parts of that assessment; the modeling challenge is to combine them into consistent risk estimates and make the consequences of classification thresholds explicit.

This project develops a **credit-risk modeling pipeline** using Home Credit data. The objective is to estimate the probability of repayment difficulty and support model selection through a structured comparison of logistic regression and LightGBM.

The solution connects application-level data preparation, financial feature engineering, and credit-history aggregation with model training and validation. Each technical decision serves the same objective: a consistent basis for ranking risk and assessing classification trade-offs.

## Data & unit of analysis

The primary source is `application_train.csv`, where the application is the unit of analysis and `TARGET` identifies repayment difficulty. Application attributes describe financial amounts, personal circumstances, and other information available for modeling.

Two complementary sources add historical context: `bureau` contains credit records from other financial institutions, while `previous_application` describes earlier applications to Home Credit. The applicant identifier, `SK_ID_CURR`, connects these sources to the application-level dataset.

## Exploratory analysis & data preparation

Exploratory analysis identifies the data issues that affect estimation: target imbalance, missing values, column types, categorical cardinality, and the scale of numerical variables. Financial amounts, age, and employment-related fields receive particular attention because unusual values and encoding conventions affect their interpretation.

These checks guide missing-value treatment, categorical encoding, and the construction of financially meaningful features. EDA is focused on decisions that affect the modeling pipeline.

## Logistic regression baseline

**Logistic regression** estimates repayment risk from application-level features and provides an interpretable baseline for model selection. Its linear log-odds structure makes it a useful reference for assessing additional features and greater model complexity.

The modeling design combines missing-value treatment, categorical encoding, and scaling where appropriate. Preprocessing is fitted within the training partition so that validation observations remain independent of those decisions. A consistent feature representation supports both estimation and the interpretation of model coefficients in their proper context.

The baseline anchors the comparison with financial ratios, aggregated credit history, and gradient boosting under the same evaluation criteria.

## Validation & risk estimates

The validation framework evaluates ranking quality, classification decisions, and predicted risk:

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

Feature construction accounts for the timing and availability of historical information. The modeling table includes information appropriate to the application decision, preserving the boundary between predictors and subsequent outcomes.

## Model comparison: logistic regression & LightGBM

**LightGBM** extends the comparison to gradient-boosted decision trees. Its role is to capture nonlinear relationships and interactions that a linear log-odds specification may not express directly.

The comparison holds the validation framework constant and examines the models across the application features, engineered ratios, and aggregated credit history. Logistic regression supplies an interpretable reference; LightGBM introduces greater flexibility. ROC-AUC, threshold-based classifications, and estimated probabilities provide a common language for assessing both approaches.

## Risk controls & decision context

Credit-risk modeling requires care beyond discrimination alone. Class imbalance affects the interpretation of classification metrics, estimated probabilities require calibration assessment before being treated as reliable risk levels, and coefficients or feature importance do not establish causal effects.

Risk estimates inform credit assessment alongside lending policy, portfolio stability, fairness, governance, and the economic consequences of errors. The project connects model selection and threshold analysis to these decision-making requirements.
