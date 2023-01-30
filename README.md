# currencyInput
This extends native form input element so as to better handle currencies by
presenting them in ISO standard and returning the input as an Atomic value, 
e.g. cent for Euro or Dollar, pence for Pounds Sterling.

See a working example here: https://codepen.io/tomasMetcalfe/full/mdjGRXo

A curreny input takes the following form (HTML):

```
<currency-input currency="EUR" contenteditable="true" name="current-value" value="00.00">00.00</currency-input>
```

**Note the ISO code for the currency is passed through the currency attribute. In the above example it is set to EUR**

On input, the value is written, in cent, to a data-attribute called incent. 

The input can be retrieved by simply reading that data attribute: 

```
const value = document.querySelector('currency-input').dataset.incent;
```

Note that the type of class constructor used here is only available in recent JavaScript flavours. To use this in production I would advise using Babel to ensure sufficient backward compatibility. 