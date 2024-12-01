import "./styles.css";
// Menu daata structure
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

const mainEl = document.querySelector("main");

mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList = "flex-ctr";

const topMenuEl = document.getElementById("top-menu");

topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList = "flex-around";

var index;
for (index = 0; index < menuLinks.length; index++) {
  var a = document.createElement("a");
  var text = document.createTextNode(menuLinks[index].text);
  a.appendChild(text);
  a.href = menuLinks[index].href;
  topMenuEl.appendChild(a);
  console.log(a);
}

const subMenuEl = document.getElementById("sub-menu");

subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList = "flex-around";

// Prevent the default behavior of <a>
const topMenuLinks = topMenuEl.querySelectorAll("a");
/* Target is a property of the Event object in JavaScript. Allows you to access the specific DOM element
  that triggered/click the event.*/
topMenuEl.addEventListener("click", function (e) {
  /*tagName is a property of a DOM element in JavaScript. It determines the type of HTML element
  (e.g., <a>, <div>, <button>) you are interacting with.*/
  e.preventDefault();
  // This line checks if the clicked element is not an <a> tag. If it's not, it exits the function early.
  if (e.target.tagName !== "A") return;
  // e.target refers to the DOM element where the event originated (in this case, the <a>

  // If the clicked link is already active, deactivate it
  // If the clicked link is not active, deactivate all links and activate the clicked one
  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
    return;
  }

  topMenuLinks.forEach((value) => value.classList.remove("active"));
  e.target.classList.add("active");
});

function buildSubmenu(subLinks) {
  // Clear existing submenu content
  subMenuEl.innerHTML = "";

  // Populate submenu with new links
  subLinks.forEach((link) => {
    const a = document.createElement("a");
    a.textContent = link.text;
    a.href = link.href;
    subMenuEl.appendChild(a);
  });
}

topMenuEl.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName !== "A") return;

  console.log(e.target.textContent);

  topMenuLinks.forEach((link) => link.classList.remove("active"));

  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
    subMenuEl.style.top = "0"; // Hide submenu
    return;
  }

  e.target.classList.add("active");

  const linkData = menuLinks.find((link) => link.text === e.target.textContent);

  if (linkData && linkData.subLinks) {
    subMenuEl.style.top = "100%";
    buildSubmenu(linkData.subLinks);
  } else {
    subMenuEl.style.top = "0";
  }
});

subMenuEl.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default behavior of <a>

  // Ensure the clicked element is an <a> tag
  if (e.target.tagName !== "A") return;

  // Log the clicked link's text content
  console.log(e.target.textContent);

  // Hide the submenu
  subMenuEl.style.top = "0";

  // Remove the 'active' class from all top menu links
  topMenuLinks.forEach((link) => link.classList.remove("active"));

  // Update the contents of mainEl with an <h1> containing the clicked link's text
  mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`;

  // Special case for the ABOUT link
  if (e.target.textContent.toLowerCase() === "about") {
    mainEl.innerHTML = `<h1>About</h1>`;
  }
});
