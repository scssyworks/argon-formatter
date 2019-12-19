# Argon Formatter

Argon Formatter is universal currency formatter. This is a <b>fork</b> of <a href="https://github.com/smirzaei/currency-formatter">Smirzaei's</a> currency-formatter except that it provides UMD and ESM builds.

## Install

```bash
npm install argon-formatter --save
```

## Basic Usage

Using currency code

```js
import * as argonFormatter from 'argon-formatter';

argonFormatter.format(1000000, { code: 'USD' });
// => '$1,000,000.00'

argonFormatter.format(1000000, { code: 'GBP' });
// => '£1,000,000.00'

argonFormatter.format(1000000, { code: 'EUR' });
// => '1 000 000,00 €'
```

Using locale

```js
import * as argonFormatter from 'argon-formatter';

argonFormatter.format(1000000, { locale: 'en-US' });
// => '$1,000,000.00'

argonFormatter.format(1000000, { locale: 'en-GB' });
// => '£1,000,000.00'

argonFormatter.format(1000000, { locale: 'GB' });
// => '£1,000,000.00'

argonFormatter.format(1000000, { locale: 'de-DE' });
// => '1.000.000,00 €'

argonFormatter.format(1000000, { locale: 'nl-NL' });
// => '€1.000.000,00'
```

## Get currency information

```js
import * as argonFormatter from 'argon-formatter';

argonFormatter.findCurrency('USD');
// returns:
// {
//   code: 'USD',
//   symbol: '$',
//   thousandsSeparator: ',',
//   decimalSeparator: '.',
//   symbolOnLeft: true,
//   spaceBetweenAmountAndSymbol: false,
//   decimalDigits: 2
// }

```

## Unformat

```js

argonFormatter.unformat('$10.5', { code: 'USD' })
// => 10.5

argonFormatter.unformat('$1,000,000', { code: 'USD' })
// => 1000000

argonFormatter.unformat('10,5 €', { code: 'EUR' })
// => 10.5

argonFormatter.unformat('1 000 000,00 €', { code: 'EUR' })
// => 1000000

argonFormatter.unformat('1.000,99', { locale: 'de-DE' })
// => 1000.99

argonFormatter.unformat('10\'000 CHF', { code: 'CHF' })
// => 10000

argonFormatter.unformat('10.00 CHF', { code: 'CHF' })
// => 10

argonFormatter.unformat('10,00 CHF', { code: 'CHF' })
// => 1000

```

## Advanced Usage

Argon Formatter uses [accounting](https://github.com/openexchangerates/accounting.js) under the hood, and you can use its options to override default behavior.

```js
import * as argonFormatter from 'argon-formatter';
argonFormatter.format(1000000, {
  symbol: '@',
  decimal: '*',
  thousand: '^',
  precision: 1,
  format: '%v %s' // %s is the symbol and %v is the value
});

// => '1^000^000*0 @'

// Different formatting for positive and negative values
argonFormatter.format(-10, {
  format: {
    pos: '%s%v' // %s is the symbol and %v is the value
    neg: '(%s%v)',
    zero: '%s%v'
  }
});

// => ($10)
```

## Getting a list of all currencies

```js
const currencies = argonFormatter.currencies();
```