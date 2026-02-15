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
              class="mt-0.5 w-4 h-4 rotate-180 fill-blue-500 group-hover:fill-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
              <path
                d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"
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
