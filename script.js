// 1. Blokjes laten verschijnen als je naar beneden scrolt
var blokjes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  var kijker = new IntersectionObserver(function (items) {
    items.forEach(function (item) {
      if (item.isIntersecting) {
        item.target.classList.add("zichtbaar");
        kijker.unobserve(item.target);
      }
    });
  }, { threshold: 0.15 });

  blokjes.forEach(function (blokje) {
    kijker.observe(blokje);
  });
} else {
  blokjes.forEach(function (blokje) {
    blokje.classList.add("zichtbaar");
  });
}

// 2. Aftellen naar de bruiloft (alleen op de voorpagina)
var aftellen = document.getElementById("aftellen");

if (aftellen) {
  var bruiloft = new Date(2027, 7, 7); // maand 7 = augustus
  var vandaag = new Date();
  var dagen = Math.ceil((bruiloft - vandaag) / (1000 * 60 * 60 * 24));

  if (dagen > 1) {
    aftellen.textContent = "Nog " + dagen + " dagen";
  } else if (dagen === 1) {
    aftellen.textContent = "Nog 1 dag";
  }
}
