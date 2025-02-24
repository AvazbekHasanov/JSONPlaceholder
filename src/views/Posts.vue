<template>
  <div class="data">
    <h2>Posts</h2>
    <div class="search_container">
      <!-- <form action="" v-if="this.posts.length">
        <input
          type="search"
          v-model="searchQuery"
          class="search_input"
          autofocus
          placeholder="Search post"
        />
      </form> -->
      <SearchBar
        v-if="this.posts.length"
        @searchQueryChanged="search = $event"
      />
    </div>

    <button @click="getPosts()" v-show="!this.posts.length">Get Posts</button>

    <PostsList :posts="filteredItems" />

    <LoadMore
      v-if="this.posts.length > 0 && this.posts.length < 100"
      :limit="limit"
    />

    <!-- <button @click="loadMorePosts()" v-if="this.posts.length">load more</button> -->
  </div>
</template>

<script>
import axios from 'axios';
import PostsList from '../components/PostsList.vue';
import LoadMore from '../components/LoadMore.vue';
import SearchBar from '../components/SearchBar.vue';

export default {
  components: {
    PostsList,
    LoadMore,
    SearchBar,
  },
  name: 'Posts',

  data() {
    return {
      posts: [],
      limit: 5,
      search: '',
    };
  },

  methods: {
    getPosts() {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?&_limit=${this.limit}`)
        .then((response) => {
          this.posts = response.data;

        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getPosts()
  },

  computed: {
    filteredItems() {
      return this.posts.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1 /*||
          item.body.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1*/
        );
      });
    },
  },
};
</script>

<style  scoped>
.search_container {
  width: 20%;
  margin: 1rem auto;
}

@media (max-width: 950px) {
  .search_container {
    width: 70%;
    position: relative;
    left: 2%;
  }
}
</style>
