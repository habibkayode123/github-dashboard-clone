const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Juy",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let fullName = document.querySelector(".full-name");
let username = document.querySelector(".username");
let profilePic = document.querySelectorAll(".profile-pic");
let serchInput = document.querySelector("#search");
let headerNav = document.querySelector(".header-nav");
let headerForm = document.querySelector(".header-nav form");
let headerLabel = document.querySelector(".header-nav form label");
let overLay = document.querySelector(".overlay");
let plus = document.querySelector(".plus");
let addRepo = document.querySelector(".add-repo");
let typeOptionBtn = document.querySelector(".type-option-btn");
let typeLangBtn = document.querySelector(".btn-type-lang");
let topName = document.querySelector(".right-space div");
let typeOption = document.querySelector(".type-option");
let typeLang = document.querySelector(".type-lang");
let radioType = document.querySelectorAll("input[type=radio][name='type']");
let radioLange = document.querySelectorAll("input[type=radio][name='lang']");
let heaederNav = document.querySelector(".header-nav");
let followers = document.querySelectorAll(".followers");
let repoList = document.querySelector(".repo-list");
let dashboardImg = document.querySelector(".dashboard-img");
let stickyImg = document.querySelector(".sticky-img");
let navDash = document.querySelector(".nav-dash");
let stickyName = document.querySelector(".sticky-name");
let hambugerButton = document.querySelector(".hambuger button");
let loaderContainer = document.querySelector(".loader-container");

hambugerButton.addEventListener("click", (e) => {
  headerNav.classList.toggle("remove-display");
});

window.addEventListener("scroll", (e) => {
  console.log(window.scrollY);
  if (window.scrollY > 332) {
    topName.style.display = "flex";
  } else {
    topName.style.display = "none";
  }
});

function typeChangeHandler(event) {
  typeOptionBtn.children[0].textContent = event.target.value;
  overLay.style.display = "none";
  typeOption.style.display = "none";
}

function langChangeHandler(event) {
  typeLangBtn.children[0].textContent = event.target.value;

  typeLang.style.display = "none";
  overLay.style.display = "none";
}

Array.prototype.forEach.call(radioLange, function (radio) {
  radio.addEventListener("change", langChangeHandler);
});

Array.prototype.forEach.call(radioType, function (radio) {
  radio.addEventListener("change", typeChangeHandler);
});

typeLangBtn.addEventListener("click", (e) => {
  styles = getComputedStyle(typeLang);
  if (styles.display === "none") {
    typeLang.style.display = "block";
    typeOption.style.display = "none";
    addRepo.style.display = "none";
    overLay.style.display = "block";

    return;
  } else if (styles.display === "block") {
    typeLang.style.display = "none";
    overLay.style.display = "none";
  }
});

typeOptionBtn.addEventListener("click", (e) => {
  styles = getComputedStyle(typeOption);
  if (styles.display === "none") {
    typeOption.style.display = "block";
    overLay.style.display = "block";
    typeLang.style.display = "none";
    addRepo.style.display = "none";
    return;
  } else if (styles.display === "block") {
    typeOption.style.display = "none";
    overLay.style.display = "none";
  }
});

plus.addEventListener("click", (e) => {
  styles = getComputedStyle(addRepo);
  if (styles.display === "none") {
    typeOption.style.display = "none";
    addRepo.style.display = "block";
    overLay.style.display = "block";
    return;
  } else if (styles.display === "block") {
    addRepo.style.display = "none";
    overLay.style.display = "none";
  }
});

overLay.addEventListener("click", (e) => {
  console.log(e);
  addRepo.style.display = "none";
  overLay.style.display = "none";
  typeLang.style.display = "none";
  typeOption.style.display = "none";
});

serchInput.addEventListener("focus", (e) => {
  headerNav.style.flexGrow = 1;
  headerForm.style.flexGrow = 1;
  headerLabel.style.flexGrow = 1;
  serchInput.style.flexGrow = 1;
  headerLabel.children[1].style.display = "none";
  headerLabel.style.borderColor = "#0366D6";
});

