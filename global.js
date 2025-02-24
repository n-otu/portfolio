console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

let pages = [
	{url: "", title: "Home"},
	{url: "projects/", title: "Projects"},
	{url: "contact/", title: "Contact"},
    {url: "resume/", title: "Resume"},
    {url: "https://github.com/n-otu", title: "Github"}

];

// check if on home page
const ARE_WE_HOME = document.documentElement.classList.contains("home");


let nav = document.createElement("nav");
let ul = document.createElement("ul");
nav.appendChild(ul);
document.body.prepend(nav);


for (let p of pages) {
	let url = p.url;
	let title = p.title;

    //if we're not on the home page and URL is relative, add the ../ stuff
    if (!ARE_WE_HOME && !url.startsWith("http")) {
        url = "../" + url;
    }


	// Create link and add it to nav
	let a = document.createElement("a"); // will open a new tab for github
    let li = document.createElement("li");
    a.href = url;
    a.textContent = title;

    li.appendChild(a); // append a to li
    ul.appendChild(li)


    // check if the link is to the current page
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }

    // for external links, open new page
    if (a.host !== location.host) {
        a.target = "_blank";}

    }

document.body.insertAdjacentHTML("afterbegin", `
    <label class="color-scheme">
    Theme:
    <select>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
</label>`
);

let select = document.querySelector("select");

if (localStorage.colorScheme) { // right after page is loaded
    document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}

select.addEventListener("input", function (event) {


	console.log("color scheme changed to", event.target.value);
    document.documentElement.style.setProperty("color-scheme", event.target.value);
    localStorage.colorScheme = event.target.value; // save color scheme preference

});

// improving contact form functionality

let form = document.querySelector(".contact-form");

form?.addEventListener("submit", function (event) {
    event.preventDefault();
    let data = new FormData(form);

    let url = form.action + "?";
    for (let [name, value] of data) {
        url += (name + "=" + value + "&")
        console.log(name, value);
    }
    location.href = url;
});
