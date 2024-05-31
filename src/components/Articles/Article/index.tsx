import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { deleteArticle } from '../../../store/slices/articlesSlice'

import { ArticleContent } from './ArticleContent'
import { TArticle } from '../../../API/API'

export const Article = ({
  article
}: {
  article: TArticle
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const visibilityHandler = () => {
    setIsVisible(!isVisible)
  }

  const onDelete = (id: number) => {
    if (confirm('Вы действительно хотите удалить эту статью статью?')) {
      dispatch(deleteArticle(id))
    }
  }

  return <ArticleContent
    article={article}
    onDelete={onDelete}
    visibilityHandler={visibilityHandler}
    isVisible={isVisible}
  />
}