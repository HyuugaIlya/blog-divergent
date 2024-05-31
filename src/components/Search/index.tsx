import debounce from 'lodash.debounce'

import {
    useCallback,
    useState,
    useRef,
    ChangeEvent
} from 'react'
import {
    useDispatch
} from 'react-redux'
import { AppDispatch } from '../../store/store'

import { setArticleFilter } from '../../store/slices/articlesSlice'

import searchSvg from '../../assets/img/9035548_search_outline_icon.svg'

import styles from './Search.module.scss'

const Search = () => {
    const dispatch = useDispatch<AppDispatch>()

    const [value, setValue] = useState<string>('')

    const inputRef = useRef<HTMLInputElement>(null)

    const inputInFocus = () => {
        inputRef.current?.focus()
    };

    const debounceFn = debounce((str: string) => {
        dispatch(setArticleFilter(str))
    }, 300)

    const updateSearchValue = useCallback(debounceFn, [debounceFn]);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        updateSearchValue(e.currentTarget.value);
    };

    return (
        <div
            onClick={inputInFocus}
            className={styles.root}
        >
            <img onClick={inputInFocus} className={styles.icon} src={searchSvg} alt='search' />
            <input ref={inputRef} value={value} onChange={onValueChange} placeholder='Поиск...' className={styles.input} />
        </div>
    );
}

export default Search;