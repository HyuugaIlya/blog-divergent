import {
    useEffect,
    useState
} from 'react'

import { ArticleModal } from '../ArticleModal'
import { MainHeadContent } from './MainHeadContent'

import styles from './MainHead.module.scss'

export const MainHead = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        isOpen
            ? window.document.body.style.overflowY = 'hidden'
            : window.document.body.style.overflow = 'auto'
    }, [isOpen])

    return <div className={styles.container}>
        <MainHeadContent
            styles={styles}
            setIsOpen={setIsOpen}
        />
        {isOpen && <ArticleModal
            setIsOpen={setIsOpen}
        />}
    </div>
}
