import React, { useState } from 'react';
import styles from './App.module.scss';

function App() {
    const [showModalA, setShowModalA] = useState(false)
    const [showModalB, setShowModalB] = useState(false)

    return (
        <div className={styles.app}>
            <div className={styles.btnContainer}>
                <button
                    onClick={() => setShowModalA(true)}
                    className={styles.btnA}
                >
                    Button A
                </button>
                <button
                    onClick={() => setShowModalB(true)}
                    className={styles.btnB}
                >
                    Button B
                </button>
            </div>

        </div>
    );
}

export default App;
