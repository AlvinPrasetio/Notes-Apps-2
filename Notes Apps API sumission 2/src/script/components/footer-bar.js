class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          footer {
            background-color: #00224D;
            color: #fff;
            padding: 10px;
            text-align: center;
          }
        </style>
        <footer>
            <h2>Note Apps by : Alvin Prasetio</h2>
        </footer>
      `;
  }
}

  customElements.define("footer-bar", FooterBar);
