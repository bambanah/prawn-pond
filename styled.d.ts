import "styled-components";

// and extend them!
declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			fg: string;
			bg: string;
			pastelPink: string;
			pastelGreen: string;
			pastelBlue: string;
			link: string;
			accent: string;
			accentGradient: string;
			transparentAccent: string;
			brand: string;
			error: string;
		};

		fonts: {
			cursive: string;
			monospace: string;
			display: string;
			serif: string;
			sansSerif: string;
		};
	}
}
