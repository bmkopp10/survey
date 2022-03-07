import React from "react";
import styles from '../Header/Header.module.css'
import {darkPurple} from "../../theme";

type Props = {
    title: string
}

const Header: React.FC<Props> = (props) => {

    return (
        <div className={styles.Header} style={{background: darkPurple}}>
            <span className={styles.Title}>{props.title}</span>
        </div>
    )

}

export default Header;
