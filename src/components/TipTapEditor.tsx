'use client'
import React from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'
import TipTapMenuBar from './TipTapMenuBar'
import { Button } from './ui/button'
import { useDebounce } from '@/lib/useDebounce'
import { NoteType } from '@/lib/db/schema'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {note: NoteType}

const TipTapEditor = ({note}: Props) => {
	const [editorState, setEditorState] = React.useState(note.editorState || `<h1>${note.name}</h1>`)
	const [isSaving, setIsSaving] = React.useState(false)
	const saveNote = useMutation({
		mutationFn: async () => {
			const response = axios.post('/api/saveNote', {
				noteId: note.id,
				editorState,
			})
			return (await response).data
		} 
	})
	const editor = useEditor({
		autofocus: true,
		extensions: [StarterKit],
		content: editorState,
		onUpdate: ({editor}) => {
			setEditorState(editor.getHTML())
		},
	});

	const debouncedEditorState = useDebounce(editorState, 300)

	React.useEffect(() => {
		// save to db 
		if (debouncedEditorState === '') return
		saveNote.mutate(undefined, {
			onSuccess: data => {
				console.log('success update!', data)
			},
			onError: err => {
				console.log('error', err)
			}
		})
		console.log(debouncedEditorState)
	}, [debouncedEditorState])

  return (
		<>
			<div className='flex'>
				<TipTapMenuBar editor={editor}/>
				<Button>
					{saveNote.isPending ? "Saving..." : "Saved"}
				</Button>
			</div>
			<div className='prose'>
				<EditorContent editor={editor}/>
			</div>
		</>
	) 
}

export default TipTapEditor