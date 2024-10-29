import { deleteObject, getDownloadURL, list, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { bucket } from "./firebase";

class FirebaseStorageRepository {
    async uploadFile(path: string, file: Blob): Promise<string> {
        try {
            const fileRef = ref(bucket, `${path}/${uuidv4()}`);
            await uploadBytes(fileRef, file);

            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    async deleteFile(path: string): Promise<void> {
        try {
            const fileRef = ref(bucket, path);
            await deleteObject(fileRef);
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }

    /**
     * Listagem de arquivos para diretórios com poucos arquivos
     * @param path caminho do diretório de arquivos
     * @returns
     */
    async listAllFiles(path: string): Promise<any[]> { // Modifiquei para retornar qualquer tipo
        try {
            const listRef = ref(bucket, path);
            const result = await listAll(listRef);
            return result.items; // Retorna StorageReference
        } catch (error) {
            console.error("Error listing files:", error);
            throw error;
        }
    }

    /**
     * Listagem com paginação de arquivos para diretórios grandes
     * @param path caminho do diretório de arquivos
     * @param maxResults número máximo de itens por página
     * @param currentPageToken a versão do último item retornado no resultado anterior
     * @returns
     */
    async listFiles(
        path: string,
        maxResults: number = 20,
        currentPageToken: string | undefined = undefined
    ): Promise<any[]> { // Modifiquei para retornar qualquer tipo
        try {
            const listRef = ref(bucket, path);
            const result = await list(listRef, {
                maxResults,
                pageToken: currentPageToken
            });
            return result.items; // Retorna StorageReference
        } catch (error) {
            console.error("Error listing files:", error);
            throw error;
        }
    }

    async downloadFile(path: string): Promise<string> {
        try {
            const fileRef = ref(bucket, path);
            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
        } catch (error) {
            console.error("Error downloading file:", error);
            throw error;
        }
    }
}

export { FirebaseStorageRepository };