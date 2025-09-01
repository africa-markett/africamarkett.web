import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery, useTheme } from "@mui/material";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MirrorScrollLookbook = () => {
	const theme = useTheme();
	// avoid SSR mismatch
	const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
	const sectionRef = useRef(null);
	const scrollerRef = useRef(null);
	const leftColumnRef = useRef(null);
	const rightColumnRef = useRef(null);
	const lenisRef = useRef(null);

	// Lenis (desktop only)
	useEffect(() => {
		if (isMobile) return;
		let cancelled = false;
		(async () => {
			const Lenis = (await import("@studio-freight/lenis")).default;
			if (cancelled) return;
			const lenis = new Lenis({
				duration: 1.2,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				direction: "vertical",
				gestureDirection: "vertical",
				smooth: true,
				smoothTouch: false,
				touchMultiplier: 2,
			});
			lenisRef.current = lenis;
			function raf(time) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}
			requestAnimationFrame(raf);
			lenis.on("scroll", ScrollTrigger.update);
			gsap.ticker.lagSmoothing(0);
			requestAnimationFrame(() => ScrollTrigger.refresh());
		})();
		return () => {
			cancelled = true;
			lenisRef.current?.destroy();
		};
	}, [isMobile]);

	// GSAP columns (desktop only) — no pin, delayed start for "glue"
	useEffect(() => {
		if (isMobile) return;

		const section = sectionRef.current;
		const scroller = scrollerRef.current;
		const leftCol = leftColumnRef.current;
		const rightCol = rightColumnRef.current;
		if (!section || !scroller || !leftCol || !rightCol) return;

		const ctx = gsap.context(() => {
			const TRAVEL = 50; // same distance
			const START_OFFSET = "5%"; // how long to "glue" before moving

			// initial states
			gsap.set(leftCol, { yPercent: 0 });
			gsap.set(rightCol, { yPercent: -TRAVEL }); // pre-offset up so moving down reveals content

			gsap
				.timeline({
					scrollTrigger: {
						trigger: scroller,
						start: `top+=${START_OFFSET} top`, // delay start = glue
						end: "bottom bottom",
						scrub: true,
						invalidateOnRefresh: true,
					},
					defaults: { ease: "none" },
				})
				.to(leftCol, { yPercent: -TRAVEL }, 0) // up
				.to(rightCol, { yPercent: 0 }, 0); // down
		}, section);

		return () => ctx.revert();
	}, [isMobile]);

	const leftCards = useMemo(
		() => [
			{
				id: 1,
				image:
					"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
				mobileImage:
					"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
			},
			{
				id: 2,
				image:
					"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80",
				mobileImage:
					"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
			},
		],
		[]
	);

	const rightCards = useMemo(
		() => [
			{
				id: 1,
				image:
					"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",

				mobileImage:
					"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
			},
			{
				id: 2,
				image:
					"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=80",

				mobileImage:
					"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
			},
		],
		[]
	);

	return (
		<section ref={sectionRef} className="limited_editions">
			{/* Header content */}
			<div className="   px-4 py-16">
				<h2 className="text-3xl font-bold mb-4 text-center">Lookbook</h2>
			</div>

			{/* Mobile view: stacked left cards only (always rendered; hidden on md+) */}
			<div className="block md:hidden pb-10">
				{leftCards.map((card) => (
					<div key={card.id} className="mb-1 relative h-[465px] w-full">
						<div className="absolute inset-0 z-10">
							<div className="h-full p-4  relative z-20">
								<div className="w-full h-full flex flex-col justify-end">
									<a href="/catalog" className="inline-block">
										<div className="bg-white text-black px-6 py-3 text-center rounded-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer">
											Shop Now
										</div>
									</a>
								</div>
							</div>
							<div className="absolute inset-0">
								<img
									src={card.image}
									alt=""
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Desktop scroller (always rendered; hidden on <md) */}
			<div className="hidden md:block">
				<div
					ref={scrollerRef}
					className="cards-scroller relative"
					style={{ height: "300vh" }}
				>
					<div className="sticky-viewbox sticky top-0 h-screen overflow-hidden">
						<div className="flex w-full h-full">
							{/* Left Column */}
							<div className="cards-wrapper w-1/2">
								<div
									ref={leftColumnRef}
									className="card-half left w-full"
									style={{
										willChange: "transform",
										transformStyle: "preserve-3d",
									}}
								>
									{leftCards.map((card) => (
										<div
											key={card.id}
											className="card-slide w-full h-screen relative"
										>
											<Card image={card.image} link={card.link} />
										</div>
									))}
								</div>
							</div>

							{/* Right Column */}
							<div className="cards-wrapper w-1/2">
								<div
									ref={rightColumnRef}
									className="card-half right w-full"
									style={{
										willChange: "transform",
										transformStyle: "preserve-3d",
									}}
								>
									{rightCards.map((card) => (
										<div
											key={card.id}
											className="card-slide w-full h-screen relative"
										>
											<Card image={card.image} link={card.link} />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MirrorScrollLookbook;

const Card = ({ image, link }) => (
	<div className="absolute inset-0 z-10">
		<div className="h-full p-4 pb-14 relative z-20">
			<div className="w-full h-full flex flex-col justify-end">
				<a href="/catalog" className="inline-block">
					<div className="bg-white text-black px-6 py-3 text-center rounded-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer">
						Shop Now
					</div>
				</a>
			</div>
		</div>
		<div className="absolute inset-0">
			<img src={image} alt="" className="w-full h-full object-cover" />
		</div>
	</div>
);
