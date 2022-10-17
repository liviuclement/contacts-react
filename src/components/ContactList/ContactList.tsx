import React, { ForwardedRef, forwardRef, useState } from 'react';
import styles from './ContactList.module.scss';
import ContactItem from "../ContactItem/ContactItem";
import { Contact } from "../../types";
import Modal from "../Modal/Modal";
import ContactModalBody from "../ContactModal/Body";

interface Props {
    contacts: Contact[],
    isLoading: boolean,
}

const ContactList = forwardRef((props: Props, ref: ForwardedRef<any>) => {
    const { contacts, isLoading } = props;

    const mapContacts = () => contacts.map(contact => (
        <ContactItem
            key={contact.id}
            id={contact.id}
            name={`${contact.first_name} ${contact.last_name}`}
            phone={contact.phone}
        />
    ));

    return (
        <div
            className={styles.contactList}
            ref={ref}
        >
            {mapContacts()}
            {isLoading &&
				<p className={styles.warningText}>Loading...</p>
            }
            {!isLoading && !contacts.length &&
				<p className={styles.warningText}>No results found.</p>
            }
        </div>
    );
});

export default ContactList;
