import React, { FC } from 'react'
import { useEffect } from 'react'
import { Checkbox, Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { QuestionRadioPropsType, OptionType } from './interface'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const { title, isVertical, options, value, disabled, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value })
  }, [title, isVertical, options, value])

  function handleValuesChange() {
    const values = form.getFieldsValue()
    const { options } = values
    // 生成唯一的value
    if (options && options.length > 0) {
      options.forEach((opt: OptionType) => {
        if (!opt.value) {
          opt.value = nanoid(5)
        }
      })
    }
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
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
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      {
                        validator: (_, value) => {
                          const optionTexts = form
                            .getFieldValue('options')
                            .map((opt: OptionType) => opt.text)
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
                    <Input placeholder="选项文字" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ text: '', value: '' })}
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
      <Form.Item label="默认选中" name="value">
        <Select
          options={options?.map(({ text, value }) => ({
            label: text,
            value: value,
          }))}
          allowClear
          placeholder="请选择默认选项"
        />
      </Form.Item>
      <Form.Item label="竖向排列" name="isVertical" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  )
}
export default PropComponent
