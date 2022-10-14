import React from 'react';
import styles from './ContactList.module.scss';
import ContactItem from "../ContactItem/ContactItem";

const contacts = [
    {
        "id": 10,
        "first_name": "Lyn",
        "last_name": "Benazet",
        "phone": "434-993-7636",
        "country": "US"
    },
    {
        "id": 11,
        "first_name": "Tamra",
        "last_name": "Echallie",
        "phone": "959-839-8007",
        "country": "US"
    },
    {
        "id": 12,
        "first_name": "Yalonda",
        "last_name": "Pirrone",
        "phone": "904-944-5361",
        "country": "US"
    },
    {
        "id": 13,
        "first_name": "Melicent",
        "last_name": "Soreau",
        "phone": "201-946-2423",
        "country": "US"
    },
    {
        "id": 14,
        "first_name": "Roselin",
        "last_name": "Vanetti",
        "phone": "591-908-6313",
        "country": "US"
    },
    {
        "id": 15,
        "first_name": "Ramona",
        "last_name": "Chessum",
        "phone": "663-110-4813",
        "country": "US"
    },
    {
        "id": 16,
        "first_name": "Shara",
        "last_name": "Menco",
        "phone": "990-183-4895",
        "country": "US"
    }
];

const ContactList = () => {
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
        >
            {mapContacts()}
        </div>
    );
};

export default ContactList;
