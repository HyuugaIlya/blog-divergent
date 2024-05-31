import { useSelector } from "react-redux"
import { getArticlesSelector } from "../../store/slices/articlesSlice"

import { StatisticsContent } from "./StatisticsContent"

export const Statistics = () => {
    const {
        articles,
        fetchStatus
    } = useSelector(getArticlesSelector)

    if (fetchStatus === 'loading') {
        return null
    }

    const commonLength = articles.length
    const symbolsLength = articles.reduce((s, c) => s + c.body.length, 0)
    const commentsInArticles = articles.map(el => {
        return {
            title: el.title,
            length: el.comments.length
        }
    })

    return <StatisticsContent
        commonLength={commonLength}
        symbolsLength={symbolsLength}
        commentsInArticles={commentsInArticles}
    />
}