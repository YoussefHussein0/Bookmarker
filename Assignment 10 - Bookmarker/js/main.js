const siteNameInput = document.getElementById("siteName"),
  siteUrlInput = document.getElementById("siteURL"),
  deleteButton = document.getElementById("deleteButton"),
  submitButton = document.getElementById("submitButton"),
  regURL =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  regex = new RegExp(regURL);

if (localStorage.getItem("Bookmarks") != null) {
  arrayOfSites = JSON.parse(localStorage.getItem("Bookmarks"));
  showBookmark();
}

submitButton.addEventListener("click", addBookmark);
function addBookmark() {
  if (siteNameInput.value.length < 3 && !siteUrlInput.value.match(regex)) {
    showModal("ModalSiteNameAndUrl");
    return;
  }

  if (siteNameInput.value.length < 3) {
    showModal("ModalSiteName");
    return;
  }

  if (!siteUrlInput.value.match(regex)) {
    showModal("ModalURL");
    return;
  }

  var bookmarkObject = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };

  arrayOfSites.push(bookmarkObject);
  localStorage.setItem("Bookmarks", JSON.stringify(arrayOfSites));
  showBookmark();
}

function showModal(modalId) {
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}

function showBookmark() {
  var temp = "";
  for (var i = 0; i < arrayOfSites.length; i++) {
    temp += `
        <tr>
          <td>${i + 1}</td>
          <td>${arrayOfSites[i].name}</td>
          <td>
            <a href="${
              arrayOfSites[i].url
            }" target="_blank" rel="noopener noreferrer">
              <button class="btn btn-success px-4">
                <i class="fa-solid fa-eye"></i>
                Visit
              </button>
            </a>
          </td>
          <td>
            <button onclick="deleteBookmark(${i})" class="btn btn-danger px-4">
              <i class="fa-solid fa-trash"></i>
              Delete
            </button>
          </td>
        </tr>
      `;
  }
  document.getElementById("dropContent").innerHTML = temp;
}

function deleteBookmark(row) {
  arrayOfSites.splice(row, 1);
  localStorage.setItem("Bookmarks", JSON.stringify(arrayOfSites));
  showBookmark();
}

function handleInputValidation(inputElement, regex) {
  const inputValue = inputElement.value;
  const focusedInput = document.querySelector(".form-control:focus");

  if (!inputValue.match(regex)) {
    focusedInput.style.border = "2px solid red";
    inputElement.classList.add("x");
  } else {
    focusedInput.style.borderColor = "green";
    inputElement.classList.add("tick");
    inputElement.classList.remove("x");
  }
}

siteNameInput.addEventListener("input", function () {
  handleInputValidation(siteNameInput, /^[a-zA-Z0-9\s]{3,}$/);
});

siteUrlInput.addEventListener("input", function () {
  handleInputValidation(
    siteUrlInput,
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  );
});
