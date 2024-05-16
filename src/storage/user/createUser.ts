import { UserDTO } from '@storage/DTO/User';
import { PASS_USER } from '@storage/storageConfig';
import * as SecureStore from 'expo-secure-store';

export async function createdUser(data: UserDTO) {
    try {
        const passStorage = JSON.stringify(data);
        await SecureStore.setItemAsync(PASS_USER, passStorage);
    } catch (error) {
        throw error;
    }
}