<script setup></script>
<template>
  <div>
    <h2 class="font-medium mb-4">Make a transaction</h2>
    <form
      class="flex flex-col gap-4"
      id="transaction_form"
      @submit.prevent="() => console.log('Make transaction')"
    >
      <div>
        <label for="amount" class="block mb-2"> Amount </label>
        <input
          type="number"
          :min="1"
          :max="Number.MAX_SAFE_INTEGER"
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
          placeholder="Enter transaction description"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer"
        type="submit"
      >
        Make transaction
      </button>
    </form>
  </div>
</template>
