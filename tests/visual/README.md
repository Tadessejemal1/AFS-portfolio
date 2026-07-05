# Fleet band visual regression

Pixel-diff snapshots of the `.fleet-cap-band` section on `/clients` at mobile
(390), tablet (834) and desktop (1440) widths. Guards against typography /
spacing regressions in the "Full Lifecycle Capability" grid.

## Run

Dev server must be running on `http://localhost:8080` (override with `BASE_URL`).

```bash
bun run test:visual          # compare against baselines
bun run test:visual:update   # regenerate baselines after intentional changes
```

Baselines live in `__baselines__/`. Failed runs write actuals to `__output__/`
and pixel diffs to `__diff__/` (both git-ignored).

Tolerance: 2% of pixels may differ (font-hinting jitter). Bump `THRESHOLD_RATIO`
in `fleet-band.spec.mjs` if flakiness appears.
