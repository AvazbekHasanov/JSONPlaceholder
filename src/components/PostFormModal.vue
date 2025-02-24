<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2>{{ isEdit ? "Edit Post" : "Add New Post" }}</h2>

      <input v-model="localPost.title" type="text" placeholder="Title" />
      <textarea v-model="localPost.body" placeholder="Body"></textarea>

      <div class="modal-actions">
        <button class="save-btn" @click="save">Save</button>
        <button class="cancel-btn" @click="close">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    isEdit: Boolean,
  },
  data() {
    return {
      localPost: { ...this.post },
    };
  },
  methods: {
    save() {
      this.$emit("save", this.localPost);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 1rem;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  resize: none;
  height: 100px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.save-btn {
  background: #2d8b61;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.cancel-btn {
  background: #d9534f;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

button:hover {
  opacity: 0.8;
}
</style>
