import { PASS_LOGIN } from '@storage/storageConfig';
import * as SecureStore from 'expo-secure-store';

export async function createdLogin(name: string, pass: string) {
    try {
        const passStorage = JSON.stringify({name, pass})
        await SecureStore.setItemAsync(PASS_LOGIN, passStorage);
    } catch (error) {
        throw error;
    }
}