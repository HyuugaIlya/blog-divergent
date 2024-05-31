import {
    useEffect
} from 'react'
import {
    useDispatch,
    useSelector
} from 'react-redux'
import { useDeviceScreen } from '../../hooks/useDeviceScreen'

import { AppDispatch } from '../../store/store'
import {
    deleteArticleComment,
    getArticles,
    getArticlesSelector
} from '../../store/slices/articlesSlice'

import { ArticlePageContent } from './ArticlePageContent'
import { NotFound } from '../NotFound'
import Preloader from '../Preloader/Preloader'

export const ArticlePage = () => {
    const {
        articles,
        fetchStatus
    } = useSelector(getArticlesSelector)
    const dispatch = useDispatch<AppDispatch>()

    const articleId = window.location.pathname.split('/').reverse()[0]
    const article = articles.find(a => a.id.toString() === articleId)

    const { isMobile } = useDeviceScreen()

    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch])

    if (fetchStatus === 'loading') {
        return <div style={{ position: 'relative', top: '50vh' }}>
            <Preloader />
        </div>
    }

    if (!article) {
        return <NotFound />
    }

    const onCommentDelete = (
        articleId: number,
        commentId: number
    ) => {
        dispatch(deleteArticleComment({ articleId, commentId }))
    }

    return <ArticlePageContent
        isMobile={isMobile}
        article={article}
        onDelete={onCommentDelete}
    />
}
