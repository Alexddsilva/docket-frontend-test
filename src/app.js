async function onLoad() {
  const result = await fetch("http://localhost:3000/documents");
  const parsedResult = await result.json();

  if (parsedResult?.length) {
    const list = document.getElementById("document_list");

    const rightContainer = list;
    rightContainer.removeChild(list.children[0]);

    rightContainer.style =
      "background-color: #f3f3f3; box-shadow: none; height: 100vh;";

    const titleList = document.createElement("h3");

    titleList.className = "documents_list_number";
    titleList.innerHTML = `${parsedResult.length} ${
      parsedResult.length > 1 ? "documentos" : "documento"
    } solicitados`;

    rightContainer.appendChild(titleList);

    parsedResult.forEach((item) => {
      changeElementsIfHaveRegisteredOnes(item);
    });
  }
}

async function onSubmit(event) {
  event.preventDefault();

  const newDocument = {
    documentName: document.getElementById("documentName").value,
    personType: document.getElementById("personType").value,
    personDocument: document.getElementById("personDocument").value,
    personFullName: document.getElementById("personFullName").value,
    registry: {
      zipCode: document.getElementById("zipCode").value,
      street: document.getElementById("registryStreet").value,
      number: document.getElementById("registryStreetNumber").value,
      city: document.getElementById("registryCity").value,
      uf: document.getElementById("registryUf").value,
    },
    date: new Date().getTime(),
  };

  const isFormValid = validateForm();

  if (!isFormValid) return;

  const resultPost = await fetch("http://localhost:3000/documents", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDocument),
  });

  location.reload();
}

function changeElementsIfHaveRegisteredOnes(newDocument) {
  const list = document.getElementById("document_list");

  const registeredDocument = document.createElement("registered-document");

  registeredDocument.setAttribute("documentName", newDocument.documentName);
  registeredDocument.setAttribute("personType", newDocument.personType);
  registeredDocument.setAttribute("personDocument", newDocument.personDocument);
  registeredDocument.setAttribute("personFullName", newDocument.personFullName);
  registeredDocument.setAttribute("zipCode", newDocument.registry.zipCode);
  registeredDocument.setAttribute(
    "registryStreet",
    newDocument.registry.street
  );
  registeredDocument.setAttribute(
    "registryStreetNumber",
    newDocument.registry.number
  );
  registeredDocument.setAttribute("registryCity", newDocument.registry.city);
  registeredDocument.setAttribute("registryUf", newDocument.registry.uf);
  registeredDocument.setAttribute("documentDate", newDocument.date);
  registeredDocument.setAttribute("documentId", newDocument.id);

  list.appendChild(registeredDocument);
}

function changePersonType(event) {
  const { value } = event.target;

  if (value === "Pessoa jurídica") {
    const label = document.querySelector("label[for=personDocument]");
    label.innerHTML = "CNPJ: ";

    const labelName = document.querySelector("label[for=personFullName]");
    labelName.innerHTML = "Razão social: ";
  }

  if (value === "Pessoa física") {
    const label = document.querySelector("label[for=personDocument]");
    label.innerHTML = "CPF: ";

    const labelName = document.querySelector("label[for=personFullName]");
    labelName.innerHTML = "Nome completo: ";
  }
}

function validateForm() {
  let isFormValid = true;
  const inputs = document.getElementsByClassName("input_container");

  let firstElement = null;

  Array.from(inputs).forEach((item) => {
    const input = item.children[1];

    if (!input.value && item.children.length <= 2) {
      if (!firstElement) firstElement = input;
      const errorElement = document.createElement("span");

      input.style.borderColor = "red";
      errorElement.style.color = "red";
      errorElement.style.fontSize = "12px";
      errorElement.innerHTML = "Campo obrigatório";
      item.appendChild(errorElement);
      firstElement.focus();
      isFormValid = false;
    }
  });

  return isFormValid;
}

const emptyFallback = document.getE;
