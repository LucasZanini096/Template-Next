import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, Persistence, User, browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

class AuthAPI {
    async signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await this.setPersistence(browserLocalPersistence);

            const user = result.user;
            return user;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    }

    async signUpWithEmailAndPassword(email: string, password: string): Promise<User | string> {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            await this.setPersistence(browserLocalPersistence);

            const user = result.user
            return user;
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                    return "Já existe um usuário cadastrado com este email."
                }
            }

            return "Ocorreu um erro ao criar a conta.";
        }
    }

    async signInWithEmailAndPassword(email: string, password: string) {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            return user;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    }

    async signOut() {
        try {
            await signOut(auth);
            console.log("Sign-out successful");
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    }

    async setPersistence(persistence: Persistence) {
        try {
            await setPersistence(auth, persistence);
            console.log("Persistence set successfully");
        } catch (error) {
            console.error("Error setting persistence:", error);
            throw error;
        }
    }
}

export { AuthAPI };