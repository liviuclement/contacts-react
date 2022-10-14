import React, { ReactComponentElement } from 'react';
import styles from './Modal.module.scss';

interface Props {
    closeClickHandler: () => void,
    headerText: string,
    bodyComponent: ReactComponentElement<any>,
    footerComponent?: ReactComponentElement<any>
}

const Modal = (props: Props) => {
    const { headerText, bodyComponent, footerComponent, closeClickHandler, } = props;

    return (
        <div
            className={styles.modalBackdrop}
            onClick={closeClickHandler}
        >
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
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
                {!!bodyComponent &&
					<div
						className={styles.body}
					>
                        {bodyComponent}
					</div>
                }
                {!!footerComponent &&
					<div
						className={styles.footer}
					>
                        {footerComponent}
					</div>
                }
            </div>
        </div>
    );
};

export default Modal;
