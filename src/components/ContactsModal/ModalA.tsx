import React, { Dispatch, SetStateAction } from 'react';
import Modal from "../Modal/Modal";
import ContactsModalBody from "./Body";
import ContactsModalFooter from "./Footer";

interface Props {
    showModalA: boolean,
    onlyEven: boolean,
    onClose: () => void
    onUsContactsClick: () => void,
    onAllContactsClick: () => void,
    onOnlyEvenClick: Dispatch<SetStateAction<boolean>>,
}

const ModalA = (props: Props) => {
    const {
        showModalA,
        onlyEven,
        onClose,
        onUsContactsClick,
        onAllContactsClick,
        onOnlyEvenClick
    } = props;

    return (
        <Modal
            isOpen={showModalA}
            title={'Modal A - All Countries'}
            onClose={onClose}
        >
            <Modal.Body>
                <ContactsModalBody
                    country={''}
                    onlyEven={onlyEven}
                />
            </Modal.Body>
            <Modal.Footer>
                <ContactsModalFooter
                    onClose={onClose}
                    onUsContactsClick={onUsContactsClick}
                    onAllContactsClick={onAllContactsClick}
                    onCheckboxPress={() => onOnlyEvenClick((prevState: boolean) => !prevState)}
                    onlyEven={onlyEven}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default ModalA;
