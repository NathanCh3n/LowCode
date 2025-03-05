import React, { FC, useRef } from 'react'
import {
  Space,
  Button,
  Typography,
  Input,
  InputRef,
  message,
  Popover,
} from 'antd'
import styles from './StatHeader.module.scss'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'

const { Title } = Typography
const StatHeader: FC = () => {
  const { id } = useParams()
  const { title } = useGetPageInfo()
  const nav = useNavigate()
  const { isPublished } = useGetPageInfo()
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const input = urlInputRef.current
    if (!input) return
    input.select()
    document.execCommand('copy')
    message.success('复制成功')
  }
  function genLinkAndQRCodeElem() {
    if (!isPublished) return null
    const url = `http://localhost:3000/questionnaire/${id}`
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCodeSVG value={url} size={150} />
      </div>
    )
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Button icon={<CopyOutlined />} onClick={copy}></Button>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space align="center">
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => {
              nav(`/question/edit/${id}`)
            }}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}
export default StatHeader
