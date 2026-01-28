import {
	PromoBannerCTA,
	PromoBannerContent,
	PromoBannerDescription,
	PromoBannerHeading,
	PromoBannerMedia,
	PromoBannerRoot,
	PromoBannerVideo,
} from "./PromoBanner";

export function HelpPromoBanner() {
	return (
		<PromoBannerRoot className="bg-banner-help">
			<PromoBannerContent>
				<PromoBannerHeading className="text-banner-help-text">
					Need help with UGC videos?
				</PromoBannerHeading>
				<PromoBannerDescription className="text-banner-help-muted">
					Connect with talented creators who specialize in authentic
					user-generated content that converts.
				</PromoBannerDescription>
				<PromoBannerCTA
					className="bg-white"
					href="/browse/creators?service=ugc-videos"
					label="Explore UGC Services"
					textClassName="text-black"
				/>
			</PromoBannerContent>
			<PromoBannerMedia>
				<PromoBannerVideo src="/videos/vibe-coding-banner.mp4" />
			</PromoBannerMedia>
		</PromoBannerRoot>
	);
}
