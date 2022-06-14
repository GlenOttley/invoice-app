import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { RootState } from '../../app/store'

export interface IUserInfo {
  _id: string
  name: string
  image: string
  token: string
}

export interface IUserState {
  userInfo?: IUserInfo
  loading: boolean
  error: string | null
}

interface IUserLoginData {
  email: string
  password: string
}

const initialState: IUserState = {
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userLoginData: IUserLoginData, { rejectWithValue }) => {
    const { email, password } = userLoginData

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        state.error = null
        localStorage.setItem('user', JSON.stringify(state))
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
        state.loading = false
      })
  },
})

export const initialUserState = userSlice.getInitialState()
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
