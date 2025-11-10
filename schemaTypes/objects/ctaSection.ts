import {defineArrayMember, defineField, defineType} from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA блок',
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
      type: 'array',
      title: 'Опис',
      description: 'Один або кілька параграфів простого тексту',
      of: [
        defineArrayMember({
          type: 'text',
          title: 'Параграф',
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Зображення',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonType',
      type: 'string',
      title: 'Кнопка',
      description: 'Оберіть, яка кнопка має відображатися',
      options: {
        list: [
          {title: 'Калькулятор', value: 'calculator'},
          {title: 'Напишіть нам', value: 'contact'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title || 'CTA блок без назви',
        subtitle: 'CTA секція',
      }
    },
  },
})
