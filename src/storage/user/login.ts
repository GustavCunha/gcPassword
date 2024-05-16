import { UserDTO } from '@storage/DTO/User';
import { PASS_USER } from '@storage/storageConfig';
import * as SecureStore from 'expo-secure-store';

export async function login() {
    try {
        const storage = await SecureStore.getItemAsync(PASS_USER);
        if(storage) {
            const user: UserDTO = JSON.parse(storage);
            return user;
        }
    } catch (error) {
        throw error;
    }
}