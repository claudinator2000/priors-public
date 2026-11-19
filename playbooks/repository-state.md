# Answer from the repository

Use when stating what a repository contains, supports, requires or is
configured to do.

## Fetch first

A working copy records the state at its last fetch. A clone that has been open
across sessions is a snapshot of unknown age, and nothing about reading it
signals that. Fetch before reading it.

Prune while fetching (`git fetch --prune`). A plain fetch updates the refs that still exist and
leaves the rest untouched, so a branch that was renamed or deleted keeps a
remote-tracking ref that resolves without error — the stale read this is meant
to prevent, arriving through the command meant to prevent it.

Then read the revision the question is about. A question about a release tag,
a pull request head, or the checkout in front of the person asking is not a
question about the default branch, and answering from the default branch tip
because it is the freshest thing available answers a different question
accurately. Fetch so that the revision can be resolved; resolve the one that
was asked about.

## Absence is the expensive claim

A missing command, file, field or option read from a stale tree is
indistinguishable from one that was never there. Reporting something as
unsupported sends the reader to build a workaround for a problem that does not
exist, so fetch before every such claim.

## Read the definition

Do not infer an interface from its documentation, a sibling project, an older
version or how it would reasonably work. Read the code that implements it.
Documentation in the same repository can describe an interface that has been
renamed or removed.

## Name the revision

Say which revision the answer came from. A wrong answer is then traceable to a
stale read rather than mistaken for invention, and the reader can check it
against their own.
