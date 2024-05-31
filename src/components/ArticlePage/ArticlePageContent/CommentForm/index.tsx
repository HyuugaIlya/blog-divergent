import clsx from "clsx"

import {
    SubmitHandler,
    useForm
} from "react-hook-form"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../store/store"
import { addArticleComment } from "../../../../store/slices/articlesSlice"

import styles from './CommentForm.module.scss'

type TForm = {
    user: string
    body: string,
}
export const CommentForm = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: {
            errors,
            isValid
        },
        reset,
    } = useForm<TForm>({
        mode: 'all'
    })

    const onSubmit: SubmitHandler<TForm> = (data) => {
        if (isValid) {
            const id = +window.location.pathname.split('/').reverse()[0]
            dispatch(addArticleComment({ ...data, id: id }))
        }
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
        >
            <div className={styles.inputBlock}>
                <input
                    className={clsx(styles.title, errors?.user && styles.error)}
                    {...register('user', {
                        required: 'Это поле не может быть пустым',
                    })}
                    placeholder={"Ваше имя"}
                    onFocus={() => clearErrors('user')}
                />
                <div className={styles.errors}>
                    {errors?.user && (
                        <span>{errors?.user.message || 'Ошибка!'}</span>
                    )}
                </div>
            </div>
            <div className={styles.inputBlock}>
                <input
                    className={clsx(styles.textarea, errors?.body && styles.error)}
                    {...register('body', {
                        required: 'Это поле не может быть пустым',
                    })}
                    placeholder="Комментарий"
                    onFocus={() => clearErrors('body')}
                />
                <div className={styles.errors}>
                    {errors?.body && (
                        <span>
                            {errors?.body.message || 'Ошибка!'}
                        </span>
                    )}
                </div>
            </div>
            <button
                className={styles.button}
            >
                Опубликовать
            </button>
        </form>
    )
}
