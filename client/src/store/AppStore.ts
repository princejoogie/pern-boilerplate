import React from "react";
import { makeAutoObservable } from "mobx";
import {
  makePersistable,
  clearPersistedStore,
  isHydrated,
  isPersisting,
} from "mobx-persist-store";
import { TProfile } from "../models/User";

export type AppStoreType = {
  accessToken: string;
};

export class AppStore {
  accessToken = "";
  profile: TProfile | null = null;

  constructor() {
    makeAutoObservable(this);

    makePersistable(
      this,
      {
        name: "AppStore",
        properties: ["accessToken", "profile"],
        storage: window.localStorage,
        stringify: true,
        debugMode: false,
      },
      {
        delay: 0,
      }
    );
  }

  get isHydrated(): boolean {
    return isHydrated(this);
  }

  get isPersisting(): boolean {
    return isPersisting(this);
  }

  async clearPersistedData(): Promise<void> {
    await clearPersistedStore(this);
  }

  async setProfile(profile: TProfile): Promise<void> {
    this.profile = profile;
  }

  async setAccessToken(accessToken: string): Promise<void> {
    this.accessToken = accessToken;
  }
}

export const appStore = new AppStore();
export const AppStoreContext = React.createContext(appStore);
export const useAppStore = (): AppStore => React.useContext(AppStoreContext);
