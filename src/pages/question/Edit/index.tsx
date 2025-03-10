import React, { FC } from 'react'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { changeSelectedId } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import EditHeader from './EditHeader'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useTitle } from 'ahooks'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  useTitle(`问卷编辑 - ${title}}`)
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
