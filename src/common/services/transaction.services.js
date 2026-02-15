import api from "~/common/services/api";

// Make transaction
export const makeTransaction = (walletId, data) =>
    api.post(`/transaction/transact/${walletId}`, data);

// Fetch transactions
export const fetchTransactions = (walletId, skip = 0, limit = 10) =>
    api.get("/transaction/transactions", {
        params: { walletId, skip, limit },
    });