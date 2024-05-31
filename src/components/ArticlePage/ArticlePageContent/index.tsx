import { Link } from 'react-router-dom'

import { TArticle } from '../../../API/API'

import { ArticleComment } from './ArticleComment'
import { CommentForm } from './CommentForm'

import styles from './ArticlePageContent.module.scss'

type TArticlePageContent = {
    isMobile: boolean,
    article: TArticle,
    onDelete: (articleId: number, commentId: number) => void
}
export const ArticlePageContent = ({
    isMobile,
    article,
    onDelete
}: TArticlePageContent) => {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link to='/blog' className={styles.back}>
                    <svg viewBox="0 0 24 24" fill="#a751f8" xmlns="http://www.w3.org/2000/svg">
                        <g stroke='#a751f8' id="SVGRepo_bgCarrier" strokeWidth="0"></g><g stroke='#a751f8' id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g stroke='#a751f8' id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z"></path> </g>
                    </svg>
                    {!isMobile && '- На главную'}
                </Link>
                <span className={styles.img}>
                    <img src={article.imgUrl} alt="img" />
                </span>
                <div className={styles.content}>
                    <span className={styles.title}>
                        <b>
                            {article.title}
                        </b>
                    </span>
                    <span className={styles.delimeter}></span>
                    <span className={styles.description}>
                        <p>
                            {article.body}
                        </p>
                    </span>
                    <span className={styles.delimeter}></span>
                    <CommentForm />
                    <span className={styles.comments}>
                        <b>Комментарии:</b>
                        {article.comments.length ? article.comments.map(comment => {
                            return <ArticleComment
                                key={comment.id}
                                styles={styles}
                                comment={comment}
                                articleId={article.id}
                                onDelete={onDelete}
                            />
                        }) : <span className={styles.empty}>
                            Комментариев еще нет😟. Напишите свой!
                        </span>}
                    </span>
                </div>
            </div>
        </div>
    )
}
