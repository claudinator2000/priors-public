# Document a project

Use when writing or restructuring a README, project documentation, a runbook or
code comments.

## Describe the current product

State current behavior, interfaces, ownership, constraints and operational
reasons. Write for a reader encountering the finished system, not as a record of
the implementation conversation. Remove rejected alternatives, responses to
earlier misunderstandings and one-time migration context once they no longer
affect operation.

Phrases such as “deliberately,” “we chose,” “this does not mean,” “previously”
and “future hosts” are review signals for discussion history. Rewrite them as a
direct statement of the resulting contract. Keep negative statements when they
define a security boundary, unsupported operation or action an operator must
avoid.

Include rationale only where it helps a maintainer preserve a current property.
State the property and its cause directly; do not reproduce the alternatives
debated while reaching it.

State the mechanism, not the verdict. “This is the second lock,” “this is safe”
and “this is the important one” are conclusions the reader cannot check. Say
what checks what, and the reader can.

Emphasis is not content. “The rule that matters,” “read this first” and “do not
skip this” mark a document whose structure has already failed: if a step is
skippable, say when it applies or remove it.

## Use progressive disclosure

Keep the README as the front door: purpose, current status, smallest quick start
and links to deeper Markdown. For a system with several meaningful parts, add a
**Main components** list with one sentence explaining each part's job.

Keep a small project in one file. Split detailed operation, design or decisions
into focused files under `docs/` only when the README would otherwise obscure
the map. Link to a source of truth instead of duplicating it. Keep procedures
short, task-oriented and ordered by the reader's next action.

Make every cross-reference a link, including one to another section of the same
document: “see 2.3” asks the reader to go and find it. Define a term where it is
first needed, rather than in a glossary or after its first use.

## Verify

- Commands and examples match the shipped revision and use safe placeholders.
- Links resolve, including to a heading, and each subject has one
  authoritative location.
- Each verification step runs as written against the shipped system, and every
  outcome it can produce says what that outcome means.
- Code comments explain a current invariant, surprising constraint or required
  interface rather than restating the code.
- Security limitations and unsupported operations remain explicit.
