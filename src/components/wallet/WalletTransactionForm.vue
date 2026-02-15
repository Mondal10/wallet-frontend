<script setup>
import { reactive, computed } from 'vue';
import { useWalletStore } from '~/stores/wallet.store';
import { useTransactionStore } from '~/stores/transaction.store';

import Loader from '~/components/Loader.vue';

const walletStore = useWalletStore();
const transactionStore = useTransactionStore();

const transactionForm = reactive({
  amount: null,
  type: 'credit',
  description: null,
});

const isMakingTransaction = computed(
  () => transactionStore.isMakingTransaction,
);

const onTransactionClick = async () => {
  const txnResp = await transactionStore.makeSingleTransaction(
    walletStore.walletId,
    {
      amount: transactionForm.amount,
      type: transactionForm.type,
      description: transactionForm.description,
    },
  );

  walletStore.setWalletDetails({
    ...walletStore.walletDetails,
    balance: txnResp.balance,
  });

  resetFormState();
};

function resetFormState() {
  transactionForm.amount = null;
  transactionForm.type = 'credit';
  transactionForm.description = null;
}
</script>
<template>
  <div>
    <!-- Header -->
    <h2 class="font-medium mb-4">Make a transaction</h2>
    <form
      class="flex flex-col gap-4"
      id="transaction_form"
      @submit.prevent="onTransactionClick"
    >
      <div>
        <label for="amount" class="block mb-2"> Amount </label>
        <input
          type="number"
          :min="0.0001"
          step="0.0001"
          v-model="transactionForm.amount"
          :disabled="isMakingTransaction"
          id="amount"
          placeholder="Enter transaction amount"
          required
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <span class="block mb-2">Type</span>
        <div class="flex flex-col">
          <div class="flex gap-2">
            <input
              type="radio"
              id="credit"
              name="transaction_type"
              value="credit"
              v-model="transactionForm.type"
              :disabled="isMakingTransaction"
              class="cursor-pointer"
              required
            />
            <label class="cursor-pointer" for="credit">Credit</label>
          </div>
          <div class="flex gap-2">
            <input
              type="radio"
              id="debit"
              name="transaction_type"
              value="debit"
              v-model="transactionForm.type"
              :disabled="isMakingTransaction"
              class="cursor-pointer"
              required
            />
            <label class="cursor-pointer" for="debit">Debit</label>
          </div>
        </div>
      </div>
      <div>
        <label for="description" class="block mb-2">Description</label>
        <input
          type="text"
          id="description"
          v-model="transactionForm.description"
          :disabled="isMakingTransaction"
          placeholder="Enter transaction description"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer"
        :class="{ 'opacity-50 !cursor-not-allowed': isMakingTransaction }"
        :disabled="isMakingTransaction"
        type="submit"
      >
        <Loader v-if="isMakingTransaction" />
        <span v-else> Make transaction </span>
      </button>
    </form>
  </div>
</template>
