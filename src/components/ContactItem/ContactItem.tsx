import React, { useState } from 'react';
import styles from './ContactItem.module.scss';
import Modal from "../Modal/Modal";
import ContactModalBody from "../ContactModal/Body";

interface Props {
    id: number,
    name: string,
    phone: string,
    onClick: (id: number, name: string, phone: string) => void,
}

const ContactItem = (props: Props) => {
    const { id, name, phone, onClick } = props;

    return (
        <div
            className={styles.contactItem}
            onClick={() => onClick(id, name, phone)}
        >
            <div>
                <h4>{name}</h4>
                <p>Phone: {phone}</p>
            </div>
            <div
                className={styles.idBadge}
            >
                ID: {id}
            </div>
        </div>
    );
};

export default ContactItem;
