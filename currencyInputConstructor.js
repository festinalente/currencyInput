/**
 * Currency input.
 * @class
 * @param {HTMLelement} input element to enter value.
 * @param {sting} ISO currency code e.g. EUR
 * @summary Displays a currency correctly.
 * @description Formats input as currency, return an interger. 
 * Desired currency is passed as an attribute followed by the ISO code.
 * @example new currencyinput(document.querySelector('.currency'), 'EUR');
 */

 class CurrencyInput extends HTMLElement {
  static formAssociated = true;
  static get observedAttributes() {
    return ['currency'];
  }

  constructor() {
    super();
    //access the constructor from within functions:
    const intThis = this; 
    this.internals_ = this.attachInternals();
    //set a default value
    this.internals_.setFormValue(this.dataset.incent);
    const currency = this.getAttribute('currency');
    let currentValidState = '';

    this.addEventListener('input', (e) => {
      e.preventDefault();
      if(e.data.match(/\d+/g)){
        formatCurrency(this);
      } else {
        this.textContent = currentValidState;
      }
    });

    this.formatOnly = (number, currency) => {
      return formatGivenNumber(number, currency);
    };

    this.resolveInCent = (div) => {
      return parseFloat(this.textContent.match(/\d+/g).join(''));
    };

    function formatGivenNumber (number, currency) {
      const ar = number.toString().split('');
      if (ar.length === 1) ar.splice(ar.length - 2, 0, '0');
      ar.splice(ar.length - 2, 0, '.');
      if (ar.length > 6) {
        for (let i = 6; i < ar.length; i += 4) {
          ar.splice(ar.length - i, 0, ' ');
        }
      }
      return `${currency} ${ar.join('')}`;
    }

    function formatCurrency (targetEL) {
      if (targetEL.textContent.length === 0) {
        return;
      }

      const num = targetEL.textContent.match(/\d+/g);
      const ar = num.join('').split('');
      const digitCount = num.join('');

      ar.splice(ar.length, 0, ar[0]);
      ar.shift();

      if (digitCount.length === 1) {
        ar.splice(0, 0, '.0');
      }

      if (ar[0] === '0' && ar.length === 3) {
        ar.shift();
      }

      if (digitCount.length > 2) {
        ar.splice(ar.length - 2, 0, '.');
      }

      if (ar.length >= 6) {
        for (let i = 6; i < ar.length;) {
          ar.splice(ar.length - i, 0, ' ');
          i += 4;
        }
      }

      currentValidState = `${currency} ${ar.join('')}`;
      targetEL.textContent = currentValidState;
      targetEL.dataset.incent = parseFloat(targetEL.textContent.match(/\d+/g).join(''));
      intThis.internals_.setFormValue(targetEL.dataset.incent);
    }

    let firstKey = 0;
    this.addEventListener('keydown', function (e) {
      const key = e.key;
      const str = this.textContent;

      if (firstKey === 0 || key === 'Backspace' || key === 'Delete') {
        if (str.length < 4) {
          return;
        }
        firstKey = 1;
        this.textContent = `${str.slice(0, 4)}`;
      }
    });
  }
  

  get value() { return this.value_; }
}

window.customElements.define('currency-input', CurrencyInput);
