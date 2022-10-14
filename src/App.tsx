import React, { useState } from 'react';
import styles from './App.module.scss';
import Modal from "./components/Modal/Modal";
import ContactsModalBody from "./components/ContactsModal/Body";
import ContactsModalFooter from "./components/ContactsModal/Footer";
import CustomButton from "./components/Button/Button";

function App() {
    const [showModalA, setShowModalA] = useState(true);
    const [showModalB, setShowModalB] = useState(false);
    const [onlyEven, setOnlyEven] = useState(false);

    console.log({ onlyEven  })

    return (
        <div className={styles.app}>
            <div className={styles.btnContainer}>
                <CustomButton
                    onClick={() => setShowModalA(true)}
                    variant={'purple'}
                    style={{
                        marginRight: 10
                    }}
                >
                    Button A
                </CustomButton>
                <CustomButton
                    onClick={() => setShowModalB(true)}
                    variant={'orange'}
                >
                    Button B
                </CustomButton>
            </div>
            {showModalA &&
				<Modal
					headerText={'Modal A - All Countries'}
					closeClickHandler={() => setShowModalA(false)}
					bodyComponent={
                        <ContactsModalBody

                        />
                    }
					footerComponent={
                        <ContactsModalFooter
                            closeClickHandler={() => {
                                setShowModalA(false)
                                
                            }}
                            usContactsClickHandler={() => {
                                setShowModalB(true)
                                setShowModalA(false)
                            }}
                            allContactsClickHandler={() => {
                                setShowModalA(true)
                                setShowModalB(false)
                            }}
                            onCheckboxPressHandler={() => setOnlyEven(prevState => !prevState)}
                            onlyEven={onlyEven}
                        />
                    }
				/>
            }
            {showModalB &&
				<Modal
					closeClickHandler={() => setShowModalB(false)}
					headerText={'Modal B - US'}
					bodyComponent={<ContactsModalBody/>}
					footerComponent={
                        <ContactsModalFooter
                            closeClickHandler={() => setShowModalB(false)}
                            usContactsClickHandler={() => {
                                setShowModalB(true)
                                setShowModalA(false)
                            }}
                            allContactsClickHandler={() => {
                                setShowModalA(true)
                                setShowModalB(false)
                            }}
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
