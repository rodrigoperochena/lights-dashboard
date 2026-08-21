export interface Address {
  street?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
}

export interface Contact {
  email: string;

  phone: {
    value: string;
    display: string;
  };
}

export interface Brand {
  name: string
  shortName: string
  product?: string
  tagline?: string
}

export interface SocialLink {
  label: string;
  url: string;
  handle?: string
}

export interface SiteConfig {
  url: string
  hostname: string
  
  brand: Brand
  
  title: string
  description: string
  
  lang: string
  ogLocale: string
	
	date: {
    locale: Intl.LocalesArgument;
		options: Intl.DateTimeFormatOptions;
	};
  
  contact: Contact
  address?: Address
  
  socials?: {
    github?: SocialLink
    instagram?: SocialLink
    youtube?: SocialLink
  }
  
  author: string | null;

	dev: string
	devUrl: string;
	
  analyticsId: string
}

export interface SiteMeta {
	title: string;
	description?: string;
	ogImage?: string | undefined;
	articleDate?: string | undefined;
}

export interface NavigationLink {
  path: string
  title: string
}

export type NavigationLinks = readonly NavigationLink[]