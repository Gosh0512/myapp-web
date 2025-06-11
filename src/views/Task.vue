<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Task List</h2>
      <!-- 상단 컨트롤바 -->
      <div class="bg-white rounded-xl shadow flex items-center justify-between px-6 py-4 mb-4">
        <div class="flex items-center gap-2">
          <button class="px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold text-sm">All Tasks <span class="ml-1 text-xs text-gray-400">11</span></button>
          <button class="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold text-sm">To do <span class="ml-1 text-xs">3</span></button>
          <button class="px-3 py-1 rounded bg-gray-100 text-blue-700 font-semibold text-sm">Completed <span class="ml-1 text-xs">4</span></button>
        </div>
        <div class="flex items-center gap-2">
          <button class="flex items-center gap-1 px-4 py-2 border rounded-lg text-gray-700 font-medium">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            Filter & Short
          </button>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
            Add New Task
            <span class="bg-blue-800 w-6 h-6 flex items-center justify-center rounded-full text-white text-xl font-bold">+</span>
          </button>
        </div>
      </div>
      <!-- 할일 리스트 -->
      <div class="bg-white rounded-xl shadow p-4">
        <!-- To Do -->
        <div>
          <h3 class="font-bold text-lg mb-2 flex items-center gap-2">To Do <span class="bg-gray-100 text-blue-700 text-xs px-2 py-0.5 rounded">3</span></h3>
          <div v-for="task in todo" :key="task.id" class="flex items-center justify-between bg-white rounded-lg border mb-3 px-4 py-3 shadow-sm">
            <div class="flex items-center gap-3">
              <svg width="18" height="18" fill="none" stroke="currentColor" class="text-gray-300" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300" :checked="task.completed" />
              <span :class="['font-medium', task.completed && 'line-through text-gray-400']">{{ task.title }}</span>
              <span v-if="task.label" class="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs">{{ task.label }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span v-if="task.due" class="flex items-center gap-1 text-gray-400 text-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3M16 7V3M4 11h16M5 20h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"/></svg>
                {{ task.due }}
              </span>
              <span v-if="task.comments" class="flex items-center gap-1 text-gray-400 text-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                {{ task.comments }}
              </span>
              <span v-if="task.assignee" class="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-100">
                <img :src="task.assignee" alt="user" class="object-cover w-full h-full"/>
              </span>
            </div>
          </div>
        </div>
        <!-- complete -->
        <div class="mt-6">
          <h3 class="font-bold text-lg mb-2 flex items-center gap-2">completed <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded">4</span></h3>
          <div v-for="task in progress" :key="task.id" class="flex items-center justify-between bg-white rounded-lg border mb-3 px-4 py-3 shadow-sm">
            <div class="flex items-center gap-3">
              <svg width="18" height="18" fill="none" stroke="currentColor" class="text-gray-300" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300" :checked="task.completed" />
              <span :class="['font-medium', task.completed && 'line-through text-gray-400']">{{ task.title }}</span>
              <span v-if="task.label" class="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">{{ task.label }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span v-if="task.due" class="flex items-center gap-1 text-gray-400 text-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3M16 7V3M4 11h16M5 20h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"/></svg>
                {{ task.due }}
              </span>
              <span v-if="task.comments" class="flex items-center gap-1 text-gray-400 text-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                {{ task.comments }}
              </span>
              <span v-if="task.assignee" class="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-100">
                <img :src="task.assignee" alt="user" class="object-cover w-full h-full"/>
              </span>
            </div>
          </div>
        </div>
        <!-- ... Completed 등 나머지 카테고리도 위와 같은 방식으로 추가 가능 -->
      </div>
    </div>
  </div>
</template>

<script setup>
const todo = [
  {
    id: 1,
    title: '낚시하러가기',
    completed: false,
    label: 'Marketing',
    due: 'Tomorrow',
    comments: 1,
    assignee: ''
  },
  {
    id: 2,
    title: '책읽기',
    completed: true,
    label: 'Marketing',
    due: 'Jan 8, 2027',
    comments: 2,
    assignee: ''
  },
  {
    id: 3,
    title: 'Change license and remove products',
    completed: true,
    label: 'Marketing',
    due: 'Feb 12, 2027',
    comments: 1,
    assignee: ''
  },
];

const progress = [
  {
    id: 4,
    title: 'Work In Progress (WIP) Dashboard',
    completed: false,
    label: '',
    due: 'Today',
    comments: 1,
    assignee: ''
  },
  {
    id: 5,
    title: 'Kanban Flow Manager',
    completed: false,
    label: 'Template',
    due: 'Feb 12, 2027',
    comments: 8,
    assignee: ''
  },
  {
    id: 6,
    title: 'Product Update - Q4 2024',
    completed: false,
    label: '',
    due: 'Feb 12, 2027',
    comments: 8,
    assignee: ''
  },
  // ...데이터 추가 가능
];
</script>
