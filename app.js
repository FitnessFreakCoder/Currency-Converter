const url = "http://apilayer.net/api/live?access_key=8520e84ad903c5b0c37c4aa920530c2d&currencies=NPR&source=USD&format=1";
const newMsg = document.querySelector(".msg");


const dropdowns = document.querySelectorAll(".dropdown select");

const button = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


for (let select of dropdowns) {
  for (currCode in countrylist) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && select.name === "USD"){
      newOption.selected = "selected";
      

    }

    else if (select.name === "to" && select.name === "INR"){
      newOption.selected = "selected";
      

    }
    select.append(newOption);
  }

select.addEventListener("change", (evt) =>{
  updateFlag(evt.target);
})
 
}

const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countrylist[currCode];
  let newSrc = "https://flagsapi.com/${countryCode}/flat/64.png"
  let img = element.parentElement.querySelector("img");
img.src = newSrc;

}

button.addEventListener("click", async(evt)=>{
  evt.preventDefault();
let amount = document.querySelector(".amount input")
let amtVal = amount.value;
if(amtVal === "" || amtVal<1 ){
  amtVal = 1;
  amount.value = "1";

}

const URL = `${url}=${fromCurr.value.toLowercase}&source=${toCurr.value.toLowercase}&format=1`;
let response = await fetch(URL)
let data = await response.json();
console.log(data);

});