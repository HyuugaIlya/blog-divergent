import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { Articles } from './components/Articles'
import { ArticlePage } from './components/ArticlePage'
import { MainHead } from './components/MainHead'
import { Statistics } from './components/Statistics'
import { NotFound } from './components/NotFound'

import styles from './App.module.scss'

function App() {
  return <div className={styles.wrapper}>
    <Routes>
      <Route path='/' element={<Navigate to='/blog' />} />
      <Route
        path='/blog'
        element={
          <div className={styles.container}>
            <MainHead />
            <Articles />
            <Statistics />
          </div>
        }
      />
      <Route path='/blog/:id' element={<ArticlePage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
}

export default App