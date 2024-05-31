import {
    createAsyncThunk,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
    articlesAPI,
    TArticle
} from '../../API/API'

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
type TDrinksState = {
    articles: TArticle[],
    fetchStatus: Status
}
const initialState: TDrinksState = {
    articles: [],
    fetchStatus: Status.LOADING
}

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            //Получение статей
            .addCase(getArticles.pending, (state) => {
                state.fetchStatus = Status.LOADING
                state.articles = []
            })
            .addCase(getArticles.fulfilled, (state, action: PayloadAction<TArticle[]>) => {
                state.fetchStatus = Status.SUCCESS
                state.articles = action.payload
            })
            .addCase(getArticles.rejected, (state) => {
                state.fetchStatus = Status.ERROR
                state.articles = []
            })

            //Поиск по статье
            .addCase(setArticleFilter.pending, (state) => {
                state.fetchStatus = Status.LOADING
                state.articles = []
            })
            .addCase(setArticleFilter.fulfilled, (state, action: PayloadAction<TArticle[]>) => {
                state.fetchStatus = Status.SUCCESS
                state.articles = action.payload
            })
            .addCase(setArticleFilter.rejected, (state) => {
                state.fetchStatus = Status.ERROR
                state.articles = []
            })

            //Добавление новой статьи
            .addCase(postArticle.pending, (state) => {
                state.fetchStatus = Status.LOADING
                state.articles = []
            })
            .addCase(postArticle.fulfilled, (state, action: PayloadAction<TArticle[]>) => {
                state.fetchStatus = Status.SUCCESS
                state.articles = action.payload
            })
            .addCase(postArticle.rejected, (state) => {
                state.fetchStatus = Status.ERROR
                state.articles = []
            })

            //Удаление статьи
            .addCase(deleteArticle.pending, (state) => {
                state.fetchStatus = Status.LOADING
                state.articles = []
            })
            .addCase(deleteArticle.fulfilled, (state, action: PayloadAction<TArticle[]>) => {
                state.fetchStatus = Status.SUCCESS
                state.articles = action.payload
            })
            .addCase(deleteArticle.rejected, (state) => {
                state.fetchStatus = Status.ERROR
                state.articles = []
            })

            //Добавление комментраия к статье
            .addCase(addArticleComment.pending, (state) => {
                state.fetchStatus = Status.LOADING
                state.articles = []
            })
            .addCase(addArticleComment.fulfilled, (state, action: PayloadAction<TArticle[]>) => {
                state.fetchStatus = Status.SUCCESS
                state.articles = action.payload
            })
            .addCase(addArticleComment.rejected, (state) => {
                state.fetchStatus = Status.ERROR
                state.articles = []
            })

            //Удаление комментария статьи
            .addCase(deleteArticleComment.pending, (state) => {
                state.fetchStatus = Status.LOADING
                state.articles = []
            })
            .addCase(deleteArticleComment.fulfilled, (state, action: PayloadAction<TArticle[]>) => {
                state.fetchStatus = Status.SUCCESS
                state.articles = action.payload
            })
            .addCase(deleteArticleComment.rejected, (state) => {
                state.fetchStatus = Status.ERROR
                state.articles = []
            })
    }
})

export const getArticlesSelector = (state: RootState) => state.articlesPage

export const getArticles = createAsyncThunk<TArticle[]>(
    'articles/getArticles',
    async () => {
        const data = await articlesAPI.getArticles()
        return data
    }
)

export const setArticleFilter = createAsyncThunk<TArticle[], string>(
    'articles/setArticleFilter',
    async (filter: string) => {
        const data = await articlesAPI.setArticleFilter(filter)
        return data
    }
)

export const postArticle = createAsyncThunk<TArticle[], { title: string, body: string, imgUrl?: string }>(
    'articles/postArticle',
    async (data: { title: string, body: string, imgUrl?: string }) => {
        const result = await articlesAPI.postArticle(data)
        return result
    }
)

export const deleteArticle = createAsyncThunk<TArticle[], number>(
    'articles/deleteArticle',
    async (id: number) => {
        const result = await articlesAPI.deleteArticle(id)
        return result
    }
)

export const addArticleComment = createAsyncThunk<TArticle[], { id: number, user?: string, body: string }>(
    'articles/addArticleComment',
    async ({ id, user, body }) => {
        const result = await articlesAPI.addArticleComment({ id, user, body })
        return result
    }
)

export const deleteArticleComment = createAsyncThunk<TArticle[], { articleId: number, commentId: number }>(
    'articles/deleteArticleComment',
    async ({ articleId, commentId }) => {
        const result = await articlesAPI.deleteArticleComment({ articleId, commentId })
        return result
    }
)

export default articlesSlice.reducer