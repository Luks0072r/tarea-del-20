// 1. Botones "Copiar" en cada bloque de código
document.querySelectorAll("pre").forEach((pre) => {
  const wrap = document.createElement("div");
  wrap.className = "code-block";
  pre.parentNode.insertBefore(wrap, pre);
  wrap.appendChild(pre);

  const btn = document.createElement("button");
  btn.className = "copy";
  btn.type = "button";
  btn.textContent = "Copiar";
  wrap.appendChild(btn);

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.innerText.trim());
      btn.textContent = "Copiado";
      btn.classList.add("done");
    } catch (err) {
      btn.textContent = "No se pudo copiar";
    }
    setTimeout(() => {
      btn.textContent = "Copiar";
      btn.classList.remove("done");
    }, 1800);
  });
});

// 2. Menú lateral en móvil
const side = document.getElementById("side");
const menuBtn = document.getElementById("menuBtn");

function toggleMenu(open) {
  side.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "Cerrar" : "Menú";
}
menuBtn.addEventListener("click", () => toggleMenu(!side.classList.contains("open")));
side.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => toggleMenu(false))
);

// 3. Marca en el menú la sección que estás leyendo
const links = [...side.querySelectorAll(".graph a")];
const sections = links
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function setActive(id) {
  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + id)
  );
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  },
  { rootMargin: "-20% 0px -70% 0px" }
);
sections.forEach((s) => observer.observe(s));
setActive("inicio");

// 4. Filtro de la chuleta de comandos
const filter = document.getElementById("filter");
const rows = [...document.querySelectorAll("#cheat tbody tr")];
const empty = document.getElementById("empty");

filter.addEventListener("input", () => {
  const q = filter.value.trim().toLowerCase();
  let visible = 0;
  rows.forEach((row) => {
    const match = row.textContent.toLowerCase().includes(q);
    row.hidden = !match;
    if (match) visible++;
  });
  empty.hidden = visible > 0;
});
