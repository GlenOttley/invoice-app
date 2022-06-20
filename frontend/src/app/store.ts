import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import invoicesReducer, {
  initialInvoicesState,
} from '../features/invoices/invoicesSlice'
import invoiceReducer, {
  initialInvoiceState,
} from '../features/invoices/invoiceSlice'
import userReducer, { initialUserState } from '../features/user/userSlice'
import filtersReducer from '../features/filters/filtersSlice'

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') || '')
  : initialUserState

const invoicesFromStorage = localStorage.getItem('invoices')
  ? JSON.parse(localStorage.getItem('invoices') || '')
  : initialInvoicesState

const invoiceFromStorage = localStorage.getItem('invoice')
  ? JSON.parse(localStorage.getItem('invoice') || '')
  : initialInvoiceState

const initialState = {
  user: userFromStorage,
  invoices: invoicesFromStorage,
  invoice: invoiceFromStorage,
}

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    invoice: invoiceReducer,
    user: userReducer,
    filters: filtersReducer,
  },
  preloadedState: initialState,
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
