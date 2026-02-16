<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWalletStore } from '~/stores/wallet.store';
import { useTransactionStore } from '~/stores/transaction.store';
import { formatCurrency } from '~/common/utils/valueFormatter';

import Loader from '~/components/Loader.vue';

const route = useRoute();
const walletStore = useWalletStore();
const transactionStore = useTransactionStore();

const walletDetails = computed(() => walletStore.walletDetails);
const hasWalletDetails = computed(
  () =>
    walletStore.walletDetails &&
    Object.keys(walletStore.walletDetails).length > 0,
);

async function downloadCSV() {
  try {
    const response = await transactionStore.exportTransactionsAsCSV(
      walletStore.walletId,
    );

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  if (!hasWalletDetails.value) await walletStore.fetchWalletDetails();
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
  <div v-else class="flex justify-between">
    <div>
      <p>Wallet username: {{ walletDetails?.name }}</p>
      <div>
        <span>Balance: </span>
        <span class="">{{
          formatCurrency('en-IN', 'INR', walletDetails?.balance)
        }}</span>
      </div>
    </div>
    <div>
      <button
        v-if="route.name === 'transactions'"
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer"
        :class="{
          'opacity-50 !cursor-not-allowed':
            transactionStore.isExportingTransactions,
        }"
        @click="downloadCSV"
        :disabled="transactionStore.isExportingTransactions"
      >
        <span class="flex gap-2">
          <Loader v-if="transactionStore.isExportingTransactions" />
          Export as CSV
        </span>
      </button>
    </div>
  </div>
</template>
