<template>
  <div class="content">
    <div class="note">
      <div class="note-container">
        <h2>what's happening today?</h2>

        <textarea id="input-tab" v-model="noteText" placeholder="type in your text"></textarea>

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
            style="display: none; width: 100px; height: 100px"
          />
        </div>
      </div>
    </div>

    <!-- Notes display area moved outside note box -->
    <div contenteditable="true" id="note-column" ref="noteColumn" class="note-display"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const noteText = ref('');
const imageInput = ref(null);
const previewImg = ref(null);
const noteColumn = ref(null);
const previewSrc = ref('');

// Show image preview
function previewImage() {
  const file = imageInput.value.files[0];
  if (file) {
    previewSrc.value = URL.createObjectURL(file);
    previewImg.value.style.display = 'block';
  } else {
    previewSrc.value = '';
    previewImg.value.style.display = 'none';
  }
}

// Add new note with optional image
function addNote() {
  if (noteText.value === '') {
    alert('You must input a text');
    return;
  }

  const p = document.createElement('p');
  p.innerHTML = noteText.value;

  const file = imageInput.value.files[0];
  if (file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.display = 'block';
    img.style.marginTop = '10px';
    p.appendChild(img);
  }

  const span = document.createElement('span');
  span.innerHTML = '\u00d7';
  span.style.cursor = 'pointer';
  span.className = 'close-btn';
  span.onclick = function () {
    p.remove();
    keepData();
  };

  p.appendChild(span);
  noteColumn.value.appendChild(p);

  // Reset fields
  noteText.value = '';
  imageInput.value.value = '';
  previewSrc.value = '';
  previewImg.value.style.display = 'none';

  keepData();
}

// Save notes to localStorage
function keepData() {
  localStorage.setItem('noteData', noteColumn.value.innerHTML);
}

// Load notes on page mount
function loadNotes() {
  noteColumn.value.innerHTML = localStorage.getItem('noteData') || '';
  Array.from(noteColumn.value.querySelectorAll('p span')).forEach((span) => {
    span.onclick = function () {
      span.parentElement.remove();
      keepData();
    };
  });
}

onMounted(() => {
  loadNotes();
});
</script>

<style scoped>

.content{
  
  background-color: #3c3744;
  
}


.note {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  
}

.note-container {
  background: #1c1c1c;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}



.note-container h2 {
  color: whitesmoke;
  font-size: 2rem;
  margin-bottom: 10px;
  margin-left: 20px;
  animation: text 10s linear infinite;
}

@keyframes text {
  0% {
    color: #ffffff;
  }
  50% {
    color: #3c3744;
  }
  100% {
    color: #fbfff1;
  }
}

.note-container input {
  height: 5vh;
  width: 50vh;
  border: none;
  margin-bottom: 20px;
  padding: 5px 10px;
  border-radius: 5px;
}

.note-container input:focus {
  color: #000000;
  background: silver;
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
  color: #fff;
  background-color: #000;
}

#note-column p {
  text-align: left;
  font-size: 1rem;
  background: #1c1c1c;
  color: #fbfff1;
  padding: 20px;
  border-radius: 10px;
  white-space: normal;
  overflow-wrap: break-word;
  position: relative;
  min-height: 150px;
}

#note-column p[contenteditable="true"]:focus {
  outline: 2px dashed #aaa;
  background-color: #2c2c2c;
}



p span:hover {
  color: #3268a9;
}

.link {
  background: #3c3744;
  color: #ddd;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 10px;
  text-align: center;
}

.link:hover {
  background: #ddd;
  color: #3c3744;
}

#input-tab {
  width: 600px;
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
}

.custom-file-upload {
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
.note-box{
  display: inline-box;
}

.close-btn {
  cursor: pointer;
  font-size: 1rem;
  color: red;
  position: absolute;
  right: 10px;
  top: 10px;
}

.close-btn:hover {
  color: #3268a9;
}

@media (max-width: 768px) {
  .note-display {
    grid-template-columns: repeat(1, 1fr); /* 1 note per row on mobile */
  }
}

</style>
