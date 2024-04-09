const conversionAPI = "https://latest.currency-api.pages.dev/v1/currencies";
const flagsAPI = "https://flagsapi.com";

dropdown = document.querySelectorAll(".flagCurr select");

// for (code in countryList) {
//     console.log(code, countryList[code]);
// }

for (let selects of dropdown) {
    for (let code in countryList) {
        let option = document.createElement("option");
        option.value = code;
        option.text = code;

        if (code === "INR" && selects.id === "from") {
            option.selected = true;
        }
        if (code === "USD" && selects.id === "to") {
            option.selected = true;
        }

        selects.appendChild(option);
    }

    selects.addEventListener("change", (e) => {
        flagUpdate(e.target);
        calculate(e);
    });
}

const flagUpdate = (element) => {
    let selectedOption = element.options[element.selectedIndex];

    // find parent div of element
    let parentDiv = element.parentElement.id;
    // console.log(parentDiv);

    // access img tag in the parent div
    let flag = document.querySelector(`#${parentDiv} img`);
    // console.log(flag);
    
    // updating flag link
    flag.src = `${flagsAPI}/${countryList[selectedOption.value]}/flat/48.png`;
    // console.log(flag.src);
}

const btn = document.querySelector("form button");
btn.addEventListener("click", calculate);

function calculate(e) {
    e.preventDefault();

    let from = document.querySelector("#fromFlagCurr select").value.toLowerCase();
    let to = document.querySelector("#toFlagCurr select").value.toLowerCase();
    let amount = document.querySelector("#amount").value;
    // console.log(from, to, amount);

    if (amount === "" || amount < 0) {
        let output = document.querySelector("#convertDiv p");
        output.innerHTML = "Please enter a valid amount";
        return;
    }

    let url = `${conversionAPI}/${from}.json`
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let unit = data[from][to];
            console.log(unit);
            
            let result = amount * unit;
            console.log(result);

            let output = document.querySelector("#convertDiv p");
            output.innerHTML = `${amount} ${from.toUpperCase()} is equal to ${result.toFixed(3)} ${to.toUpperCase()}`;
        });
}