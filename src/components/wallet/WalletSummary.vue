<script setup>
import { getWallet } from '~/common/services/wallet.services';

const getWalletData = async () => {
  await getWallet('69916bcf7e839ec3ff1d6650');
};
</script>
<template>
  <div>
    <p>Wallet username: Amit</p>
    <div>
      <span>Balance: </span>
      <span class="">₹ 20,000 /-</span>
    </div>
    <p>Created on: Feb 10, 2026</p>
    <button @click="getWalletData">get</button>
  </div>
</template>
