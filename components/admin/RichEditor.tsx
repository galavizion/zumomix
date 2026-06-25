"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const BTN = "px-2 py-1 rounded text-sm font-semibold hover:bg-neutral-100 transition-colors disabled:opacity-40";
const BTN_ACTIVE = "bg-brand-green/10 text-brand-green";

export default function RichEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "min-h-[140px] px-4 py-3 text-sm text-neutral-800 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!editor) return null;

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-neutral-100 bg-neutral-50">
        <button type="button" title="Negrita" className={`${BTN} ${editor.isActive("bold") ? BTN_ACTIVE : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>
        <button type="button" title="Cursiva" className={`${BTN} ${editor.isActive("italic") ? BTN_ACTIVE : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>
        <button type="button" title="Tachado" className={`${BTN} ${editor.isActive("strike") ? BTN_ACTIVE : ""}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}>
          <s>S</s>
        </button>
        <span className="w-px h-4 bg-neutral-200 mx-1" />
        <button type="button" title="Lista con viñetas" className={`${BTN} ${editor.isActive("bulletList") ? BTN_ACTIVE : ""}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          ≡
        </button>
        <button type="button" title="Lista numerada" className={`${BTN} ${editor.isActive("orderedList") ? BTN_ACTIVE : ""}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1.
        </button>
        <span className="w-px h-4 bg-neutral-200 mx-1" />
        <button type="button" title="Título" className={`${BTN} ${editor.isActive("heading", { level: 3 }) ? BTN_ACTIVE : ""}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H
        </button>
        <span className="w-px h-4 bg-neutral-200 mx-1" />
        <button type="button" title="Deshacer" className={BTN}
          onClick={() => editor.chain().focus().undo().run()}>
          ↩
        </button>
        <button type="button" title="Rehacer" className={BTN}
          onClick={() => editor.chain().focus().redo().run()}>
          ↪
        </button>
        <span className="ml-auto text-xs text-neutral-400 pr-1">Tip: usa Win+. para emojis 😊</span>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />

      <style>{`
        .ProseMirror ul { list-style: disc; padding-left: 1.4em; }
        .ProseMirror ol { list-style: decimal; padding-left: 1.4em; }
        .ProseMirror h3 { font-size: 1.1em; font-weight: 700; margin: 0.5em 0 0.2em; }
        .ProseMirror strong { font-weight: 700; }
        .ProseMirror em { font-style: italic; }
        .ProseMirror s { text-decoration: line-through; }
        .ProseMirror p { margin: 0.3em 0; }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #aaa;
          pointer-events: none;
          float: left;
          height: 0;
        }
      `}</style>
    </div>
  );
}
