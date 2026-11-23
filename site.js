/* NL/EN switch (Dutch is in the markup, English in data-en) + version from version.json. Everything works without JS except the language switch. */
(function () {
  var L = "nl";
  function esc(s) { return s; }
  function apply(l) {
    L = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.documentElement.lang = l;
    document.querySelectorAll("[data-en]").forEach(function (n) {
      if (n.dataset.nl === undefined) n.dataset.nl = n.innerHTML;
      n.innerHTML = l === "en" ? n.getAttribute("data-en") : n.dataset.nl;
    });
    var b = document.getElementById("langBtn");
    if (b) b.textContent = l === "nl" ? "English" : "Nederlands";
    var t = document.documentElement.getAttribute("data-title-" + l);
    if (t) document.title = t;
  }
  var start = "nl";
  try { start = localStorage.getItem("lang") || ((navigator.language || "").slice(0, 2) === "nl" ? "nl" : "en"); } catch (e) {}
  apply(start);
  var btn = document.getElementById("langBtn");
  if (btn) btn.onclick = function () { apply(L === "nl" ? "en" : "nl"); };

  fetch("version.json", { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (j) {
    document.querySelectorAll(".ver").forEach(function (n) { n.textContent = "v" + j.latest; });
    if (j.downloadUrl) document.querySelectorAll("a.dl").forEach(function (a) { a.href = j.downloadUrl; });
  }).catch(function () {});
})();

/* mobile menu */
(function () {
  var b = document.getElementById("burger"), m = document.getElementById("mainMenu");
  if (!b || !m) return;
  function set(o) { document.body.classList.toggle("menu-open", o); b.setAttribute("aria-expanded", o ? "true" : "false"); }
  b.addEventListener("click", function () { set(!document.body.classList.contains("menu-open")); });
  m.addEventListener("click", function (e) { if (e.target.tagName === "A") set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 860) set(false); });
})();
