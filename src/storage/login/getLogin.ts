import { LoginDTO } from '@storage/DTO/Login';
import { PASS_LOGIN } from '@storage/storageConfig';
import * as SecureStore from 'expo-secure-store';

export async function getLogin() {
    try {
        const storage = await SecureStore.getItemAsync(PASS_LOGIN);
        const pass: LoginDTO = storage ? JSON.parse(storage) : '';
        return pass;
    } catch (error) {
        throw error;
    }
}