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
// Met de pijlen (of de pijltjestoetsen) ga je naar de vorige of volgende foto.
// Sluiten kan met een klik ergens op het scherm, met het kruisje of met Esc.
var lichtbak = document.getElementById("lichtbak");
var lichtbakFoto = document.getElementById("lichtbak-foto");
var bandFotos = Array.prototype.slice.call(document.querySelectorAll(".band img"));
var huidige = 0;

function toonFoto(nummer) {
  // Na de laatste foto weer terug naar de eerste, en andersom
  huidige = (nummer + bandFotos.length) % bandFotos.length;
  lichtbakFoto.src = bandFotos[huidige].src;
  lichtbakFoto.alt = bandFotos[huidige].alt;
}

function sluitLichtbak() {
  if (!lichtbak) { return; }
  lichtbak.hidden = true;
  document.body.style.overflow = "";
}

if (lichtbak && lichtbakFoto) {
  bandFotos.forEach(function (foto, nummer) {
    foto.addEventListener("click", function () {
      toonFoto(nummer);
      lichtbak.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  lichtbak.querySelector(".lichtbak-vorige").addEventListener("click", function (gebeurtenis) {
    gebeurtenis.stopPropagation(); // niet sluiten
    toonFoto(huidige - 1);
  });

  lichtbak.querySelector(".lichtbak-volgende").addEventListener("click", function (gebeurtenis) {
    gebeurtenis.stopPropagation();
    toonFoto(huidige + 1);
  });

  lichtbak.addEventListener("click", sluitLichtbak);

  document.addEventListener("keydown", function (gebeurtenis) {
    if (lichtbak.hidden) { return; }
    if (gebeurtenis.key === "Escape") { sluitLichtbak(); }
    if (gebeurtenis.key === "ArrowLeft") { toonFoto(huidige - 1); }
    if (gebeurtenis.key === "ArrowRight") { toonFoto(huidige + 1); }
  });
}
