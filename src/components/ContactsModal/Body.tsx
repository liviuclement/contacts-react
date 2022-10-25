import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Body.module.scss';
import ContactList from '../ContactList/ContactList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getContacts } from '../../store/features/contacts/contactsSlice';

interface Props {
  country: '' | 'us';
  onlyEven: boolean;
}

const ContactsModalBody = (props: Props) => {
  const { country, onlyEven } = props;

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const inputTimeoutRef = useRef<any>(null);
  const firstRenderRef = useRef<boolean>(true);
  const delayRef = useRef<number>(0);

  const dispatch = useAppDispatch();
  const { status, contacts, count } = useAppSelector((state) => state.contacts);

  const isLoading = status === 'loading';

  const searchHandler = useCallback(() => {
    setCurrentPage(1);
    dispatch(
      getContacts({
        country,
        query: searchValue,
        page: 1,
        onlyEven: onlyEven ? 1 : 0,
      })
    );
    inputTimeoutRef.current = null;
  }, [searchValue, onlyEven, country, dispatch]);

  const loadMoreHandler = useCallback(() => {
    setCurrentPage((prevState) => prevState + 1);
    dispatch(
      getContacts({
        country,
        query: searchValue,
        page: currentPage + 1,
        onlyEven: onlyEven ? 1 : 0,
      })
    );
  }, [country, currentPage, dispatch, onlyEven, searchValue]);

  useEffect(() => {
    if (firstRenderRef.current === true) {
      firstRenderRef.current = false;
      return;
    }
    delayRef.current = 1000;
  }, [searchValue]);

  useEffect(() => {
    inputTimeoutRef.current = setTimeout(searchHandler, delayRef.current);

    if (delayRef.current > 0) {
      delayRef.current = 0;
    }

    return () => clearTimeout(inputTimeoutRef.current);
  }, [searchValue, searchHandler]);

  return (
    <div className={styles.body}>
      <div className={styles.inputContainer}>
        <input
          type='text'
          placeholder='Search contacts'
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <button onClick={searchHandler}>Search</button>
      </div>
      <ContactList contacts={contacts} isLoading={isLoading} onLoadMore={loadMoreHandler} />
    </div>
  );
};

export default ContactsModalBody;
