import React, { Dispatch, SetStateAction } from 'react';
import Modal from "../Modal/Modal";
import ContactsModalBody from "./Body";
import ContactsModalFooter from "./Footer";

interface Props {
    showModalA: boolean,
    onlyEven: boolean,
    closeClickHandler: () => void
    usContactsClickHandler: () => void,
    allContactsClickHandler: () => void,
    setOnlyEven: Dispatch<SetStateAction<boolean>>,
}

const ModalA = (props: Props) => {
    const {
        showModalA,
        onlyEven,
        closeClickHandler,
        usContactsClickHandler,
        allContactsClickHandler,
        setOnlyEven
    } = props;

    return (
        <Modal
            isOpen={showModalA}
            headerText={'Modal A - All Countries'}
            closeClickHandler={closeClickHandler}
        >
            <Modal.Body>
                <ContactsModalBody
                    country={''}
                    onlyEven={onlyEven}
                />
            </Modal.Body>
            <Modal.Footer>
                <ContactsModalFooter
                    closeClickHandler={closeClickHandler}
                    usContactsClickHandler={usContactsClickHandler}
                    allContactsClickHandler={allContactsClickHandler}
                    onCheckboxPressHandler={() => setOnlyEven((prevState: boolean) => !prevState)}
                    onlyEven={onlyEven}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default ModalA;
