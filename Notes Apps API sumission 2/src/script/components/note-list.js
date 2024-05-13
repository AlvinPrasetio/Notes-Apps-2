class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });

    this._style = document.createElement("style");
    this.shadowRoot.appendChild(this._style);

    this._updateStyle();
  }

  set note(value) {
    this._note = value;
    this._updateContent();
  }

  _updateStyle() {
    this._style.textContent = `
            .container-card {
                display: block;
                margin-bottom: 20px;
            }

            .card {
                background-color: #5D0E41;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                color : white;
            }

            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #eee;
            }

            .card-body {
                padding: 16px;
            }

            .card-title {
                margin: 0;
            }

            .card-text {
                margin: 0;
            }

            .delete-button {
                cursor: pointer;
                color: #F8F6E3;
                font-weight: bold;
                background-color: transparent;
                border: none;
                padding: 0;
                font-size: inherit;
                transition: color 0.3s ease;
            }

            .delete-button:hover {
                text-decoration: underline;
                color: #c82333;
            }
        `;
  }

  _updateContent() {
    if (this._note) {
      this.shadowRoot.innerHTML = `
                <style>
                    ${this._style.textContent}
                </style>
                <div class="container-card">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">${this._note.title}</h2>
                            <button type="button" class="delete-button">Hapus</button>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${this._note.body}</p>
                        </div>
                    </div>
                </div>
            `;
    } else {
      this.shadowRoot.innerHTML = `
                <div class="">Belum ada catatan</div>
            `;
    }
  }

  _handleDelete(event) {
    if (event.target.classList.contains("delete-button")) {
      this.dispatchEvent(
        new CustomEvent("delete", {
          detail: this._note,
        }),
      );
    }
  }
}

customElements.define("note-list", NoteCard);
