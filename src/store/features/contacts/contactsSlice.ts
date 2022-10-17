import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../../../env";
import { Contact } from "../../../types";

export const getContacts = createAsyncThunk('contacts/fetchContacts', async (args: { country: string, query: string, page: number, onlyEven: number }, { rejectWithValue }) => {
        const { country, query, page, onlyEven } = args;

        try {
            const result = await axios.get<GetContactsResult>(`${API_URL}/contacts?country=${country}&query=${query}&onlyEven=${onlyEven}&page=${page}`)

            return {
                data: result.data
            }
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)


interface GetContactsResult {
    contacts: Contact[],
    count: number,
    page: number
    next: boolean,
}

interface Contacts {
    data: {
        contacts: Contact[],
        count: number,
        page: number,
        next: boolean,
    },
    status: string,
    error: string,

}

const initialState: Contacts = {
    data: {
        contacts: [],
        count: 0,
        page: 0,
        next: false,
    },
    status: 'idle',
    error: '',
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getContacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                const { data } = action.payload;

                if (data.page > 1) {
                    state.data = {
                        ...data,
                        contacts: [...state.data.contacts, ...data.contacts]
                    }
                } else {
                    state.data = {
                        ...data,
                        contacts: [...data.contacts]
                    }
                }

                state.status = 'succeeded';
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    }
})

export default contactsSlice.reducer;
