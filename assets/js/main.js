(() => {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Κλείσιμο μενού" : "Άνοιγμα μενού");
    });
  }

  const banner = document.getElementById("cookie-banner");
  const storageKey = "te_cookie_choice_v1";
  const getChoice = () => {
    try { return localStorage.getItem(storageKey); } catch (_) { return null; }
  };
  const saveChoice = (choice) => {
    try { localStorage.setItem(storageKey, choice); } catch (_) {}
    if (banner) banner.hidden = true;
  };
  if (banner && !getChoice()) banner.hidden = false;
  document.getElementById("cookie-accept")?.addEventListener("click", () => saveChoice("accepted"));
  document.getElementById("cookie-reject")?.addEventListener("click", () => saveChoice("rejected"));
  document.querySelectorAll(".cookie-settings").forEach((button) => {
    button.addEventListener("click", () => {
      if (!banner) return;
      banner.hidden = false;
      banner.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  });

  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const recipient = "info@example.gr"; // ΑΝΤΙΚΑΤΑΣΤΗΣΤΕ με το πραγματικό email επιχείρησης.
    if (recipient.includes("example.gr")) {
      const status = document.getElementById("form-status");
      if (status) status.textContent = "Η φόρμα είναι έτοιμη, αλλά πρέπει πρώτα να οριστεί το πραγματικό email επικοινωνίας στο assets/js/main.js.";
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent("Αίτημα επικοινωνίας από τον ιστότοπο");
    const body = encodeURIComponent(
      "Ονοματεπώνυμο: " + data.get("name") + "\nEmail: " + data.get("email") +
      "\nΤηλέφωνο: " + data.get("phone") + "\nΘέμα: " + data.get("subject") +
      "\n\nΜήνυμα:\n" + data.get("message")
    );
    window.location.href = "mailto:" + recipient + "?subject=" + subject + "&body=" + body;
  });
})();