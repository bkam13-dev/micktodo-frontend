import { UserType } from "./userType"

export type TaskType = {
    'id': string,
    'user': UserType,
    'title': string,
    'slug': string,
    'completed': boolean,
    'created_at': string,
}