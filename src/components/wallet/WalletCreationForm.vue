<script setup></script>
<template>
  <div>
    <h2 class="font-medium mb-4">Create your wallet</h2>
    <form
      class="flex flex-col gap-4"
      id="create_wallet_form"
      @submit.prevent="() => console.log('Create Wallet')"
    >
      <div>
        <label for="username" class="block mb-2">Username</label>
        <input
          type="text"
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
          :min="0"
          :max="Number.MAX_SAFE_INTEGER"
          id="initial_balance"
          placeholder="Enter wallet initial balance"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer"
        type="submit"
      >
        Create wallet
      </button>
    </form>
  </div>
</template>
