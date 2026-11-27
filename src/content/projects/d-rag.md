---
title: "D-RAG: Hybrid Search over Tabular Data"
shortTitle: D-RAG
abstract: A question-answering system for CSV data that combines exact-match and semantic retrieval, computes business metrics with pandas, and cites its sources.
discipline: Applied AI & Information Retrieval
order: 7
status: Documented project
statusDetail: A reusable Python prototype demonstrated on Northwind, with a scope check, deterministic analytics, and an evaluation harness.
tags: [Python, ChromaDB, BM25, Gemini, pandas, RAGAS]
visual: none
links:
  - label: Source repository
    url: https://github.com/Luscv/Hybrid-search-RAG
---

## Context & problem

A question about tabular data can ask for a single fact, such as an employee's supervisor, or a calculation across the entire dataset, such as comparing sales across years. The first needs the right records. The second needs a calculation, not an answer inferred from a handful of retrieved rows. D-RAG separates those two paths and checks whether the data can support the question before generating an answer.

## Data & retrieval

The demonstration uses Northwind, a fictional wholesale distributor. The ingestion pipeline standardizes CSV fields, enriches selected records with related names, and indexes a data-quality report alongside the records. Each indexed row becomes a document, allowing the system to cite its source by table and row ID.

BM25 retrieves exact terms such as names and IDs. Gemini embeddings in ChromaDB retrieve paraphrases and can match Portuguese questions against English records. Reciprocal Rank Fusion combines the two rankings without comparing their raw scores. A calibrated dense-distance threshold filters out questions with no sufficiently close match before the generation model is called.

## Deterministic analytics

For totals, rankings, and year-over-year comparisons, Gemini selects a parameterized tool. The tool validates the inputs and uses pandas to compute the answer over the relevant data, not just the retrieved rows. The pipeline also checks that citations refer to records supplied to the model or tools actually invoked. The CLI exposes tool calls and source records for inspection.

## Evaluation & limitations

A 13-question suite covers exact lookup, semantic retrieval, out-of-scope requests, analytical calculations, and data quality. Expected answers are computed independently of the production tools. The evaluation tracks abstention F1, context recall, numeric value recall, and RAGAS faithfulness. One case tests whether the answer flags a partial year rather than presenting it as comparable to a full year.

The suite is a regression check, not a benchmark. The scope threshold needs recalibration for a different dataset or embedding model. The supported analytics are limited to three tools, and the faithfulness judge uses the same model provider as generation.
