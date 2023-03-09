import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import auth from "../features/auth/AuthSlice";
import wallet from "../features/wallet/WalletSlice";

export const store = configureStore({
  reducer: {
    auth,
    wallet,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
