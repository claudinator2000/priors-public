# Publish repository content

Use before writing to a remote whose audience may include the public, and before
changing repository visibility. Publication includes pushes, API-created commits,
pull requests, comments, releases, artifacts and other externally visible state.
A local commit is not publication.

## Gate 1: local commit

Apply the [repository security baseline](../SECURITY_BASELINE.md). Run the
configured Git-aware secret scan and every applicable source or artifact scan
before remote publication. Before making a repository public, scan the full
reachable history and all artifacts that will become visible.

This gate does not require a network visibility lookup: local commits remain
useful for offline work and recovery. Until the scans are configured, report
them as **advisory**, not enforced.

## Gate 2: remote write

Resolve the exact destination and its current visibility through an authenticated,
read-only host query immediately before the write.

- **Private:** this visibility gate passes; other task authorization and checks still apply.
- **Public or internal:** stop unless the user's current request explicitly
  authorizes publishing that content to that exact destination.
- **Unknown:** fail closed and stop. A remote URL or failed API request is not
  evidence of privacy.

A contribution request that clearly names an existing public destination and the
intended change may supply the authorization. Do not stretch approval for one
destination, revision or kind of content to another. Local pre-push hooks are
defense in depth: they can be bypassed and do not intercept API writes.

## Gate 3: private to public

Treat the transition as irreversible disclosure. Use two explicit user actions:
one to initiate the assessment and a final one to publish.

1. Freeze the candidate commit and record its full object ID.
2. Obtain a [security assessment](security-assessment.md) scoped to that exact
   revision, or run one because the user explicitly requested it.
3. Inspect every branch, tag, pull-request ref (GitHub keeps the head of a
   deleted branch there) and reachable Git object, plus LFS, submodules,
   releases, artifacts, workflow logs, issues, pull requests, discussions, wiki,
   Pages configuration and other state the host will expose.
4. Check credentials, personal/proprietary data, internal infrastructure details,
   dependencies, shipped attack paths, licences and rights to publish assets.
5. Resolve every confirmed, in-scope finding whose
   [risk](security-assessment.md#finding-format) is High or Critical.
6. Present remaining findings, accepted risks, exclusions and assessment
   limitations to the user.
7. Obtain final approval naming the repository and frozen commit.
8. Change visibility, then re-audit effective rules and exposed state.

Any change after the assessment invalidates the frozen revision and requires the
affected checks to run again.

## Findings and fixtures

Scanner severity is evidence, not the final risk. Triage it using the
[security assessment](security-assessment.md) playbook. Intentionally vulnerable
fixtures may remain only when they contain no real sensitive data, are clearly
identified, cannot enter a shipped artifact and have a narrow documented
exclusion. Do not lower a rating merely to
pass the gate.

An independently supplied report must identify its scope, revision, date, tools,
versions, evidence and limitations. Otherwise it does not satisfy this gate.
