let fullName = document.querySelector(".full-name");
let username = document.querySelector(".username");
let profilePic = document.querySelector(".profile-pic");
let serchInput = document.querySelector("#search");
let headerNav = document.querySelector(".header-nav");
let headerForm = document.querySelector(".header-nav form");
let headerLabel = document.querySelector(".header-nav form label");
let overLay = document.querySelector(".overlay");
let plus = document.querySelector(".plus");
let addRepo = document.querySelector(".add-repo");
let typeOptionBtn = document.querySelector(".type-option-btn");
let typeLangBtn = document.querySelector(".btn-type-lang");
let typeOption = document.querySelector(".type-option");
let typeLang = document.querySelector(".type-lang");
let radioType = document.querySelectorAll("input[type=radio][name='type']");
let radioLange = document.querySelectorAll("input[type=radio][name='lang']");
let heaederNav = document.querySelector(".header-nav");
let hambugerButton = document.querySelector(".hambuger button");
hambugerButton.addEventListener("click", (e) => {
  if (headerNav.style.display === "none") {
    headerNav.style.display = "flex";
  } else {
    headerNav.style.display = "none";
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

let query = {
  query:
    "query {organization(login: facebook){name,url,repositories (first:3) {pageInfo {hasNextPage,endCursor},nodes {name}}}}",
};

let query3 = {
  query:
    "query{viewer{name,login,avatarUrl,repositories(first: 20, orderBy: {field: NAME, direction: ASC}) {nodes {stargazerCount,name,url,isPrivate,createdAt,updatedAt,licenseInfo {name},owner {login},defaultBranchRef {name}languages(first: 10) {nodes {name,color}}}}}}",
};
let url = "https://api.github.com/graphql";
let query2 = {
  variables: {
    organization: "facebook",
    count: 3,
  },
  query:
    "query ($organization: String!, $count:Int!){organization(login: $organization) {name,url,repositories(first: $count) {pageInfo {hasNextPage,endCursor},nodes {name}}}}",
};
fetch(url, {
  method: "POST",
  headers: {
    Authorization: "Bearer 061198fbc76da525ec47856c5ad94e18c64c2585",
    "Content-Type": "application/json",
  },

  body: JSON.stringify(query3),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data, profilePic);
    profilePic.setAttribute("src", data.data.viewer.avatarUrl);
  })
  .catch((err) => console.log(err));
