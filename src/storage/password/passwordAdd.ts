import { PassDTO } from '@storage/DTO/Pass';
import { PASSWORD_COLLECTION } from '@storage/storageConfig';
import * as SecureStore from 'expo-secure-store';
import { passwordsGetAll } from './passwordsGetAll';

export async function passwordAdd(pass: PassDTO) {
    try {
        const storedPasswords = await passwordsGetAll();

        const storage = JSON.stringify([...storedPasswords, pass]);
        await SecureStore.setItemAsync(PASSWORD_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}