<template>
  <div class="p-4">
    <!-- 달력 -->
    <div class="mb-4 flex items-center gap-2">
      <input type="date" v-model="selectedDate" class="border p-2 rounded"/>
      <!-- 요일별 운동리스트 버튼 -->
      <button @click="openRoutineModal = true" class="p-2 rounded bg-gray-100 hover:bg-blue-100 transition flex items-center">
        <!-- 반복 아이콘 (svg) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582M20 20v-5h-.581M5.166 9C6.504 6.325 9.418 4.5 12.924 4.5c5.05 0 9.148 3.912 9.148 8.5s-4.098 8.5-9.148 8.5c-3.507 0-6.421-1.825-7.759-4.5"/>
        </svg>
        <span class="ml-1 text-xs">요일별 운동세트</span>
      </button>
    </div>

    <!-- 검색창 -->
    <div>
      <input 
        type="text" 
        readonly 
        placeholder="운동을 검색해주세요" 
        class="border p-2 w-full rounded cursor-pointer" 
        @click="openSearch = true"
      />
    </div>

    <!-- 운동 리스트 -->
    <div class="mt-4 space-y-2">
      <div 
        v-for="(workout, index) in workouts" 
        :key="index" 
        class="border p-2 rounded cursor-pointer hover:bg-blue-50 transition"
        @click="openRecordModal(workout)"
      >
        {{ workout }}
      </div>
    </div>

    <!-- 운동 검색 모달 -->
    <div v-if="openSearch" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-24 z-50">
      <div class="bg-white rounded-lg w-80 p-4 shadow-lg">
        <input 
          v-model="searchText" 
          placeholder="검색어를 입력해주세요" 
          class="border w-full p-2 rounded mb-2" 
        />
        <ul>
          <li 
            v-for="item in filteredList" 
            :key="item" 
            class="p-2 hover:bg-gray-100 cursor-pointer" 
            @click="selectWorkout(item)"
          >
            {{ item }}
          </li>
        </ul>
        <button class="mt-2 text-sm text-blue-500" @click="openSearch = false">닫기</button>
      </div>
    </div>

    <!-- 운동 기록 입력 모달 -->
    <div v-if="showRecordModal" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg w-80 p-6 shadow-lg">
        <h2 class="text-lg font-semibold mb-4">{{ selectedWorkout }} 기록</h2>
        <div class="space-y-2">
          <input 
            v-model.number="recordInput.reps" 
            type="number" 
            min="1"
            placeholder="횟수 (예: 10)" 
            class="w-full border p-2 rounded"
          />
          <input 
            v-model.number="recordInput.weight" 
            type="number" 
            min="1"
            placeholder="무게 (예: 60)" 
            class="w-full border p-2 rounded"
          />
        </div>
        <div class="flex justify-end space-x-2 mt-4">
          <button @click="saveRecord" class="bg-blue-500 text-white px-4 py-1 rounded shadow">저장</button>
          <button @click="closeRecordModal" class="text-gray-500 px-4 py-1">취소</button>
        </div>
      </div>
    </div>

    <!-- 요일별 운동 세트 저장 팝업 -->
    <div v-if="openRoutineModal" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg w-96 p-6 shadow-lg">
        <h2 class="text-lg font-semibold mb-2">요일별 운동 리스트 설정</h2>
        <div v-for="(day, i) in days" :key="i" class="mb-4">
          <div class="font-bold mb-1">{{ dayKor[i] }}</div>
          <div class="flex flex-wrap gap-2">
            <label v-for="item in allWorkouts" :key="item" class="flex items-center text-sm">
              <input 
                type="checkbox" 
                :value="item"
                v-model="routineByDay[day]"
                class="mr-1"
              />
              {{ item }}
            </label>
          </div>
        </div>
        <div class="flex justify-end mt-2">
          <button class="bg-blue-500 text-white px-4 py-1 rounded shadow" @click="saveRoutine">저장</button>
          <button class="ml-2 text-gray-500 px-4 py-1" @click="openRoutineModal = false">닫기</button>
        </div>
      </div>
    </div>

    <!-- 운동 기록 리스트 -->
    <div v-if="currentRecords.length" class="mt-6">
      <h3 class="font-bold mb-2">운동 기록 ({{ selectedDateKor }})</h3>
      <div 
        v-for="(rec, i) in currentRecords" 
        :key="i"
        class="border-b py-1 text-sm"
      >
        {{ rec.workout }} - {{ rec.reps }}회, {{ rec.weight }}kg
      </div>
    </div>
    <div v-else class="mt-6 text-gray-400 text-sm">운동 기록이 없습니다.</div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 오늘 날짜 기본값
