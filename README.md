# priors

A small set of cross-project engineering practices for humans and coding
assistants.

The repository uses plain Markdown for guidance and keeps deterministic
enforcement in the repository that runs it.

## Main components

- [Repository security baseline](SECURITY_BASELINE.md) — the minimum secret,
  vulnerability and artifact scanning expected across projects.
- [Playbooks](playbooks/INDEX.md) — opt-in procedures, each listed with the
  task that calls for it.

## Use

Start at the [playbook index](playbooks/INDEX.md). It names the task that calls
for the security baseline and for each playbook; read only the documents whose
task matches.

The
[secure repository template](https://github.com/claudinator2000/secure-repo-template-public)
owns the default GitHub workflow implementation. Each application owns its
project-specific tests, exceptions and artifact scans. Guidance here is not a
security boundary and must not require an LLM to enforce it.

## Adding something

Add guidance only when it changes a future decision across multiple projects.
Prefer an established tool or external standard over maintaining a custom
implementation here. Keep project incidents, scanner fixtures and application
rules with the project that owns them.

## Checks

```bash
node tools/validate.mjs
```

This checks that local Markdown links and their heading anchors resolve and
that every playbook is indexed. CI runs it together with the
[security baseline](SECURITY_BASELINE.md) workflows: Gitleaks with a
fake-token self-test, zizmor and Trivy.

Vulnerability scanning is not applicable to the current content: priors has no
dependency manifest, container, infrastructure-as-code or deployable artifact,
so Trivy reports no scanned target. Its only dependencies are pinned GitHub
Actions, which zizmor audits and Dependabot updates. Trivy keeps running so that
a scannable file added later is scanned without a workflow change.

## Licence

[MIT](LICENSE)
