import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'adk-cathodic-studio',
  title: 'ADK Cathodic Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nne62kv2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
