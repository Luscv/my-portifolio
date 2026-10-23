---
title: Telco Customer Churn
abstract: Predictive analysis of the Telco Customer Churn dataset from Kaggle, using exploratory analysis, logistic regression, and decision trees in R and Quarto.
discipline: Statistical modeling
order: 3
status: Documented project
statusDetail: The Kaggle data source, predictive objective, and modeling approach are documented. Experiment details and measured model performance will be added with their supporting analysis.
tags: [R, Quarto, Logistic regression, Decision trees]
visual: classification
links:
  - label: Telco Customer Churn dataset on Kaggle
    url: https://www.kaggle.com/datasets/blastchar/telco-customer-churn
pendingLinks: [GitHub repository, Quarto report]
---

## Context & problem

The objective is to develop a **predictive analysis of customer churn** using the Telco Customer Churn dataset available on Kaggle. This is a statistical classification problem: distinguishing customers who churn from those who do not.

The project combines exploratory analysis with two modeling families, logistic regression and decision trees, to investigate that predictive task.

The project is implemented in **R** and documented with **Quarto**, combining exploratory analysis with interpretable classification models for customer churn prediction.

## Data & approach

The data comes from the [Telco Customer Churn dataset published by blastchar on Kaggle](https://www.kaggle.com/datasets/blastchar/telco-customer-churn). Exploratory analysis is used to investigate the supplied customer data before modeling the churn outcome.

**Reproducibility details to add:** the exact downloaded version, dataset licensing, the operational definition of the target, selected predictors, and the treatment of missing values. The source link establishes provenance; it does not by itself document the preprocessing used in the analysis.

## Statistical methods

The project uses **logistic regression** and **decision trees**. Logistic regression models the probability of a binary outcome; a decision tree partitions observations through successive decision rules.

For reference, the standard logistic model can be written as:

$$
\Pr(Y=1\mid x)=\frac{1}{1+\exp[-(\beta_0+\beta^\top x)]}.
$$

This expression describes the method, not the fitted specification or coefficients of this project. The tree diagram above is also a method illustration, not an exported model.

## Experiments & validation

The validation design and experiment outputs have not yet been provided. There are no verified split proportions, tuning settings, evaluation metrics, or model comparisons to report.

**Documentation to add:** the train/test strategy, any resampling procedure, how preprocessing avoids leakage, how class balance is handled, and the rationale for the chosen evaluation measures.

## Results & visualizations

No measured results or project plots have been supplied for publication. Performance metrics, feature effects, and substantive findings will be added only with their supporting analysis.

The editable content can hold exported Quarto figures, plots, tables, and code excerpts alongside an explanation of what each result does—and does not—establish.

## Limitations & future work

The data source and predictive objective are established, but the validation outputs are not yet published here. Predictive performance and generalizability cannot be inferred from the choice of dataset or algorithms. The next documentation step is to connect the source repository and Quarto report, then add reproducible evidence and a discussion of the model’s limits.
