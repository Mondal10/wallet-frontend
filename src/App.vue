<script setup>
import { onMounted } from 'vue';
import { getItem } from '~/common/utils/localStorage';
import { useWalletStore } from '~/stores/wallet.store';

const walletStore = useWalletStore();

onMounted(() => {
  const walletId = getItem('walletId');

  if (walletId) {
    walletStore.setWalletId(walletId);
  }
});
</script>

<template>
  <router-view />
</template>
