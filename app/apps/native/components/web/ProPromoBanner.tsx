import {
	PromoBannerBadge,
	PromoBannerCTA,
	PromoBannerContent,
	PromoBannerDescription,
	PromoBannerHeading,
	PromoBannerMedia,
	PromoBannerRoot,
	PromoBannerVideo,
} from "./PromoBanner";

export function ProPromoBanner() {
	return (
		<PromoBannerRoot className="bg-banner-pro">
			<PromoBannerContent>
				<PromoBannerBadge className="text-banner-pro-text" />
				<PromoBannerHeading className="text-banner-pro-text">
					Get matched with vetted creators
				</PromoBannerHeading>
				<PromoBannerDescription className="text-banner-pro-muted">
					UGC Pro connects you with our top-tier creators for premium content
					that elevates your brand.
				</PromoBannerDescription>
				<PromoBannerCTA
					className="bg-foreground"
					href="/pro"
					label="Learn More"
					textClassName="text-background"
				/>
			</PromoBannerContent>
			<PromoBannerMedia>
				<PromoBannerVideo src="/videos/ugp-pro-banner.mp4" />
			</PromoBannerMedia>
		</PromoBannerRoot>
	);
}
