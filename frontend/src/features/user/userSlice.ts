import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { RootState } from '../../app/store'
import IAddress from '../../interfaces/addressInterface'
import { IFormInput as IUserFormInput } from '../../screens/ProfileScreen'

export interface IUserInfo {
  _id: string
  name: string
  image: string
  address: IAddress
  email: string
  token: string
}

export interface IUserState {
  userInfo?: IUserInfo
  loading: boolean
  error: string | null
  successLogin: boolean
  successUpdate: boolean
  successCreate: boolean
  successDelete: boolean
}

interface IUserLoginData {
  email: string
  password: string
}

const initialState: IUserState = {
  loading: false,
  error: null,
  successLogin: false,
  successUpdate: false,
  successCreate: false,
  successDelete: false,
  userInfo: {
    _id: '61f5c55a8b500566a94331ae',
    name: 'John Doe',
    image: '/assets/images/image-avatar.jpg',
    address: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    email: 'johndoe@mail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjVjNTVhOGI1MDA1NjZhOTQzMzFhZSIsImlhdCI6MTY1NzQ3ODA0NywiZXhwIjoxNjYwMDcwMDQ3fQ.EACEpJaPRd9RoeaFOt3o-5ytlSJ_ajSKW5Z0Jnetmc4',
  },
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updatedUser: IUserFormInput, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: IUserState }
      const { userInfo } = user as { userInfo: IUserInfo }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        '/api/users/profile',
        updatedUser,
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

export const createUser = createAsyncThunk(
  'user/createUser',
  async (createdUser: IUserFormInput, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post('/api/users', createdUser, config)
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

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: IUserState }
      const { userInfo } = user as { userInfo: IUserInfo }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.delete(`/api/users/${userInfo._id}`, config)
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
  reducers: {
    clearUser: () => {
      localStorage.removeItem('user')
      return {
        loading: false,
        error: null,
        successLogin: false,
        successUpdate: false,
        successCreate: false,
        successDelete: false,
      }
    },
    clearUserError: (state) => {
      state.error = null
    },
    userUpdateReset: (state) => {
      state.successUpdate = false
    },
    userLoginReset: (state) => {
      state.successLogin = false
    },
    userCreateReset: (state) => {
      state.successCreate = false
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
        state.successLogin = true
        state.error = null
        state.loading = false
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

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
        state.successUpdate = true
        state.loading = false
        localStorage.setItem('user', JSON.stringify(state))
      })
      .addCase(updateUser.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
        state.loading = false
      })

      // CREATE USER
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
        state.successCreate = true
        state.loading = false
        localStorage.setItem('user', JSON.stringify(state))
      })
      .addCase(createUser.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
        state.loading = false
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.successDelete = true
        state.loading = false
      })
      .addCase(deleteUser.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
        state.loading = false
      })
  },
})

export const initialUserState = userSlice.getInitialState()
export const selectUser = (state: RootState) => state.user
export const {
  clearUser,
  clearUserError,
  userUpdateReset,
  userLoginReset,
  userCreateReset,
} = userSlice.actions

export default userSlice.reducer
