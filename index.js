import 'core-js/features/object/assign';
import accounting from 'accounting';
import localeCurrency from 'locale-currency';
import curr from './json/currencies';
import localeFormats from './json/localeFormats';

let defaultCurrency = {
  symbol: '',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  symbolOnLeft: true,
  spaceBetweenAmountAndSymbol: false,
  decimalDigits: 2
};

let defaultLocaleFormat = {};

let formatMapping = [
  {
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    format: {
      pos: '%s%v',
      neg: '-%s%v',
      zero: '%s%v'
    }
  },
  {
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: true,
    format: {
      pos: '%s %v',
      neg: '-%s %v',
      zero: '%s %v'
    }
  },
  {
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: false,
    format: {
      pos: '%v%s',
      neg: '-%v%s',
      zero: '%v%s'
    }
  },
  {
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: true,
    format: {
      pos: '%v %s',
      neg: '-%v %s',
      zero: '%v %s'
    }
  }
];

function format(value, options) {
  let code = options.code || (options.locale && localeCurrency.getCurrency(options.locale));
  let localeMatch = /^([a-z]+)([_-]([a-z]+))?$/i.exec(options.locale) || [];
  let language = localeMatch[1];
  let region = localeMatch[3];
  let localeFormat = Object.assign({}, defaultLocaleFormat,
    localeFormats[language] || {},
    localeFormats[language + '-' + region] || {});
  let currency = Object.assign({}, defaultCurrency, findCurrency(code), localeFormat);

  let symbolOnLeft = currency.symbolOnLeft;
  let spaceBetweenAmountAndSymbol = currency.spaceBetweenAmountAndSymbol;

  let format = formatMapping.filter(function (f) {
    return f.symbolOnLeft === symbolOnLeft && f.spaceBetweenAmountAndSymbol === spaceBetweenAmountAndSymbol
  })[0].format;

  return accounting.formatMoney(value, {
    symbol: (typeof options.symbol === 'undefined')
      ? currency.symbol
      : options.symbol,

    decimal: (typeof options.decimal === 'undefined')
      ? currency.decimalSeparator
      : options.decimal,

    thousand: (typeof options.thousand === 'undefined')
      ? currency.thousandsSeparator
      : options.thousand,

    precision: (typeof options.precision === 'number')
      ? options.precision
      : currency.decimalDigits,

    format: ['string', 'object'].indexOf(typeof options.format) > -1
      ? options.format
      : format
  });
}

function findCurrency(currencyCode) {
  return curr[currencyCode];
}

function unformat(value, options) {
  const code = options.code || (options.locale && localeCurrency.getCurrency(options.locale));
  const localeFormat = localeFormats[options.locale] || defaultLocaleFormat;
  const currency = Object.assign({}, defaultCurrency, findCurrency(code), localeFormat);
  const decimal = (typeof options.decimal === 'undefined') ? currency.decimalSeparator : options.decimal;
  return accounting.unformat(value, decimal);
}

let currencies = function () {
  return Object.keys(curr).map(function (key) {
    return curr[key];
  });
};;

export {
  defaultCurrency,
  currencies,
  findCurrency,
  localeCurrency,
  format,
  unformat
};