# Release

This package is deployed to [GitHub Packages](https://github.co.jp/features/packages) with [GitHub Actions](https://github.co.jp/features/actions) and [shipjs](https://github.com/algolia/shipjs).

## Create release PR

Run `Create Release PR` workflow at [here](https://github.com/hrbrain/prettier-config/actions/workflows/prepare.yaml) if you ready to release this package.
PR will be created when that workflow is succeeded.
Before merging this PR is the last chance before releasing the package.
In that PR, you can change CHANGELOG.md or do others before release package.

## Merge PR and release

When you merge that PR, release workflow runs automatically.
