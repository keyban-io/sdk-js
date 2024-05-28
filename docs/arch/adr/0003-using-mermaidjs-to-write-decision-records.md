# 3. Using mermaidJS to write decision records

Date: 2024-04-30

## Status

Accepted

## Context

We have to provide a living documentation of our system. There are plenty of
ways to do this. We are quite seduced by Simon Brown's C4 model. He created a
tool called [structurizr](https://docs.structurizr.com/) that is quite promising, among other things because:
1. it allows you to define the model separately from the views
2. it integrates well with the adr command line tool


Yet, the learning curve is quite steep. On the other hand, there is mermaidJS
that seems to be easier to grasp, yet is much less featureful.

## Decision

We will try mermaidJS for a start, betting that several people will work
together. If not, we can try some more complicated tools like structurizr in the
future.
