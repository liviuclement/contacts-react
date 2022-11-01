import React from 'react';
import styles from './Footer.module.scss';
import CustomButton from "../Button/Button";

interface Props {
    onClose: () => void,
    onUsContactsClick: () => void,
    onAllContactsClick: () => void,
    onCheckboxPress: () => void,
    onlyEven: boolean
}

const ContactsModalFooter = (props: Props) => {
    const {
        onlyEven,
        onClose,
        onUsContactsClick,
        onAllContactsClick,
        onCheckboxPress
    } = props;

    return (
        <div className={styles.modalFooter}>
            <div className={styles.onlyEven}>
                <input type='checkbox' id={'only-even'} checked={onlyEven} onChange={onCheckboxPress}/>
                <label htmlFor={'only-even'}>Only even</label>
            </div>
            <div
                className={styles.btnContainer}
            >
                <CustomButton
                    onClick={onAllContactsClick}
                    variant={'purple'}
                    style={{
                        marginRight: 10
                    }}
                >
                    All Contacts
                </CustomButton>
                <CustomButton
                    onClick={onUsContactsClick}
                    variant={'orange'}
                    style={{
                        marginRight: 10
                    }}
                >
                    US Contacts
                </CustomButton>
                <CustomButton
                    onClick={onClose}
                    variant={'whitePurple'}
                >
                    Close
                </CustomButton>
            </div>
        </div>
    );
};

export default ContactsModalFooter;
