import {store} from "@/shared/stores/store.ts";

export const waitForRehydration = () => {
  return new Promise<void>((resolve) => {
    // Check if the store is already rehydrated
    if (store.getState()._persist.rehydrated) {
      resolve();
    } else {
      // Subscribe to store updates and resolve when rehydrated
      const unsubscribe = store.subscribe(() => {
        if (store.getState()._persist.rehydrated) {
          unsubscribe();
          resolve();
        }
      });
    }
  });
};