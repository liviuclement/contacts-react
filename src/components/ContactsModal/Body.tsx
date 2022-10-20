import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
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
    const [queryInput, setQueryInput] = useState('');
    const [page, setPage] = useState(1);
    const [inputTimeout, setInputTimeout] = useState<any>(null);
    const dispatch = useAppDispatch();
    const { status, contacts, count } = useAppSelector(state => state.contacts);
    const listRef = useRef<any>(null);
    const prevPageRef = useRef(0);
    const isLoading = status === 'loading';

    useEffect(() => {
        const hasPageChanged = prevPageRef.current !== page;
        dispatch(getContacts({ country, query, page: hasPageChanged ? page : 1, onlyEven: onlyEven ? 1 : 0 }))
    }, [country, query, page, onlyEven])

    useEffect(() => {
        listRef.current.addEventListener('scroll', scrollCallback);

        return () => window.removeEventListener('scroll', scrollCallback)
    }, [setPage, count])

    const scrollCallback = useCallback(() => {
        const scrollHeight = listRef.current.scrollHeight;
        const scrollTop = listRef.current.scrollTop;
        const clientHeight = listRef.current.clientHeight;

        if (scrollTop === (scrollHeight - clientHeight)) {
            setPage(prevPage => {
                //check if current page is last
                if (prevPage * 10 < count) {
                    prevPageRef.current = prevPage;
                    return prevPage + 1;
                }

                return prevPage;
            });
        }
    },[count])

    const setQueryHandler = (query: string) => {
        setQuery(query);
        setPage(1);
    }

    const queryChangeHandler = (event: ChangeEvent<any>, auto: boolean = true) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }

        if (auto) {
            const timeout = setTimeout(() => {
                setQueryHandler(event.target.value)
            }, 250);

            setInputTimeout(timeout);
        } else {
            setQueryHandler(event.target.value)
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
                ref={listRef}
                contacts={contacts}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ContactsModalBody;
