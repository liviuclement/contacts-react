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
    const [showContactModal, setShowContactModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState<any>();

    const itemClickHandler = (id: number, name: string, phone: string) => {
        setShowContactModal(true);
        setSelectedContact({
            id, name, phone
        })
    }

    const mapContacts = () => contacts.map(contact => (
        <ContactItem
            key={contact.id}
            id={contact.id}
            name={`${contact.first_name} ${contact.last_name}`}
            phone={contact.phone}
            onClick={itemClickHandler}
        />
    ));

    return (
        <>
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
            <Modal
                isOpen={showContactModal}
                variant={'small'}
                closeClickHandler={() => setShowContactModal(false)}
                headerText={'Contact Info'}
            >
                <Modal.Body>
                    <ContactModalBody selectedContact={selectedContact}/>
                </Modal.Body>
            </Modal>
        </>
    );
});

export default ContactList;
