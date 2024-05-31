export type TComment = {
    id: number,
    user: string,
    body: string
}
export type TArticle = {
    id: number,
    title: string,
    body: string,
    imgUrl: string,
    comments: TComment[]
}
let articles: TArticle[] = [
    {
        id: 1,
        title: 'Lorem',
        body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam asperiores libero consequuntur modi dolore, consequatur reiciendis sed velit officiis voluptates impedit ratione debitis voluptate laudantium possimus dolorem dicta itaque?',
        imgUrl: 'https://tapety.tja.pl/obrazki/tja_normalne/122790.jpg',
        comments: [
            {
                id: 1,
                user: 'user',
                body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam'
            }
        ]
    },
    {
        id: 2,
        title: 'Amet',
        body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam asperiores libero consequuntur modi dolore, consequatur reiciendis sed velit officiis voluptates impedit ratione debitis voluptate laudantium possimus dolorem dicta itaque?',
        imgUrl: 'https://images.wallpaperscraft.ru/image/single/poverhnost_kraska_treshchiny_1238960_1920x1200.jpg',
        comments: [
            {
                id: 1,
                user: 'user',
                body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam'
            },
            {
                id: 2,
                user: 'user',
                body: 'consequuntur modi dolore, consequatur reiciendis sed velit officiis'
            }
        ]
    },
    {
        id: 3,
        title: 'Ipsum',
        body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam asperiores libero consequuntur modi dolore, consequatur reiciendis sed velit officiis voluptates impedit ratione debitis voluptate laudantium possimus dolorem dicta itaque?',
        imgUrl: 'https://images.wallpaperscraft.ru/image/single/perekladina_vagon_vyshka_1239413_1920x1200.jpg',
        comments: [
            {
                id: 1,
                user: 'user',
                body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam'
            }
        ]
    },
    {
        id: 4,
        title: 'Dolor',
        body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam asperiores libero consequuntur modi dolore, consequatur reiciendis sed velit officiis voluptates impedit ratione debitis voluptate laudantium possimus dolorem dicta itaque?',
        imgUrl: 'https://i.artfile.ru/1920x1440_1337552_[www.ArtFile.ru].jpg',
        comments: [
            {
                id: 1,
                user: 'user',
                body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam'
            },
            {
                id: 2,
                user: 'user',
                body: 'consequuntur modi dolore, consequatur reiciendis sed velit officiis'
            },
            {
                id: 3,
                user: 'user',
                body: 'sed velit officiis voluptates impedit ratione debitis'
            }
        ]
    },
    {
        id: 5,
        title: 'Sit',
        body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam asperiores libero consequuntur modi dolore, consequatur reiciendis sed velit officiis voluptates impedit ratione debitis voluptate laudantium possimus dolorem dicta itaque?',
        imgUrl: 'https://wallbox.ru/wallpapers/main/201131/ozero-otrazhenie-les-c653d84.jpg',
        comments: [
            {
                id: 1,
                user: 'user',
                body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto laboriosam'
            }
        ]
    },
]

export const articlesAPI = {
    async getArticles() {
        try {
            const result = await new Promise<TArticle[]>(r => setTimeout(() => {
                r(articles)
            }, 200))

            return result
        } catch (error) {
            console.log(error)
            throw new Error('Ошибка!')
        }
    },
    async postArticle(article: {
        title: string,
        body: string,
        imgUrl?: string
    }) {
        const lastId = articles.length > 0 ? articles[articles.length - 1].id : 0

        try {
            await new Promise<TArticle[]>(r => setTimeout(() => {
                r(articles = [...articles, { id: (lastId + 1), ...article, imgUrl: article.imgUrl || 'https://svd220.ru/images/products/large/no-image.jpg', comments: [] }])
            }, 200))

            return articles
        } catch (error) {
            console.log(error)
            throw new Error('Ошибка!')
        }

    },
    async deleteArticle(id: number) {
        try {
            await new Promise<TArticle[]>(r => setTimeout(() => {
                r(articles = [...articles.filter(article => article.id !== id)])
            }, 200))

            return articles
        } catch (error) {
            console.log(error)
            throw new Error('Ошибка!')
        }
    },
    async addArticleComment({
        id,
        user,
        body
    }: {
        id: number,
        user?: string,
        body: string
    }) {
        try {
            await new Promise<TArticle[]>(r => setTimeout(() => {
                const element = articles.find(el => el.id === id)
                const lastCommentId = element
                    ? element.comments.length > 0
                        ? element.comments[element.comments.length - 1].id
                        : 0
                    : 0
                const newArticles = articles.map(article => {
                    if (article.id === id) {
                        return {
                            ...article,
                            comments: [
                                ...article.comments,
                                {
                                    id: lastCommentId + 1,
                                    user: (user === ' ' || !user) ? 'user' : user,
                                    body: body
                                }
                            ]
                        }
                    } else {
                        return article
                    }
                })

                r(articles = newArticles)
            }, 200))

            return articles
        } catch (error) {
            console.log(error)
            throw new Error('Ошибка!')
        }
    },
    async deleteArticleComment({
        articleId,
        commentId
    }: {
        articleId: number,
        commentId: number
    }) {
        try {
            await new Promise<TArticle[]>(r => setTimeout(() => {
                const newArticles = articles.map(article => {
                    if (article.id === articleId) {
                        return {
                            ...article,
                            comments: [
                                ...article.comments.filter(el => el.id !== commentId)
                            ]
                        }
                    } else {
                        return article
                    }
                })
                r(articles = newArticles)
            }, 200))

            return articles
        } catch (error) {
            console.log(error)
            throw new Error('Ошибка!')
        }
    }
}