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
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const MenuBar = dynamic(() => import('./MenuBar'), { ssr: false })

interface EditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function Editor({ content, onChange, placeholder = 'İçerik yazın...' }: EditorProps) {
  const [isMounted, setIsMounted] = useState(false)

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
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      if (editor) {  
        const html = editor.getHTML()
        onChange(html)
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-full min-h-[300px] p-4',
      },
    },
  })

  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {  
      editor.commands.setContent(content)
    }
  }, [content, editor])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="min-h-[300px] border rounded-lg p-4">Yükleniyor...</div>
  }

  return (
    <div className="min-h-[300px] border rounded-lg">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="p-4" />
    </div>
  )
}
