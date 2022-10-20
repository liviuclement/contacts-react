import React, { Children, PropsWithChildren, ReactChildren, ReactComponentElement } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    closeClickHandler: () => void,
    headerText: string,
    variant?: 'small'
}

const Modal = (props: ModalProps & PropsWithChildren) => {
    const { isOpen, variant, headerText, children, closeClickHandler, } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={styles.modalBackdrop}
            onClick={closeClickHandler}
        >
            <div className={`${styles.modal} ${variant ? styles[variant] : ''}`} onClick={e => e.stopPropagation()}>
                <div
                    className={styles.header}
                >
                    <h1>
                        {headerText}
                    </h1>
                    <div
                        className={styles.closeBtn}
                        onClick={closeClickHandler}
                    >
                        ×
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

interface BodyProps extends PropsWithChildren {

}

const Body = (props: BodyProps) => {
    const { children } = props;

    return <div
        className={styles.body}
    >
        {children}
    </div>
}

interface FooterProps extends PropsWithChildren {

}

const Footer = (props: FooterProps) => {
    const { children } = props;

    return <div
        className={styles.footer}
    >
        {children}
    </div>
}


Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
