import clsx from "clsx"

import {
    SubmitHandler,
    useForm
} from "react-hook-form"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../store/store"

import { postArticle } from "../../../store/slices/articlesSlice"

import styles from './ArticleForm.module.scss'

type TForm = {
    title: string,
    body: string,
    imgUrl?: string
}
export const ArticleForm = ({
    setIsOpen
}: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const dispatch = useDispatch<AppDispatch>()

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm<TForm>({
        mode: 'all'
    })

    const onSubmit: SubmitHandler<TForm> = (data) => {
        if (isValid) {
            dispatch(postArticle(data))
            setIsOpen(false)
        }
        reset()
    }

    return <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
    >
        <input
            className={clsx(styles.title, errors?.title && styles.error)}
            {...register('title', {
                required: 'Это поле не может быть пустым',
            })}
            placeholder={"Название статьи"}
            onFocus={() => clearErrors('title')}
        />
        <div className={styles.errors}>
            {errors?.title && (
                <span>
                    {errors?.title.message || 'Ошибка!'}
                </span>
            )}
        </div>
        <textarea
            className={clsx(styles.textarea, errors?.body && styles.error)}
            {...register('body', {
                required: 'Это поле не может быть пустым',
            })}
            placeholder="Текст статьи"
            onFocus={() => clearErrors('body')}
        />
        <div className={styles.errors}>
            {errors?.body && (
                <span>
                    {errors?.body.message || 'Ошибка!'}
                </span>
            )}
        </div>
        <button
            disabled={!isValid}
            className={styles.button}
        >
            Опубликовать
        </button>
    </form>
}
