var siteNameInput = document.getElementById("SiteNameID");
var siteURLInput = document.getElementById("SiteUrlID");
var submitBtnTag = document.getElementById("submitBtnID");
var WarningMsgDiv = document.getElementById("WarningMsgID");

var siteDataContainer = [];
if (localStorage.getItem("LinksData")) {
  siteDataContainer = JSON.parse(localStorage.getItem("LinksData"));
  displayData();
}

function addLink() {
  WarningMsgDiv.classList.remove("ShowUp");

  if (checkNameValidation() & checkURLValidation()) {
    var siteData = {
      siteName: siteNameInput.value,
      siteURL: siteURLInput.value,
    };

    siteDataContainer.push(siteData);
    clearData();
    localStorage.setItem("LinksData", JSON.stringify(siteDataContainer));
    displayData();
  } else {
    WarningMsgDiv.classList.remove("d-none");

    setTimeout(() => {
      WarningMsgDiv.classList.add("ShowUp");
    }, 10);
  }
}

function clearData() {
  siteNameInput.value = null;
  siteURLInput.value = null;
  removeValidations();
}

function displayData() {
  var tabelHtmlBox = "";
  for (var i = 0; i < siteDataContainer.length; i++) {
    tabelHtmlBox += `
                            <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${siteDataContainer[i].siteName}</td>
                            <td><button id="btnVisitID" class="btn btn-Visit">
                                    <a href="${
                                      siteDataContainer[i].siteURL
                                    }" target="_blank" >
                                        <span class="text-white"><i class="fa-solid fa-eye"></i> Visit</span>
                                    </a>
                                </button>
                            </td>
                            <td><button onclick="deleteLink(${i})" id="btnDeleteID" class="btn btn-Delete"><i class="fa-solid fa-trash"></i> Delete</button></td>
                        </tr>`;
  }

  document.getElementById("tableBody").innerHTML = tabelHtmlBox;
}

function deleteLink(linkIndex) {
  siteDataContainer.splice(linkIndex, 1);
  localStorage.setItem("LinksData", JSON.stringify(siteDataContainer));
  displayData();
}

function closeWArningMsg() {
  WarningMsgDiv.classList.add("d-none");
}


function DisplayURLValidEffect() {
  if (siteURLInput.value) {
    if (checkURLValidation()) {
      siteURLInput.classList.remove("inValid");
      siteURLInput.classList.add("Valid");
    } else {
      siteURLInput.classList.remove("Valid");
      siteURLInput.classList.add("inValid");
    }
  } else {
    removeValidations();
  }
}
function checkURLValidation() {
  var Regex_URL =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  return Regex_URL.test(siteURLInput.value);
}


function DisplayNameValidEffect() {
  if (siteNameInput.value) {
    if (checkNameValidation()) {
      siteNameInput.classList.remove("inValid");
      siteNameInput.classList.add("Valid");
    } else {
      siteNameInput.classList.remove("Valid");
      siteNameInput.classList.add("inValid");
    }
  } else {
    removeValidations();
  }
}
function checkNameValidation() {
  var Regex_Name = /^\S{3,}$/;
  return Regex_Name.test(siteNameInput.value);
}


function removeValidations() {
  siteURLInput.classList.remove("inValid");
  siteURLInput.classList.remove("Valid");
  siteNameInput.classList.remove("inValid");
  siteNameInput.classList.remove("Valid");
}
