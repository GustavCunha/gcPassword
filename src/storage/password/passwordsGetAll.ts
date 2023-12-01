import * as SecureStore from 'expo-secure-store';
import { PassDTO } from '@storage/DTO/pass';
import { PASSWORD_COLLECTION } from '@storage/storageConfig';

export async function passwordsGetAll() {
    try {
        const storage = await SecureStore.getItemAsync(PASSWORD_COLLECTION);

        const passwords: PassDTO[] = storage ? JSON.parse(storage) : [];

        return passwords;
    } catch (error) {
        throw error;
    }
}