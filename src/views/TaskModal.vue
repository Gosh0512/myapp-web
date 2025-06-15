<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] shadow-lg">
      <h3 class="text-lg font-bold mb-4">새로운 할 일 추가</h3>

      <!-- 제목 -->
      <div class="mb-4">
        <label class="text-sm font-medium">할 일 제목</label>
        <input v-model="newTask.title" type="text" class="w-full mt-1 p-2 border rounded-md" />
      </div>

      <!-- 라벨 선택 -->
      <div class="mb-4">
        <label class="text-sm font-medium">라벨 선택</label>
        <select v-model="newTask.label" class="w-full mt-1 p-2 border rounded-md">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <!-- 반복 여부 -->
      <div class="mb-4 flex items-center gap-2">
        <input v-model="newTask.repeating" type="checkbox" />
        <label class="text-sm">반복적으로 수행</label>
      </div>

      <!-- 마감일 -->
      <div class="mb-4">
        <label class="text-sm font-medium">마감일</label>
        <input v-model="newTask.due" type="date" class="w-full mt-1 p-2 border rounded-md" />
      </div>

      <!-- 버튼 -->
      <div class="flex justify-end gap-2">
        <button @click="closeModal" class="px-4 py-2 text-sm bg-gray-200 rounded-md">취소</button>
        <button @click="addTask" class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">추가</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['isOpen']);
const emit = defineEmits(['close', 'submit']);

const newTask = ref({
  title: '',
  label: 'daily',
  due: new Date().toISOString().substr(0, 10), // 오늘 날짜
  repeating: false,
});

function closeModal() {
  emit('close');
}

function addTask() {
  if (!newTask.value.title) {
    alert('할 일을 입력해주세요.');
    return;
  }
  emit('submit', { ...newTask.value, completed: false });
  closeModal();
}

//초기값 리셋
function resetTaskForm() {
  newTask.value = {
    title: '',
    label: 'daily',
    due: new Date().toISOString().substr(0, 10),
    repeating: false,
  };
}

// expose 함수 (부모에서 실행 가능하게)
defineExpose({ resetTaskForm });
</script>
