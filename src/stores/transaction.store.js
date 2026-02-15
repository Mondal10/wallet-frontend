import { acceptHMRUpdate, defineStore } from 'pinia';
import { makeTransaction, fetchTransactions } from '~/common/services/transaction.services';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
        transactions: null,
        isMakingTransaction: false,
        isFetchingTransactions: false,
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
        async fetchAllTransactions(payload) {
            this.isFetchingTransactions = true;
            try {
                // const walletDetails = await fetchTransactions(payload);
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Could not fetch transactions");
            } finally {
                this.isFetchingTransactions = false;
            }
        }
    },
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useTransactionStore, import.meta.hot));
