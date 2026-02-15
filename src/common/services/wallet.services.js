import api from "~/common/services/api";

// Setup wallet
export const setupWallet = (data) =>
    api.post("/wallet/setup", data);

// Get wallet
export const getWallet = (walletId) =>
    api.get(`/wallet/${walletId}`);
