import styles from './StatisticsContent.module.scss'

type TCommentsInArticle = {
    title: string,
    length: number
}
type TStatisticsContent = {
    commonLength: number,
    symbolsLength: number,
    commentsInArticles: TCommentsInArticle[]
}
export const StatisticsContent = ({
    commentsInArticles,
    commonLength,
    symbolsLength
}: TStatisticsContent) => {
    return (
        <div className={styles.container}>
            <ul>
                <li>
                    <b>Всего статей:</b> {commonLength}
                </li>
                <li>
                    <b>Всего символов:</b> {symbolsLength}
                </li>
                <li>
                    <b>Комментарии:</b> {commentsInArticles.map((el, i) => {
                        return <div key={i} className={styles.comments}>
                            <b>- {el.title}:</b> {el.length}
                        </div>
                    })}
                </li>
                <li>
                    <b>Всего комментариев:</b> {commentsInArticles.reduce((s, c) => s + c.length, 0)}
                </li>
            </ul>
        </div>
    )
}
