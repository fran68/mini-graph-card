/* eslint-disable no-template-curly-in-string */
const upstreamVersion = "0.13.0"

module.exports = {
  tagFormat: 'xt-v${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    ['@semantic-release/release-notes-generator', {
      writerOpts: {
        preset: 'angular',
        footerPartial: `### Fork based on [mini-graph-card](https://github.com/kalkih/mini-graph-card.git), upstream version **${upstreamVersion}**\n\n`,
      },
    }],
    '@semantic-release/changelog',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
    ['@semantic-release/exec', {
      prepareCmd: './scripts/update_readme.sh "${nextRelease.version}" "$GITHUB_REF"',
    }],
    ['@semantic-release/git', {
      assets: [
        'CHANGELOG.md',
        'README.md',
        'package.json',
        'package-lock.json',
        'npm-shrinkwrap.json',
      ],
    }],
    ['@semantic-release/github', {
      assets: 'dist/*.js',
      releaseNameTemplate: `v\${nextRelease.version} (Base: ${upstreamVersion})`,
    }],
  ],
  preset: 'angular',
  branches: [
    'main',
    { name: 'master' },
    { name: 'dev', prerelease: true },
  ],
};
