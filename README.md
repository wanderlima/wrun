# 🖥️ wrun cli

> ⚠️ **Work in Progress** - Interactive terminal tool to speed up common tasks

An interactive CLI that provides menu-driven shortcuts for common git workflows. Wraps `git` and `gh` commands with a friendly interface to reduce typing and memorization of complex command flags.

## Features

- 🎯 Interactive menu navigation with category-based command organization
- 🚀 Direct command execution: `wrun git pr` or navigate through menus
- ⚡ Common git workflows simplified:
  - Push and set upstream branch
  - Create pull requests with `gh` integration
  - Soft reset last commit
  - Amend single or multiple commit messages
- 🔄 Back navigation between menus
- ✨ Emoji-enhanced output for better readability

## Requirements

- [GitHub CLI](https://cli.github.com/) (`gh`)
- git

## Installation

```bash
npm install -g wrun-cli
```

Or use with npx without installing:

```bash
npx wrun-cli
```

### Development Installation

```bash
npm install
npm link  # Makes wrun available globally for local testing
```

## Usage

```bash
# Interactive menu mode
wrun

# Jump to category menu
wrun git

# Execute command directly
wrun git pr
wrun git set-upstream
wrun git amend
```

## Available Commands

### Git Category

- **set-upstream** - Push and set upstream branch
- **pr** - Create pull request with GitHub CLI
- **reset** - Soft reset last commit
- **amend** - Edit last commit message
- **amend-multiple** - Edit multiple commit messages interactively

## Development

```bash
# Local testing
node bin/wrun.js
node bin/wrun.js git pr

# Run globally after npm link
wrun
```
