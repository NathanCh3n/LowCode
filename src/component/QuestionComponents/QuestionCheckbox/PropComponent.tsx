import React, { FC } from 'react'
import { useEffect } from 'react'
import { Checkbox, Form, Input, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { QuestionCheckboxPropsType, OptionType } from './interface'
import { nanoid } from '@reduxjs/toolkit'
const PropComponent: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const { title, isVertical, list = [], disabled, onChange } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])
  function handleValuesChange() {
    const values = form.getFieldsValue()
    const { list } = values
    // 生成唯一的value
    if (list && list.length > 0) {
      list.forEach((opt: OptionType) => {
        if (!opt.value) {
          opt.value = nanoid(5)
        }
      })
    }
    console.log('values', values)
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, list }}
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
      <Form.Item label="选项" shouldUpdate>
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Space key={key} align="baseline">
                  <Form.Item name={[name, 'checked']} valuePropName="checked">
                    <Checkbox />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      {
                        validator: (_, value) => {
                          const optionTexts = form
                            .getFieldValue('list')
                            .map((opt: OptionType) => opt.text)
                          // if (optionTexts.indexOf(value) !== -1) {
                          //   return Promise.reject('选项文字不能重复')
                          // }
                          if (
                            optionTexts.filter((text: string) => text === value)
                              .length > 1
                          ) {
                            return Promise.reject(new Error('选项重复！'))
                          }
                          return Promise.resolve()
                        },
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ value: '', text: '', checked: false })}
                  block
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="竖向排列" name="isVertical" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
