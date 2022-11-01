import React, { Dispatch, SetStateAction } from 'react';
import Modal from "../Modal/Modal";
import ContactsModalBody from "./Body";
import ContactsModalFooter from "./Footer";

interface Props {
    showModalB: boolean,
    onlyEven: boolean,
    onClose: () => void
    onUsContactsClick: () => void,
    onAllContactsClick: () => void,
    onOnlyEvenClick: Dispatch<SetStateAction<boolean>>,
}

const ModalB = (props: Props) => {
    const {
        showModalB,
        onlyEven,
        onClose,
        onUsContactsClick,
        onAllContactsClick,
        onOnlyEvenClick
    } = props;

    return (
        <Modal
            isOpen={showModalB}
            onClose={onClose}
            title={'Modal B - US'}
        >
            <Modal.Body>
                <ContactsModalBody
                    country={'us'}
                    onlyEven={onlyEven}
                />
            </Modal.Body>
            <Modal.Footer>
                <ContactsModalFooter
                    onClose={onClose}
                    onUsContactsClick={onUsContactsClick}
                    onAllContactsClick={onAllContactsClick}
                    onCheckboxPress={() => onOnlyEvenClick(prevState => !prevState)}
                    onlyEven={onlyEven}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default ModalB;
