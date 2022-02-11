---
title: '@nrwl/cypress:cypress-component-project generator'
description: 'Set up Cypress Component Test for a project'
---

# @nrwl/cypress:cypress-component-project

Set up Cypress Component Test for a project

## Usage

```bash
nx generate cypress-component-project ...
```

```bash
nx g cy-cmp ... # same
```

By default, Nx will search for `cypress-component-project` in the default collection provisioned in `workspace.json`.

You can specify the collection explicitly as follows:

```bash
nx g @nrwl/cypress:cypress-component-project ...
```

Show what will be generated without writing to disk:

```bash
nx g cypress-component-project ... --dry-run
```

## Options

### componentType (_**required**_)

Type: `string`

Possible values: `react`

which framework is being used?

### project (_**required**_)

Type: `string`

The name of the project to convert