const getToday = () => {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}
const selectedDate = ref(getToday())

// 운동 리스트(선택된)
const workouts = ref(['벤치프레스', '스쿼트', '데드리프트'])

// 운동 전체 리스트
const allWorkouts = [
  '벤치프레스', '스쿼트', '데드리프트', '랫풀다운', '레그프레스', '바벨로우',
  '숄더프레스', '사이드레터럴레이즈', '케이블크런치', '런지', '풀업', '푸쉬업'
]

// 요일 관련
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const dayKor = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

// 요일별 운동 리스트 저장
const routineByDay = ref({
  sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: []
})
const openRoutineModal = ref(false)

// 운동 검색
const openSearch = ref(false)
const searchText = ref('')

// 운동 기록 관련
const recordsByDate = ref({})
const showRecordModal = ref(false)
const selectedWorkout = ref('')
const recordInput = ref({ reps: '', weight: '' })

// 필터 리스트(검색)
const filteredList = computed(() => {
  return allWorkouts.filter(
    w => w.includes(searchText.value) && !workouts.value.includes(w)
  )
})

const selectWorkout = (workout) => {
  workouts.value.push(workout)
  openSearch.value = false
  searchText.value = ''
}

function openRecordModal(workout) {
  selectedWorkout.value = workout
  recordInput.value = { reps: '', weight: '' }
  showRecordModal.value = true
}
function closeRecordModal() {
  showRecordModal.value = false
  selectedWorkout.value = ''
  recordInput.value = { reps: '', weight: '' }
}
function saveRecord() {
  if (!recordInput.value.reps || !recordInput.value.weight) return
  if (!recordsByDate.value[selectedDate.value]) {
    recordsByDate.value[selectedDate.value] = []
  }
  recordsByDate.value[selectedDate.value].unshift({
    workout: selectedWorkout.value,
    reps: recordInput.value.reps,
    weight: recordInput.value.weight
  })
  closeRecordModal()
}

// 요일별 운동 세트 저장
function saveRoutine() {
  openRoutineModal.value = false
  // 오늘 날짜면 바로 반영
  if (selectedDate.value) {
    const dayIdx = new Date(selectedDate.value).getDay()
    workouts.value = [...routineByDay.value[days[dayIdx]]]
  }
}

// 날짜가 바뀔 때마다 요일에 맞는 운동리스트 자동 셋팅
watch(selectedDate, (newVal) => {
  if (!newVal) return
  const dayIdx = new Date(newVal).getDay()
  workouts.value = [...routineByDay.value[days[dayIdx]]]
})

// 앱 처음 로딩시 오늘 날짜 기준 자동 셋팅
const initSet = () => {
  const dayIdx = new Date(selectedDate.value).getDay()
  workouts.value = [...routineByDay.value[days[dayIdx]]]
}
initSet()

// 현재 선택된 날짜의 기록만 필터링
const currentRecords = computed(() => {
  return recordsByDate.value[selectedDate.value] || []
})

// 날짜 한국식 포맷
const selectedDateKor = computed(() => {
  const d = selectedDate.value
  if (!d) return ''
  const [y, m, day] = d.split('-')
  return `${y}년 ${m}월 ${day}일`
})
</script>
