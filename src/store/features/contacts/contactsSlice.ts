import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../../../env";
import { Contact } from "../../../types";

interface GetContactsArgs {
    country: string,
    query: string,
    page: number,
    onlyEven: number
}

export const getContacts = createAsyncThunk('contacts/fetchContacts', async (args: GetContactsArgs) => {
        const { country, query, page, onlyEven } = args;
        const result = await axios.get<GetContactsResult>(`${API_URL}/contacts?country=${country}&query=${query}&onlyEven=${onlyEven}&page=${page}`)

        return result.data;
    }
)

interface GetContactsResult {
    contacts: Contact[],
    count: number,
    page: number
    next: boolean,
}

interface ContactsState {
    contacts: Contact[],
    count: number,
    page: number,
    next: boolean,
    status: string,
    error: string,

}

const initialState: ContactsState = {
    contacts: [],
    count: 0,
    page: 0,
    next: false,
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
                const { contacts, count, page, next } = action.payload;

                if (page > 1) {
                    state.contacts = [...state.contacts, ...contacts];
                } else {
                    state.contacts = [...contacts];
                }

                state.count = count;
                state.page = page;
                state.next = next;
                state.status = 'succeeded';
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    }
})

export default contactsSlice.reducer;
