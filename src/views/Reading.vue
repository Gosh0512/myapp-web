<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold mb-6">독서 후기 모음</h2>
    <!-- 검색, 태그 필터, 추가 버튼 -->
    <div class="flex gap-3 items-center mb-5">
      <input v-model="search" type="text" class="border px-3 py-2 rounded w-60" placeholder="제목/내용 검색..." />
      <select v-model="tagFilter" class="border px-2 py-2 rounded">
        <option value="">태그 전체</option>
        <option v-for="t in tags" :key="t">{{ t }}</option>
      </select>
      <button @click="openModal({ isNew:true })" class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">+ 새 후기</button>
    </div>

    <!-- 카드 리스트 -->
    <div class="grid grid-cols-3 gap-5">
      <div
        v-for="(item, idx) in filteredReviews"
        :key="idx"
        class="bg-white rounded-xl shadow px-6 py-5 cursor-pointer hover:ring-2 ring-blue-300 transition"
        @click="openModal(item)"
      >
        <div class="flex items-center gap-2 mb-2">
          <img v-if="item.thumb" :src="item.thumb" class="w-10 h-10 rounded object-cover bg-gray-200" />
          <span class="font-bold text-lg">{{ item.title }}</span>
          <span v-if="item.tag" class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs ml-2">{{ item.tag }}</span>
        </div>
        <div class="text-gray-500 text-sm mb-2">{{ item.date }}</div>
        <div class="text-gray-700 line-clamp-2">{{ item.summary }}</div>
      </div>
    </div>

    <!-- 팝업(모달) -->
    <div v-if="showModal" class="fixed z-30 inset-0 bg-black/30 flex items-center justify-center">
      <div class="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg relative animate-fadeIn">
        <button
          class="absolute top-3 right-4 text-gray-500 text-2xl hover:text-gray-700"
          @click="closeModal"
        >×</button>

        <!-- 수정 모드 or 새 후기 -->
        <div v-if="editMode">
          <div class="mb-3">
            <input v-model="editItem.title" class="border-b px-2 py-1 w-full text-lg font-bold mb-1" placeholder="제목" />
          </div>
          <div class="mb-2 flex items-center gap-2">
            <input v-model="editItem.tag" class="border px-2 py-1 rounded w-24" placeholder="태그" />
            <input v-model="editItem.date" class="border px-2 py-1 rounded w-28" type="date" />
          </div>
          <div class="mb-2 flex items-center gap-2">
            <input v-model="editItem.thumb" class="border px-2 py-1 rounded w-60" placeholder="썸네일 이미지 URL" />
            <button class="bg-gray-100 border px-3 py-1 rounded text-sm" @click="editItem.thumb='';">삭제</button>
          </div>
          <textarea v-model="editItem.content" rows="7" class="border rounded w-full px-3 py-2 mb-3" placeholder="후기/감상문 전체 내용"></textarea>
          <div class="flex justify-end gap-2">
            <button class="bg-gray-200 px-4 py-1 rounded" @click="closeModal">취소</button>
            <button class="bg-blue-600 text-white px-4 py-1 rounded" @click="saveItem">저장</button>
          </div>
        </div>
        <!-- 뷰 모드 -->
        <div v-else>
          <div class="mb-3 flex items-center gap-2">
            <img v-if="selected?.thumb" :src="selected?.thumb" class="w-12 h-12 rounded object-cover bg-gray-200" />
            <span class="font-bold text-xl">{{ selected?.title }}</span>
            <span v-if="selected?.tag" class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs ml-2">{{ selected.tag }}</span>
          </div>
          <div class="text-gray-500 text-sm mb-4">{{ selected?.date }}</div>
          <div class="whitespace-pre-line text-gray-800 mb-5" style="min-height:150px;">{{ selected?.content }}</div>
          <div class="flex justify-end gap-2">
            <button class="bg-blue-100 text-blue-700 px-4 py-1 rounded" @click="editThis">편집</button>
            <button class="bg-gray-200 px-4 py-1 rounded" @click="closeModal">닫기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const reviews = ref([
  {
    title: '아주 작은 습관의 힘',
    date: '2024-06-01',
    summary: '작은 행동의 반복이 인생을 어떻게 바꾸는지 이해하게 된 책. 실천 동기 부여가 필요할 때 추천!',
    tag: '습관',
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96',
    content: `이 책은 '매일 1%의 변화'가 인생을 바꿀 수 있음을 다양한 실험과 예시로 증명한다. 작은 습관을 쌓아가며 실생활에서 적용한 사례와 나만의 행동 전략까지 구체적으로 기록해보았다.`
  },
  {
    title: '돈의 속성',
    date: '2024-05-24',
    summary: '돈에 대한 새로운 관점과 태도를 배운 책. 자산을 지키는 생각법과 실제 행동 팁이 좋았음.',
    tag: '재테크',
    thumb: '',
    content: `단순히 돈을 많이 버는 것이 아니라, 돈을 다루는 태도가 중요함을 다시 느꼈다. 투자 습관, 소비습관에 대한 점검을 하게 만든 책.`
  },
  {
    title: 'AI 시대의 공부법',
    date: '2024-05-17',
    summary: 'AI와 함께 살아갈 시대, 어떤 공부법과 역량이 필요한지 고민하게 된 계기.',
    tag: '자기계발',
    thumb: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=96&h=96',
    content: `단순 암기와 반복이 아니라, 스스로 질문하고, AI를 도구로 활용하는 학습법을 강조한다. 책을 읽고 실제 업무/공부 방식에 적용할 점을 정리해봤다.`
  },
])
const search = ref('')
const tagFilter = ref('')
const tags = computed(() =>
  Array.from(new Set(reviews.value.map(r => r.tag).filter(Boolean)))
)
const showModal = ref(false)
const selected = ref(null)
const editMode = ref(false)
const editItem = ref({})

// 검색/필터링 된 데이터
const filteredReviews = computed(() => {
  let arr = reviews.value
  if (search.value) {
    const key = search.value.toLowerCase()
    arr = arr.filter(r =>
      r.title.toLowerCase().includes(key) ||
      r.content.toLowerCase().includes(key)
    )
  }
  if (tagFilter.value) {
    arr = arr.filter(r => r.tag === tagFilter.value)
  }
  return arr
})

// 카드 클릭/추가 버튼 → 모달 오픈
function openModal(item) {
  if (item.isNew) {
    editMode.value = true
    editItem.value = {
      title: '',
      date: new Date().toISOString().substring(0, 10),
      tag: '',
      thumb: '',
      summary: '',
      content: '',
    }
    selected.value = editItem.value
  } else {
    selected.value = item
    editMode.value = false
  }
  showModal.value = true
}

// 편집 버튼
function editThis() {
  editItem.value = { ...selected.value }
  editMode.value = true
}

// 저장(수정/신규)
function saveItem() {
  if (!editItem.value.title || !editItem.value.content) return alert('제목과 내용을 입력하세요.')
  editItem.value.summary = editItem.value.content.slice(0, 60) + (editItem.value.content.length > 60 ? '...' : '')
  if (editMode.value && !reviews.value.includes(selected.value)) {
    // 신규 추가
    reviews.value.unshift({ ...editItem.value })
  } else {
    // 기존 편집
    Object.assign(selected.value, editItem.value)
  }
  showModal.value = false
  editMode.value = false
}
function closeModal() {
  showModal.value = false
  editMode.value = false
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97);}
  to { opacity: 1; transform: scale(1);}
}
.animate-fadeIn { animation: fadeIn .18s; }
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
