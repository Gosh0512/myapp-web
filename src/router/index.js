import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/Profile.vue'
import Task from '../views/Task.vue'
import Investment from '../views/Investment.vue'
import Reading from '../views/Reading.vue'
import Workout from '../views/Workout.vue'
import Fishing from '../views/Fishing.vue'

const routes = [
  { path: '/', redirect: '/profile' },
  { path: '/profile', component: Profile },
  { path: '/task', component: Task },
  { path: '/investment', component: Investment },
  { path: '/reading', component: Reading },
  { path: '/Workout', component: Workout },
  { path: '/fishing', component: Fishing }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router