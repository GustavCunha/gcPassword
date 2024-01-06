import { CategoryDTO } from "./Category";

export type PassDTO = {
    id: string;
    service: string;
    user: string;
    password: string;
    category: CategoryDTO;
}