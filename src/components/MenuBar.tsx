'use client'

import { Editor } from '@tiptap/react'
import { useState, useCallback } from 'react'

interface MenuBarProps {
  editor: Editor
}

export default function MenuBar({ editor }: MenuBarProps) {
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [color, setColor] = useState('#000000')

  const addLink = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl, target: '_self' }).run()
      setLinkUrl('')
      setShowLinkInput(false)
    }
  }, [editor, linkUrl])

  const addImage = useCallback(() => {
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setColor(newColor)
    editor.chain().focus().setColor(newColor).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b dark:border-gray-800 p-2 flex flex-wrap gap-2">
      <div className="flex items-center gap-1 border-r dark:border-gray-700 pr-2">
        <select
          className="p-1 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
          onChange={(e) => {
            const level = parseInt(e.target.value)
            if (level === 0) {
              editor.chain().focus().setParagraph().run()
            } else {
              editor.chain().focus().toggleHeading({ level }).run()
            }
          }}
          value={
            editor.isActive('heading', { level: 1 })
              ? '1'
              : editor.isActive('heading', { level: 2 })
              ? '2'
              : editor.isActive('heading', { level: 3 })
              ? '3'
              : '0'
          }
        >
          <option value="0">Normal</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
        </select>

        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-8 h-8 p-0 border rounded cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-1 border-r dark:border-gray-700 pr-2">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editor.chain().focus().toggleBold().run()
          }}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('bold') ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          <span className="font-bold">B</span>
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editor.chain().focus().toggleItalic().run()
          }}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('italic') ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          <span className="italic">I</span>
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editor.chain().focus().toggleUnderline().run()
          }}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('underline') ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          <span className="underline">U</span>
        </button>
      </div>

      <div className="flex items-center gap-1 border-r dark:border-gray-700 pr-2">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editor.chain().focus().toggleBulletList().run()
          }}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('bulletList') ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          •
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editor.chain().focus().toggleOrderedList().run()
          }}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('orderedList') ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          1.
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editor.chain().focus().toggleBlockquote().run()
          }}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('blockquote') ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          "
        </button>
      </div>

      <div className="flex items-center gap-1 border-r dark:border-gray-700 pr-2">
        <div className="relative">
          {showLinkInput ? (
            <form onSubmit={addLink} className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 p-2 rounded shadow-lg border dark:border-gray-700 flex">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="text-sm px-2 py-1 border dark:border-gray-700 rounded dark:bg-gray-900"
                placeholder="https://"
              />
              <button
                type="submit"
                className="ml-2 px-2 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600"
              >
                Ekle
              </button>
            </form>
          ) : (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowLinkInput(!showLinkInput)
              }}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                editor.isActive('link') ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              🔗
            </button>
          )}
        </div>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            addImage()
          }}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          🖼️
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editor.chain().focus().setTextAlign('left').run()
          }}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          ⬅️
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editor.chain().focus().setTextAlign('center').run()
          }}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          ↔️
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editor.chain().focus().setTextAlign('right').run()
          }}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          ➡️
        </button>
      </div>
    </div>
  )
}
