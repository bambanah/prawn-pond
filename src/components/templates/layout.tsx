import React from "react";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
	<div className="flex flex-col">{children}</div>
);

export default Layout;
