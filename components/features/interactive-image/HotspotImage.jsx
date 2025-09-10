import InteractiveImage from "./InteractiveHotspotImage";


export default function HotspotImage({ hotspots, src }) {
	return (
		<>
			<InteractiveImage
				src={src}
				alt="africa fashion showcase"
				width={1200}
				height={800}
				hotspots={hotspots}
			/>
		</>
	);
}
