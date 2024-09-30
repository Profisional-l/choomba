import DownArrowPng from '../assets/down-arrow.png'
import styles from './HelloMain.module.css'

function HelloMain() {
    return (
        <>
        <div className={styles.helloTXT_cont}>
            <h1>Choomba — просто найди новых друзей, тиммейтов или единомышленников!</h1>
            <div className={styles.findyours_cont}>
                <h2>Ищи своих <br /><p style={{opacity: .5, marginTop: "0px"}}>прямо сейчас!</p></h2>
                <div className={styles.DownArrow_cont}>
                    <img src={DownArrowPng} alt="DownArrow" className={styles.DownArrow} />
                </div>
            </div>
        </div>
        <br />
        </>
    );
}

export default HelloMain