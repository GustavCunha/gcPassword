import * as SecureStore from 'expo-secure-store';
import { PassDTO } from "@storage/DTO/pass";
import { passwordsGetAll } from "./passwordsGetAll";
import { PASSWORD_COLLECTION } from '@storage/storageConfig';

export async function passwordAdd(pass: PassDTO) {
    try {
        const storedPasswords = await passwordsGetAll();

        const storage = JSON.stringify([...storedPasswords, pass]);
        await SecureStore.setItemAsync(PASSWORD_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}