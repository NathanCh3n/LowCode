import React, { FC } from 'react'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './interface'

const { TextArea } = Input
const PropComponent: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType
) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])
  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={handleValuesChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="描述"
        name="desc"
        rules={[{ required: true, message: '请输入描述信息' }]}
      >
        <TextArea />
      </Form.Item>
    </Form>
  )
}
export default PropComponent
