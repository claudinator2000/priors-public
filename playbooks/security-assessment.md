# Security assessment

Assessment is read-only unless remediation was explicitly requested. State the
scope, assets, trust boundaries, attacker capabilities and assumptions before
listing findings. Mark evidence as **confirmed**, **inferred** or **not assessed**;
absence of evidence is not evidence of safety.

## Finding format

| Field | Required content |
|---|---|
| ID and title | Stable identifier and concrete failure |
| Likelihood | Low/medium/high, with conditions needed for exploitation |
| Impact | Low/medium/high/critical, naming affected confidentiality, integrity or availability |
| Risk | Low/medium/high/critical: a judgment combining likelihood and impact, with rationale |
| Evidence | Exact file, setting, revision or reproduction; evidence status |
| Remediation | Smallest change that removes or contains the risk |
| Effort | XS/S/M/L estimate, uncertainty and operational prerequisites |
| Verification | Regression test or observation that proves the remediation |
| Status | Open, accepted, remediated or needs investigation |

Remediation effort is not a risk axis. Use it to plan sequencing after risk is
understood: a low-effort high-risk fix is a quick win, while a high-effort
high-risk finding still remains high risk. A defined organizational matrix may
map likelihood and impact to a rating, but bare arithmetic creates false
precision. Record risk acceptance, owner and review date explicitly.

## Review path

1. Confirm what actually ships and which repository/host controls are active.
2. Apply the [repository security baseline](../SECURITY_BASELINE.md) and the
   project's own threat model to the scoped attack paths.
3. Examine identity, authorization, secrets, untrusted input, network egress,
   supply chain, build/deploy provenance, persistence, backup and recovery.
4. Test failure behavior and security tooling with safe known-bad fixtures.
5. Separate confirmed vulnerabilities from hardening opportunities and unknowns.
6. Rank by risk, then use effort and dependencies to form a remediation order.
7. Re-run the evidence on the exact remediated revision.

Finish with a compact matrix of findings and a separate limitations section.
Do not hide uncertainty inside a severity label or claim that an unavailable
forge feature is enabled.
