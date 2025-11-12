import {defineArrayMember, defineField, defineType} from 'sanity'

export const imageTextButtonSection = defineType({
  name: 'imageTextButtonSection',
  title: 'Секція картинка/текст/кнопка',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Заголовок',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titlePosition',
      type: 'string',
      title: 'Позиція заголовка',
      description: 'Оберіть, де розташувати заголовок на десктопі',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Зліва', value: 'left'},
          {title: 'Справа', value: 'right'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
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
      name: 'description',
      type: 'array',
      title: 'Опис',
      description: 'Один або кілька параграфів тексту',
      of: [
        defineArrayMember({
          type: 'text',
          title: 'Параграф',
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'buttonStyle',
      type: 'string',
      title: 'Стиль кнопки',
      options: {
        list: [
          {title: 'Білий', value: 'white'},
          {title: 'Прозорий з бордером', value: 'transparentBorder'},
          {title: 'Коричневий градієнт', value: 'brownGradient'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Текст кнопки',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonPage',
      type: 'reference',
      title: 'Сторінка для кнопки',
      description:
        'Оберіть сторінку, на яку має вести кнопка. На фронті буде використано slug обраної сторінки.',
      to: [{type: 'page'}],
      options: {
        disableNew: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      buttonText: 'buttonText',
      buttonSlug: 'buttonPage.slug.current',
    },
    prepare({title, image, buttonText, buttonSlug}) {
      const subtitleParts = []
      if (buttonText) {
        subtitleParts.push(`Кнопка: ${buttonText}`)
      } else {
        subtitleParts.push('Кнопка не налаштована')
      }

      if (buttonSlug) {
        subtitleParts.push(`Slug: /${buttonSlug}`)
      }

      return {
        title: title || 'Секція картинка/текст/кнопка',
        subtitle: subtitleParts.join(' · '),
        media: image,
      }
    },
  },
})
