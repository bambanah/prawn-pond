import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@utils/firebase";

interface AuthProps {
	user: User | null;
	authenticated: boolean;
	loadingAuthState: boolean;
}

export const AuthContext = createContext<Partial<AuthProps>>({
	user: null,
});

interface Props {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({
	children,
}: {
	children?: React.ReactNode;
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loadingAuthState, setLoadingAuthState] = useState(true);

	useEffect(() => {
		return onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoadingAuthState(false);
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, authenticated: user !== null, loadingAuthState }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
