import React, { useState } from 'react';
import styles from './ContactItem.module.scss';
import Modal from "../Modal/Modal";
import ContactModalBody from "../ContactModal/Body";

interface Props {
    id: number,
    name: string,
    phone: string,
}

const ContactItem = (props: Props) => {
    const { id, name, phone } = props;
    const [showItemModal, setShowItemModal] = useState(false);

    return (
        <div
            className={styles.contactItem}
            onClick={() => setShowItemModal(true)}
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
            {showItemModal &&
				<Modal
                    variant={'small'}
					closeClickHandler={() => setShowItemModal(false)}
					headerText={'Contact Info'}
					bodyComponent={<ContactModalBody
                        id={id}
                        fullName={name}
                        phoneNumber={phone}
                    />}
				/>
            }
        </div>
    );
};

export default ContactItem;
