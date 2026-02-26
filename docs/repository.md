# Repository

## Commit format

Conventional Commits enforced via commitlint + husky:

```
type: description
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`

**Examples:** `feat: add dark mode`, `fix: resolve header layout`, `docs: update testing guide`

## Rulesets

Branch rules are defined in code under `.github/rulesets/`. GitHub does not auto-sync them—you must apply changes manually.

**Current ruleset (main-protection):**

- **Admin:** Can push directly to main and create branches
- **Collaborators (write):** Can create branches and open PRs; cannot push directly to main
- **Everyone else:** Read-only

**Rules:** Blocks direct pushes (`update`), force pushes (`non_fast_forward`), and branch deletion (`deletion`) for non-admins. Admins bypass all rules.

**Apply changes** after editing the JSON:

```bash
RULESET_ID=$(gh api repos/:owner/:repo/rulesets -q '.[0].id')
gh api repos/:owner/:repo/rulesets/$RULESET_ID --method PUT --input .github/rulesets/main-protection.json
```

Or use **Settings → Rules → Rulesets** → Edit → Import.

## Collaborators

Only users you explicitly add have write access. To add a collaborator:

1. **Settings → Collaborators**
2. **Add people** → enter username → choose role (usually **Write**)
3. They accept the invite

Invited collaborators can create branches and open PRs; merging is gated by the ruleset and PR review settings.