serchInput.addEventListener("blur", (e) => {
  headerNav.style.flexGrow = 0;
  headerForm.style.flexGrow = 0;
  headerForm.style.flexGrow = 0;
  serchInput.style.flexGrow = 0;
  headerLabel.children[1].style.display = "inline-flex";
  headerLabel.style.borderColor = "#444d56";
});

let query3 = {
  query:
    "query{viewer{name,login,avatarUrl,followers{totalCount},following{totalCount}repositories(first: 20, orderBy: {field: NAME, direction: ASC}) {nodes {stargazerCount,description,name,url,isPrivate,createdAt,updatedAt,licenseInfo {name},owner {login},defaultBranchRef {name}languages(first: 10) {nodes {name,color}}}}}}",
};
let url = "https://api.github.com/graphql";
fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  },

  body: JSON.stringify(query3),
})
  .then((res) => res.json())
  .then((data) => {
    followers[3].children[0].textContent =
      data.data.viewer.followers.totalCount;
    followers[4].children[0].textContent =
      data.data.viewer.following.totalCount;
    fullName.textContent = data.data.viewer.name;
    fullName.nextElementSibling.textContent = data.data.viewer.login;
    stickyName.innerHTML = `<strong>${data.data.viewer.login}<strong>`;
    navDash.innerHTML = `<img class="nav-item-img" src="${data.data.viewer.avatarUrl}" alt="">${data.data.viewer.login}`;
    profilePic[0].src = data.data.viewer.avatarUrl;
    profilePic[1].src = data.data.viewer.avatarUrl;
    dashboardImg.src = data.data.viewer.avatarUrl;
    stickyImg.src = data.data.viewer.avatarUrl;

    console.log(profilePic, data.data.viewer.avatarUrl);
    data.data.viewer.repositories.nodes.forEach((nodes) => {
      let li = document.createElement("li");
      li.className = "repo-list-item";
      let repoBlock = document.createElement("div");
      repoBlock.className = "repo-block";
      let repoName = document.createElement("div");
      repoName.className = "repo-name";
      let h3 = document.createElement("h3");
      let a = document.createElement("a");
      a.textContent = nodes.name;
      h3.appendChild(a);
      if (nodes.isPrivate) {
        let priVateSpan = document.createElement("span");
        priVateSpan.textContent = "private";
        h3.appendChild(priVateSpan);
      }
      repoName.appendChild(h3);

      let repoDetails = document.createElement("div");
      repoDetails.className = "repo-details";
      let langSpan = document.createElement("span");
      langSpan.className = "lang";
      if (nodes.languages.nodes.length > 0) {
        let langColor = document.createElement("span");
        langColor.className = "lang-color";
        langColor.style.backgroundColor = nodes.languages.nodes[0].color;
        let langName = document.createElement("span");
        langName.className = "lang-name";
        langName.textContent = nodes.languages.nodes[0].name;
        langSpan.appendChild(langColor);
        langSpan.appendChild(langName);
      }

      let updatedText = document.createTextNode("Updated");
      langSpan.appendChild(updatedText);
      let date = document.createElement("relative-time");
      let relDate = new Date(nodes.updatedAt);
      date.textContent = ` on ${
        MONTH[relDate.getMonth()]
      } ${relDate.getDate()}${
        relDate.getFullYear() === 2020 ? "" : "," + relDate.getFullYear()
      }`;
      langSpan.appendChild(date);
      repoDetails.appendChild(langSpan);
      repoBlock.appendChild(repoName);
      if (nodes.description != null) {
        let pDes = document.createElement("p");
        pDes.className = "repo-des";
        pDes.textContent = nodes.description;
        repoBlock.appendChild(pDes);
      }

      repoBlock.appendChild(repoDetails);
      li.appendChild(repoBlock);
      let repoStar = document.createElement("div");
      repoStar.className = "repo-star";
      repoStar.innerHTML = ` <form action="">
      <button>
          <svg class="octicon octicon-star down" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
          <span>Star</span>
      </button>
  </form>`;
      li.appendChild(repoStar);
      repoList.appendChild(li);
    });
    loaderContainer.style.display = "none";
  })

  .catch((err) => console.log(err));
