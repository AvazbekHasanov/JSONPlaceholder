<template>
  <button @click="loadMorePosts">load more</button>
</template>

<script>
import axios from 'axios';
export default {
  props: ['limit'],

  methods: {
    loadMorePosts() {
      this.limit = this.limit + 5;
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?&_limit=${this.limit}`)
        .then((response) => {
          // handle success
          console.log(response.data);
          this.$root.$emit('load-more-posts', response.data);
          //this.$emit('load-more-posts', response.data);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
