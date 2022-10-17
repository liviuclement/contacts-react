import React from 'react';
import styles from './Body.module.scss';

interface Props {
    id: number,
    fullName: string,
    phoneNumber: string,
}

const ContactModalBody = (props: Props) => {
    const { id, fullName, phoneNumber } = props;

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
                <p>{fullName}</p>
            </div>
            <div className={styles.item}>
                <h4>Phone Number</h4>
                <p>{phoneNumber}</p>
            </div>
        </div>
    );
};

export default ContactModalBody;
