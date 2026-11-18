// Wachtwoord: pas het hier aan. Hoofdletters maken niet uit.
var WACHTWOORD = "cj&adia2027";

var formulier = document.getElementById("slotformulier");

if (formulier) {
  formulier.addEventListener("submit", function (gebeurtenis) {
    gebeurtenis.preventDefault();

    var invoer = document.getElementById("wachtwoord").value.trim().toLowerCase();

    if (invoer === WACHTWOORD.toLowerCase()) {
      try {
        localStorage.setItem("cj-adia-open", "ja");
      } catch (fout) {}
      document.documentElement.classList.remove("vergrendeld");
    } else {
      document.getElementById("slotfout").textContent = "Dat is niet het juiste wachtwoord.";
    }
  });
}

// Blokjes laten verschijnen als je naar beneden scrolt
var blokjes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  var kijker = new IntersectionObserver(function (items) {
    items.forEach(function (item) {
      if (item.isIntersecting) {
        item.target.classList.add("zichtbaar");
        kijker.unobserve(item.target);
      }
    });
  }, { threshold: 0.1 });

  blokjes.forEach(function (blokje) {
    kijker.observe(blokje);
  });
} else {
  blokjes.forEach(function (blokje) {
    blokje.classList.add("zichtbaar");
  });
}
