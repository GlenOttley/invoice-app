import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { selectInvoices } from '../invoices/invoicesSlice'

export type Status = 'paid' | 'pending' | 'draft'

interface IFilterState {
  status: Status[]
}

const initialState: IFilterState = {
  status: [],
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status.includes(action.payload)
        ? (state.status = state.status.filter(
            (item) => item !== action.payload
          ))
        : state.status.push(action.payload)
    },
  },
  extraReducers: {},
})

export const selectFilters = (state: RootState) => state.filters
export const { setStatus } = filtersSlice.actions

export default filtersSlice.reducer

export const selectStatus = createSelector(
  [selectFilters],
  (filters) => filters.status
)

export const selectFilteredInvoices = createSelector(
  [selectInvoices, selectStatus],
  (invoices, status) => {
    return Object.values(invoices.invoices).filter((invoice) => {
      if (status.length) {
        if (status.includes(invoice.status)) {
          return invoice
        }
      } else {
        return invoice
      }
    })
  }
)
