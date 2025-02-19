'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Dropcursor from '@tiptap/extension-dropcursor'

const MenuBar = dynamic(() => import('./MenuBar'), { ssr: false })

interface EditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function Editor({ content, onChange, placeholder = 'İçerik yazın...' }: EditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [localContent, setLocalContent] = useState(content)

  const handleUpdate = useCallback(({ editor }: { editor: any }) => {
    const html = editor.getHTML()
    setLocalContent(html)
    onChange(html)
  }, [onChange])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: true,
        orderedList: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_self',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg',
        },
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      TextStyle,
      Color,
      Dropcursor,
    ],
    content: localContent,
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-4',
      },
      handleDOMEvents: {
        keydown: (view, event) => {
          if (event.key === 'Enter' && event.ctrlKey) {
            event.preventDefault()
            return true
          }
          return false
        },
        drop: (view, event) => {
          const hasFiles = event.dataTransfer?.files?.length
          if (!hasFiles) return false

          const images = Array.from(event.dataTransfer.files).filter(file => 
            /image/i.test(file.type)
          )

          if (images.length === 0) return false

          event.preventDefault()

          images.forEach(image => {
            const reader = new FileReader()
            reader.onload = (readerEvent) => {
              const base64 = readerEvent.target?.result
              if (typeof base64 === 'string') {
                editor?.chain().focus().setImage({ src: base64 }).run()
              }
            }
            reader.readAsDataURL(image)
          })

          return true
        },
        paste: (view, event) => {
          const hasFiles = event.clipboardData?.files?.length
          if (!hasFiles) return false

          const images = Array.from(event.clipboardData.files).filter(file => 
            /image/i.test(file.type)
          )

          if (images.length === 0) return false

          event.preventDefault()

          images.forEach(image => {
            const reader = new FileReader()
            reader.onload = (readerEvent) => {
              const base64 = readerEvent.target?.result
              if (typeof base64 === 'string') {
                editor?.chain().focus().setImage({ src: base64 }).run()
              }
            }
            reader.readAsDataURL(image)
          })

          return true
        },
      },
    },
    onUpdate: handleUpdate,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (content !== localContent) {
      setLocalContent(content)
      if (editor && !editor.isDestroyed) {
        editor.commands.setContent(content, false)
      }
    }
  }, [content, editor, localContent])

  if (!isMounted) {
    return null
  }

  return (
    <div className="relative border rounded-lg dark:border-gray-800">
      <div className="editor-menu">
        {editor && <MenuBar editor={editor} />}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
