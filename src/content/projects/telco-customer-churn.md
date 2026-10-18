---
title: Telco Customer Churn
abstract: Exploring a statistical classification problem through exploratory analysis, logistic regression, and decision trees. Built in R and documented with Quarto.
discipline: Statistical modeling
order: 1
status: Documented project
statusDetail: The methods, implementation language, and documentation format are confirmed. Dataset provenance, experiment details, and measured results have not been supplied for this portfolio.
tags: [R, Quarto, Logistic regression, Decision trees]
visual: classification
pendingLinks: [GitHub repository, Quarto report]
---

## Context & problem

Customer churn is a statistical classification problem: the task is to distinguish customers who churn from those who do not. This project approaches that problem through exploratory analysis and two modeling families, logistic regression and decision trees.

The work is implemented in **R** and documented with **Quarto**. This case study records the confirmed scope; it does not claim a particular model outperformed another or attach an unsupported business outcome to the analysis.

## Data & approach

Exploratory analysis is part of the project. The exact dataset source, observation period, target definition, and preprocessing decisions have not yet been supplied.

**Documentation to add:** the dataset reference and license, the unit of observation, how churn is defined, the available predictors, and the treatment of missing values. No customer records are reproduced here.

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

Without the dataset documentation and validation outputs, this page cannot establish predictive performance or generalizability. The next documentation step is to connect the source repository and Quarto report, then add reproducible evidence and a discussion of the model’s limits.
