import * as SecureStore from 'expo-secure-store';
import { PassDTO } from "@storage/DTO/Pass";
import { passwordsGetAll } from "./passwordsGetAll";
import { PASSWORD_COLLECTION } from "@storage/storageConfig";

export async function passwordRemoveById(id: string) {
    try {
        const storedPasswords = await passwordsGetAll();
        const passwords: PassDTO[] = storedPasswords.filter(pass => pass.id !== id);

        await SecureStore.setItemAsync(PASSWORD_COLLECTION, JSON.stringify(passwords));
    } catch (error) {
        throw error;
    }
}