import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'
import {resolve} from './src/sanity/resolve'
import {structure} from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Maryland Business Online',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'j5pgwhz4',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({structure}),
    presentationTool({
      resolve,
      previewUrl: {
        origin: import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4324',
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})