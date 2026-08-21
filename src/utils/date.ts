import { siteConfig } from "@/site.config";

export function formatDate(
	date: Date,
	options?: Intl.DateTimeFormatOptions,
): string {
	return new Intl.DateTimeFormat(siteConfig.date.locale, {
		...siteConfig.date.options,
		...options,
	}).format(date);
}

export function toIsoDate(date: Date): string {
	return date.toISOString();
}