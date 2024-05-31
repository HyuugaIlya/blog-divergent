import { useEffect } from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'

import { AppDispatch } from '../../store/store'
import {
  getArticles,
  getArticlesSelector
} from '../../store/slices/articlesSlice'

import { Article } from './Article'
import Preloader from '../Preloader/Preloader'

import styles from './Articles.module.scss'

export const Articles = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    articles,
    fetchStatus
  } = useSelector(getArticlesSelector)

  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])

  if (fetchStatus === 'loading') {
    return <div style={{ position: 'relative', top: '25vh' }}>
      <Preloader />
    </div>
  }

  return <div className={styles.content}>
    <div className={styles.container}>
      {
        articles.length
          ? articles.map(article => {
            return <Article key={article.id} article={article} />
          })
          : <span className={styles.empty}>
            К сожалению, никто еще не писал статей😔. Станьте первым!
          </span>
      }
    </div>
  </div>
}