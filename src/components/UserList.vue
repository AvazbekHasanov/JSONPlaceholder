<template>
  <transition-group name="user" tag="ul" class="users">
    <UserItem v-for="user in users" :key="user.id" :user="user" />
  </transition-group>
</template>

<script>
import UserItem from "../components/UserItem.vue";

export default {
  name: "UserList",

  components: {
    UserItem,
  },

  props: {
    users: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.users {
  list-style: none;
  width: 30%;
  margin: 1rem auto;
  position: relative;
  left: -1%;
}

.users h2 {
  border-bottom: 3px dotted lightgray;
  padding-bottom: 0.8rem;
}

.users li {
  background: white;
  padding: 0.2rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.8rem;
  border: 1px solid grey;
  box-shadow: 2px 4px 6px lightgray;
}

.users p {
  font-size: 1.1rem;
}

.user-enter-active,
.user-leave-active {
  transition: all 0.3s;
}

.user-enter,
.user-leave-to {
  opacity: 0;
  transform: scale(0.75);
}

@media (max-width: 800px) {
  .users {
    width: 50%;
  }
}

@media (max-width: 420px) {
  .users {
    width: 80%;
  }
}
</style>
