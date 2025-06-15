<template>
  <section class="p-4">
    <!-- Title + New Task Button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
      <h2 class="text-xl font-bold mb-2 sm:mb-0">Task List</h2>
      <button
        @click="openModal"
        class="w-full sm:w-auto text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        + New Task
      </button>
    </div>

    <!-- Filter Section -->
    <div class="flex flex-wrap justify-center sm:justify-start items-center gap-3 mb-6">
      <!-- Label Filter -->
      <div class="flex items-center gap-2">
<div class="flex items-center gap-2">
  <span class="text-xs uppercase tracking-wider text-gray-500">Label</span>
  <!-- 버튼 그룹 -->
</div>
        <button
          v-for="label in filterOptions"
          :key="label"
          @click="selectedFilter = label"
          :class="[
            'text-sm px-3 py-1 rounded-full border transition',
            selectedFilter === label
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
          ]"
        >
          {{ label }}
        </button>
      </div>

      <!-- Status Filter -->
      <div class="flex items-center gap-2 ml-4">
<div class="flex items-center gap-2">
  <span class="text-xs uppercase tracking-wider text-gray-500">Status</span>
  <!-- 버튼 그룹 -->
</div>
        <button
          v-for="status in statusOptions"
          :key="status.value"
          @click="selectedStatus = status.value"
          :class="[
            'text-sm px-3 py-1 rounded-full border transition',
            selectedStatus === status.value
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50'
          ]"
        >
          {{ status.label }}
        </button>
      </div>
    </div>

    <!-- Active Tasks -->
    <div v-if="filteredTodo.active.length" class="mb-4">
<div class="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2">
  <div class="w-1 h-4 bg-blue-500 rounded"></div>
  <span>Active Tasks</span>
</div>
      <div class="space-y-3">
        <div
          v-for="task in filteredTodo.active"
          :key="task.id"
          class="p-3 rounded-md bg-white shadow-sm border flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <input type="checkbox" :checked="task.completed" @change="checkboxChange(task)" />
            <span class="font-medium">{{ task.title }}</span>
            <!-- 반복 여부 표시 -->
            <Repeat
              v-if="task.repeating"
              class="w-4 h-4 text-green-500"
              :title="'Repeating task'"
            />
          </div>
          <span
            v-if="task.label"
            :class="[
              'ml-2 px-2 py-0.5 rounded',
              task.label === 'daily' ? 'bg-blue-100 text-blue-700' :
              task.label === 'weekly' ? 'bg-purple-100 text-purple-700' :
              task.label === 'monthly' ? 'bg-green-100 text-green-700' : ''
            ]"
          >
            {{ task.label }}
          </span>
        </div>
      </div>
    </div>

    <!-- Completed Tasks -->
    <div v-if="filteredTodo.completed.length">
<div class="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2 mt-6">
  <div class="w-1 h-4 bg-gray-400 rounded"></div>
  <span>Completed Tasks</span>
</div>
      <div class="space-y-3">
        <div
          v-for="task in filteredTodo.completed"
          :key="task.id"
          class="p-3 rounded-md bg-white shadow-sm border flex items-center justify-between opacity-70"
        >
          <div class="flex items-center gap-2">
            <input type="checkbox" :checked="task.completed" @change="checkboxChange(task)" />
            <span class="font-medium line-through text-gray-400 underline underline-offset-4">
              {{ task.title }}
            </span>
            <!-- 반복 여부 표시 -->
            <Repeat
              v-if="task.repeating"
              class="w-4 h-4 text-green-400 opacity-60"
              :title="'Repeating task'"
            />
          </div>
          <span
            v-if="task.label"
            :class="[
              'ml-2 px-2 py-0.5 rounded',
              task.label === 'daily' ? 'bg-blue-100 text-blue-700' :
              task.label === 'weekly' ? 'bg-purple-100 text-purple-700' :
              task.label === 'monthly' ? 'bg-green-100 text-green-700' : ''
            ]"
          >
            {{ task.label }}
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- Task Modal -->
  <TaskModal
    ref="modalRef"
    :isOpen="modalOpen"
    @close="modalOpen = false"
    @submit="addNewTask"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import { Repeat } from 'lucide-vue-next'; // 반복 아이콘
import TaskModal from './TaskModal.vue';

const todo = ref([
  { id: 1, title: 'Walk 8000 steps', completed: false, label: 'daily', repeating: true },
  { id: 2, title: 'Read a book', completed: true, label: 'weekly', repeating: false },
  { id: 3, title: 'Change license and remove products', completed: true, label: 'monthly', repeating: true },
]);

const filterOptions = ['all', 'daily', 'weekly', 'monthly'];
const statusOptions = [
  { label: 'all', value: 'all' },
  { label: 'active', value: 'active' },
  { label: 'completed', value: 'completed' },
];

const selectedFilter = ref('all');
const selectedStatus = ref('all');

const modalOpen = ref(false);
const modalRef = ref();

const filteredTodo = computed(() => {
  const label = selectedFilter.value;
  const status = selectedStatus.value;

  let filtered = label === 'all' ? todo.value : todo.value.filter(t => t.label === label);

  if (status === 'active') {
    filtered = filtered.filter(t => !t.completed);
  } else if (status === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }

  return {
    active: filtered.filter(t => !t.completed),
    completed: filtered.filter(t => t.completed),
  };
});

function checkboxChange(task) {
  task.completed = !task.completed;
}

function addNewTask(task) {
  todo.value.push({
    ...task,
    id: Date.now(),
    completed: false,
  });
}

function openModal() {
  if (modalRef.value?.resetTaskForm) {
    modalRef.value.resetTaskForm();
  }
  modalOpen.value = true;
}
</script>
