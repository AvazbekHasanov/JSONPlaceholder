<template>
  <form>
    <input
        type="search"
        v-model="searchQuery"
        class="search_input"
        autofocus
        placeholder="Search post"
    />
  </form>
</template>

<script>
export default {
  name: "SearchBar",

  props: {
    posts: {
      type: Array,
    },
  },

  data() {
    return {
      searchQuery: "",
    };
  },

  watch: {
    searchQuery(value) {
      this.$emit("searchQueryChanged", value);
    },
  },
};
</script>

<style scoped>
.search_input {
  width: 100%;
  padding: 8px 20px;
  background-color: transparent;
  font-size: 1rem;
  line-height: 18px;
  color: #575756;
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid gray;
  transition: all 250ms ease-in-out;
}

.search_input::placeholder {
  color: rgba(87, 87, 86, 0.8);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.search_input:hover,
.search_input:focus {
  padding: 8px 0;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #42b883;
  border-radius: 0;
  background-position: 100% center;
}

/* Inline SVG background */
.search_input {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
}
</style>
