window.addEventListener("DOMContentLoaded", () => {
  // Load the header first
  fetch("components/header.html")
    .then(res => res.text())
    .then(headerHTML => {
      document.getElementById("site-header").innerHTML = headerHTML;

      // Now set up navigation logic after header is loaded
      setupNavigation();
      loadPage("home"); // load default
    });
});

function setupNavigation() {
  const links = document.querySelectorAll("nav a[data-page]");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      loadPage(page);

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

function loadPage(page) {
  fetch(`${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("content").innerHTML = "<p>Page not found.</p>";
    });
}
