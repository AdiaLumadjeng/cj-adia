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

// Fotoband: klik op een foto om hem helemaal te zien, in een polaroid-lijst.
// Sluiten kan met een klik ergens op het scherm, met het kruisje of met Esc.
var lichtbak = document.getElementById("lichtbak");
var lichtbakFoto = document.getElementById("lichtbak-foto");

function sluitLichtbak() {
  if (!lichtbak) { return; }
  lichtbak.hidden = true;
  document.body.style.overflow = "";
}

if (lichtbak && lichtbakFoto) {
  document.querySelectorAll(".band img").forEach(function (foto) {
    foto.addEventListener("click", function () {
      lichtbakFoto.src = foto.src;
      lichtbakFoto.alt = foto.alt;
      lichtbak.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  lichtbak.addEventListener("click", sluitLichtbak);

  document.addEventListener("keydown", function (gebeurtenis) {
    if (gebeurtenis.key === "Escape") { sluitLichtbak(); }
  });
}
