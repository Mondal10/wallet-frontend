import { acceptHMRUpdate, defineStore } from 'pinia';
import { setItem } from '~/common/utils/localStorage';
import { getWallet, setupWallet } from '~/common/services/wallet.services';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useWalletStore = defineStore('wallet', {
    state: () => ({
        walletId: null,
        walletDetails: null,
        isFetchingWalletDetails: false,
        isSettingUpWallet: false,
    }),
    getters: {
        isWalletDetailAvailable: (state) => {
            const hasWalletId = !!state.walletId;

            const hasWalletDetails =
                state.walletDetails &&
                Object.keys(state.walletDetails).length > 0;

            return hasWalletId && hasWalletDetails;
        },
    },
    actions: {
        setWalletId(walletId) {
            this.walletId = walletId;
        },
        setWalletDetails(walletDetails) {
            this.walletDetails = walletDetails;
        },
        async fetchWalletDetails() {
            this.isFetchingWalletDetails = true;
            try {
                if (!this.walletId) {
                    throw new Error('Wallet ID not found');
                }

                const walletDetails = await getWallet(this.walletId);
                this.setWalletDetails(walletDetails.data);

                return walletDetails.data;
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Could not fetch wallet details");
            } finally {
                this.isFetchingWalletDetails = false;
            }
        },
        async setupWallet(payload) {
            this.isSettingUpWallet = true;
            try {
                const walletDetails = await setupWallet(payload);
                this.setWalletId(walletDetails.data.id);
                setItem('walletId', walletDetails.data.id);
                this.setWalletDetails(walletDetails.data);
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Could not setup wallet");
            } finally {
                this.isSettingUpWallet = false;
            }
        }
    },
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot));
