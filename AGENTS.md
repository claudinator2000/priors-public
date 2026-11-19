# Working with this repository

This repository contains concise cross-project engineering practices. It is not
a case archive, universal-principle library, repository template or scanner
bundle.

## Retrieval

Read [playbooks/INDEX.md](playbooks/INDEX.md) before an operational task. It
names the task that calls for the security baseline and for each playbook.
Open only the documents whose task matches; nothing matching is a valid result.

## Contributing

Keep guidance outcome-focused and small. Prefer established tools and
deterministic project checks. Put a cross-project procedure in an indexed
playbook; put executable workflows in
[secure-repo-template](https://github.com/claudinator2000/secure-repo-template-public)
or the affected application.

Do not add collections of project findings, custom scanner rules, vendored
policies or forge-administration scripts. Record project-specific evidence and
exceptions in the project that owns them.

Run `node tools/validate.mjs` after editing Markdown.
