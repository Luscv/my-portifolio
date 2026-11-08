---
title: Stroke Prediction — Interpretable Logistic Modeling
shortTitle: Stroke Prediction
abstract: A completed logistic-regression project connecting clinical and demographic variables to recorded stroke occurrence, with model reduction, odds-ratio interpretation, and in-sample ROC-AUCs of 0.83 for the full model and 0.82 for the reduced model.
discipline: Statistical modeling & health data
order: 3
status: Completed project
statusDetail: Completed project covering data preparation, full and reduced logistic models, diagnostic checks, ROC analysis, and interpretation of adjusted odds ratios.
tags: [Python, statsmodels, Logistic regression, Model diagnostics]
visual: stroke
galleryTitle: ROC discrimination
galleryLayout: full
figures:
  - image: ../../assets/projects/stroke/reduced-model-roc.png
    alt: ROC curve for the reduced logistic model, with a reported area of 0.82, plotted against a diagonal reference line.
    title: Reduced logistic model
    caption: Original notebook output. Apparent ROC-AUC of 0.82 on the 3,565 observations used to fit the model.
galleryNote: The curve uses model_2.fittedvalues on the fitting cohort. It describes in-sample discrimination; it is not a held-out test result.
links:
  - label: Stroke Prediction project on GitHub
    url: https://github.com/Luscv/Stroke-prediction-study-case
  - label: Modeling notebook — reviewed version
    url: https://github.com/Luscv/Stroke-prediction-study-case/blob/c8a3438d7b274ea2b9cdfe13645e0729a225a648/logistic%20regression.ipynb
  - label: Dataset used in the project
    url: https://github.com/Luscv/Stroke-prediction-study-case/blob/c8a3438d7b274ea2b9cdfe13645e0729a225a648/data/stroke.csv
---

## Problem & project objective

This project models the relationship between clinical and demographic variables and **recorded stroke occurrence**. The objective is to combine discrimination with interpretable statistical estimates, using logistic regression to connect the binary outcome to its predictors.

The solution compares a full binomial generalized linear model with a reduced model containing **age, hypertension, and average glucose level**. It brings together data preparation, model diagnostics, ROC analysis, and adjusted odds-ratio interpretation in one documented workflow.

## Data & preparation

The repository contains a snapshot of the Stroke Prediction Dataset, identified as a Kaggle dataset in the notebook. It has **5,109 observations and 12 columns**, including an identifier, ten candidate predictor fields, and the stroke outcome.

Preparation includes categorical type conversion and imputation of **201 missing BMI values** using the median within each work-type group. Records with `Unknown` smoking status are excluded, producing a modeling cohort of **3,565 observations**, including **202 recorded stroke cases**.

The filtering decision defines the population represented by the estimates and the evaluation. It also leaves an imbalanced outcome distribution, which matters when interpreting discrimination and classification performance.

## Model design & diagnostics

Both models use a binomial GLM with a logit link, fitted with `statsmodels`. The full specification includes the ten candidate predictor fields. The reduced specification retains hypertension, age, and average glucose level following the coefficient-significance analysis.

The workflow includes numerical correlation checks, coefficient estimates, Wald tests, deviance and Pearson residual diagnostics, and ROC curves. The reduced model provides a more concise representation of the associations while retaining similar apparent discrimination at the reported precision.

## Recorded model comparison

| Measure | Full model | Reduced model |
| --- | ---: | ---: |
| Observations used for fitting | 3,565 | 3,565 |
| Predictor fields | 10 | 3 |
| Apparent ROC-AUC | 0.83 | 0.82 |

The AUC values are reported to two decimal places in the notebook’s original plots. Both curves are calculated from fitted probabilities on the same observations used to estimate the models. They quantify **in-sample discrimination**, rather than performance on a separate test set.

## Adjusted odds ratios

The reduced model’s executed coefficient output reports:

| Predictor | Odds ratio | 95% confidence interval |
| --- | ---: | ---: |
| Hypertension: present versus absent | 1.620 | 1.156–2.271 |
| Age: per additional year | 1.074 | 1.062–1.087 |
| Average glucose level: per unit | 1.004 | 1.002–1.007 |

These estimates describe associations conditional on the other retained predictors. An odds ratio changes the odds of the recorded outcome; it is not an equivalent percentage-point change in probability or evidence of a causal effect.

## Interpretation & scope

The project delivers an interpretable three-predictor specification, a comparison with the broader model, and diagnostic and ROC figures linked to the original analysis. The results characterize the filtered dataset and its recorded outcome.

Excluding unknown smoking status changes the analyzed population, and evaluation on fitting data can be optimistic. Separate validation and calibration assessment would be needed to establish performance beyond this cohort. These results do not establish prospective clinical risk or clinical validity.
