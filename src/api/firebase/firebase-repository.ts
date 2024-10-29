import { DocumentData, WithFieldValue, doc, getDoc, setDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

type Model<T extends WithFieldValue<DocumentData>> = T
type ModelWithId<T extends WithFieldValue<DocumentData>> = { id: string } & Model<T>

class FirestoreRepository<T extends WithFieldValue<DocumentData>> {
    async create(collectionName: string, documentId: string, data: Model<T>): Promise<void> {
        try {
            const docRef = doc(db, collectionName, documentId);
            await setDoc(docRef, data);
        } catch (error) {
            console.error("Error creating document:", error);
            throw error;
        }
    }

    async read(collectionName: string, documentId: string): Promise<ModelWithId<T> | null> {
        try {
            const docRef = doc(db, collectionName, documentId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return null;
            }

            return { id: docSnap.id, ...docSnap.data() } as ModelWithId<T>;
        } catch (error) {
            console.error("Error reading document:", error);
            throw error;
        }
    }

    async update(collectionName: string, documentId: string, newData: Partial<Model<T>>): Promise<void> {
        try {
            const docRef = doc(db, collectionName, documentId);
            await setDoc(docRef, newData, { merge: true });
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }

    async delete(collectionName: string, documentId: string): Promise<void> {
        try {
            const docRef = doc(db, collectionName, documentId);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }
}

export { FirestoreRepository };