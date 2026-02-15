<script setup>
import { onMounted } from 'vue';
import { useWalletStore } from '~/stores/wallet.store';
import { useTransactionStore } from '~/stores/transaction.store';

const transactionStore = useTransactionStore();
const walletStore = useWalletStore();

onMounted(() => {
  console.log('Table1', transactionStore.isFetchingTransactions);
  transactionStore.fetchAllTransactions({
    walletId: walletStore.walletId,
    skip: 0,
    limit: 10,
  });
});
</script>

<template>
  <div>Table1</div>
</template>
