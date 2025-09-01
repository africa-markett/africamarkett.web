import HotspotImage from "@/components/hotspotImage/HotspotImage";
import MirrorScrollLookbook from "@/components/scrollLookbook/MirrorScrollLookbook";



export default function Home() {
	const firstImage = "/africa-hero.png";
	const hotspots = [
		{
			id: "panel-left",
			top: "34%",
			left: "47.2%",
			href: "/catalog/ndebele-panel-left",
			content: (
				<div>
					<p>Hand-woven Ndebele Panel</p>
					<div style={{ opacity: 0.9 }}>₦120,000</div>
					<a
						href="/catalog/ndebele-panel-left"
						style={{ color: "#4FC3F7", display: "inline-block", marginTop: 6 }}
					>
						View product →
					</a>
				</div>
			),
		},
		{
			id: "wax-right",
			top: "43%",
			left: "77.5%",
			href: "/catalog/wax-print-set-right",
			content: (
				<div>
					<p>Wax Print Two-Piece</p>
					<div style={{ opacity: 0.9 }}>₦180,000</div>
					<a
						href="/catalog/wax-print-set-right"
						style={{ color: "#4FC3F7", display: "inline-block", marginTop: 6 }}
					>
						View product →
					</a>
				</div>
			),
		},
		{
			id: "cloak-far-right",
			top: "43.5%",
			left: "95.2%",
			href: "/catalog/cloak-far-right",
			content: (
				<div>
					<p>Embroidered Cloak</p>
					<div style={{ opacity: 0.9 }}>₦165,000</div>
					<a
						href="/catalog/cloak-far-right"
						style={{ color: "#4FC3F7", display: "inline-block", marginTop: 6 }}
					>
						View product →
					</a>
				</div>
			),
		},
	];

	
	return (
		<>
			<HotspotImage hotspots={hotspots} src={firstImage} />
			<MirrorScrollLookbook />
			
		</>
	);
}
