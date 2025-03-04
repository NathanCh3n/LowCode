import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import { setPageInfo } from '../../../store/pageInfoReducer'
import { useDispatch } from 'react-redux'

const { TextArea } = Input
const PageSetting: FC = () => {
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])
  function handleValuesChange() {
    dispatch(setPageInfo(form.getFieldsValue()))
  }
  return (
    <div>
      <Form layout="vertical" onValuesChange={handleValuesChange} form={form}>
        <Form.Item
          label="标题"
          name="title"
          rules={[
            {
              required: true,
              message: '请输入标题',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="des">
          <TextArea />
        </Form.Item>
        <Form.Item label="样式代码" name="css">
          <TextArea placeholder="输入 CSS 代码..." />
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <TextArea placeholder="输入 JS 代码..." />
        </Form.Item>
      </Form>
    </div>
  )
}
export default PageSetting
