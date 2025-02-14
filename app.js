const newMsg = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector("#from_curr")
const toCurr = document.querySelector(".to select")


for (let select of dropdowns) {
  for (let currCode in countrylist) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from_" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countrylist[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};



button.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value || 1;
  
  // Using Exchange Rate API
  const URL = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;

  try {
    let response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    let data = await response.json();
    
    // Get the conversion rate from the rates object
    let rate = data.rates[toCurr.value];
    console.log(rate)
    if (!rate) {
      throw new Error(`Exchange rate not available.`);
    }

    let converted = (amtVal * rate).toFixed(2);
    newMsg.innerText = `${amtVal} ${fromCurr.value} = ${converted} ${toCurr.value}`;
  } catch (error) {
    console.error("Failed to fetch currency data:", error);
    newMsg.innerText = "Failed to fetch exchange rates. Please try again later.";
  }
});
