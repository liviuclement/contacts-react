import React from 'react';
import styles from './ContactItem.module.scss';

interface Props {
    id: number,
    name: string,
    phone: string,
}

const ContactItem = (props: Props) => {
    const { id, name, phone } = props;
    return (
        <div
            className={styles.contactItem}
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
