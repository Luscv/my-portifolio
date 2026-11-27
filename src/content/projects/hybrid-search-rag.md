---
title: Hybrid Search RAG
abstract: A question-answering system for CSV data that combines exact-match and semantic retrieval, computes business metrics with pandas, and cites its sources.
discipline: Applied AI & Information Retrieval
order: 2
status: Documented project
statusDetail: A reusable Python prototype demonstrated on Northwind, with a scope check, deterministic analytics, and an evaluation harness.
tags: [Python, ChromaDB, BM25, Gemini, pandas, RAGAS]
visual: rag
links:
  - label: Source repository
    url: https://github.com/Luscv/Hybrid-search-RAG
  - label: Evaluation questions and expected answers
    url: https://github.com/Luscv/Hybrid-search-RAG/blob/82566669deaa42647884bef7b9cf6a460ab2f32c/eval/dataset.csv
  - label: Reference answers notebook
    url: https://github.com/Luscv/Hybrid-search-RAG/blob/82566669deaa42647884bef7b9cf6a460ab2f32c/eval/gabarito.ipynb
  - label: Evaluation notebook
    url: https://github.com/Luscv/Hybrid-search-RAG/blob/82566669deaa42647884bef7b9cf6a460ab2f32c/src/Evals.ipynb
---

## Context & problem

A question about tabular data can ask for a single fact, such as an employee's supervisor, or a calculation across the entire dataset, such as comparing sales across years. The first needs the right records. The second needs a calculation, not an answer inferred from a handful of retrieved rows. The system separates those two paths and checks whether the data can support the question before generating an answer.

## Data & retrieval

The demonstration uses Northwind, a fictional wholesale distributor. The prepared dataset contains 3,202 records across eight tables, including 830 orders and 2,155 line items. The ingestion pipeline standardizes CSV fields, enriches selected records with related names, and indexes a data-quality report alongside the records. Each indexed row becomes a document, allowing the system to cite its source by table and row ID.

BM25 retrieves exact terms such as names and IDs. Gemini embeddings in ChromaDB retrieve paraphrases and can match Portuguese questions against English records. Reciprocal Rank Fusion combines the two rankings without comparing their raw scores. A calibrated dense-distance threshold filters out questions with no sufficiently close match before the generation model is called.

## Deterministic analytics

For totals, rankings, and year-over-year comparisons, Gemini selects a parameterized tool. The tool validates the inputs and uses pandas to compute the answer over the relevant data, not just the retrieved rows. The pipeline also checks that citations refer to records supplied to the model or tools actually invoked. The CLI exposes tool calls and source records for inspection.

## Evaluation design

The published evaluation set contains 13 questions in Portuguese. Reference answers are calculated independently of the production tools and can include expected source IDs, tool calls, and numerical values.

| Test category | Questions | What the reference checks |
| :--- | ---: | :--- |
| Exact lookup | 3 | Specific prices, orders, or reporting relationships |
| Semantic retrieval | 2 | Whether Portuguese queries find the matching English-language records |
| Out of scope | 2 | Whether the system refuses unsupported requests |
| Analytical calculations | 4 | The expected tool and numbers for totals, rankings, or comparisons |
| Data quality | 2 | Documented issues from the preparation report |

The notebook measures abstention F1, context recall, numerical value recall, and RAGAS faithfulness. The public repository contains the test cases, reference answers, and notebook code, but not saved model responses or aggregate scores. The examples below are expected answers, not observed model performance.

## What the reference answers show

- **P01, exact lookup:** Côte de Blaye costs **US$263.50** per unit in product record 38.
- **P07, out of scope:** Northwind contains Nancy Davolio's employee record, but not her salary. The expected answer is to abstain.
- **P10, period comparison:** the reference totals for Germany are **US$117,320.16** in 1997 and **US$77,557.32** in 1998. The latter covers January through May only, so the totals do not establish a year-over-year decline.
- **P13, data quality:** the reference report documents **209 malformed source rows** repaired for unescaped commas.

## Limitations

The suite is a regression check, not a benchmark. The scope threshold needs recalibration for a different dataset or embedding model. The supported analytics are limited to three tools, and the faithfulness judge uses the same model provider as generation.
