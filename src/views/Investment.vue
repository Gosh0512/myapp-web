<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <!-- 상단 카드 -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow px-6 py-5">
          <div class="text-gray-500 text-sm">총 투자 원금</div>
          <div class="text-2xl font-bold">$120,000</div>
          <div class="text-green-500 text-xs mt-2">+2.1% 지난달 대비</div>
        </div>
        <div class="bg-white rounded-xl shadow px-6 py-5">
          <div class="text-gray-500 text-sm">총 평가금액(시가총액)</div>
          <div class="text-2xl font-bold">$131,500</div>
          <div class="text-green-500 text-xs mt-2">+4.6% 지난달 대비</div>
        </div>
        <div class="bg-white rounded-xl shadow px-6 py-5">
          <div class="text-gray-500 text-sm">누적 수익률</div>
          <div class="text-2xl font-bold">+9.6%</div>
          <div class="text-red-500 text-xs mt-2">-1.2% 지난달 대비</div>
        </div>
      </div>
      <!-- 중간 차트 -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <!-- 월별 자산변화(라인차트 placeholder) -->
        <div class="bg-white rounded-xl shadow p-6 flex flex-col">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-lg">월별 자산 변화</span>
            <div>
              <button class="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded mr-2">월별</button>
              <button class="text-xs px-3 py-1 bg-gray-50 text-gray-600 rounded">분기별</button>
            </div>
          </div>
          <!-- 실제로는 차트 라이브러리 사용, 여기선 placeholder -->
          <div class="h-44 flex items-center justify-center text-gray-300">
            [Line Chart 영역]
          </div>
        </div>
        <!-- 추정 수익(게이지) -->
        <div class="bg-white rounded-xl shadow p-6 flex flex-col">
          <div class="font-bold text-lg mb-2">이번 달 목표 수익</div>
          <div class="flex justify-center items-center h-36 text-blue-400">
            [Gauge Chart: $900]
          </div>
          <div class="flex justify-between mt-3 text-sm">
            <span>배당금 $300</span>
            <span>매매익 $600</span>
          </div>
        </div>
      </div>
      <!-- 하단 카드 -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <!-- 자산 구성 비율(파이차트 placeholder) -->
        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-lg">자산 구성</span>
          </div>
          <div class="flex gap-6 items-center">
            <div class="h-36 w-36 rounded-full bg-blue-50 flex items-center justify-center text-gray-400">
              [Pie Chart]
            </div>
            <ul class="text-sm">
              <li>국내주식 45% - $59,175</li>
              <li>해외주식 33% - $43,395</li>
              <li>ETF 15% - $19,725</li>
              <li>현금 7% - $9,205</li>
            </ul>
          </div>
        </div>
        <!-- 예정 일정 -->
        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-lg">예정 일정</span>
          </div>
          <ul class="text-sm space-y-3 mt-3">
            <li>
              <span class="font-semibold text-blue-600">2024-06-15</span> : 삼성전자 배당락
            </li>
            <li>
              <span class="font-semibold text-blue-600">2024-07-10</span> : 애플 실적발표
            </li>
            <li>
              <span class="font-semibold text-blue-600">2024-07-15</span> : 미국 CPI 발표
            </li>
          </ul>
        </div>
      </div>
      <!-- 최근 거래내역 테이블 -->
      <div class="bg-white rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold text-lg">최근 거래내역</span>
          <div>
            <input type="text" class="border rounded px-2 py-1 text-sm" placeholder="종목명 검색..." />
            <button class="ml-2 px-4 py-1 bg-gray-100 rounded">Filter</button>
          </div>
        </div>
        <table class="min-w-full text-sm">
          <thead>
            <tr class="text-gray-500 border-b">
              <th class="px-2 py-2 text-left">거래일</th>
              <th class="px-2 py-2 text-left">종목</th>
              <th class="px-2 py-2 text-left">구분</th>
              <th class="px-2 py-2 text-left">수량</th>
              <th class="px-2 py-2 text-left">단가</th>
              <th class="px-2 py-2 text-left">총액</th>
              <th class="px-2 py-2 text-left">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tradeList" :key="item.id" class="border-b">
              <td class="px-2 py-2">{{ item.date }}</td>
              <td class="px-2 py-2">{{ item.stock }}</td>
              <td class="px-2 py-2">{{ item.type }}</td>
              <td class="px-2 py-2">{{ item.qty }}</td>
              <td class="px-2 py-2">${{ item.price.toLocaleString() }}</td>
              <td class="px-2 py-2">${{ item.total.toLocaleString() }}</td>
              <td class="px-2 py-2">
                <span
                  :class="item.status === '완료' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
                  class="px-2 py-1 rounded text-xs"
                >{{ item.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const tradeList = [
  {
    id: 1,
    date: '2024-06-10',
    stock: '삼성전자',
    type: '매수',
    qty: 10,
    price: 71000,
    total: 710000,
    status: '완료'
  },
  {
    id: 2,
    date: '2024-06-09',
    stock: '애플',
    type: '매도',
    qty: 3,
    price: 185,
    total: 555,
    status: '완료'
  },
  {
    id: 3,
    date: '2024-06-08',
    stock: '테슬라',
    type: '매수',
    qty: 2,
    price: 180,
    total: 360,
    status: '완료'
  },
  {
    id: 4,
    date: '2024-06-07',
    stock: '타이거미국S&P500',
    type: '매수',
    qty: 7,
    price: 15000,
    total: 105000,
    status: '진행중'
  },
]
</script>
