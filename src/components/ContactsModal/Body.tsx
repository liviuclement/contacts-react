import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './Body.module.scss';
import ContactList from "../ContactList/ContactList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getContacts } from "../../store/features/contacts/contactsSlice";

interface Props {
    country: '' | 'us',
    onlyEven: boolean,
}

const ContactsModalBody = (props: Props) => {
    const { country, onlyEven } = props;
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [inputTimeout, setInputTimeout] = useState<any>(null);
    const dispatch = useAppDispatch();
    const { status, data } = useAppSelector(state => state.contacts);
    const { contacts, next } = data;
    const listRef = useRef<any>(null);
    const firstRender = useRef(true);
    const isLoading = status === 'loading';

    useEffect(() => {
        if ((page > 1 && !next) || isLoading) return;

        dispatch(getContacts({ country, query, page, onlyEven: onlyEven ? 1 : 0 }))
    }, [page])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        getContactsByFilters(query, 1)
    }, [onlyEven])

    useEffect(() => {
        if (!listRef.current) {
            return;
        }

        listRef.current.addEventListener('scroll', scrollCallback);

        return () => window.removeEventListener('scroll', scrollCallback)
    }, [])


    const scrollCallback = () => {
        const scrollHeight = listRef.current.scrollHeight;
        const scrollTop = listRef.current.scrollTop;
        const clientHeight = listRef.current.clientHeight;

        if (scrollTop === (scrollHeight - clientHeight)) {
            setPage(prevPage => prevPage + 1);
        }
    }

    const getContactsByFilters = (queryArg: string, pageArg: number) => {
        if (page === 1) {
            dispatch(getContacts({ country, query: queryArg, page: pageArg, onlyEven: onlyEven ? 1 : 0 }))
        } else {
            setPage(1);
        }
    }

    const queryChangeHandler = (event: ChangeEvent<any>, auto: boolean = true) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }

        if (auto) {
            const timeout = setTimeout(() => {
                getContactsByFilters(event.target.value, 1)
            }, 250);

            setQuery(event.target.value);
            setInputTimeout(timeout);
        } else {
            getContactsByFilters(query, 1)
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.inputContainer}>
                <input
                    type='text'
                    placeholder='Search contacts'
                    onChange={queryChangeHandler}
                    value={query}
                />
                <button
                    onClick={(e) => queryChangeHandler(e, false)}
                >
                    Search
                </button>
            </div>
            <ContactList
                ref={listRef}
                contacts={contacts}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ContactsModalBody;
