// DATA layer
function getInputData() {
  const inputElement = document.getElementById('inputValue');
  const selectElement = document.getElementById('conversionType');
  return {
    rawValue: inputElement.value,
    numericValue: parseFloat(inputElement.value),
    conversionType: selectElement.value
  };
}

// LOGIC layer
function calculateConversion(data) {
  if (data.rawValue === '' || isNaN(data.numericValue)) {
    return null;
  }

  const conversionRates = {
    'gal-L': { factor: 3.78541, unit: 'L' },
    'L-gal': { factor: 1 / 3.78541, unit: 'gal' },
    'm-km': { factor: 0.001, unit: 'km' },
    'km-m': { factor: 1000, unit: 'm' },
    'oz-g': { factor: 28.3495, unit: 'g' },
    'g-oz': { factor: 1 / 28.3495, unit: 'oz' },
    'lbs-kg': { factor: 0.453592, unit: 'kg' },
    'kg-lbs': { factor: 1 / 0.453592, unit: 'lbs' }
  };

  const selected = conversionRates[data.conversionType];
  if (!selected) return null;

  const convertedValue = data.numericValue * selected.factor;
  return {
    value: Number(convertedValue.toFixed(4)),
    unit: selected.unit
  };
}

// DISPLAY layer
function updateDisplay(result) {
  const outputElement = document.getElementById('resultOutput');
  if (result === null) {
    outputElement.textContent = '---';
  } else {
    outputElement.textContent = `${result.value} ${result.unit}`;
  }
}

function handleInput() {
  const data = getInputData();
  const result = calculateConversion(data);
  updateDisplay(result);
}

document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.getElementById('inputValue');
  const selectElement = document.getElementById('conversionType');

  inputElement.addEventListener('input', handleInput);
  selectElement.addEventListener('change', handleInput);
});
