import "styled-components";

// and extend them!
declare module "styled-components" {
	export interface DefaultTheme {
		borderRadius?: string;

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
	}
}
