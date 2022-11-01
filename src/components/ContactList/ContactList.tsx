import React, { ForwardedRef, forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './ContactList.module.scss';
import ContactItem from "../ContactItem/ContactItem";
import { Contact } from "../../types";
import Modal from "../Modal/Modal";
import ContactModalBody from "../ContactModal/Body";

interface Props {
    contacts: Contact[],
    isLoading: boolean,
    onLoadMore: () => void,
}

const ContactList = (props: Props) => {
    const { contacts, isLoading, onLoadMore } = props;
    const [showContactModal, setShowContactModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState<any>();
    const listRef = useRef<any>(null);

    const scrollCallback = useCallback(() => {
        const scrollHeight = listRef.current.scrollHeight;
        const scrollTop = listRef.current.scrollTop;
        const clientHeight = listRef.current.clientHeight;

        if (scrollTop === (scrollHeight - clientHeight)) {
            onLoadMore();
        }
    }, [onLoadMore])

    useLayoutEffect(() => {
        listRef.current.addEventListener('scroll', scrollCallback);

        return () => {
            listRef.current.removeEventListener('scroll', scrollCallback)
        }
    }, [scrollCallback])

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
            onClick={() => itemClickHandler(contact.id, `${contact.first_name} ${contact.last_name}`, contact.phone)}
        />
    ));

    return (
        <>
            <div
                className={styles.contactList}
                ref={listRef}
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
                onClose={() => setShowContactModal(false)}
                title={'Contact Info'}
            >
                <Modal.Body>
                    <ContactModalBody selectedContact={selectedContact}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ContactList;
