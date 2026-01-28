import { Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { GalleryItem } from "./GalleryItem";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
	background: "#FFFFFF",
};

interface GalleryItemData {
	id: string;
	imageUrl: string;
	category: string;
	creatorName: string;
	aspectRatio: "portrait" | "landscape" | "square";
}

const GALLERY_ITEMS: GalleryItemData[] = [
	{
		id: "1",
		imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop",
		category: "Product Photography",
		creatorName: "sarah_creates",
		aspectRatio: "portrait",
	},
	{
		id: "2",
		imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop",
		category: "Tech Reviews",
		creatorName: "techreviewer",
		aspectRatio: "square",
	},
	{
		id: "3",
		imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
		category: "Architecture & Interior Design",
		creatorName: "designpro",
		aspectRatio: "landscape",
	},
	{
		id: "4",
		imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=800&fit=crop",
		category: "Lifestyle",
		creatorName: "lifestyleguru",
		aspectRatio: "portrait",
	},
	{
		id: "5",
		imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop",
		category: "Digital Art",
		creatorName: "artbymax",
		aspectRatio: "square",
	},
	{
		id: "6",
		imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop",
		category: "Product Design",
		creatorName: "productshots",
		aspectRatio: "portrait",
	},
	{
		id: "7",
		imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
		category: "Fashion",
		creatorName: "fashionista",
		aspectRatio: "landscape",
	},
	{
		id: "8",
		imageUrl: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=600&fit=crop",
		category: "Beauty",
		creatorName: "beautypro",
		aspectRatio: "square",
	},
	{
		id: "9",
		imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop",
		category: "Business",
		creatorName: "corpshots",
		aspectRatio: "portrait",
	},
	{
		id: "10",
		imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
		category: "Nature",
		creatorName: "naturelover",
		aspectRatio: "landscape",
	},
	{
		id: "11",
		imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop",
		category: "Mobile Apps",
		creatorName: "appdesigner",
		aspectRatio: "square",
	},
	{
		id: "12",
		imageUrl: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=800&fit=crop",
		category: "3D Art",
		creatorName: "3dartist",
		aspectRatio: "portrait",
	},
	{
		id: "13",
		imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
		category: "Lifestyle & Fashion",
		creatorName: "styleguru",
		aspectRatio: "landscape",
	},
	{
		id: "14",
		imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
		category: "Cosmetics",
		creatorName: "makeupqueen",
		aspectRatio: "square",
	},
	{
		id: "15",
		imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop",
		category: "Tech & Gadgets",
		creatorName: "gadgetguy",
		aspectRatio: "portrait",
	},
];

export function MadeOnUGPGallery() {
	const { isMobile, isTablet } = useResponsive();

	// Determine number of columns based on screen size
	const getColumnCount = () => {
		if (isMobile) return 2;
		if (isTablet) return 3;
		return 4;
	};

	const columnCount = getColumnCount();
	const gap = 16;

	// Distribute items into columns for masonry effect
	const columns: GalleryItemData[][] = Array.from({ length: columnCount }, () => []);
	GALLERY_ITEMS.forEach((item, index) => {
		columns[index % columnCount].push(item);
	});

	return (
		<View
			style={{
				paddingVertical: 64,
				paddingHorizontal: 24,
				backgroundColor: THEME_COLORS.background,
			}}
		>
			<View
				style={{
					maxWidth: 1200,
					marginHorizontal: "auto",
					width: "100%",
				}}
			>
				{/* Section Header */}
				<Text
					style={{
						fontSize: 28,
						fontWeight: "700",
						color: THEME_COLORS.foreground,
						marginBottom: 32,
					}}
				>
					Made on UGP
				</Text>

				{/* Masonry Grid */}
				<View
					style={{
						flexDirection: "row",
						gap: gap,
					}}
				>
					{columns.map((column, columnIndex) => (
						<View
							key={columnIndex}
							style={{
								flex: 1,
							}}
						>
							{column.map((item) => (
								<GalleryItem
									aspectRatio={item.aspectRatio}
									category={item.category}
									creatorName={item.creatorName}
									imageUrl={item.imageUrl}
									key={item.id}
									onMenuPress={() => console.log("Menu pressed for", item.id)}
									onSave={() => console.log("Save pressed for", item.id)}
								/>
							))}
						</View>
					))}
				</View>
			</View>
		</View>
	);
}

export default MadeOnUGPGallery;
