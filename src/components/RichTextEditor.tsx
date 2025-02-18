'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor),
  { ssr: false }
)

const ClassicEditor = dynamic(
  () => import('@ckeditor/ckeditor5-build-classic'),
  { ssr: false }
)

interface RichTextEditorProps {
  value: string
  onChange: (data: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [editorLoaded, setEditorLoaded] = useState(false)

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  if (!editorLoaded) {
    return (
      <div className="w-full h-[500px] bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500 dark:text-gray-400">Editör yükleniyor...</span>
        </div>
      </div>
    )
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event: any, editor: any) => {
        const data = editor.getData()
        onChange(data)
      }}
    />
  )
}
