import { acceptHMRUpdate, defineStore } from 'pinia';
import { makeTransaction, fetchTransactions, exportTransactions } from '~/common/services/transaction.services';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
        transactions: [],
        totalTransactionsCount: 0,
        isMakingTransaction: false,
        isFetchingTransactions: false,
        isExportingTransactions: false,
    }),
    getters: {},
    actions: {
        async makeSingleTransaction(walletId, payload) {
            this.isMakingTransaction = true;
            try {
                const transactionDetails = await makeTransaction(walletId, payload);

                return transactionDetails.data;
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Could not make the transaction");
            } finally {
                this.isMakingTransaction = false;
            }
        },
        async fetchAllTransactions(query) {
            this.isFetchingTransactions = true;
            try {
                const transactions = await fetchTransactions(query);
                this.transactions = transactions.data.transactions;
                this.totalTransactionsCount = transactions.data.total
                return transactions.data;
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Could not fetch transactions");
            } finally {
                this.isFetchingTransactions = false;
            }
        },
        async exportTransactionsAsCSV(walletId) {
            this.isExportingTransactions = true;
            try {
                const response = await exportTransactions(walletId);
                return response;
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Could not export transactions");
            } finally {
                this.isExportingTransactions = false;
            }
        }
    },
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useTransactionStore, import.meta.hot));
