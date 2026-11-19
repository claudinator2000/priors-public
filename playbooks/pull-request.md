# Complete a pull request

Use when opening, updating or deciding whether a pull request or merge request
is ready.

## Open

Link non-trivial behavior, security, architecture and planned work to an issue.
Describe the resulting behavior, security properties and verification in the
request body. Keep implementation chronology and review conversation in the
timeline rather than copying them into product documentation.

When the change alters what someone sees, ask whether to make a preview before
opening the request. A diff does not render, so a reviewer holding only the
diff approves a description of the change; whether that is enough is theirs to
judge, and for a small change it often is.

Once a preview is asked for, opening waits on an explicit instruction. Liking
the preview is not that instruction. Where nobody is present to answer, say the
preview is ready and stop.

Open the request ready for review. Automated review does not run on a draft,
so a request opened as one starts with the review it was meant to get already
skipped, and nothing later says it was missed. Open a draft only when a human
asks for one.

### Automated review with Codex on GitHub

This section applies where a repository is connected to Codex review. Other
automated reviewers follow the same rule: the review they start on opening is
complete only when it reports a result.

Wait a minute after opening to see whether the review ran. A 👀 reaction means
the review started; it is not approval. Once it appears, the request is not
ready to merge until:

- the opening review completes by publishing suggestions, indicating that it
  has no suggestions, or reporting that its credits are exhausted; and
- every comment Codex left is resolved.

Credit exhaustion is an acceptable terminal result because Codex review is a
nice-to-have. Do not treat the 👀 reaction, silence or passing checks as review
completion. By default, the review triggered when the request opens is the only
Codex review: do not request a final review after fixes or start another review
cycle after later commits. Run another Codex review only when a human explicitly
requests it.

## Handle feedback

Inspect the complete review surface: conversation comments, review submissions,
every inline thread including resolved and outdated threads, the current diff
and the latest check results. The unresolved-thread list and newest notification
are not the complete review.

Triage every finding. Address valid findings in code and reply with the concrete
reason when declining one. Resolve a thread only after the change or explanation
is published.

When a second finding has the same cause as an earlier one, the cause is the
finding. Fix it at the point both passed through, search for other instances of
it, and test the cause rather than the single case.

## Report before waiting

Say what was pushed and what is being waited for, then wait. A wait announced
afterwards is indistinguishable from a crash while it is happening, and the
person cannot tell whether to interrupt.

Do not poll a channel that already reports. Where check results and review
comments arrive as events, waiting for them adds delay and nothing else.

## Complete

After the final change:

1. Run the deterministic tests and security checks on the exact head revision.
2. Fetch the complete review surface again and handle feedback already present.
3. Confirm every thread is resolved, the opening Codex review completed or did
   not start, and the request body describes the result.
4. Report unavailable or failed checks; do not treat silence as approval.

## Do not merge

Opening the request and driving it to green is the deliverable. Merging is the
human's decision, on every request, in every repository.

Green checks, a review that found nothing, an urgent fix, a trivial diff, and a
human who merged similar work before are not approval. Only an explicit
instruction naming this request is. Approval to merge one request does not carry
to the next.

Say the request is ready and stop. Waiting costs a round trip; merging without
being asked removes the review the branch rules exist to require.
