import React from "react";

interface Props {
	children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
	<div className="m-auto flex min-h-screen w-full flex-col items-center justify-center">
		<div className="relative z-1 flex h-full w-full flex-[1_0_auto] flex-col items-center max-[900px]:w-[inherit]">
			{children}
		</div>
	</div>
);

export default Layout;
