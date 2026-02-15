<script setup>
import { provide } from 'vue';
import { getItem } from '~/common/utils/localStorage';

const walletId = getItem('walletId');
provide('walletId', walletId);
</script>

<template>
  <router-view />
</template>
