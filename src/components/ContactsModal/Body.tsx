import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Body.module.scss';
import ContactList from "../ContactList/ContactList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getContacts, getMoreContacts } from "../../store/features/contacts/contactsSlice";

interface Props {
    country: '' | 'us',
    onlyEven: boolean,
}

const ContactsModalBody = (props: Props) => {
    const { country, onlyEven } = props;
    const [query, setQuery] = useState('');
    const [queryInput, setQueryInput] = useState('');
    const [page, setPage] = useState(1);
    const [inputTimeout, setInputTimeout] = useState<any>(null);
    const dispatch = useAppDispatch();
    const { status, contacts, count } = useAppSelector(state => state.contacts);
    const isLoading = status === 'loading';

    useEffect(() => {
        dispatch(getContacts({ country, query, page: 1, onlyEven: onlyEven ? 1 : 0 }))
        setPage(1)
    }, [country, query, onlyEven])

    const onScroll = useCallback(() => {
        if (page * 10 < count && !isLoading) {
            dispatch(getMoreContacts({ country, query, page: page + 1, onlyEven: onlyEven ? 1 : 0 }))
            setPage(prevPage => prevPage + 1);
        }
    }, [country, query, page, count, onlyEven, isLoading]);

    const queryChangeHandler = (event: ChangeEvent<any>, auto: boolean = true) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }

        if (auto) {
            const timeout = setTimeout(() => {
                setQuery(event.target.value)
            }, 250);

            setInputTimeout(timeout);
        } else {
            setQuery(event.target.value)
        }
        setQueryInput(event.target.value)
    }

    return (
        <div className={styles.body}>
            <div className={styles.inputContainer}>
                <input
                    type='text'
                    placeholder='Search contacts'
                    onChange={queryChangeHandler}
                    value={queryInput}
                />
                <button
                    onClick={(e) => queryChangeHandler(e, false)}
                >
                    Search
                </button>
            </div>
            <ContactList
                onScroll={onScroll}
                contacts={contacts}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ContactsModalBody;
