<script setup>
import { onMounted, computed } from 'vue';
import { useWalletStore } from '~/stores/wallet.store';
import { formatCurrency } from '~/common/utils/valueFormatter';

const walletStore = useWalletStore();

const walletDetails = computed(() => walletStore.walletDetails);

onMounted(async () => {
  await walletStore.fetchWalletDetails();
});
</script>
<template>
  <div v-if="walletStore.isFetchingWalletDetails">
    <div>
      <div class="flex animate-pulse space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="space-y-3">
            <div class="grid grid-cols-4 gap-4">
              <div class="col-span-1 h-4 rounded bg-gray-200"></div>
              <div class="col-span-2 h-4 rounded bg-gray-200"></div>
            </div>
            <div class="grid grid-cols-4 gap-4">
              <div class="col-span-1 h-4 rounded bg-gray-200"></div>
              <div class="col-span-2 h-4 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Wallet username: {{ walletDetails?.name }}</p>
    <div>
      <span>Balance: </span>
      <span class="">{{
        formatCurrency('en-IN', 'INR', walletDetails?.balance)
      }}</span>
    </div>
  </div>
</template>
