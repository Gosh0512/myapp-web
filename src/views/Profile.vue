<template>
  <div class="flex flex-col md:flex-row bg-white rounded-xl shadow p-8 gap-8 mt-8">
    <!-- 왼쪽 프로필 사진 & 기본 정보 -->
    <div class="flex flex-col items-center md:items-start md:w-1/3">
      <img src="" class="w-32 h-32 rounded-full mb-4 border" />
      <h2 class="text-xl font-bold">Seungho Seo</h2>
      <p class="text-gray-500">Web Developer</p>
      <p class="text-gray-400 text-sm mt-1">Gyeonggi-do, Korea</p>
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit Profile</button>
    </div>
    <!-- 오른쪽 상세 정보(카드처럼) -->
    <div class="md:w-2/3 flex flex-col justify-between">
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
          <span class="text-lg font-semibold">Investment</span>
          <span class="text-2xl font-bold text-green-600 mt-2">₩100M</span>
          <span class="text-xs text-gray-400 mt-1">Total Asset</span>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
          <span class="text-lg font-semibold">Reading</span>
          <span class="text-2xl font-bold text-blue-600 mt-2">120</span>
          <span class="text-xs text-gray-400 mt-1">Books</span>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
          <span class="text-lg font-semibold">Workout</span>
          <span class="text-2xl font-bold text-red-600 mt-2">300</span>
          <span class="text-xs text-gray-400 mt-1">Days</span>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
          <span class="text-lg font-semibold">Fishing</span>
          <span class="text-2xl font-bold text-indigo-600 mt-2">20</span>
          <span class="text-xs text-gray-400 mt-1">Trips</span>
        </div>
      </div>
      <div>
        <h3 class="font-bold mb-2">About Me</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          Passionate about technology, finance, books, running, and fishing. Always eager to learn new things and challenge myself!
        </p>
      </div>
    </div>
  </div>
</template>