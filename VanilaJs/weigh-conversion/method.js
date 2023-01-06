const val = document.getElementById("poundValue");

const conversion = (v) => {
  const weighInKgs = v * 0.453592;
  const weighInOunces = v * 16;
  const weighInGrams = v * 453.592;
  return { weighInKgs, weighInOunces, weighInGrams };
};

function getValue() {
  const x = document.getElementById("poundValue").value;
  const { weighInKgs, weighInOunces, weighInGrams } = conversion(x);
  document.getElementById("gm-value").innerHTML = weighInGrams;
  document.getElementById("kg-value").innerHTML = weighInKgs;
  document.getElementById("ounces-value").innerHTML = weighInOunces;
  document.getElementById("output").classList.remove("output-div");
}
