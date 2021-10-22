let y = []; // Deklarera array
let sum = 0; // Deklarera summa

// Hämtar input från HTML via id.
let input = document.querySelector("input");

// Hämtar knapp från HTML via id.
let btn = document.querySelector("button");

// Funktion för nedtryck på enter då man är i input-fältet.
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    // Ändrar lite design vid nedtryck av enterknapp.
    btn.style.transition = "all 0.05s ease";
    btn.style.color = "var(--main-border-color)";
    input.style.transition = "all 0.05s ease";
    input.style.width = "70%";
  }
});

// Funktion då enter släpps när man är i input-fältet.
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    // Kör igång nedan calculate()-funktion.
    btn.click();

    // Återställer design då enter-knappen släpps..
    btn.style.transition = "";
    btn.style.color = "";
    input.style.transition = "";
    input.style.width = "";
  }
});

btn.addEventListener("click", calculate);

// Funktion som körs vid knapp-tryck.
function calculate() {
  // Hämtar värde från input.
  let birthdate = input.value;

  // Deklarerar personnummer.
  let ssn = document.querySelector("p");

  // Boolean på längden för inskrivet värde.
  let validateLength = Boolean(birthdate.length != 9);

  // Boolean på typ av karaktär.
  let validateChar = isNaN(birthdate);

  // Skriver ut ifall validering på längd är sant/falskt.
  console.log("validateLength:", validateLength);

  // Skriver ut ifall validering på karaktär är sant/falskt.
  console.log("validateChar:", validateChar);

  // If-sats om personnummer inte är 9 siffror
  if (validateLength || validateChar) {
    // Skriver på sidan "Skriv rätt bre.."
    ssn.innerHTML = "Skriv rätt bre..";
    ssn.style.opacity = 1;
  }

  // Om valideringen går igenom startas nedan kod.
  else {
    // En for-loop som initierar samtliga värden i array y.
    for (let i = 0; i < birthdate.length; i++) {
      // Skriver ut vad som beräknas.
      console.log("Värdet som beräknas:", birthdate[i]);

      // En ekvation som multiplicerar vartannat värde utifrån vart vi är i loopen.
      // Tack Elias Fredriksson för ekvation. (x * 2 - (y % 2))
      // Denna sparas sedan i en variabel x.
      let x = birthdate[i] * (2 - (i % 2));

      // Om värdet vi får fram är över 9..
      if (x > 9) {
        // Indexera 1 i array.
        y.push(1);

        // Indexera (x modul 10) i array.
        y.push(x % 10);

        // Skriver ut vad vi indexerat.
        console.log("Sparat värde i array:", 1);
        console.log("Sparat värde i array:", x % 10);
      }

      // Annars indexeras x.
      else {
        y.push(x);
        // Skriver ut vad som indexerats.
        console.log("Sparat värde i array:", x);
      }
    }

    // Då värdena har indexerats räknas summan ut med nedan for-loop.
    for (let i = 0; i < y.length; i++) {
      sum += y[i];
    }
    // Skriver ut summan.
    console.log("Summan utav värdet i array:", sum);

    // Därefter räknas kontrollsiffran ut via nedan ekvation, hämtad från:
    // https://sv.wikipedia.org/wiki/Personnummer_i_Sverige#Kontrollsiffran
    let controlNumber = (10 - (sum % 10)) % 10;
    // Skriver ut kontrollsiffran.
    console.log("Kontrollnumret är:", controlNumber);

    // Initialiserar värden igen för att kunna återskapa process.
    birthdate = "";
    y = [];
    sum = 0;

    // Skriver ut resultat i HTML-dokumentet.
    ssn.innerHTML = "Ditt kontrollnummer är:" + " " + controlNumber;
    ssn.style.opacity = 1;
  }
  // För att dela upp varje uträkning i konsollen.
  console.log("==========================================================");
}
