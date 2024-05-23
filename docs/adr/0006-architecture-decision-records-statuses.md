# 6. Architecture Decision Records Statuses

Date: 2024-05-22

## Status

Proposed

## Context

To ensure clarity and consistency in the documentation of our Architecture Decision Records (ADRs), it is essential to define the valid statuses that an ADR can hold. This will help team members understand the current state and history of each decision.

## Decision

The following statuses are defined for use in all ADRs:

* **Proposed**: This status indicates that the ADR is in draft form and is under consideration. The decision has not yet been agreed upon and is open for discussion.
* **Accepted**: This status indicates that the ADR has been reviewed and agreed upon by the team. The decision is approved and is to be implemented.
* **Rejected**: This status indicates that the ADR has been reviewed and not approved. The decision will not be implemented.
* **Deprecated By**: This status indicates that the ADR is no longer in use and has been replaced by another ADR. It should reference the new ADR that supersedes it.
* **Superseded**: This status indicates that the ADR has been replaced by a newer ADR. The new ADR should be referenced.

## Consequences

### Benefits

* Clear and consistent understanding of the status of each ADR.
* Improved communication and documentation practices within the team.
* Easier tracking of decision history and changes over time.

### Drawbacks

* Additional effort required to maintain and update ADR statuses.
* Potential confusion during the transition period as team members adapt to the new status definitions.

### Risks

* Misinterpretation of statuses if not properly communicated or documented.
* Inconsistencies if team members do not adhere to the defined statuses.
