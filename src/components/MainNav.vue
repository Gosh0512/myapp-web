<template>
  <nav class="flex border-b border-gray-200 bg-white px-4 py-2 max-w-full overflow-x-hidden">
    <ul class="flex gap-4 sm:gap-10 overflow-x-auto max-w-full whitespace-nowrap">
      <li v-for="item in menu" :key="item.name" class="shrink-0">
        <router-link
          :to="item.path"
          class="flex flex-col items-center gap-1 text-sm pb-2 transition"
          :class="[ $route.path === item.path
            ? 'font-semibold text-gray-900 border-b-2 border-black'
            : 'text-gray-500 hover:text-black'
          ]"
        >
          <span class="w-6 h-6 flex items-center justify-center">
            <component :is="item.icon" :class="$route.path === item.path ? 'text-black' : 'text-gray-400'" />
          </span>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// 아이콘 컴포넌트 (Heroicons/Line)
// https://heroicons.com/ 또는 https://lucide.dev/icons 에서 원하는 svg를 변환해서 컴포넌트로 사용

const UserIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 17.232A6 6 0 1118 9.75M12 12a6 6 0 100-12 6 6 0 000 12z" /></svg>`
}
const taskIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M16 13v-2M8 13v-2"/></svg>`
}
const BanknotesIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M16 13v-2M8 13v-2"/></svg>`
}
const BookOpenIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6v6l-4 2"/></svg>`
}
const DumbbellIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5"><rect x="2" y="10" width="4" height="4" rx="1"/><rect x="18" y="10" width="4" height="4" rx="1"/><rect x="8" y="9" width="8" height="6" rx="2"/><path d="M6 12h2M16 12h2"/></svg>`
}
const FishIcon = {
  template: '`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fish-symbol-icon lucide-fish-symbol"><path d="M2 16s9-15 20-4C11 23 2 8 2 8"/></svg>`'
}

import { User, Banknote, BookOpen, Dumbbell, Fish } from 'lucide-vue-next'

const menu = [
  { name: 'Profile', path: '/profile', icon: UserIcon },
  { name: 'Task', path: '/task', icon: taskIcon },
  { name: 'Investment', path: '/investment', icon: BanknotesIcon },
  { name: 'Reading', path: '/reading', icon: BookOpenIcon },
  { name: 'Workout', path: '/Workout', icon: DumbbellIcon },
  { name: 'Fishing', path: '/fishing', icon: FishIcon }
]
</script>
