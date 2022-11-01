import React, { PropsWithChildren } from 'react';
import styles from "./Button.module.scss";

interface Props extends PropsWithChildren {
    onClick: () => void,
    variant: 'orange' | 'purple' | 'whitePurple',
    style?: { [key: string]: string | number }
}

const CustomButton = (props: Props) => {
    const { onClick, variant, children, style } = props;

    return (
        <button
            onClick={onClick}
            className={styles[variant]}
            style={style}
        >
            {children}
        </button>
    );
};

export default CustomButton;
