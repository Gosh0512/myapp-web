<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- 사이드 메뉴 -->
    <aside class="w-56 bg-white border-r px-6 py-8">
      <div class="mb-10">
        <h2 class="text-2xl font-bold">운동 대시보드</h2>
      </div>
      <nav>
        <ul class="space-y-2 text-gray-700 text-base">
          <li class="font-bold text-blue-600 bg-blue-50 rounded px-2 py-1">인바디 변화</li>
          <li class="hover:text-blue-600 cursor-pointer">운동 기록</li>
          <li class="hover:text-blue-600 cursor-pointer">목표 관리</li>
          <li class="hover:text-blue-600 cursor-pointer">식단 관리</li>
        </ul>
      </nav>
    </aside>
    <!-- 메인 -->
    <main class="flex-1 p-8">
      <!-- 상단 컨트롤 -->
      <div class="flex justify-between items-center mb-6">
        <div class="text-2xl font-bold">인바디/운동 기록</div>
        <div class="flex gap-2">
          <select class="border rounded px-2 py-1 text-sm">
            <option>최근 1개월</option>
            <option>최근 3개월</option>
            <option>올해</option>
          </select>
          <button class="border px-3 py-1 rounded text-sm bg-gray-100">통계 내보내기</button>
        </div>
      </div>
      <!-- 상단 요약 카드 -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow px-6 py-4">
          <div class="text-gray-500 text-sm">체중</div>
          <div class="text-2xl font-bold">75.5 kg</div>
          <div class="text-green-500 text-xs mt-2">+1.2kg (1개월)</div>
        </div>
        <div class="bg-white rounded-xl shadow px-6 py-4">
          <div class="text-gray-500 text-sm">골격근량</div>
          <div class="text-2xl font-bold">36.1 kg</div>
          <div class="text-blue-500 text-xs mt-2">+0.7kg (1개월)</div>
        </div>
        <div class="bg-white rounded-xl shadow px-6 py-4">
          <div class="text-gray-500 text-sm">체지방량</div>
          <div class="text-2xl font-bold">13.5 kg</div>
          <div class="text-red-500 text-xs mt-2">-0.4kg (1개월)</div>
        </div>
      </div>
      <!-- 메인 차트 & 운동 기록 -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <!-- 인바디 변화 차트 -->
        <div class="bg-white rounded-xl shadow p-6 flex flex-col">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-lg">체중/근육/체지방 변화</span>
          </div>
        </div>
        <!-- 운동 기록 카드 -->
        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-lg">최근 운동 기록</span>
            <button class="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded">운동 추가</button>
          </div>
          <ul class="text-sm space-y-2 mt-4">
            <li>2024-06-11 - 하체 스쿼트 5세트, 런닝 5km (52분)</li>
            <li>2024-06-10 - 상체 벤치프레스 3세트, 팔굽혀펴기 2세트</li>
            <li>2024-06-09 - 전신 크로스핏 45분, 스트레칭</li>
            <li>2024-06-08 - 런닝 8km (54분)</li>
          </ul>
        </div>
      </div>
      <!-- GB-Hours 영역 -> 기타 통계/운동 누적 등 확장 가능 -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white rounded-xl shadow p-6">
          <span class="font-bold text-lg">운동별 누적시간</span>
          <div class="flex flex-col gap-2 mt-4 text-sm">
            <div class="flex justify-between"><span>런닝</span><span>18시간</span></div>
            <div class="flex justify-between"><span>웨이트</span><span>24시간</span></div>
            <div class="flex justify-between"><span>크로스핏</span><span>8시간</span></div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow p-6">
          <span class="font-bold text-lg">목표 달성률</span>
          <div class="flex flex-col gap-2 mt-4 text-sm">
            <div class="flex justify-between items-center">
              <span>주간 런닝</span>
              <div class="w-32 h-2 bg-gray-200 rounded-full ml-2">
                <div class="bg-blue-400 h-2 rounded-full" style="width:70%"></div>
              </div>
              <span class="ml-2 text-xs text-gray-500">7/10km</span>
            </div>
            <div class="flex justify-between items-center">
              <span>근력운동</span>
              <div class="w-32 h-2 bg-gray-200 rounded-full ml-2">
                <div class="bg-green-400 h-2 rounded-full" style="width:80%"></div>
              </div>
              <span class="ml-2 text-xs text-gray-500">8/10회</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 실제 그래프는 차트 컴포넌트에서 관리
import { defineComponent } from 'vue'
import LineChartInbody from '@/components/LineChartInbody.vue'

</script>
