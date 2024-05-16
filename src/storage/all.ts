import * as SecureStore from 'expo-secure-store';
import { PASSWORD_COLLECTION, PASS_USER } from './storageConfig';

export async function clearAll() {
    try {
        await Promise.all([
          SecureStore.deleteItemAsync(PASSWORD_COLLECTION),
          SecureStore.deleteItemAsync(PASS_USER)
        ]);
        console.log('Todos os itens apagados do SecureStore.');
      } catch (error) {
        console.error('Erro ao limpar itens do SecureStore: ', error);
      }
}