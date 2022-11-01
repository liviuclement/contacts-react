import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import CustomButton from "./components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import ModalA from "./components/ContactsModal/ModalA";
import ModalB from "./components/ContactsModal/ModalB";

function App() {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const navigate = useNavigate();
    const { hash } = useLocation();
    const [onlyEven, setOnlyEven] = useState(false);

    useEffect(() => {
        setShowModalA(hash === '#ModalA');
        setShowModalB(hash === '#ModalB')
    }, [hash])

    const openModalAHandler = () => {
        navigate({ hash: '#ModalA' });
    }

    const openModalBHandler = () => {
        navigate({ hash: '#ModalB' });
    }

    const closeModalHandler = () => {
        navigate({ hash: '' });
    }

    const allContactsClickHandler = () => {
        if (showModalA) return;

        openModalAHandler();
    }

    const usContactsClickHandler = () => {
        if (showModalB) return;

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
            <ModalA
                showModalA={showModalA}
                onlyEven={onlyEven}
                onClose={closeModalHandler}
                onUsContactsClick={usContactsClickHandler}
                onAllContactsClick={allContactsClickHandler}
                onOnlyEvenClick={setOnlyEven}
            />
            <ModalB
                showModalB={showModalB}
                onlyEven={onlyEven}
                onClose={closeModalHandler}
                onUsContactsClick={usContactsClickHandler}
                onAllContactsClick={allContactsClickHandler}
                onOnlyEvenClick={setOnlyEven}
            />
        </div>
    );
}

export default App;
