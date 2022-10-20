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
        setShowModalA(true);
        navigate({ hash: '#ModalA' });
    }

    const openModalBHandler = () => {
        setShowModalB(true);
        navigate({ hash: '#ModalB' });
    }

    const closeModalAHandler = () => {
        setShowModalA(false)
        navigate({ hash: '' });
    }

    const closeModalBHandler = () => {
        setShowModalB(false)
        navigate({ hash: '' });
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
            <ModalA
                showModalA={showModalA}
                onlyEven={onlyEven}
                closeClickHandler={closeModalAHandler}
                usContactsClickHandler={usContactsClickHandler}
                allContactsClickHandler={allContactsClickHandler}
                setOnlyEven={setOnlyEven}
            />
            <ModalB
                showModalB={showModalB}
                onlyEven={onlyEven}
                closeClickHandler={closeModalBHandler}
                usContactsClickHandler={usContactsClickHandler}
                allContactsClickHandler={allContactsClickHandler}
                setOnlyEven={setOnlyEven}
            />
        </div>
    );
}

export default App;
