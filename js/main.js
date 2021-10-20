let y = []; // Deklarera array
let sum = 0; // Deklarera summa

function start() {
  let input = document.getElementById("control-number");
  let btn = document.getElementById("btn");
  let inputBirthdate = document.getElementsByTagName("input")[0];

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn.style.transition = "all 0.05s ease";
      btn.style.color = "var(--main-border-color)";
      inputBirthdate.style.transition = "all 0.05s ease";
      inputBirthdate.style.width = "70%";
    }
  });

  input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn.click();
      btn.style.transition = "";
      btn.style.color = "";
      inputBirthdate.style.transition = "";
      inputBirthdate.style.width = "";
    }
  });
}

// Funktion som körs vid knapp-tryck
function calculate() {
  // Hämtar värde
  let birthdate = document.getElementById("control-number").value;

  if (birthdate.length != [9]) {
    document.getElementById("personnummer").innerHTML = "Skriv rätt bre..";
    document.getElementById("personnummer").style.opacity = 1;
  } else {
    for (let i = 0; i < birthdate.length; i++) {
      console.log("Värdet som beräknas:", parseInt(birthdate[i]));
      let x = parseInt(birthdate[i] * (2 - (i % 2)));
      if (x > 9) {
        y.push(1);
        y.push(x % 10);
        console.log("Sparat värde i array:", 1);
        console.log("Sparat värde i array:", x % 10);
      } else {
        y.push(x);
        console.log("Sparat värde i array:", x);
      }
    }

    for (let i = 0; i < y.length; i++) {
      sum += y[i];
    }
    console.log("Summan utav värdet i array:", sum);

    let controlNumber = (10 - (sum % 10)) % 10;
    console.log("Kontrollnumret är:", controlNumber);

    // Initiallisera värden igen.
    birthdate = "";
    y = [];
    sum = 0;

    document.getElementById("personnummer").innerHTML =
      "Ditt kontrollnummer är:" + " " + controlNumber;
    document.getElementById("personnummer").style.opacity = 1;
  }
  console.log("==========================================================");
}

// Tackar Elias för ekvationen birthdate[i] * (2 - (i % 2))
