import React from "react";
import styles from '../TitleText/TitleText.module.css'

type Props = {
    text: string;
}

const TitleText: React.FC<Props> = (props) => {

    return(
        <div className={styles.title}>
            <span>{props.text}</span>
        </div>
    )

}

export default TitleText;
