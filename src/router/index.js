import Home from '../views/Home.vue';
import Posts from '../views/Posts.vue';
import PostSingle from '../views/PostSingle.vue';
import Users from '../views/Users.vue';
import UserSingle from '../views/UserSingle.vue';
import {createRouter, createWebHistory} from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
 routes : [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },

  {
    path: '/posts/:id',
    name: 'PostSingle',
    component: PostSingle,
  },

  // users
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },

  {
    path: '/users/:id',
    name: 'UserSingle',
    component: UserSingle,
  },

]
});


export default router;
