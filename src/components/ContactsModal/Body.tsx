import React, { useState } from 'react';
import styles from './Body.module.scss';
import ContactList from "../ContactList/ContactList";

const ContactsModalBody = () => {
    const [query, setQuery] = useState('');
    const [country, setCountry] = useState('');

    return (
        <div className={styles.body}>
            <div className={styles.inputContainer}>
                <input
                    type='text'
                    placeholder='Search contacts'
                />
                <button>
                    Search
                </button>
            </div>
            <ContactList/>
        </div>
    );
};

export default ContactsModalBody;
