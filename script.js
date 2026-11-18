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

// Fotoband: met de muis op een foto kun je scrollen om te bepalen welk deel
// van de foto je ziet (omhoog/omlaag en links/rechts). Is de rand van de foto
// bereikt, dan scrolt gewoon de pagina of de band verder.
var bandFotos = document.querySelectorAll(".band img");

bandFotos.forEach(function (foto) {
  var x = 50; // horizontale stand in procenten
  var y = 50; // verticale stand in procenten

  // Beginstand overnemen uit style="object-position: ..." als die er is
  var begin = getComputedStyle(foto).objectPosition.split(" ");
  if (begin.length === 2 && begin[0].indexOf("%") > -1 && begin[1].indexOf("%") > -1) {
    x = parseFloat(begin[0]);
    y = parseFloat(begin[1]);
  }

  foto.addEventListener("wheel", function (gebeurtenis) {
    var breedte = foto.clientWidth;
    var hoogte = foto.clientHeight;
    var nat = foto.naturalWidth || foto.width;
    var nathoogte = foto.naturalHeight || foto.height;
    if (!breedte || !hoogte || !nat || !nathoogte) { return; }

    // Hoeveel pixels van de foto steken buiten het vakje uit?
    var schaal = Math.max(breedte / nat, hoogte / nathoogte);
    var extraX = nat * schaal - breedte;
    var extraY = nathoogte * schaal - hoogte;

    var factor = gebeurtenis.deltaMode === 1 ? 16 : 1;
    var dx = gebeurtenis.deltaX * factor;
    var dy = gebeurtenis.deltaY * factor;

    var nieuwX = x;
    var nieuwY = y;
    if (extraX > 1 && dx !== 0) { nieuwX = Math.min(100, Math.max(0, x + (dx / extraX) * 100)); }
    if (extraY > 1 && dy !== 0) { nieuwY = Math.min(100, Math.max(0, y + (dy / extraY) * 100)); }

    // Niets meer te verschuiven: de pagina of band mag zelf scrollen
    if (nieuwX === x && nieuwY === y) { return; }

    gebeurtenis.preventDefault();
    x = nieuwX;
    y = nieuwY;
    foto.style.objectPosition = x + "% " + y + "%";
  }, { passive: false });
});
