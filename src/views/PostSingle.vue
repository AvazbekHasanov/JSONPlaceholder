<template>
  <section class="post-container">
    <div class="post-content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>

      <div class="actions">
        <button class="edit-btn" @click="openEditModal">Edit</button>
        <button class="delete-btn" @click="deletePost">Delete</button>
      </div>
    </div>

    <aside class="comments-section">
      <h3>Comments</h3>
      <div class="comments-list" id="commentsContainer" v-if="comments.length>0">
        <div   v-for="comment in comments" :key="comment.id" class="comment"
              :class="{'bg-red': comment.id%2 == 1}">
          <p class="comment-name">{{ comment.name }}</p>
          <p class="comment-body">{{ comment.body }}</p>
        </div>
      </div>
      <form @submit.prevent="addComment" class="comment-form">
        <input v-model="newComment" placeholder="Add a comment..." required />
        <button type="submit">Submit</button>
      </form>
    </aside>
  </section>

  <PostFormModal
      v-if="isModalOpen"
      :post="post"
      :isEdit="true"
      @save="updatePost"
      @close="isModalOpen = false"
  />
</template>

<script>
import axios from "axios";
import PostFormModal from "../components/PostFormModal.vue";

export default {
  components: { PostFormModal },

  data() {
    return {
      post: {},
      comments: [],
      newComment: "",
      isModalOpen: false,
    };
  },

  created() {
    this.fetchPost();
    this.fetchComments();
  },

  methods: {
    fetchPost() {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
          .then(response => {
            this.post = response.data;

          })
          .catch(error => {
            console.log(error);
          });
    },

    fetchComments() {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}/comments`)
          .then(response => {
            this.comments = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    addComment() {
      if (this.newComment.trim() === "") return;

      const newCommentData = {
        postId: this.post.id,
        name: "You",
        body: this.newComment,
        email: "avazbek@example.com"
      };

      axios.post(`https://jsonplaceholder.typicode.com/comments`, newCommentData)
          .then(response => {
            this.comments.push(response.data);
            let el = document.getElementById('commentsContainer')

            console.log("this.$refs.commentsContainer", el.scrollHeight);
            el.scrollTo(el.scrollHeight)
            this.newComment = "";
          })
          .catch(error => {
            console.log(error);
          });
    },

    openEditModal() {
      this.isModalOpen = true;
    },

    updatePost(updatedPost) {
      axios.put(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`, updatedPost)
          .then(response => {
            this.post = response.data;
            this.isModalOpen = false;
            alert("Post updated successfully!");
          })
          .catch(error => {
            console.log(error);
          });
    },

    deletePost() {
      if (confirm("Are you sure you want to delete this post?")) {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
            .then(() => {
              alert("Post deleted successfully!");
              this.$router.push("/");
            })
            .catch(error => {
              console.log(error);
            });
      }
    }
  }
};
</script>

<style scoped>
.post-container {
  display: flex;
  width: 80%;
  margin: 2rem auto;
  gap: 2rem;
}

.post-content {
  flex: 2;
  padding: 2rem;
  border-radius: 1rem;
  background: #f9f9f9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
}

.comments-section {
  flex: 1;
  padding: 1rem;
  background: #eef2f3;
  border-radius: 1rem;
  overflow-y: auto;
  max-height: 480px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.comments-list {
  max-height: 350px;
  overflow-y: auto;
  padding-right: 10px;
}

.comment {
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background: #2d8b61;
  display: none;
}
.bg-red{
  background: #ff0000;
  display: block;
}

.comment-name {
  font-weight: bold;
  color: #2c3e50;
}

.comment-body {
  color: #555;
  font-size: 0.9rem;
}

.comment-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.comment-form input {
  flex: 1;
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

.comment-form button {
  background: #2d8b61;
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.comment-form button:hover {
  background: #24754d;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
}

.edit-btn {
  background: #2d8b61;
  color: white;
}

.delete-btn {
  background: #d9534f;
  color: white;
}
</style>
