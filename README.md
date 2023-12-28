## The Motley Monkey

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mark-nygaard_the-motley-monkey&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mark-nygaard_the-motley-monkey)

## Conventional Commit Messages are required.

<pre>
<b>&lt;type&gt;(&lt;optional scope&gt;): &lt;description&gt;</b>
</pre>

### Types

- API relevant changes
  - `feat` Commits, that adds or remove a new feature
  - `fix` Commits, that fixes a bug
- `refactor` Commits, that rewrite/restructure your code, however does not change any API behaviour
  - `perf` Commits are special `refactor` commits, that improve performance
- `style` Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
- `test` Commits, that add missing tests or correcting existing tests
- `docs` Commits, that affect documentation only
- `build` Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
- `ops` Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
- `chore` Miscellaneous commits e.g. modifying `.gitignore`

### Scopes

The `scope` provides additional contextual information.

- Is an **optional** part of the format
- Allowed Scopes depends on the specific project
- Don't use issue identifiers as scopes

### Breaking Changes Indicator

Breaking changes should be indicated by an `!` before the `:` in the subject line e.g. `feat(api)!: remove status endpoint`

- Is an **optional** part of the format

### Description

The `description` contains a concise description of the change.

- Is a **mandatory** part of the format
- Use the imperative, present tense: "change" not "changed" nor "changes"
  - Think of `This commit will...` or `This commit should...`
- Don't capitalize the first letter
- No dot (.) at the end
