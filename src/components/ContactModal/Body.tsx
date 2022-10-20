import React from 'react';
import styles from './Body.module.scss';

interface ContactDetails {
    id: number,
    name: string,
    phone: string,
}

interface Props {
    selectedContact: ContactDetails
}

const ContactModalBody = (props: Props) => {
    const { selectedContact } = props;
    const { id, name, phone } = selectedContact;

    return (
        <div
            className={styles.container}
        >
            <div className={styles.item}>
                <h4>ID</h4>
                <p>{id}</p>
            </div>
            <div className={styles.item}>
                <h4>Full Name</h4>
                <p>{name}</p>
            </div>
            <div className={styles.item}>
                <h4>Phone Number</h4>
                <p>{phone}</p>
            </div>
        </div>
    );
};

export default ContactModalBody;
