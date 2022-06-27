import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import type { RootState } from '../../app/store'
import IInvoice from '../../interfaces/invoiceInterface'
import { IUserInfo, IUserState } from '../user/userSlice'

interface InvoicesState {
  invoices: IInvoice[]
  loading: boolean
  error: string | null
}

const initialState: InvoicesState = {
  invoices: [],
  loading: false,
  error: null,
}

export const getInvoices = createAsyncThunk(
  'invoices/getInvoices',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: IUserState }
      const { userInfo } = user as { userInfo: IUserInfo }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get('/api/invoices/myinvoices', config)
      return data
    } catch (err: any) {
      let error: AxiosError<any> = err
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    clearInvoices: () => {
      localStorage.removeItem('invoices')
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state) => {
        state.loading = true
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.loading = false
        state.invoices = action.payload
        state.error = null
        localStorage.setItem('invoices', JSON.stringify(state))
      })
      .addCase(getInvoices.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
        state.loading = false
        state.invoices = []
      })
  },
})

export const initialInvoicesState = invoicesSlice.getInitialState()
export const selectInvoices = (state: RootState) => state.invoices
export const { clearInvoices } = invoicesSlice.actions

export default invoicesSlice.reducer
