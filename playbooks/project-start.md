# Start a project

Use for a new project, a new repository or a major rewrite. Stop after each gate;
do not turn the checklist into speculative infrastructure.

## 1. Frame and research

Write a short decision note in Markdown:

- problem, intended users, essential constraints and explicit non-goals;
- security and privacy boundaries, important data and credible attackers;
- existing projects or services considered, with current evidence and links;
- the smallest useful outcome and how it will be verified.

Time-box research before selecting an architecture. Prefer an existing solution
when it meets the essential constraints, is maintained, can be operated and
understood, and has an acceptable exit path. Build when the unmet requirement is
material and owning the code is cheaper than adapting, integrating or accepting
the dependency. Record the decision, uncertainty, lock-in and a revisit trigger.
A feature comparison without maintenance, security and migration costs is not a
build-versus-adopt decision; endless comparison is not progress.

## 2. Security by design, minimal by default

**KISS:** implement the thinnest end-to-end slice that is useful. Prefer
explicit, unsurprising operation over generality or hidden automation. Defaults
are restrictive;
privilege, network reachability, data access and optional integrations are added
only with a stated need. Authentication, recovery and observability needed to
keep the stated security boundary true are part of the minimum, not optional
features. Put later product features in the issue tracker, not in dormant code,
generic extension points or unused infrastructure.

**External and AI services:** describe a dependency as optional only when the
product retains correct, useful behavior without it. Prefer deterministic code
for structural and security-critical decisions. Use LLMs for genuinely
open-ended interpretation or as an enhancement over a working baseline; do not
invent a low-quality fallback merely to claim offline support.

**Test-driven development:** for stable observable behavior, write the failing
test before the implementation.
For exploratory work, add the tests before merge. Every fixed bug gets a
regression test. Exercise expected failure paths, and prove secret detection with
a known-fake fixture—never a real credential.

## 3. Establish the repository contract

Apply the [repository security baseline](../SECURITY_BASELINE.md): every
repository gets secret scanning, and repositories with dependencies,
configuration or deployable artifacts get matching vulnerability,
misconfiguration and artifact scans.

Keep the contract forge-neutral and versioned in the repository:

- every default-branch change arrives through a pull/merge request; non-trivial
  behavior, security, architecture and planned work links to an issue, while the
  PR description may fully explain trivial maintenance;
- document any narrowly scoped emergency exception;
- required tests and security checks run on the exact proposed revision;
- workflow and automation permissions start read-only and expand explicitly;
- secrets never enter source, fixtures, logs or build artifacts;
- the default branch rejects direct pushes, deletion and force-pushes when the
  host can enforce that policy.

Before claiming any control exists, inspect the actual repository, visibility,
owner/account type and host capabilities. Report each desired control as
**enforced**, **verified**, **advisory**, **unavailable** or **unknown**. Unknown
fails closed: do not plan as though it were enforced.

## 4. Progressive-disclosure documentation

Apply [Document a project](documentation.md). The README provides the project
map and smallest quick start; focused files hold detail when the project needs
it.

The first implementation is complete when the useful slice, failure tests,
documentation map and repository contract are reviewable. Features come later.
