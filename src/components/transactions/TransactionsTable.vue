<script setup>
// import MOCK_DATA from '~/mock/transactions.json';
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import { ref, computed, watch } from 'vue';

import { useWalletStore } from '~/stores/wallet.store';
import { useTransactionStore } from '~/stores/transaction.store';
import { formatCurrency, formatDate } from '~/common/utils/valueFormatter';

const transactionStore = useTransactionStore();
const walletStore = useWalletStore();

const pageSizes = [10, 25, 50, 100];

// const defaultData = MOCK_DATA;
// const data = ref(defaultData);

const columns = [
  {
    header: 'Date',
    accessorKey: 'date',
    size: 80,
    cell: (info) => {
      return formatDate(info.getValue());
    },
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
    size: 120,
    cell: (info) => {
      return formatCurrency('en-IN', 'INR', info.getValue());
    },
  },
  {
    header: 'Type',
    accessorKey: 'type',
    enableSorting: false,
    size: 80,
    cell: (info) => {
      return info.getValue().toUpperCase();
    },
  },
  {
    header: 'Balance',
    accessorKey: 'balance',
    enableSorting: false,
    size: 120,
    cell: (info) => {
      return formatCurrency('en-IN', 'INR', info.getValue());
    },
  },
  {
    header: 'Description',
    accessorKey: 'description',
    enableSorting: false,
    size: 220,
  },
];
const transactions = computed(() => transactionStore.transactions);
const totalTransactionsCount = computed(
  () => transactionStore.totalTransactionsCount,
);

const sorting = ref([]);
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});
const table = useVueTable({
  get data() {
    // return data.value;
    return transactions.value;
  },
  columns,
  state: {
    get sorting() {
      return sorting.value;
    },
    get pagination() {
      return pagination.value;
    },
  },
  manualPagination: true,
  rowCount: totalTransactionsCount.value,
  onPaginationChange: (updater) => {
    pagination.value =
      typeof updater === 'function' ? updater(pagination.value) : updater;
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});

function handlePageSizeChange(e) {
  table.setPageSize(Number(e.target.value));
}

watch(
  () => table.getState().pagination,
  async (pagination) => {
    await transactionStore.fetchAllTransactions({
      walletId: walletStore.walletId,
      skip: pagination.pageIndex * pagination.pageSize,
      limit: pagination.pageSize,
    });
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div v-if="transactionStore.isFetchingTransactions">
    <div class="mx-auto w-full border border-gray-300 p-4">
      <div class="animate-pulse space-y-3">
        <div class="grid grid-cols-10 gap-4">
          <div class="col-span-2 h-10 rounded bg-gray-200"></div>
          <div class="col-span-2 h-10 rounded bg-gray-200"></div>
          <div class="col-span-2 h-10 rounded bg-gray-200"></div>
          <div class="col-span-2 h-10 rounded bg-gray-200"></div>
          <div class="col-span-2 h-10 rounded bg-gray-200"></div>
        </div>
        <div class="h-10 rounded bg-gray-200"></div>
        <div class="h-10 rounded bg-gray-200"></div>
        <div class="h-10 rounded bg-gray-200"></div>
        <div class="h-10 rounded bg-gray-200"></div>
        <div class="h-10 rounded bg-gray-200"></div>
        <div class="h-10 rounded bg-gray-200"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <!-- Table -->
    <div class="overflow-x-auto overflow-y-scroll max-h-[65vh]">
      <table class="table-fixed w-full border border-gray-300">
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              class="bg-gray-200 text-gray-900 text-left p-2 border-r border-r-gray-300"
              :class="
                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
              "
              :style="{ width: header.getSize() + 'px' }"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <template v-if="!header.isPlaceholder">
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />

                {{ { asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] }}
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border border-gray-300"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :style="{ width: cell.column.getSize() + 'px' }"
              class="p-2 border-r border-gray-300"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-center">
      <div class="flex items-center gap-2">
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer"
          @click="() => table.setPageIndex(0)"
          :disabled="!table.getCanPreviousPage()"
          :class="{
            'opacity-50 !cursor-not-allowed': !table.getCanPreviousPage(),
          }"
        >
          « First Page
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer"
          @click="() => table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
          :class="{
            'opacity-50 !cursor-not-allowed': !table.getCanPreviousPage(),
          }"
        >
          ‹ Previous Page
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer"
          @click="() => table.nextPage()"
          :disabled="!table.getCanNextPage()"
          :class="{
            'opacity-50 !cursor-not-allowed': !table.getCanNextPage(),
          }"
        >
          Next Page ›
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 cursor-pointer"
          @click="() => table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
          :class="{
            'opacity-50 !cursor-not-allowed': !table.getCanNextPage(),
          }"
        >
          Last Page »
        </button>
        <span class="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </strong>
        </span>
        <select
          :value="table.getState().pagination.pageSize"
          @change="handlePageSizeChange"
        >
          <option
            :key="pageSize"
            :value="pageSize"
            v-for="pageSize in pageSizes"
          >
            Show {{ pageSize }}
          </option>
        </select>
      </div>
    </div>
    <!-- Debug Consoles -->
    <!-- <div>{{ table.getRowModel().rows.length }} Rows</div>
    <pre>{{ JSON.stringify(sorting, null, 2) }}</pre>
    <div>{{ table.getRowModel().rows.length }} Rows</div>
    <pre>{{ JSON.stringify(table.getState().pagination, null, 2) }}</pre> -->
  </div>
</template>
