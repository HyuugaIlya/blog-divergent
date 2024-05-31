type TMainHeadContent = {
    styles: CSSModuleClasses,
    setIsOpen: (v: React.SetStateAction<boolean>) => void
}
export const MainHeadContent = ({
    styles,
    setIsOpen
}: TMainHeadContent) => {
    return <>
        <h1 className={styles.title}>
            Инновации меняют мир вокруг нас
        </h1>
        <a
            className={styles.buttonAdd}
            onClick={() => setIsOpen(true)}
        >
            Написать статью
        </a>
    </>
}
