import { passwordsGetAll } from './passwordsGetAll';

export async function passwordsGetByCategory(category: string) {
    try {
        const storage = await passwordsGetAll();

        const passwords = storage.filter(pass => pass.category === category);

        return passwords;
    } catch (error) {
        throw error;
    }
}