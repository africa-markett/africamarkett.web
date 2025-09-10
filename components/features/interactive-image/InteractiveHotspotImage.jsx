import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * @typedef {Object} Hotspot
 * @property {string|number} id
 * @property {string} top   - percentage string e.g. "25%"
 * @property {string} left  - percentage string e.g. "50%"
 * @property {string|JSX.Element} content
 * @property {string} [href] - optional link URL for click navigation
 */

/**
 * Interactive image with hover tooltips and click navigation.
 * - Hover on dot shows tooltip
 * - Click on dot navigates to href if provided
 * - Tooltip stays visible when hovering over it
 * - Dots have a subtle glow on hover
 *
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} [props.alt] - Image alt text
 * @param {number} [props.width] - Image width
 * @param {number} [props.height] - Image height
 * @param {Hotspot[]} [props.hotspots] - Array of hotspot objects
 * @param {string} [props.className] - Additional CSS classes
 */
export default function InteractiveHotspotImage({
  src,
  alt = 'Africa Markett',
  width,
  height,
  hotspots = [],
  className = '',
}) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (spotId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveHotspot(spotId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveHotspot(null);
    }, 100); // Small delay to allow moving to tooltip
  };

  const handleTooltipEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleTooltipLeave = () => {
    setActiveHotspot(null);
  };

  const handleDotClick = (spot) => {
    if (spot.href) {
      window.open(spot.href, '_blank', 'noopener,noreferrer');
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const styles = `
    .ii-stage {
      position: relative;
      width: 100%;
	  height: 100%;
      overflow-x: hidden;
      line-height: 0;
      margin: 0 auto;
      display: inline-block;
    }

    .ii-image {
      width: 100%;
      height: auto;
      display: block;
      max-width: 100%;
    }

    .ii-spot-wrap {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 10;
    }

    .ii-spot {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #fca400;
      box-shadow: 0 0 0 5px #004C3F4D, 0 6px 16px #004C3F4D;
      cursor: pointer;
      border: none;
      transition: all 0.3s ease;
      position: relative;
    }

    .ii-spot:hover {
      box-shadow: 
        0 0 0 6px #004C3F4D, 
        0 6px 16px #004C3F4D,
        0 0 10px rgba(252, 164, 0, 0.4);
      transform: scale(1.1);
    }

    .ii-spot:focus-visible {
      outline: 2px solid #4FC3F7;
      outline-offset: 2px;
    }

    .ii-spot:active {
      transform: scale(0.95);
    }

    .ii-tip {
      position: absolute;
      bottom: -8px;
      left: 50%;
      right: 50%;
      transform: translate(-50%, 100%);
      background: #FFE6B3;
      color: #004C3F;
      border-radius: 5px;
      padding: 10px 12px;
      font-size: 11px;
      line-height: 1.35;
      box-shadow: 0 8px 24px rgba(0,0,0,.35);
      width: max-content;
      white-space: nowrap;
      z-index: 12;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
      pointer-events: none;
    }

    .ii-tip.active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

   

    .ii-tip-inner { 
      display: block; 
      white-space: normal;
    }

   

   
    @media (max-width: 768px) {
      .ii-tip {
        font-size: 12px;
        padding: 8px 10px;
        white-space: wrap;
        width: min-content;
      }
        .ii-spot {
      width: 10px;
      height: 10px;
     
    }
	  .ii-image {
      width: 100%;
      height: 90dvh;
	  object-fit: cover;
    }

    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className={`ii-stage ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="ii-image"
          style={{ height: '100%', objectFit: 'cover' }}
          priority
        />

        {hotspots.map((spot) => {
          const isActive = activeHotspot === spot.id;
          return (
            <div key={spot.id} className="ii-spot-wrap" style={{ top: spot.top, left: spot.left }}>
              <button
                type="button"
                className="ii-spot"
                aria-label={typeof spot.content === 'string' ? spot.content : 'Hotspot'}
                onMouseEnter={() => handleMouseEnter(spot.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleDotClick(spot)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleDotClick(spot);
                  }
                }}
              />
              <div
                className={`ii-tip ${isActive ? 'active' : ''}`}
                onMouseEnter={handleTooltipEnter}
                onMouseLeave={handleTooltipLeave}
                role="tooltip"
              >
                <div className="ii-tip-inner">{spot.content}</div>
                <span className="ii-tip-arrow" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// Demo usage
function _Demo() {
  const hotspots = [
    {
      id: 'panel-left',
      top: '34%',
      left: '47.2%',
      href: '/catalog/ndebele-panel-left',
      content: (
        <div>
          <strong>Hand-woven Ndebele Panel</strong>
          <div style={{ opacity: 0.9 }}>₦120,000</div>
          <span style={{ color: '#4FC3F7' }}>Click dot to view product →</span>
        </div>
      ),
    },
    {
      id: 'wax-right',
      top: '43%',
      left: '77.5%',
      href: '/catalog/wax-print-set-right',
      content: (
        <div>
          <strong>Wax Print Two-Piece</strong>
          <div style={{ opacity: 0.9 }}>₦180,000</div>
          <span style={{ color: '#4FC3F7' }}>Click dot to view product →</span>
        </div>
      ),
    },
    {
      id: 'cloak-far-right',
      top: '43.5%',
      left: '85%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <strong>Embroidered Cloak</strong>
          <div style={{ opacity: 0.9 }}>₦165,000</div>
          <span style={{ color: '#4FC3F7' }}>Click dot to view product →</span>
        </div>
      ),
    },
    {
      id: 'simple-text',
      top: '20%',
      left: '20%',
      content: 'This is a simple text tooltip without a link',
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Interactive Image Component Demo</h1>

      <InteractiveHotspotImage
        src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop"
        alt="African fashion showcase"
        width={1200}
        height={800}
        hotspots={hotspots}
      />

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>
          <strong>Usage:</strong>
        </p>
        <ul>
          <li>Hover over orange dots to see tooltips</li>
          <li>Click dots to navigate (opens in new tab)</li>
          <li>Tooltips stay visible when you hover over them</li>
          <li>Dots have a subtle glow effect on hover</li>
        </ul>
      </div>
    </div>
  );
}
