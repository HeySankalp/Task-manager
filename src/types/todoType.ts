export type toDoListType = toDoListObject[]

export interface toDoListObject {
    createdAt: string
    title: string
    due_date: string
    tag: string[]
    description: string
    status: string
    id: string
}
