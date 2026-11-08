# Project evidence and metric provenance

Reviewed on 2026-11-08. Portfolio entries describe projects, with only metrics traceable to repository outputs. No model-training notebooks were executed to manufacture new scores.

## LendingClub

- Repository: `Luscv/creditRiskModeling-LendingClub`.
- Reviewed commit: `6407dbe8054d674ad8b3817dcd6e45c76572b666`.
- Source: `General Preprocessing.ipynb` (cell positions below are zero-based).
- Cell 7: 466,285 rows, 75 imported columns. These are source-data counts, not model performance or a predictor count.
- Cells 10–18: employment-tenure and 36/60-month term conversions.
- Cells 21–25: earliest-credit date parsing, century correction, fixed 2017-12-01 reference; 466,256 non-missing derived values.
- Cells 28–32: loan-issue date parsing and elapsed months; 466,285 derived values.
- The notebook contains preprocessing outputs, not fitted credit-model evaluation scores. Home Credit remains a separate project and repository.

## Stroke Prediction

- Repository: `Luscv/Stroke-prediction-study-case`.
- Reviewed commit: `c8a3438d7b274ea2b9cdfe13645e0729a225a648`.
- Source: `logistic regression.ipynb` and `data/stroke.csv`.
- Cells 11, 18, 25 and 33: 5,109 original records, 201 BMI values imputed by work-group median, 3,565 records after excluding unknown smoking status.
- The repository CSV independently confirms 249 original positive outcomes and 202 in the filtered cohort.
- Cells 51 and 71: full and reduced binomial GLMs; ten versus three predictor fields (14 versus three encoded slope terms, excluding the intercept).
- Cells 67 and 85: original ROC plot legends report 0.83 for the full model and 0.82 for the reduced model to two decimal places. The prose in cell 86 instead quotes 0.83 for the reduced model; the portfolio follows the executed figure. The code uses `model_full.fittedvalues` and `model_2.fittedvalues` on the fitting data; these are apparent/in-sample AUCs, not test-set metrics.
- Cell 88 executed output: hypertension OR 1.620 (1.156–2.271), age OR 1.074 (1.062–1.087), glucose OR 1.004 (1.002–1.007). The portfolio follows this output rather than the inconsistent prose in cell 89 (which quotes 1.785, 1.073 and 1.005).
- `src/assets/projects/stroke/reduced-model-roc.png` is decoded directly from the PNG output in cell 85, without redrawing the curve.
- Likelihood-ratio statistics and goodness-of-fit claims from the notebook are not reproduced as verified portfolio results. The portfolio does not claim held-out validation, clinical deployment, or causal effects.
