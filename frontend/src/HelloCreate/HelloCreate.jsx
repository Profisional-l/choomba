import styles from './HelloCreate.module.css'

function HelloCreate() {
    return (
        <>
        <div className={styles.helloTXT_cont}>
            <h1>Ищи единомышленников для новых приключений!</h1>
            <h1 className={styles.examplesTXT}>Игры, спорт, хобби или просто общение — ты легко сможешь найти людей с похожими интересами.</h1>
        </div>
        <br />
        </>
    );
}

export default HelloCreate