import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	:root {
		--shadow-low: 3px 3px 12px rgba(0, 0, 0, 0.17);
		--shadow-medium: 8px 8px 20px rgba(0, 0, 0, 0.17);
		--shadow-high: 16px 16px 48px rgba(0, 0, 0, 0.22);
	}

	html,
	body {
		margin: 0;
		font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
			"Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		scroll-behavior: smooth;
	}

	* {
		font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	a {
		color: ${(props) => props.theme.colors.link};
		text-decoration: none;
		cursor:pointer;

		&:hover {
			color: #363636;
		}
	}

	.spinner {
		display: flex;
		align-self: center;
		animation: spin 0.8s ease-in infinite;
	}

	@keyframes spin {
		0% {
		  transform: rotate(0deg);
		}
		100% {
		  transform: rotate(360deg);
		}
	}
`;

export default GlobalStyle;
