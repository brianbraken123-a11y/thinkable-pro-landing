/* Thinkable.Pro — render dari config.js + animasi ringan */

(function () {
  "use strict";

  // Penanda kalau JS jalan: animasi reveal hanya aktif setelah class ini ada,
  // jadi kalau JS gagal, semua konten tetap kelihatan.
  document.documentElement.classList.add("js");

  var cfg = typeof CONFIG !== "undefined" ? CONFIG : (window.CONFIG || {});

  /* ---------- WhatsApp ---------- */
  function waLink() {
    var number = String(cfg.waNumber || "").replace(/[^0-9]/g, "");
    var text = encodeURIComponent(cfg.waMessage || "Halo Thinkable.Pro");
    return "https://wa.me/" + number + "?text=" + text;
  }

  function paintWhatsAppLinks() {
    var href = waLink();
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", href);
    }
  }

  /* ---------- Portofolio ---------- */
  function initials(name) {
    return String(name || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (word) { return word.charAt(0).toUpperCase(); })
      .join("");
  }

  function projectCard(project) {
    var el = document.createElement("article");
    el.className = "card reveal";

    var thumb = document.createElement("div");
    thumb.className = "card-thumb";
    if (project.thumb) {
      var img = document.createElement("img");
      img.src = project.thumb;
      img.alt = "Pratinjau landing page " + project.name;
      img.loading = "lazy";
      img.width = 640;
      img.height = 400;
      thumb.appendChild(img);
    } else {
      var initial = document.createElement("span");
      initial.className = "card-thumb-initial";
      initial.setAttribute("aria-hidden", "true");
      initial.textContent = initials(project.name);
      thumb.appendChild(initial);
      var caption = document.createElement("span");
      caption.className = "card-thumb-caption";
      caption.textContent = "Pratinjau menyusul";
      thumb.appendChild(caption);
    }

    var body = document.createElement("div");
    body.className = "card-body";

    var top = document.createElement("div");
    top.className = "card-top";
    var title = document.createElement("h3");
    title.textContent = project.name;
    var badge = document.createElement("span");
    badge.className = "badge" + (project.label === "Klien" ? " badge-client" : "");
    badge.textContent = project.label || "";
    top.appendChild(title);
    top.appendChild(badge);

    var business = document.createElement("p");
    business.className = "card-business";
    business.textContent = project.business || "";

    body.appendChild(top);
    body.appendChild(business);

    var link = document.createElement("a");
    link.className = "btn btn-ghost btn-sm card-link";
    if (project.url) {
      link.href = project.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Lihat Contoh";
      link.setAttribute("aria-label", "Lihat contoh landing page " + project.name + " (buka tab baru)");
    } else {
      link.setAttribute("aria-disabled", "true");
      link.tabIndex = -1;
      link.textContent = "Contoh menyusul";
    }
    body.appendChild(link);

    el.appendChild(thumb);
    el.appendChild(body);
    return el;
  }

  function paintProjects() {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;
    var list = Array.isArray(cfg.projects) ? cfg.projects : [];
    list.forEach(function (project) {
      grid.appendChild(projectCard(project));
    });

    var soon = document.createElement("article");
    soon.className = "card card-soon reveal";
    soon.innerHTML = "<div><strong>Segera hadir</strong>Slot berikutnya bisa punyamu.</div>";
    grid.appendChild(soon);
  }

  /* ---------- Paket ---------- */
  function packageCard(pkg) {
    var el = document.createElement("article");
    el.className = "card package reveal" + (pkg.highlighted ? " highlighted" : "");

    var h3 = document.createElement("h3");
    h3.textContent = pkg.name || "Paket";

    var row = document.createElement("div");
    row.className = "price-row";
    if (pkg.originalPrice) {
      var old = document.createElement("span");
      old.className = "price-old";
      old.textContent = pkg.originalPrice;
      row.appendChild(old);
    }
    var now = document.createElement("span");
    now.className = "price-now";
    now.textContent = pkg.price || "";
    row.appendChild(now);

    var note = document.createElement("p");
    note.className = "price-note";
    note.textContent = pkg.note || "";

    var ul = document.createElement("ul");
    ul.className = "feature-list";
    (pkg.features || []).forEach(function (feature) {
      var li = document.createElement("li");
      li.textContent = feature;
      ul.appendChild(li);
    });

    var cta = document.createElement("a");
    cta.className = "btn btn-primary";
    cta.setAttribute("data-wa", "");
    cta.href = "#";
    cta.target = "_blank";
    cta.rel = "noopener noreferrer";
    cta.textContent = "Pesan via WhatsApp";

    el.appendChild(h3);
    el.appendChild(row);
    el.appendChild(note);
    el.appendChild(ul);
    el.appendChild(cta);
    return el;
  }

  function paintPackages() {
    var grid = document.getElementById("packages-grid");
    if (!grid) return;
    var list = Array.isArray(cfg.packages) ? cfg.packages : [];
    if (list.length === 1) grid.classList.add("single");
    list.forEach(function (pkg) {
      grid.appendChild(packageCard(pkg));
    });
  }

  /* ---------- Testimoni ---------- */
  function paintTestimonials() {
    var box = document.getElementById("testimonials");
    if (!box) return;
    var list = Array.isArray(cfg.testimonials) ? cfg.testimonials : [];

    if (list.length === 0) {
      var empty = document.createElement("p");
      empty.className = "testimonial-empty";
      empty.textContent = "Testimoni klien segera hadir";
      box.appendChild(empty);
      return;
    }

    list.forEach(function (item) {
      var el = document.createElement("figure");
      el.className = "testimonial reveal";
      var quote = document.createElement("blockquote");
      quote.textContent = "\u201C" + item.quote + "\u201D";
      var foot = document.createElement("footer");
      var name = document.createElement("strong");
      name.textContent = item.name || "";
      foot.appendChild(name);
      if (item.role) {
        foot.appendChild(document.createTextNode(" · " + item.role));
      }
      el.appendChild(quote);
      el.appendChild(foot);
      box.appendChild(el);
    });
  }

  /* ---------- Tahun footer ---------- */
  function paintYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Reveal saat scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function revealAll() {
      for (var k = 0; k < items.length; k++) items[k].classList.add("is-visible");
    }

    if (reduce || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    // Jaring pengaman: apa pun yang terjadi, semua konten wajib kelihatan.
    // (JS error di tengah jalan, browser aneh, atau screenshot full-page.)
    window.setTimeout(revealAll, 1200);

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    for (var j = 0; j < items.length; j++) observer.observe(items[j]);
  }

  /* ---------- Jalankan ---------- */
  paintProjects();
  paintPackages();
  paintTestimonials();
  paintWhatsAppLinks();
  paintYear();
  initReveal();
})();
