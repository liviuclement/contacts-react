import React from 'react';
import styles from './Footer.module.scss';
import CustomButton from "../Button/Button";

interface Props {
    closeClickHandler: () => void,
    allContactsClickHandler: () => void,
    usContactsClickHandler: () => void,
    onCheckboxPressHandler: () => void,
    onlyEven: boolean
}

const ContactsModalFooter = (props: Props) => {
    const {
        onlyEven,
        closeClickHandler,
        allContactsClickHandler,
        usContactsClickHandler,
        onCheckboxPressHandler
    } = props;

    return (
        <div className={styles.modalFooter}>
            <div className={styles.onlyEven}>
                <input type='checkbox' id={'only-even'} checked={onlyEven} onChange={onCheckboxPressHandler}/>
                <label htmlFor={'only-even'}>Only even</label>
            </div>
            <div
                className={styles.btnContainer}
            >
                <CustomButton
                    onClick={allContactsClickHandler}
                    variant={'purple'}
                    style={{
                        marginRight: 10
                    }}
                >
                    All Contacts
                </CustomButton>
                <CustomButton
                    onClick={usContactsClickHandler}
                    variant={'orange'}
                    style={{
                        marginRight: 10
                    }}
                >
                    US Contacts
                </CustomButton>
                <CustomButton
                    onClick={closeClickHandler}
                    variant={'whitePurple'}
                >
                    Close
                </CustomButton>
            </div>
        </div>
    );
};

export default ContactsModalFooter;
