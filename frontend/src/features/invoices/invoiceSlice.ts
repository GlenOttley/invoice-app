import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import type { RootState } from '../../app/store'
import IInvoice from '../../interfaces/invoiceInterface'
import { IUserState, IUserInfo } from '../user/userSlice'

interface IInvoiceState {
  invoice: IInvoice
  loading: boolean
  error: string | null
}

const initialState: IInvoiceState = {
  invoice: {} as IInvoice,
  loading: true,
  error: null,
}

export const getInvoice = createAsyncThunk(
  'invoices/getInvoiceDetails',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: IUserState }
      const { userInfo } = user as { userInfo: IUserInfo }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/invoices/${id}`, config)
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

export const updateInvoice = createAsyncThunk(
  'invoices/updateInvoice',
  async (invoice: IInvoice, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: IUserState }
      const { userInfo } = user as { userInfo: IUserInfo }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/invoices/${invoice._id}`,
        invoice,
        config
      )
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

export const deleteInvoice = createAsyncThunk(
  'invoices/deleteInvoice',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: IUserState }
      const { userInfo } = user as { userInfo: IUserInfo }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.delete(`/api/invoices/${id}`, config)
    } catch (err: any) {
      let error: AxiosError<any> = err
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET INVOICE
      .addCase(getInvoice.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.invoice = action.payload
        localStorage.setItem('invoice', JSON.stringify(state))
        state.loading = false
      })
      .addCase(getInvoice.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
        state.loading = false
        state.invoice = {} as IInvoice
      })
      // UPDATE INVOICE
      .addCase(updateInvoice.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.invoice = action.payload
        localStorage.setItem('invoice', JSON.stringify(state))
        state.loading = false
      })
      .addCase(updateInvoice.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
        state.loading = false
      })
      // DELETE INVOICE
      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteInvoice.fulfilled, (state) => {
        state.invoice = {} as IInvoice
        localStorage.removeItem('invoice')
        state.loading = true
      })
      .addCase(deleteInvoice.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
        state.loading = false
      })
  },
})

export const initialInvoiceState = invoiceSlice.getInitialState()
export const selectInvoice = (state: RootState) => state.invoice
export default invoiceSlice.reducer
