import React, { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery, useTheme } from '@mui/material';
import styles from './Lookbook.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const MirrorScrollLookbook = () => {
  const theme = useTheme();
  // avoid SSR mismatch
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
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
      const Lenis = (await import('@studio-freight/lenis')).default;
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
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
      lenis.on('scroll', ScrollTrigger.update);
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
      const START_OFFSET = '5%'; // how long to "glue" before moving

      // initial states
      gsap.set(leftCol, { yPercent: 0 });
      gsap.set(rightCol, { yPercent: -TRAVEL }); // pre-offset up so moving down reveals content

      gsap
        .timeline({
          scrollTrigger: {
            trigger: scroller,
            start: `top+=${START_OFFSET} top`, // delay start = glue
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'none' },
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
        image: '/assests/imgs/lookbook1.png',
        mobileImage: '/assests/imgs/lookbook1.png',
      },
      {
        id: 2,
        image: '/assests/imgs/lookbook3.png',
        mobileImage: '/assests/imgs/lookbook3.png',
      },
    ],
    [],
  );

  const rightCards = useMemo(
    () => [
      {
        id: 1,
        image: '/assests/imgs/lookbook4.png',

        mobileImage: '/assests/imgs/lookbook4.png',
      },
      {
        id: 2,
        image: '/assests/imgs/lookbook2.jpg',

        mobileImage: '/assests/imgs/lookbook2.jpg',
      },
    ],
    [],
  );

  return (
    <section ref={sectionRef} className="limited_editions hidden md:block">
      {/* Header content */}
      <div className={styles.headerContainer}>
        <h2 className={styles.headerTitle}>
          <span>Discover</span> culture
        </h2>
        <h2 className={styles.headerTitle}>
          <span>Shop</span> smart. <span>Live</span>African.
        </h2>
      </div>

      {/* Mobile view: stacked left cards only (always rendered; hidden on md+) */}
      <div className={styles.mobileContainer}>
        {leftCards.map((card) => (
          <div key={card.id} className={styles.mobileCard}>
            <div className={styles.cardOverlay}>
              <div className={styles.cardContent}>
                <div className={styles.cardInner}>
                  <Link href="/products" className={styles.cardLink}>
                    <div className={styles.shopButton}>Shop Now</div>
                  </Link>
                </div>
              </div>
              <div className={styles.cardImage}>
                <img src={card.image} alt="" className={styles.image} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop scroller (always rendered; hidden on <md) */}
      <div className={styles.desktopContainer}>
        <div ref={scrollerRef} className={`cards-scroller relative ${styles.cardsScroller}`}>
          <div className={`sticky-viewbox ${styles.stickyViewbox}`}>
            <div className={styles.flexContainer}>
              {/* Left Column */}
              <div className={styles.cardsWrapper}>
                <div
                  ref={leftColumnRef}
                  className={`card-half left ${styles.cardHalf} ${styles.cardColumn}`}
                >
                  {leftCards.map((card) => (
                    <div key={card.id} className={`card-slide ${styles.cardSlide}`}>
                      <Card image={card.image} link={card.link} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className={styles.cardsWrapper}>
                <div
                  ref={rightColumnRef}
                  className={`card-half right ${styles.cardHalf} ${styles.cardColumn}`}
                >
                  {rightCards.map((card) => (
                    <div key={card.id} className={`card-slide ${styles.cardSlide}`}>
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
  <div className={styles.cardOverlay}>
    <div className={styles.cardContentDesktop}>
      <div className={styles.cardInner}>
        <Link href="/products" className={styles.cardLink}>
          <div className={styles.shopButton}>Shop Now</div>
        </Link>
      </div>
    </div>
    <div className={styles.cardImage}>
      <img src={image} alt="" className={styles.image} />
    </div>
  </div>
);
