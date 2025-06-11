<template>
  <div class="bg-white min-h-screen px-8 py-6">
    <!-- 경로 네비게이션 -->
    <nav class="flex items-center text-sm text-gray-400 mb-4">
      <span>gosh0512's projects</span>
      <span class="mx-2">/</span>
      <span>Monitoring</span>
    </nav>

    <!-- 타이틀 -->
    <h1 class="text-3xl font-bold mb-1">Monitoring</h1>
    <p class="text-gray-500 mb-6">
      Query and visualize your Vercel usage, traffic, and more with the fields below.
    </p>

      <nav class="flex border-b border-gray-200 bg-white px-4 py-2">
    <ul class="flex gap-6">
      <li v-for="item in menu" :key="item.name">
        <a
          :href="item.link"
          :class="[
            'text-sm pb-2',
            item.active
              ? 'font-semibold text-gray-900 border-b-2 border-black'
              : 'text-gray-500 hover:text-black'
          ]"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>

    <!-- 메인 패널 -->
    <div class="flex flex-col md:flex-row gap-8">
      <!-- 왼쪽: 쿼리 리스트 -->
      <div class="w-full md:w-1/3">
        <div class="bg-gray-50 rounded-lg p-4 mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="font-semibold">Query in Observability</span>
            <span class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">New</span>
          </div>
          <p class="text-gray-400 text-sm mb-2">An improved way to explore your data.</p>
          <button class="bg-black text-white py-1 px-3 rounded hover:bg-gray-900 text-sm">Go to Observability →</button>
        </div>
        <div>
          <div class="text-xs font-semibold mb-1">Example Queries</div>
          <ul class="text-gray-500 text-sm space-y-1">
            <li>Requests by Hostname</li>
            <li>Requests Per Second by Hostname</li>
            <li>Requests by Project</li>
            <li>429 Status Codes by Host, Path</li>
            <li>5XX Status Codes by Host, Path</li>
            <li>Requests by Region</li>
          </ul>
        </div>
      </div>

      <!-- 오른쪽: 쿼리 에디터 -->
      <div class="w-full md:w-2/3">
        <div class="bg-gray-50 rounded-lg p-6 shadow flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <span class="font-semibold">Draft</span>
            <button class="bg-gray-200 px-3 py-1 rounded text-gray-600 text-sm">Save Query</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-xs text-gray-500 mb-1">VISUALIZE</label>
              <select class="w-full border rounded px-2 py-1">
                <option>Edge Requests</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">COUNT</label>
              <select class="w-full border rounded px-2 py-1">
                <option>Count</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">WHERE</label>
              <input type="text" class="w-full border rounded px-2 py-1" placeholder="host = 'example.com'" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">PROJECT</label>
              <input type="text" class="w-full border rounded px-2 py-1" placeholder="Choose Project (optional)" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">GROUP BY</label>
              <input type="text" class="w-full border rounded px-2 py-1" value="host" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">LIMIT</label>
              <input type="number" class="w-full border rounded px-2 py-1" value="10" />
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-black text-white px-4 py-2 rounded">Run Query</button>
          </div>
        </div>
        <!-- 하단 모니터링 안내 -->
        <div class="flex flex-col items-center mt-10">
          <span class="text-3xl text-gray-400 mb-2">📊</span>
          <p class="font-semibold mb-2">Monitoring</p>
          <p class="text-gray-500 text-sm text-center mb-1">
            Visualize bandwidth, errors, performance issues, <br />and more across all projects
          </p>
          <a href="#" class="text-blue-500 text-sm">Learn More →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>



<style>
/* 필요 시 전역 스타일 가능 */
</style>
