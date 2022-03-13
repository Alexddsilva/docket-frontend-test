const template = document.createElement("template");
template.innerHTML = `

`;

class RegisteredDocument extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    const btn = this.shadow.getElementById("trash_button");

    btn.addEventListener("click", this.handleClick.bind(this));
  }

  static get observedAttributes() {
    return [
      "documentName",
      "personType",
      "personDocument",
      "personFullName",
      "zipCode",
      "registryStreet",
      "registryStreetNumber",
      "registryCity",
      "registryUf",
      "documentDate",
      "documentId",
    ];
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    this.render();
  }

  async handleClick() {
    const result = await fetch(
      `http://localhost:3000/documents/${this.documentId}`,
      {
        method: "DELETE",
      }
    );

    location.reload();
  }

  get documentName() {
    return this.getAttribute("documentName");
  }
  get personType() {
    return this.getAttribute("personType");
  }
  get personDocument() {
    return this.getAttribute("personDocument");
  }
  get personFullName() {
    return this.getAttribute("personFullName");
  }
  get zipCode() {
    return this.getAttribute("zipCode");
  }
  get registryStreet() {
    return this.getAttribute("registryStreet");
  }
  get registryStreetNumber() {
    return this.getAttribute("registryStreetNumber");
  }
  get registryCity() {
    return this.getAttribute("registryCity");
  }
  get registryUf() {
    return this.getAttribute("registryUf");
  }
  get documentDate() {
    return this.getAttribute("documentDate");
  }
  get documentId() {
    return this.getAttribute("documentId");
  }

  set documentName(val) {
    this.setAttribute("documentName", val);
  }
  set personType(val) {
    this.setAttribute("personType", val);
  }
  set personDocument(val) {
    this.setAttribute("personDocument", val);
  }
  set personFullName(val) {
    this.setAttribute("personFullName", val);
  }
  set zipCode(val) {
    this.setAttribute("zipCode", val);
  }
  set registryStreet(val) {
    this.setAttribute("registryStreet", val);
  }
  set registryStreetNumber(val) {
    this.setAttribute("registryStreetNumber", val);
  }
  set registryCity(val) {
    this.setAttribute("registryCity", val);
  }
  set registryUf(val) {
    this.setAttribute("registryUf", val);
  }
  set documentDate(val) {
    this.setAttribute("documentDate", val);
  }
  set documentId(val) {
    this.setAttribute("documentId", val);
  }

  render() {
    this.shadow.innerHTML = `
    <style>
    .registered_document_container {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: 250px;
      border-radius: 2px;
      background-color: #ffffff;
      box-shadow: 0px 1px 2px #2e2d2c66;
      margin-bottom: 15px;
    }
    
    .registered_document_title_row {
      display: flex;
      height: 56px;
      justify-content: space-between;
      align-items: center;
      padding-left: 24px;
      padding-right: 24px;
      border-bottom: 1px solid #ababab;
    }
    
    .registered_document_title {
      color: #2e2d2c;
      font-size: 20px;
      letter-spacing: 0.3px;
      font-weight: 600;
      margin: 0px;
    }

    .trash_button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    
    .registered_document_thrash {
      width: 24px;
      height: 24px;
    }
    
    .registered_document_data {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      padding: 24px 24px 0px 24px;
    }

    .section_title {
      font-size: 14px;
    }

    .comum_field_data {
      font-size: 14px;
    }

    .separator_80 {
      width: 80%;
      height: 1px;
      background-color: #ababab;
      align-self: center;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 50px;
    }

    .footer_text {
      padding-left: 24px;
      font-size: 14px;
    }
    
    </style>

      <div class="registered_document_container">
        <div class="registered_document_title_row">
          <h4 class="registered_document_title">${this.documentName}</h4>
          <button id="trash_button" class="trash_button" type="button"> 
          <img class="registered_document_thrash" src="https://cdn-sharing.adobecc.com/content/storage/id/urn:aaid:sc:US:de1c9231-1542-41b5-ad00-355ebf402162;revision=0?component_id=f694fbed-413b-4230-b8ae-9a2efb66f523&api_key=CometServer1&access_token=1647230219_urn%3Aaaid%3Asc%3AUS%3Ade1c9231-1542-41b5-ad00-355ebf402162%3Bpublic_cfe6fc4240deaf47f84cb1dcac57e20caedc356d" alt="lixeira">
          </button> 
        </div>

        <div class="registered_document_data"> 

          <div class="registered_document_data_person"> 
            <strong class="section_title">${this.personType}</strong>
            <p class="comum_field_data">${
              this.personType === "Pessoa jurídica" ? "Razão social" : "Nome"
            }: ${this.personFullName} </>
            <p class="comum_field_data">${
              this.personType === "Pessoa jurídica" ? "CNPJ" : "CPF"
            }: ${this.personDocument} </p>
          </div>

          <div class="registered_document_data_registry"> 
            <strong class="section_title">Dados do cartório</strong>
            <p class="comum_field_data">CEP: ${this.zipCode} </>
            <p class="comum_field_data">Rua: ${this.registryStreet}   Nº:${
      this.registryStreetNumber
    } </>
            <p class="comum_field_data">Cidade: ${this.registryCity}   Nº:${
      this.registryUf
    } </>
            
          </div>

        </div>
        <div class="separator_80"></div>
        
        <div class="footer">
          <span class="footer_text"> <strong>Data de criação:</strong> ${new Date(
            Number(this.documentDate)
          ).getDate()} de ${new Date(Number(this.documentDate)).toLocaleString(
      "default",
      { month: "long" }
    )} de ${new Date(Number(this.documentDate)).getFullYear()}</span>
        </div>


      </div>
      `;
  }
}

customElements.define("registered-document", RegisteredDocument);
