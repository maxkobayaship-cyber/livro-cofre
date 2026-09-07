"use client";

import { useCallback, useSyncExternalStore } from "react";
import { CODE_LENGTH, createSecret } from "@/lib/game";

type SecretStore = {
  secret: number[];
  listeners: Set<() => void>;
};

let clientStore: SecretStore | null = null;
const SERVER_SECRET: number[] = [];

function getClientStore() {
  if (!clientStore) {
    clientStore = {
      secret: createSecret(),
      listeners: new Set(),
    };
  }
  return clientStore;
}

function subscribe(onStoreChange: () => void) {
  const store = getClientStore();
  store.listeners.add(onStoreChange);
  return () => {
    store.listeners.delete(onStoreChange);
  };
}

function getSnapshot() {
  return getClientStore().secret;
}

function getServerSnapshot() {
  return SERVER_SECRET;
}

export function useGameSecret() {
  const secret = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const resetSecret = useCallback(() => {
    const store = getClientStore();
    store.secret = createSecret();
    store.listeners.forEach((listener) => listener());
  }, []);

  return {
    secret,
    resetSecret,
    ready: secret.length === CODE_LENGTH,
  };
}
