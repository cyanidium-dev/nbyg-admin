import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero блок',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Заголовок',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Опис',
      description: 'Короткий опис (можна додати перенос рядків)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'desktopImage',
      type: 'image',
      title: 'Зображення для десктопу',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      type: 'image',
      title: 'Зображення для мобільних',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'showDiscussButton',
      type: 'boolean',
      title: 'Показувати кнопку «Обговорити проєкт»',
      initialValue: false,
    }),
    defineField({
      name: 'showCalculatorButton',
      type: 'boolean',
      title: 'Показувати кнопку «Калькулятор»',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'mobileImage',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title || 'Hero блок без назви',
        subtitle: 'Hero секція',
        media: image,
      }
    },
  },
})
