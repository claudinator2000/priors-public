# Repository security baseline

This file defines outcomes. The executable implementation, tool versions and
forge-specific workflow belong in
[secure-repo-template](https://github.com/claudinator2000/secure-repo-template-public).

## Required controls

1. **Every repository has secret scanning**, including documentation-only
   repositories.
2. **A repository has vulnerability and configuration scanning** when it
   contains a dependency manifest or lockfile, Containerfile or Dockerfile,
   infrastructure-as-code, deployment configuration, or another deployable
   artifact.
3. **A built container or package is scanned after it is built and before it
   becomes published, approved or discoverable by deployment automation.**
4. **Vulnerability scans run again on a schedule**, at least weekly, because
   vulnerability data changes even when source code does not.

Complexity is not a useful threshold. A project may mark vulnerability scanning
**not applicable** only when it has no dependencies, configuration or deployable
artifact. The concrete reason must be documented and becomes invalid when one
of those conditions appears.

The checked-out revision must be the revision whose source is scanned and from
which any artifact is built. The digest of a scanned built artifact must match
the digest of the artifact subsequently published, approved or exposed to
deployment automation. Scanner jobs start read-only and receive no deployment
or package-write credentials.

## Default implementation

The repository template uses:

- [Gitleaks](https://github.com/gitleaks/gitleaks) for Git-aware secret scanning;
- [Trivy](https://trivy.dev/) for dependency and configuration scanning.

The template builds no artifact. A project that builds one scans it with Trivy,
or an equivalent, in the pipeline that builds and publishes it, as
[required control](#required-controls) 3 describes.

Trivy should not replace the Git-aware secret scanner. Its repository and image
secret scanning is useful as defense in depth, but its
[default exclusions](https://www.trivy.dev/docs/latest/guide/scanner/secret/)
include `.git` and common document and archive formats.

A project may replace either tool with an equivalent control, but must document
what coverage is preserved. Exact commands, pins, caches, schedules and ignore
formats live only in the template or project that executes them.

## Findings and exceptions

A confirmed secret blocks the change. Removing it from the latest revision is
not remediation: revoke or rotate it and address reachable history where
appropriate. Run a full-history secret scan before making a repository public.

High and Critical vulnerability or misconfiguration findings block by default.
Do not hide unfixed findings automatically.

Every suppression must be narrowly scoped and record a reason, an owner or
tracking issue, and an expiry or review date. Never lower severity merely to make CI pass.
A failed scan, unavailable database update or incomplete checkout is visible
degradation, not a passing result. The same holds for a check that completes but
skips part of its input: every file, error or timeout it did not fully process
appears in its result.
