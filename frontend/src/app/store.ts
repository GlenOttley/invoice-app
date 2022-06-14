import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import invoicesReducer, {
  initialInvoicesState,
} from '../features/invoices/invoicesSlice'
import userReducer, { initialUserState } from '../features/user/userSlice'
import filtersReducer from '../features/filters/filtersSlice'

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') || '')
  : initialUserState

const invoicesFromStorage = localStorage.getItem('invoices')
  ? JSON.parse(localStorage.getItem('invoices') || '')
  : initialInvoicesState

const initialState = {
  user: userFromStorage,
  invoices: invoicesFromStorage,
}

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    user: userReducer,
    filters: filtersReducer,
  },
  preloadedState: initialState,
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
