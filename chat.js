function drawTotals(calculator) {
  var rewards = calculateRewards(calculator);
  var cashBackString = "$" + formatCurrency((calculator.annual ? rewards.cash_back_year : rewards.cash_back_month));
  var dividendYield = "$" + formatCurrency((calculator.annual ? rewards.div_yield_year : rewards.div_yield_month));
  var totalEarnings = "$" + formatCurrency((calculator.annual ? rewards.total_year: rewards.total_month));
  var totalAltEarnings = "$" + formatCurrency((calculator.annual ? rewards.total_month: rewards.total_year));
  var toggledPeriodSpans = document.getElementsByClassName("toggled-period");
  var toggleAltPeriod = document.getElementById("toggled-period-alt");
  
  Array.prototype.forEach.call(toggledPeriodSpans, function(span) {
   span.textContent = calculator.annual ? "Year" : "Month";
    })
  
  toggleAltPeriod.textContent = calculator.annual ? "Month" : "Year";
  
  document.getElementById("per-period-cash-back").textContent = cashBackString;
  document.getElementById("per-period-dividend").textContent = dividendYield;
  document.getElementById("per-period-total").textContent = totalEarnings;
  document.getElementById("alt-period-total").textContent = totalAltEarnings;
  
}

function calculateRewards(calculatorInputs) {

  var cash_back_month = getCashbackPoints(calculatorInputs);
  var div_yield_month = getSavingsYield(calculatorInputs);
  var cash_back_year = getCashbackPoints(calculatorInputs, true);
  var div_yield_year = getSavingsYield(calculatorInputs, true);
  
  return {
    cash_back_month: cash_back_month,
    div_yield_month: div_yield_month,
    total_month: cash_back_month + div_yield_month,
    cash_back_year: cash_back_year,
    div_yield_year: div_yield_year,
    total_year: cash_back_year + div_yield_year
  }
}

function getSavingsYield(calculatorInputs, annualize) {
  
  if (calculatorInputs.balance <= 20000) {
    var monthlyYield = (calculatorInputs.balance * 0.02) / 12;
    return annualize ? monthlyYield * 12 : monthlyYield;
  } else {
    var baseYield = (20000 * 0.02) / 12;
    var excessYield = ((calculatorInputs.balance - 20000) * 0.0015) / 12;
    return annualize ? ((baseYield + excessYield) * 12) : (baseYield + excessYield);
  }

}

function getCashbackPoints(calculatorInputs, annualize) {
  var grocery_total = calculatorInputs.grocery;
  var gas_total = calculatorInputs.gas;
  var other_total = calculatorInputs.other;

  var grocery_points = grocery_total * .02
  var gas_points = gas_total * .03
  var other_points = other_total * .01
 
  var monthlyCashback = (grocery_points + gas_points + other_points);
  return annualize ? 12 * monthlyCashback : monthlyCashback;
  
}

function handleCalcInputChange(event) {
  window.r2calculator[this.name] = parseInt(this.value || 0);
  drawTotals(window.r2calculator)
}

function handleInputKeyDown(event) {
  if (event.keyCode === 13) {
     handleCalcInputChange.call(this, event);
  } 
}

function formatCurrency(number) {
  var rounded = "" + Math.round(number * 100) / 100;
  var decimalCheck = rounded.split('.')
  if (decimalCheck.length === 1) {
    return "" + rounded + ".00";
  } else if (decimalCheck[1].length === 1) {
    return "" + rounded + "0";
  } else {
    return "" + rounded;
  }
}

document.addEventListener("DOMContentLoaded", function(){
  
  if(!window.r2calculator)
 { window.r2calculator = { grocery: 600, gas: 300, other: 1000, balance: 5000, annual: true};
  
  var calcInputs = document.getElementsByClassName("calc-input");
  Array.prototype.forEach.call(calcInputs, function(input) {
    input.addEventListener("blur", handleCalcInputChange);
    input.addEventListener("keydown", handleInputKeyDown);
  })
  
  document.getElementById("per-month-toggle").addEventListener("click", function() {
    window.r2calculator.annual = false;
    drawTotals(window.r2calculator);
    document.getElementById("per-year-toggle").classList.remove("active-period");
    this.classList.add("active-period");
    
  })
  document.getElementById("per-year-toggle").addEventListener("click", function() {
    window.r2calculator.annual = true;
    drawTotals(window.r2calculator);
    document.getElementById("per-month-toggle").classList.remove("active-period");
    this.classList.add("active-period");
  })
 }
});
