import type { NavigationLinks, SiteConfig } from "./types";

export const siteConfig = {
  // used in astro.config.ts
  url: "https://example.com",
  hostname: "lights.local",

  // Meta property, found in src/components/BaseHead.astro
	brand: {
    name: "UluBit Lights",
    shortName: "UluBit",
    product: "Lights"
  },

  // Used to construct the meta title property found in src/components/BaseHead.astro
  title: "Home lighting dashboard",
  // Used as the default description meta property
  description: "A local dashboard for controlling and managing the lights around my home, designed to communicate directly with WLED devices over the local network",

  // HTML lang property, found in src/layouts/BaseLayout.astro
  lang: "en-US",
	// found in src/utils/date.ts.
  ogLocale: "en_US",

	date: {
    locale: "en-US",
	
    options: {
      day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
  
  contact: {
    email: "example@example.com",
    
    phone: {
      value: "+15555555555",
      display: "+1 555-555-5555"
    }
  },
  
  address: {
    street: "Jl Bangbang Metuug",
    city: "Uluwatu",
    region: "Bali",
    postalCode: "80361",
    country: "ID"
  },
  
  socials: {
    github: {
      label: "Github",
      url: "https://github.com/rodrigoperochena/lights-dashboard"
    },
  },

  author: "UluBit",

	// Developer info
	dev: 'UluBit',
	devUrl: "https://ulubit.com",

	// Replace with the data-website-id value 
	analyticsId: "",
} as const satisfies SiteConfig;

// Used to generate links, currently used in Navigation.astro.
export const navigationLinks = [
	{
		path: "/about/",
		title: "About",
	},
	{
		path: "/contact/",
		title: "Contact",
	},
] as const satisfies NavigationLinks