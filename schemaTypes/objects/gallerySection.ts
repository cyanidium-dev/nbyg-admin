import {defineArrayMember, defineField, defineType} from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Галерея',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      title: 'Зображення',
      description: 'Додайте зображення для десктопу та мобільної версії',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryItem',
          title: 'Елемент галереї',
          fields: [
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
          ],
          preview: {
            select: {
              desktopImage: 'desktopImage',
              mobileImage: 'mobileImage',
            },
            prepare({desktopImage, mobileImage}) {
              return {
                title: 'Елемент галереї',
                subtitle: `${desktopImage ? '✅' : '❌'} десктоп · ${mobileImage ? '✅' : '❌'} мобільне`,
                media: desktopImage || mobileImage,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'showOnServicesPage',
      type: 'boolean',
      title: 'Показувати галерею на сторінці Послуг',
      description: 'Якщо увімкнено, галерея буде відображатися на сторінці Послуг',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: 'Галерея',
        subtitle: `Елементів: ${count}`,
      }
    },
  },
})
