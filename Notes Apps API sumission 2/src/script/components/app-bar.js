class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="app-bar">
            <div class="container">
                <h1 class="logo">Notes Apps</h1>
            </div>
        `;
  }
}

customElements.define("app-bar", AppBar);
