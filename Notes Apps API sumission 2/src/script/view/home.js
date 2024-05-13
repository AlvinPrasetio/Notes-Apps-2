import NotesApi from "../data/notes-api.js";
import "../components/index.js";

const home = () => {
  const container = document.querySelector(".container-card");
  const formAdd = document.querySelector("note-form");
  const titleInput = document.querySelector("#note-title");
  const bodyInput = document.querySelector("#note-body");
  const loadingIndicator = document.createElement("loading-indicator");

  titleInput.addEventListener("invalid", handleTitleValidation);
  bodyInput.addEventListener("invalid", handleBodyValidation);
  formAdd.addEventListener("submit", handleSubmitForm);

  renderNotes();

  function handleTitleValidation(event) {
    event.target.setCustomValidity("");
    if (!event.target.validity.valid) {
      event.target.setCustomValidity("Judul harus diisi.");
    }
  }

  function handleBodyValidation(event) {
    event.target.setCustomValidity("");
    if (!event.target.validity.valid) {
      event.target.setCustomValidity("Catatan harus diisi.");
    }
  }

  function renderNotes() {
    container.innerHTML = "";
    container.appendChild(loadingIndicator);

    NotesApi.getBook()
      .then((data) => {
        container.removeChild(loadingIndicator);

        if (typeof data === "object") {
          if (data.data.length != 0) {
            data.data.forEach(renderNote);
          } else {
            console.error("Tidak ditemukan.");
            container.innerHTML = `
                        <style>
                        .container-card {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        </style>
                        <div class="alert alert-primary" role="alert">
                            Tidak ada catatan
                        </div>
                        `;
          }
        } else {
          console.error("Tidak ada objek");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderNote(item) {
    const note = {
      id: item.id,
      title: item.title,
      body: item.body,
      createdAt: item.createdAt,
      archive: item.archive,
    };
    const noteElement = document.createElement("note-list");
    noteElement.note = note;

    const deleteButton = noteElement.shadowRoot.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      deleteClick(item.id);
    });
    container.appendChild(noteElement);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    addNote();
  }

  function addNote() {
    const title = titleInput.value;
    const body = bodyInput.value;
    const newNote = {
      title: title,
      body: body,
    };

    NotesApi.insertNote(newNote)
      .then((response) => {
        renderNotes();
        titleInput.value = "";
        bodyInput.value = "";
        window.alert(`${response.message}`);
      })
      .catch((error) => {
        window.alert(`Tidak bisa menambahkan catatan! ${error.message}`);
      });
  }

  function deleteClick(noteId) {
    NotesApi.deleteNote(noteId)
      .then((response) => {
        renderNotes();
        window.alert(`${response.message}`);
      })
      .catch((error) => {
        window.alert(`Tidak bisa menghapus catatan! ${error.message}`);
      });
  }
};

export default home;
