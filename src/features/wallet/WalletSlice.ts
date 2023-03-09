import Web3 from "web3";
import { TransactionConfig } from "web3-core/types/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const web3 = new Web3(process.env.REACT_APP_WEB3_URL as string);

export interface AuthState {
  accounts: string[];
  loading: boolean;
}

const initialState: AuthState = {
  accounts: [],
  loading: false,
};

export const loadAccounts = createAsyncThunk(
  "wallet/loadAccounts",
  async (params, { rejectWithValue }) => {
    try {
      const accounts = await web3.eth.getAccounts();
      return accounts;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const sendTransaction = createAsyncThunk(
  "wallet/sendTransaction",
  async (config: TransactionConfig, { rejectWithValue }) => {
    try {
      const hash = await web3.eth.sendTransaction(config);
      return hash;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadAccounts.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.accounts = action.payload;
        }
      )
      .addCase(loadAccounts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const getAccounts = (state: RootState) => state.wallet.accounts;

export default walletSlice.reducer;
