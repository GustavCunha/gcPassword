import { PassDTO } from '@storage/DTO/Pass';
import { PASSWORD_COLLECTION } from '@storage/storageConfig';
import * as SecureStore from 'expo-secure-store';

export async function passwordsGetAll() {
    try {
        const storage = await SecureStore.getItemAsync(PASSWORD_COLLECTION);

        const passwords: PassDTO[] = storage ? JSON.parse(storage) : [];

        return passwords;
    } catch (error) {
        throw error;
    }
}