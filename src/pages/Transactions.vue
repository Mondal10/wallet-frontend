<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToWallet() {
  router.push('/wallet');
}
</script>

<template>
  <div>
    <div class="flex justify-center items-center">
      <!-- Header -->
      <h1 class="font-semibold text-lg p-4">Transaction history</h1>
    </div>
    <div class="flex justify-center">
      <div class="bg-white m-4 p-4 rounded-md w-full md:w-2/3 lg:w-1/3">
        <div class="flex mb-2">
          <div
            class="flex gap-2 items-center group cursor-pointer"
            @click="goToWallet"
          >
            <svg
              class="mt-0.5 w-4 h-4 fill-blue-500 group-hover:fill-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
              />
            </svg>
            <p class="text-blue-500 group-hover:text-blue-600">Back</p>
          </div>
        </div>
        Table
      </div>
    </div>
  </div>
</template>
