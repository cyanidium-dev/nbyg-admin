import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {table} from '@sanity/table'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'nbyg-admin',

  projectId: 'fz2ftte6',
  dataset: 'production',

  plugins: [
    table(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
            S.listItem()
              .title('Сторінки послуг')
              .schemaType('page')
              .child(
                S.documentList()
                  .title('Сторінки послуг')
                  .filter('_type == "page"')
                  .defaultOrdering([
                    {field: 'menuOrder', direction: 'asc'},
                    {field: 'title', direction: 'asc'},
                  ]),
              ),
            S.listItem()
              .title('Статті блогу')
              .schemaType('blogPost')
              .child(
                S.documentList()
                  .title('Статті блогу')
                  .filter('_type == "blogPost"')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
