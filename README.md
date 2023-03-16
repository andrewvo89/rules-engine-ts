![rules-engine-ts](https://user-images.githubusercontent.com/48583281/225731748-6467e9bf-ee0e-4839-8982-500e0342324b.jpg)

<div align="center">

[![Status](https://img.shields.io/badge/status-active-blue)](https://github.com/andrewvo89/rules-engine-ts)
[![GitHub Issues](https://img.shields.io/github/issues/andrewvo89/rules-engine-ts?color=blue)](https://github.com/andrewvo89/rules-engine-ts/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/andrewvo89/rules-engine-ts?color=blue)](https://github.com/andrewvo89/rules-engine-ts/pulls)
[![License](https://img.shields.io/github/license/andrewvo89/rules-engine-ts?color=blue)](/LICENSE)

</div>

---

<p align="center">Strongly typed rules engine for evaluating deep and complex rules.</p>

## Table of Contents

- [About](#about)
- [Terminology](#terminology)
- [Basic Usage](#basic-usage)
- [Installation](#installation)
- [Usage](#usage)
- [Rules Specification](#rule-specification)
- [TypeScript Usage](#typescript-usage)
- [Authors](#authors)

## About

Rules Engine TS is a strongly typed rules engine for evaluating deep and complex rules. With the power of Typescript you can create type safe rules that are easy to read and maintain.

## Terminology

### Rule

A rule is a single condition that can be evaluated. A rule can be of the following types:

- string
- number
- boolean
- array_value
- array_length
- object_key
- object_value
- object_key_value
- generic_comparison
- generic_type

Depending on the `type`, certain operators are available. For example, the `string` type has the following operators:

- equals_to
- does_not_equal_to
- contains
- not_contains
- starts_with
- ends_with

Refer to the [Rules Specification](#rules-specification) section for more information on the available properties.

### Union

A union is a collection of rules and/or other unions. A union can have a connector of `and` or `or`. If the connector is `and` then all rules and unions must evaluate to true. If the connector is `or` then only one rule or union must evaluate to true.

### Root Union

The root union is the top level union. It contains the same properties of a regular union but does not have a `parent_id` property.

### Parent

The parent of a rule or union is the union that contains it. Any rule or union can be linked back to its parent with its `parent_id` property. The parent union should contain the rule or union in its `rules` array.

## Basic Usage

The recommended way to consume `rules-engine-ts` is in a TypeScript environment. TypeScript will warn you when your rules are missing properties or if the types of your properties are incorrect. That isn't to say that `rules-engine-ts` can't be run with JavaScript. You will still get autocomplete on the available properties, but you will not get any warnings if you are missing properties or if the types of your properties are incorrect.

A rules engine can be configured and run like so:

```js
import { addRuleToUnion, addRulesToUnion, addUnionToUnion, createRoot, run } from 'rules-engine-ts';

// Create root union
const root = createRoot({ connector: 'and' });

// Add a rule to the root union
addRuleToUnion(root, { type: 'number', field: 'age', operator: 'greater_than', value: 18 });

// Add a union to the root union (creates a nested ruleset)
const union = addUnionToUnion(root, { connector: 'or' });

// Add nested rules to the nested union
addRulesToUnion(union, [
  { type: 'string', field: 'name', value: 'bob', operator: 'equals_to', ignore_case: true },
  { type: 'string', field: 'name', value: 'alice', operator: 'equals_to', ignore_case: true },
]);

// Run the rules engine
const pass = run(root, { age: 19, name: 'Bob' });
const fail = run(root, { age: 19, name: 'Carol' });

console.log(pass); // true
console.log(fail); // false
```

If we console log the root we can see what our rules look like:

```js
{
  entity: "root_union",
  id: "0d7428af-10e4-481b-84a7-056946bd4f12",
  connector: "and",
  rules: [
    {
      entity: "rule",
      id: "82e96b0d-886e-4a2e-bf8c-f81b02ef11ce",
      parent_id: "0d7428af-10e4-481b-84a7-056946bd4f12",
      type: "number",
      field: "age",
      operator: "greater_than",
      value: 18
    },
    {
      entity: "union",
      id: "7c493486-409b-48df-bd66-7f4a16500c5e",
      parent_id: "0d7428af-10e4-481b-84a7-056946bd4f12",
      connector: "or",
      rules: [
        {
          entity: "rule",
          id: "3abc4e64-d6c8-4303-9d07-b573a571f19a",
          parent_id: "7c493486-409b-48df-bd66-7f4a16500c5e",
          type: "string",
          field: "name",
          operator: "equals_to",
          value: "bob",
          ignore_case: true
        },
        {
          entity: "rule",
          id: "a3995445-55ca-49b2-8381-3d6758750413",
          parent_id: "7c493486-409b-48df-bd66-7f4a16500c5e",
          type: "string",
          field: "name",
          operator: "equals_to",
          value: "alice",
          ignore_case: true
        }
      ]
    }
  ]
}
```

## Installation

Install the package using your favorite package manager:

```
npm install rules-engine-ts
yarn add rules-engine-ts
pnpm add rules-engine-ts
```

## Usage

### `createRoot(connector: 'and' | 'or'): RootUnion`

Creates a root union. This is the entry point for creating a rules engine.

```js
import { createRoot } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });
```

State of the Rules Engine:

```js
{
  entity: "root_union",
  id: "0d7428af-10e4-481b-84a7-056946bd4f12",
  connector: "and",
  rules: []
}
```

### `addRuleToUnion(parent: RootUnion | Union, newRule: NewRule): Rule`

Adds a rule to a union or root union. The rules engine assigns a unique ID and automatically tags it with a `parent_id`. Returns the rule that was added.

> Note: This function mutates the input union. Clone the union before passing it in if you want to maintain its original state.

```js
import { addRuleToUnion, createRoot } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });

addRuleToUnion(root, { type: 'number', field: 'age', operator: 'greater_than', value: 18 });
```

State of the Rules Engine:

```js
{
  entity: "root_union",
  id: "0d7428af-10e4-481b-84a7-056946bd4f12",
  connector: "and",
  rules: [
    {
      entity: "rule",
      id: "82e96b0d-886e-4a2e-bf8c-f81b02ef11ce",
      parent_id: "0d7428af-10e4-481b-84a7-056946bd4f12",
      type: "number",
      field: "age",
      operator: "greater_than",
      value: 18,
    }
  ]
}
```

### `addRulesToUnion(parent: RootUnion | Union, newRules: NewRule[]): Rule[]`

Adds many rules to a union or root union. The rules engine assigns a unique ID and automatically tags it with a `parent_id`. Returns the list of rules that were added.

> Note: This function mutates the input union. Clone the union before passing it in if you want to maintain its original state.

```js
import { addRulesToUnion, createRoot } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });

addRulesToUnion(root, [
  { type: 'string', field: 'name', value: 'bob', operator: 'equals_to', ignore_case: true },
  { type: 'string', field: 'name', value: 'alice', operator: 'equals_to', ignore_case: true },
]);
```

State of the Rules Engine:

```js
{
  entity: 'root_union',
  id: '61dadd25-22a0-4e84-abe5-92fcfd6cac9e',
  connector: 'and',
  rules: [
    {
      entity: 'rule',
      id: '50158f7e-1d87-4ca8-aaca-ef1bbb41c9c2',
      parent_id: '61dadd25-22a0-4e84-abe5-92fcfd6cac9e',
      type: 'string',
      field: 'name',
      operator: 'equals_to',
      value: 'bob',
      ignore_case: true
    },
    {
      entity: 'rule',
      id: '5f6ac1d1-7ce7-40a5-a94c-5e4a47a45e28',
      parent_id: '61dadd25-22a0-4e84-abe5-92fcfd6cac9e',
      type: 'string',
      field: 'name',
      operator: 'equals_to',
      value: 'alice',
      ignore_case: true
    }
  ]
}
```

### `addUnionToUnion(parent: RootUnion | Union, newUnion: NewUnion): Union`

Adds a union to an existing union or root union. Returns the rule that was added.

> Note: This function mutates the input union. Clone the union before passing it in if you want to maintain its original state.

```js
import { addRuleToUnion, addRulesToUnion, addUnionToUnion, createRoot } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });

const union = addUnionToUnion(root, { connector: 'or' });
addRuleToUnion(union, { type: 'string', field: 'name', value: 'bob', operator: 'equals_to', ignore_case: true });
addRuleToUnion(union, { type: 'string', field: 'name', value: 'alice', operator: 'equals_to', ignore_case: true });
```

State of the Rules Engine:

```js
{
  entity: "root_union",
  id: "0d7428af-10e4-481b-84a7-056946bd4f12",
  connector: "and",
  rules: [
    {
      entity: "union",
      id: "7c493486-409b-48df-bd66-7f4a16500c5e",
      parent_id: "0d7428af-10e4-481b-84a7-056946bd4f12",
      connector: "or",
      rules: [
        {
          entity: "rule",
          id: "3abc4e64-d6c8-4303-9d07-b573a571f19a",
          parent_id: "7c493486-409b-48df-bd66-7f4a16500c5e",
          type: "string",
          field: "name",
          operator: "equals_to",
          value: "bob",
          ignore_case: true,
        },
        {
          entity: "rule",
          id: "a3995445-55ca-49b2-8381-3d6758750413",
          parent_id: "7c493486-409b-48df-bd66-7f4a16500c5e",
          type: "string",
          field: "name",
          operator: "equals_to",
          value: "alice",
          ignore_case: true,
        }
      ]
    }
  ]
}
```

### `addUnionsToUnion(parent: RootUnion | Union, newUnions: NewUnion[]): Union[]`

Adds many unions to an existing union or root union. Returns the list of unions that were added.

> Note: This function mutates the input union. Clone the union before passing it in if you want to maintain its original state.

```js
import { addRulesToUnion, addUnionsToUnion, createRoot } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });

const unions = addUnionsToUnion(root, [{ connector: 'or' }, { connector: 'or' }]);
addRulesToUnion(unions[0], [
  { type: 'string', field: 'name', value: 'bob', operator: 'equals_to', ignore_case: true },
  { type: 'string', field: 'name', value: 'alice', operator: 'equals_to', ignore_case: true },
]);
addRulesToUnion(unions[1], [
  { type: 'number', field: 'age', value: 18, operator: 'equals_to' },
  { type: 'number', field: 'age', value: 21, operator: 'equals_to' },
]);
```

State of the Rules Engine:

```js
{
  entity: 'root_union',
  id: '28a9ae06-594a-4520-8d73-2fd871804634',
  connector: 'and',
  rules: [
    {
      entity: 'union',
      id: '8e5e66dd-e86c-4f9e-acc7-7baa852fdfe8',
      parent_id: '28a9ae06-594a-4520-8d73-2fd871804634',
      connector: 'or',
      rules: [
        {
          entity: 'rule',
          id: 'a8ecbafd-0a1a-4e9e-bb70-8bd11a62f274',
          parent_id: '8e5e66dd-e86c-4f9e-acc7-7baa852fdfe8',
          type: 'string',
          field: 'name',
          operator: 'equals_to',
          value: 'bob',
          ignore_case: true
        },
        {
          entity: 'rule',
          id: 'd4fd56bf-af82-4382-a1cb-93d80cb87ef4',
          parent_id: '8e5e66dd-e86c-4f9e-acc7-7baa852fdfe8',
          type: 'string',
          field: 'name',
          operator: 'equals_to',
          value: 'alice',
          ignore_case: true
        }
      ]
    },
    {
      entity: 'union',
      id: '5e5d7f00-d0f6-40d9-84b3-39600241a92f',
      parent_id: '28a9ae06-594a-4520-8d73-2fd871804634',
      connector: 'or',
      rules: [
        {
          entity: 'rule',
          id: '7ea03690-d9c4-4a3e-97eb-d927cf6845e8',
          parent_id: '5e5d7f00-d0f6-40d9-84b3-39600241a92f',
          type: 'number',
          field: 'age',
          operator: 'equals_to',
          value: 18
        },
        {
          entity: 'rule',
          id: 'bb63d7da-b0dc-4d00-824c-4de09151c609',
          parent_id: '5e5d7f00-d0f6-40d9-84b3-39600241a92f',
          type: 'number',
          field: 'age',
          operator: 'equals_to',
          value: 21
        }
      ]
    }
  ]
}
```

### `addAnyToUnion(parent: RootUnion | Union, newRuleOrUnion: NewRule | NewUnion): Rule | Union`

Adds a rule or a union to an existing union or root union. Returns the rule or union that was added.

> Note: This function mutates the input union. Clone the union before passing it in if you want to maintain its original state.

```js
import { addAnyToUnion, createRoot } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });

const any = addAnyToUnion(root, { connector: 'or' });
if (any.entity === 'union') {
  addAnyToUnion(any, { type: 'string', field: 'name', value: 'bob', operator: 'equals_to', ignore_case: true });
  addAnyToUnion(any, { type: 'string', field: 'name', value: 'alice', operator: 'equals_to', ignore_case: true });
}
```

State of the Rules Engine:

```js
{
  entity: 'root_union',
  id: '825ef3d8-3151-4367-b751-1deae8b308c1',
  connector: 'and',
  rules: [
    {
      entity: 'union',
      id: '71b5296a-5358-4399-878d-f535c9f21faf',
      parent_id: '825ef3d8-3151-4367-b751-1deae8b308c1',
      connector: 'or',
      rules: [
        {
          entity: 'rule',
          id: '3cd0463f-c5e7-4dd9-98b8-9e7cf79417b5',
          parent_id: '71b5296a-5358-4399-878d-f535c9f21faf',
          type: 'string',
          field: 'name',
          operator: 'equals_to',
          value: 'bob',
          ignore_case: true
        },
        {
          entity: 'rule',
          id: 'f10e7cec-c737-4c2c-b137-d7ab0e26e045',
          parent_id: '71b5296a-5358-4399-878d-f535c9f21faf',
          type: 'string',
          field: 'name',
          operator: 'equals_to',
          value: 'alice',
          ignore_case: true
        }
      ]
    }
  ]
}
```

### `addManyToUnion(parent: RootUnion | Union, newRulesOrUnions: (NewRule | NewUnion)[]): (Rule | Union)[]`

Adds many rules or unions to an existing union or root union. Returns the list of rules or unions that were added.

> Note: This function mutates the input union. Clone the union before passing it in if you want to maintain its original state.

```js
import { addManyToUnion, createRoot } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });

addManyToUnion(root, [
  { type: 'string', field: 'name', value: 'bob', operator: 'equals_to', ignore_case: true },
  { type: 'string', field: 'name', value: 'alice', operator: 'equals_to', ignore_case: true },
  { connector: 'or' },
]);
```

State of the Rules Engine:

```js
{
  entity: 'root_union',
  id: '26252c95-37da-47d4-b361-7ad82ae13a9b',
  connector: 'and',
  rules: [
    {
      entity: 'rule',
      id: 'edbf5239-e931-480a-b231-119af2c1a1d1',
      parent_id: '26252c95-37da-47d4-b361-7ad82ae13a9b',
      type: 'string',
      field: 'name',
      operator: 'equals_to',
      value: 'bob',
      ignore_case: true
    },
    {
      entity: 'rule',
      id: '1e9109fa-30cf-41a9-9e78-e8395a423d6d',
      parent_id: '26252c95-37da-47d4-b361-7ad82ae13a9b',
      type: 'string',
      field: 'name',
      operator: 'equals_to',
      value: 'alice',
      ignore_case: true
    },
    {
      entity: 'union',
      id: '0bb57d03-ac07-41af-941a-6a2625bac130',
      parent_id: '26252c95-37da-47d4-b361-7ad82ae13a9b',
      connector: 'or',
      rules: []
    }
  ]
}
```

### `run(union: RootUnion | Union, value: any): boolean`

Evaluates a set of rules against a value. The value can be of any type (object, array, string, number, boolean, etc). Returns a boolean indicating whether the value passes the rules.

```js
import { addRuleToUnion, addRulesToUnion, addUnionToUnion, createRoot, run } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });
addRuleToUnion(root, { type: 'number', field: 'age', operator: 'greater_than', value: 18 });

const union = addUnionToUnion(root, { connector: 'or' });
addRulesToUnion(union, [
  { type: 'string', field: 'name', value: 'bob', operator: 'equals_to', ignore_case: true },
  { type: 'string', field: 'name', value: 'alice', operator: 'equals_to', ignore_case: true },
]);

const pass = run(root, { age: 19, name: 'Bob' });
const fail = run(root, { age: 19, name: 'Carol' });

console.log(pass); // true
console.log(fail); // false
```

### `findAnyById(union: RootUnion | Union, id: string): RootUnion | Union | Rule | undefined`

Finds any rule or union by id. Returns the rule or union if found, otherwise returns undefined.

```js
import { addRuleToUnion, addUnionToUnion, createRoot, findAnyById } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });
const rule = addRuleToUnion(root, { type: 'number', field: 'age', operator: 'greater_than', value: 18 });
const union = addUnionToUnion(root, { connector: 'or' });

const foundRule = findAnyById(root, rule.id);
console.log(foundRule === rule); // true

const foundUnion = findAnyById(root, union.id);
console.log(foundUnion === union); // true
```

### `findRuleById(union: RootUnion | Union, id: string): Rule | undefined`

Finds a rule by id. Returns the rule if found, otherwise returns undefined.

```js
import { addRuleToUnion, addUnionToUnion, createRoot, findRuleById } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });
const rule = addRuleToUnion(root, { type: 'number', field: 'age', operator: 'greater_than', value: 18 });
const union = addUnionToUnion(root, { connector: 'or' });

const foundRule = findRuleById(root, rule.id);
console.log(foundRule === rule); // true

const foundUnion = findRuleById(root, union.id);
console.log(foundUnion); // undefined
```

### `findUnionById(union: RootUnion | Union, id: string): RootUnion | Union | undefined`

Finds a union by id. Returns the union if found, otherwise returns undefined.

```js
import { addRuleToUnion, addUnionToUnion, createRoot, findUnionById } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });
const rule = addRuleToUnion(root, { type: 'number', field: 'age', operator: 'greater_than', value: 18 });
const union = addUnionToUnion(root, { connector: 'or' });

const foundUnion = findUnionById(root, union.id);
console.log(foundUnion === union); // true;

const foundRule = findUnionById(root, rule.id);
console.log(foundRule); // undefined;
```

### `validate(root: RootUnion): { isValid: true } | { isValid: false; reason: string }`

Validates the structure of a ruleset. Returns an object with a boolean indicating whether the ruleset is valid, and a reason if the ruleset is invalid.

```js
import { addRuleToUnion, createRoot, validate } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });
const rule = addRuleToUnion(root, { type: 'number', field: 'age', operator: 'greater_than', value: 18 });

console.log(validate(root));
// { isValid: true }

rule.type = 'string';

console.log(validate(root));
// {
//   isValid: false,
//   reason: 'Code: invalid_union ~ Path: rules[0] ~ Message: Invalid input'
// }
```

### `normalize<T extends Union | RootUnion>(union: T, options?: Options): T`

Normalization is a process that ensures that the ruleset is in a consistent state. It performs the following updates recursively in the following order:

- Removes any rules or unions that do not conform to the type system. `options.remove_failed_validations`
- Removes any unions without any rules. `options.remove_empty_unions`
- Converts any union with a single rule to a rule. `options.promote_single_rule_unions`
- Updates all parent ids to match the parent union `options.update_parent_ids`

All these updates are turned on by default. You can disable them by passing in an options object as the second argument with the corresponding properties set to false.

> Note: This function mutates the input union. Clone the union before passing it in if you want to maintain its original state.

```ts
import { addRuleToUnion, addUnionToUnion, createRoot, normalize } from 'rules-engine-ts';

import { v4 as uuidv4 } from 'uuid';

const root = createRoot({ connector: 'or' });

const rule1 = addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
const union = addUnionToUnion(root, { connector: 'and' });
const rule2 = addRuleToUnion(union, { field: 'name', operator: 'contains', type: 'string', value: 'alice' });

rule1.parent_id = uuidv4();
rule2.type = 'number';
// @ts-expect-error
union.connector = 'invalid';

console.log(root); // Before normalization
normalize(root, {
  // Normalization options (optional)
  promote_single_rule_unions: true,
  remove_empty_unions: true,
  remove_failed_validations: true,
  update_parent_ids: true,
});
console.log(root); // After normalization
```

Before normalization:

```js
{
  entity: 'root_union',
  id: '70cf2539-b960-4831-b0f2-3b201aea550a',
  connector: 'or',
  rules: [
    {
      entity: 'rule',
      id: '4b644371-6bc2-46b1-b855-c2098df80fb3',
      parent_id: '8ca677c2-b01c-4cf2-91ec-9c95b6ff7dff',
      type: 'string',
      field: 'name',
      operator: 'contains',
      value: 'bob'
    },
    {
      entity: 'union',
      id: 'c43e8705-6b4b-42b5-941c-3295c17cf5db',
      parent_id: '70cf2539-b960-4831-b0f2-3b201aea550a',
      connector: 'invalid',
      rules: [
        {
          entity: 'rule',
          id: '8589e28c-a1d5-4a0b-b930-24c5931eaadb',
          parent_id: 'c43e8705-6b4b-42b5-941c-3295c17cf5db',
          type: 'number',
          field: 'name',
          operator: 'contains',
          value: 'alice'
        }
      ]
    }
  ]
}
```

After normalization:

```js
{
  entity: 'root_union',
  id: '70cf2539-b960-4831-b0f2-3b201aea550a',
  connector: 'or',
  rules: [
    {
      entity: 'rule',
      id: '4b644371-6bc2-46b1-b855-c2098df80fb3',
      parent_id: '70cf2539-b960-4831-b0f2-3b201aea550a',
      type: 'string',
      field: 'name',
      operator: 'contains',
      value: 'bob'
    }
  ]
}
```

### `updateRuleById(root: RootUnion, id: string, values: NewRule): Rule | undefined`

Updates a rule by id. Returns the updated rule if found, otherwise returns undefined.

> Note: This function mutates the input root union. Clone the union before passing it in if you want to maintain its original state.

```js
import { addRuleToUnion, createRoot, updateRuleById } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });
const rule = addRuleToUnion(root, { type: 'number', field: 'age', operator: 'greater_than', value: 18 });

console.log(root.rules[0]); // Before update
updateRuleById(root, rule.id, { type: 'number', field: 'age', operator: 'less_than', value: 30 });
console.log(root.rules[0]); // After update
```

Before update:

```js
{
  entity: 'rule',
  id: 'cc3d4bab-783a-4683-a223-8dee979b0bf0',
  parent_id: 'e0da0708-1fbf-4e64-887c-d7684b17dd00',
  type: 'number',
  field: 'age',
  operator: 'greater_than',
  value: 18
}
```

After update:

```js
{
  entity: 'rule',
  id: 'cc3d4bab-783a-4683-a223-8dee979b0bf0',
  parent_id: 'e0da0708-1fbf-4e64-887c-d7684b17dd00',
  type: 'number',
  field: 'age',
  operator: 'less_than',
  value: 30
}
```

### `updateUnionById(root: RootUnion, id: string, values: NewUnion): Union | RootUnion | undefined`

Updates a union by id. Returns the updated union if found, otherwise returns undefined.

> Note: This function mutates the input root union. Clone the union before passing it in if you want to maintain its original state.

```js
import { addUnionToUnion, createRoot, updateUnionById } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });
const union = addUnionToUnion(root, { connector: 'and' });

console.log(root.rules[0]); // Before update
updateUnionById(root, union.id, { connector: 'or' });
console.log(root.rules[0]); // After update
```

Before update:

```js
{
  entity: 'union',
  id: 'b0a289a5-f02e-4bb4-bbbf-d148d1fc570f',
  parent_id: '1ac8dad7-46c0-430b-9ad1-fdb8f1fd721a',
  connector: 'and',
  rules: []
}
```

After update:

```js
{
  entity: 'union',
  id: 'b0a289a5-f02e-4bb4-bbbf-d148d1fc570f',
  parent_id: '1ac8dad7-46c0-430b-9ad1-fdb8f1fd721a',
  connector: 'or',
  rules: []
}
```

### `removeAllById<T extends RootUnion | Union>(union: T, id: string): T`

Removes all rules and unions of a given id from a ruleset. Returns the updated ruleset.

> Note: This function mutates the input union. Clone the union before passing it in if you want to maintain its original state.

```js
import { addRuleToUnion, addUnionToUnion, createRoot, removeAllById } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });
const union = addUnionToUnion(root, { connector: 'or' });
const rule = addRuleToUnion(union, { type: 'number', field: 'age', operator: 'greater_than', value: 18 });

console.log(union.rules.length); // 1
removeAllById(root, rule.id);
console.log(union.rules.length); // 0
```

## Rules Specification

The properties of a rule change depending on the `type` field. The `type` field acts as a discriminator to determine which properties are valid for a given rule.

### type = 'string'

| Property    | Value                                                                                                                 | Description                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| type        | 'string'                                                                                                              | The type of the value to be evaluated.                                       |
| field       | string                                                                                                                | The field to check. Supports nested properties, e.g. `users.admins[0].name`. |
| operator    | 'equals_to' <br/> 'does_not_equal_to' <br/> 'contains' <br/> 'does_not_contain' <br/> 'starts_with' <br/> 'ends_with' | The operator to use.                                                         |
| value       | string                                                                                                                | The value to compare against.                                                |
| ignore_case | boolean                                                                                                               | Whether to ignore case when comparing strings.                               |

### type = 'number'

| Property | Value                                                                                                                                       | Description                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| type     | 'number'                                                                                                                                    | The type of the value to be evaluated.                                      |
| field    | string                                                                                                                                      | The field to check. Supports nested properties, e.g. `users.admins[0].age`. |
| operator | 'equals_to' <br/> 'does_not_equal_to' <br/> 'greater_than' <br/> 'greater_than_or_equal_to' <br/> 'less_than' <br/> 'less_than_or_equal_to' | The operator to use.                                                        |
| value    | number                                                                                                                                      | The value to compare against.                                               |

### type = 'boolean'

| Property | Value                      | Description                                                                       |
| -------- | -------------------------- | --------------------------------------------------------------------------------- |
| type     | 'boolean'                  | The type of the value to be evaluated.                                            |
| field    | string                     | The field to check. Supports nested properties, e.g. `users.admins[0].is_active`. |
| operator | 'is_true' <br/> 'is_false' | The operator to use.                                                              |

### type = 'array_value'

| Property | Value                                                    | Description                                                          |
| -------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| type     | 'array_value'                                            | The type of the value to be evaluated.                               |
| field    | string                                                   | The field to check. Supports nested properties, e.g. `users.admins`. |
| operator | 'contains' <br/> 'does_not_contain' <br/> 'contains_all' | The operator to use.                                                 |
| value    | any                                                      | The value to compare against.                                        |

### type = 'array_length'

| Property | Value                                                                                                                                       | Description                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| type     | 'array_length'                                                                                                                              | The type of the value to be evaluated.                               |
| field    | string                                                                                                                                      | The field to check. Supports nested properties, e.g. `users.admins`. |
| operator | 'equals_to' <br/> 'does_not_equal_to' <br/> 'greater_than' <br/> 'greater_than_or_equal_to' <br/> 'less_than' <br/> 'less_than_or_equal_to' | The operator to use.                                                 |
| value    | number                                                                                                                                      | The value to compare against.                                        |

### type = 'object_key'

| Property | Value                               | Description                                                             |
| -------- | ----------------------------------- | ----------------------------------------------------------------------- |
| type     | 'object_key'                        | The type of the value to be evaluated.                                  |
| field    | string                              | The field to check. Supports nested properties, e.g. `users.admins[0]`. |
| operator | 'contains' <br/> 'does_not_contain' | The operator to use.                                                    |
| value    | string                              | The value to compare against.                                           |

### type = 'object_value'

| Property | Value                               | Description                                                          |
| -------- | ----------------------------------- | -------------------------------------------------------------------- |
| type     | 'object_value'                      | The type of the value to be evaluated.                               |
| field    | string                              | The field to check. Supports nested properties, e.g. `users.admins`. |
| operator | 'contains' <br/> 'does_not_contain' | The operator to use.                                                 |
| value    | any                                 | The value to compare against.                                        |

### type = 'object_key_value'

| Property | Value                               | Description                                                          |
| -------- | ----------------------------------- | -------------------------------------------------------------------- |
| type     | 'object_key_value'                  | The type of the value to be evaluated.                               |
| field    | string                              | The field to check. Supports nested properties, e.g. `users.admins`. |
| operator | 'contains' <br/> 'does_not_contain' | The operator to use.                                                 |
| value    | { key: 'string', value: 'any' }     | The value to compare against.                                        |

### type = 'generic_comparison'

| Property | Value                                                                                                                                       | Description                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| type     | 'generic_comparison'                                                                                                                        | The type of the value to be evaluated.                                                   |
| field    | string                                                                                                                                      | The field to check. Supports nested properties, e.g. `users.admins[0].unknown_property`. |
| operator | 'equals_to' <br/> 'does_not_equal_to' <br/> 'greater_than' <br/> 'greater_than_or_equal_to' <br/> 'less_than' <br/> 'less_than_or_equal_to' | The operator to use.                                                                     |

### type = 'generic_type'

| Property | Value                                                                                                                                                                                                                                                                                                                   | Description                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| type     | 'generic_type'                                                                                                                                                                                                                                                                                                          | The type of the value to be evaluated.                                                   |
| field    | string                                                                                                                                                                                                                                                                                                                  | The field to check. Supports nested properties, e.g. `users.admins[0].unknown_property`. |
| operator | 'is_truthy' <br/> 'is_falsey' <br/> 'is_null' <br/> 'is_not_null' <br/> 'is_undefined' <br/> 'is_not_undefined' <br/> 'is_string' <br/> 'is_not_string' <br/> 'is_number' <br/> 'is_not_number' <br/> 'is_boolean' <br/> 'is_not_boolean' <br/> 'is_array' <br/> 'is_not_array' <br/> 'is_object' <br/> 'is_not_object' | The operator to use.                                                                     |
| value    | any                                                                                                                                                                                                                                                                                                                     | The value to compare against.                                                            |

## TypeScript Usage

Rules can be pre-composed using type anotations before adding it to the rules engine:

```ts
import { NewNumberRule, NewRule, addRuleToUnion, createRoot } from 'rules-engine-ts';

const root = createRoot({ connector: 'and' });

const wideTypingRule: NewRule = { type: 'number', field: 'age', operator: 'greater_than', value: 18 };
const narrowTypingRule: NewNumberRule = { type: 'number', field: 'age', operator: 'less_than', value: 30 };

const wideAfterAdding = addRuleToUnion(root, wideTypingRule);
const narrowAfterAdding = addRuleToUnion(root, narrowTypingRule);

console.log(wideAfterAdding);
console.log(narrowAfterAdding);
```

```js
{
  entity: 'rule',
  id: '560f4e04-f786-4269-bbdd-704ad9793518',
  parent_id: '6fa1aaa6-cfab-4647-a30c-a58af3e0a4d4',
  type: 'number',
  field: 'age',
  operator: 'greater_than',
  value: 18
}
```

```js
{
  entity: 'rule',
  id: '46a36441-3f28-4dd7-8420-b1d584527a74',
  parent_id: '6fa1aaa6-cfab-4647-a30c-a58af3e0a4d4',
  type: 'number',
  field: 'age',
  operator: 'less_than',
  value: 30
}
```

Similarly, a union can also be pre-composed before adding it to the rules engine:

```ts
import { NewUnion, addUnionToUnion, createRoot } from 'rules-engine-ts';

const userSelectsAnd = false;

const root = createRoot({ connector: 'and' });
const union: NewUnion = { connector: userSelectsAnd ? 'and' : 'or' };

const unionAfterAdding = addUnionToUnion(root, union);
console.log(unionAfterAdding);
```

```js
{
  entity: 'union',
  id: 'd2ce2a4e-ec53-4a64-9677-e9051c634bd1',
  parent_id: '8b32fdc4-8e92-424f-9c00-1204838759e0',
  connector: 'or',
  rules: []
}
```

## To Do

- [ ] Create recipe examples
- [ ] Create function to detect conflicting or redundant rules
- [ ] Create a UI builder tool

## Authors

- [@andrewvo89](https://github.com/andrewvo89) - Idea & Initial work.

See also the list of [contributors](https://github.com/andrewvo89/rules-engine-ts/contributors) who participated in this project.
