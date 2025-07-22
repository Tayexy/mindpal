<template>
  <header class="site-header">
    <marquee behavior="scroll" direction="left" scrollamount="5">
      ⚠ Your data is stored locally in your browser. Clearing browser data or using a different browser/device will remove your saved progress.
    </marquee>
  </header>
  <div class="content">
    <button class="back-button" @click="$router.go(-1)">Back</button>
    <div class="note">
      <div class="note-container">
        <h2>What's happening today?</h2>

        <textarea
          id="input-tab"
          v-model="noteText"
          placeholder="Type in your text"
        ></textarea>

        <div class="btn-gap">
          <label for="image-input" class="custom-file-upload">📷 Add Image</label>
          <input
            type="file"
            id="image-input"
            ref="imageInput"
            @change="previewImage"
            accept="image/*"
          />
          <button @click="addNote">Journal</button>
        </div>

        <div class="image-preview">
          <img
            ref="previewImg"
            :src="previewSrc"
            alt="Image Preview"
            v-show="previewSrc"
            style="width: 100px; height: 100px"
          />
        </div>
      </div>
    </div>

    <!-- Notes Display -->
    <div id="note-column" class="note-display">
      <div
        v-for="(note, index) in notes"
        :key="index"
        class="note-card"
      >
        <!-- Editable text -->
        <div v-if="!note.editing" class="note-content" @dblclick="editNote(index)">
          {{ note.text }}
        </div>
        <textarea
          v-else
          v-model="note.text"
          @keyup.enter="finishEdit(index)"
          @blur="finishEdit(index)"
          class="edit-input"
        ></textarea>

        <!-- Optional image -->
        <img
          v-if="note.image"
          :src="note.image"
          alt="Note Image"
          class="note-img"
          id="custom-file-upload"
          @click="openImagePreview(note.image)"
          style="cursor:pointer"
        />

        <!-- Action buttons -->
        <div class="note-actions">
          <button class="edit-btn" @click="editNote(index)" v-if="!note.editing">Edit</button>
          <button class="delete-btn" @click="removeNote(index)">Delete</button>
        </div>
      </div>
    </div>

    <!-- Image Preview Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeImagePreview">
      <div class="modal-content" @click.stop>
        <img :src="modalImage" alt="Preview" />
        <button class="close-modal" @click="closeImagePreview">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const noteText = ref('');
const imageInput = ref(null);
const previewImg = ref(null);
const previewSrc = ref('');
const notes = ref([]);

const showModal = ref(false);
const modalImage = ref('');

// Show image preview
function previewImage() {
  const file = imageInput.value.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewSrc.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewSrc.value = '';
  }
}

// Add new note
function addNote() {
  if (noteText.value.trim() === '') {
    alert('You must input a text');
    return;
  }

  notes.value.push({
    text: noteText.value.trim(),
    image: previewSrc.value || '',
    editing: false,
  });

  // Reset input
  noteText.value = '';
  imageInput.value.value = '';
  previewSrc.value = '';

  saveNotes();
}

// Remove note
function removeNote(index) {
  notes.value.splice(index, 1);
  saveNotes();
}

// Edit note
function editNote(index) {
  notes.value[index].editing = true;
}

// Finish editing
function finishEdit(index) {
  notes.value[index].editing = false;
  saveNotes();
}

// Save to localStorage
function saveNotes() {
  localStorage.setItem('noteData', JSON.stringify(notes.value));
}

// Load from localStorage
function loadNotes() {
  const storedNotes = JSON.parse(localStorage.getItem('noteData')) || [];
  notes.value = storedNotes;
}

// Image preview modal
function openImagePreview(img) {
  modalImage.value = img;
  showModal.value = true;
}
function closeImagePreview() {
  showModal.value = false;
  modalImage.value = '';
}

onMounted(() => {
  loadNotes();
});
</script>

<style scoped>
.site-header {
  background-color: #000000;
  color: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.content {
  background-color: #3c3744;
}

.note {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.note-container {
  background: #1c1c1c;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 700px;
  box-sizing: border-box;
}

.note-container h2 {
  color: whitesmoke;
  font-size: 2rem;
  margin-bottom: 10px;
  animation: text 10s linear infinite;
}

@keyframes text {
  0% { color: #ffffff; }
  50% { color: #3c3744; }
  100% { color: #fbfff1; }
}

button {
  padding: 10px 20px;
  background: green;
  color: #000;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  outline: none;
}

button:hover {
  background: rgb(112, 236, 112);
  color: #000;
}

.note-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: #000;
  box-sizing: border-box;
}

.note-card {
  background: #1c1c1c;
  color: #fbfff1;
  padding: 20px;
  border-radius: 10px;
  min-height: 150px;
  position: relative;
  word-break: break-word;
  max-width: 100%;
}

.note-img {
  display: block;
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 5px;
}

.note-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.edit-btn {
  background: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-input {
  width: 100%;
  background: #2c2c2c;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  resize: none;
}
#input-tab {
  width: 100%;
  max-width: 600px;
  min-width: 200px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1c1c1c;
  color: #fff;
  outline: none;
  border: none;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-sizing: border-box;
  resize: vertical;
}

label {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  background-color: red;
  color: white;
  border-radius: 5px;
  font-size: 14px;
}

#image-input {
  display: none;
}

.btn-gap {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .note-display {
    grid-template-columns: repeat(2, 1fr);
  }
  .note-container {
    max-width: 90vw;
  }
}

@media (max-width: 700px) {
  .note-display {
    grid-template-columns: 1fr;
    padding: 10px;
    gap: 15px;
  }
  .note-container {
    padding: 10px;
    max-width: 100vw;
  }
  #input-tab {
    max-width: 100vw;
    min-width: 0;
    font-size: 1rem;
  }
}

@media (max-width: 500px) {
  .note {
    padding: 5px;
  }
  .note-container {
    padding: 5px;
    font-size: 0.95rem;
  }
  .note-container h2{
    font-size: 1.5rem;
  }
  .note-card {
    padding: 10px;
    font-size: 0.95rem;
  }
  #input-tab {
    height: 100px;
    font-size: 0.95rem;
  }
  .btn-gap {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
 
  .btn-gap button {
    width: 100%;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal-content {
  background: #222;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90vw;
  max-height: 90vh;
}
.modal-content img {
  max-width: 80vw;
  max-height: 60vh;
  border-radius: 8px;
  margin-bottom: 16px;
}
.close-modal {
  background: red;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1rem;
}
.close-modal:hover {
  background: darkred;
}
</style>
