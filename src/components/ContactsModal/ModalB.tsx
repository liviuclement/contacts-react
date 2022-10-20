import React, { Dispatch, SetStateAction } from 'react';
import Modal from "../Modal/Modal";
import ContactsModalBody from "./Body";
import ContactsModalFooter from "./Footer";

interface Props {
    showModalB: boolean,
    onlyEven: boolean,
    closeClickHandler: () => void
    usContactsClickHandler: () => void,
    allContactsClickHandler: () => void,
    setOnlyEven: Dispatch<SetStateAction<boolean>>,
}

const ModalB = (props: Props) => {
    const {
        showModalB,
        onlyEven,
        closeClickHandler,
        usContactsClickHandler,
        allContactsClickHandler,
        setOnlyEven
    } = props;

    return (
        <Modal
            isOpen={showModalB}
            closeClickHandler={closeClickHandler}
            headerText={'Modal B - US'}
        >
            <Modal.Body>
                <ContactsModalBody
                    country={'us'}
                    onlyEven={onlyEven}
                />
            </Modal.Body>
            <Modal.Footer>
                <ContactsModalFooter
                    closeClickHandler={closeClickHandler}
                    usContactsClickHandler={usContactsClickHandler}
                    allContactsClickHandler={allContactsClickHandler}
                    onCheckboxPressHandler={() => setOnlyEven(prevState => !prevState)}
                    onlyEven={onlyEven}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default ModalB;
