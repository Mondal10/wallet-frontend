<script setup>
import { reactive, computed } from 'vue';
import { useWalletStore } from '~/stores/wallet.store';

import Loader from '~/components/Loader.vue';

const walletStore = useWalletStore();

const creationForm = reactive({
  username: '',
  initialBalance: 0,
});

const isSettingUpWallet = computed(() => walletStore.isSettingUpWallet);

async function createWallet() {
  await walletStore.setupWallet({
    name: creationForm.username,
    balance: creationForm.initialBalance,
  });
}
</script>
<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col gap-2 justify-center items-center">
      <img
        class="h-20 w-20"
        src="../../assets/wallet-config.png"
        alt="page not found"
      />
      <h2 class="font-medium mb-2">Create your wallet</h2>
    </div>
    <form
      class="flex flex-col gap-4"
      id="create_wallet_form"
      @submit.prevent="createWallet"
    >
      <div>
        <label for="username" class="block mb-2">Username</label>
        <input
          type="text"
          v-model="creationForm.username"
          :disabled="isSettingUpWallet"
          id="username"
          placeholder="Enter wallet user name"
          required
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label for="initial_balance" class="block mb-2">
          Initial Balance
        </label>
        <input
          type="number"
          step="0.0001"
          :min="0"
          v-model="creationForm.initialBalance"
          :disabled="isSettingUpWallet"
          id="initial_balance"
          placeholder="Enter wallet initial balance"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer"
        :class="{ 'opacity-50 !cursor-not-allowed': isSettingUpWallet }"
        :disabled="isSettingUpWallet"
        type="submit"
      >
        <Loader v-if="isSettingUpWallet" />
        <span v-else> Create wallet </span>
      </button>
    </form>
  </div>
</template>
