# Repository rulesets

These rulesets are defined in code. To apply or update them:

1. Go to **Settings → Rules → Rulesets**
2. Click **New ruleset** → **Import a ruleset**
3. Select the JSON file (e.g. `main-protection.json`)

Or via GitHub CLI:

```bash
# Create new ruleset (fails if one with same name exists)
gh api repos/:owner/:repo/rulesets --method POST --input .github/rulesets/main-protection.json

# Update existing ruleset (replace RULESET_ID with the ruleset ID)
gh api repos/:owner/:repo/rulesets/RULESET_ID --method PUT --input .github/rulesets/main-protection.json

# List rulesets to get ID
gh api repos/:owner/:repo/rulesets -q '.[].id'
```
