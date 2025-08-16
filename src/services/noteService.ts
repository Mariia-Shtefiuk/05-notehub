import axios from "axios";
import type { Note, NoteTag } from "../types/Note2";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  results: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { data } = await api.get("/notes", { params });
  console.log("Відповідь з бекенду:", data);
  return {
    results: data.notes,
    page: params.page || 1,
    perPage: params.perPage || data.notes.length,
    totalPages: data.totalPages,
    totalItems: data.totalItems || data.notes.length,
  };
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await api.post("/notes", payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
}
