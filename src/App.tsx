import React, { useState } from 'react';
import styles from './App.module.scss';
import Modal from "./components/Modal/Modal";
import ContactsModalBody from "./components/ContactsModal/Body";
import ContactsModalFooter from "./components/ContactsModal/Footer";
import CustomButton from "./components/Button/Button";

function App() {
    const [showModalA, setShowModalA] = useState(window.location.hash === '#ModalA');
    const [showModalB, setShowModalB] = useState(window.location.hash === '#ModalB');
    const [onlyEven, setOnlyEven] = useState(false);

    const openModalAHandler = () => {
        setShowModalA(true);
        window.location.hash = '#ModalA';
    }

    const openModalBHandler = () => {
        setShowModalB(true);
        window.location.hash = '#ModalB';
    }

    const closeModalAHandler = () => {
        setShowModalA(false)
        window.location.hash = '';
    }

    const closeModalBHandler = () => {
        setShowModalB(false)
        window.location.hash = '';
    }

    const allContactsClickHandler = () => {
        if (showModalA) return;

        closeModalBHandler();
        openModalAHandler();
    }

    const usContactsClickHandler = () => {
        if (showModalB) return;

        closeModalAHandler();
        openModalBHandler();
    }

    return (
        <div className={styles.app}>
            <div className={styles.btnContainer}>
                <CustomButton
                    onClick={openModalAHandler}
                    variant={'purple'}
                    style={{
                        marginRight: 10
                    }}
                >
                    Button A
                </CustomButton>
                <CustomButton
                    onClick={openModalBHandler}
                    variant={'orange'}
                >
                    Button B
                </CustomButton>
            </div>
            {showModalA &&
				<Modal
					headerText={'Modal A - All Countries'}
					closeClickHandler={closeModalAHandler}
					bodyComponent={
                        <ContactsModalBody
                            country={''}
                            onlyEven={onlyEven}
                        />
                    }
					footerComponent={
                        <ContactsModalFooter
                            closeClickHandler={closeModalAHandler}
                            usContactsClickHandler={usContactsClickHandler}
                            allContactsClickHandler={allContactsClickHandler}
                            onCheckboxPressHandler={() => setOnlyEven(prevState => !prevState)}
                            onlyEven={onlyEven}
                        />
                    }
				/>
            }
            {showModalB &&
				<Modal
					closeClickHandler={closeModalBHandler}
					headerText={'Modal B - US'}
					bodyComponent={
                        <ContactsModalBody
                            country={'us'}
                            onlyEven={onlyEven}
                        />
                    }
					footerComponent={
                        <ContactsModalFooter
                            closeClickHandler={closeModalBHandler}
                            usContactsClickHandler={usContactsClickHandler}
                            allContactsClickHandler={allContactsClickHandler}
                            onCheckboxPressHandler={() => setOnlyEven(prevState => !prevState)}
                            onlyEven={onlyEven}
                        />
                    }
				/>
            }
        </div>
    );
}

export default App;
