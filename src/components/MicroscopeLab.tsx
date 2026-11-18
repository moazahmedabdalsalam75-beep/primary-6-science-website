import React, { useState, useEffect } from 'react';
import { Microscope, ZoomIn, ZoomOut, RotateCcw, Crosshair, ArrowUpRight } from 'lucide-react';
import { MicroscopeSpecimenId } from '../data/curriculum';

interface Hotspot {
  id: string;
  label: string;
  chapterRef: string;
  description: string;
  /** Percentage coordinates inside the 800x540 SVG viewBox (0-100) */
  x: number;
  y: number;
  /** Target offset for arrow label box */
  labelX: number;
  labelY: number;
  zoomScale: number;
  viewFilter?: string;
}

interface SpecimenConfig {
  id: MicroscopeSpecimenId;
  title: string;
  chapterLabel: string;
  summary: string;
  subModes?: { id: string; label: string }[];
  hotspots: Hotspot[];
}

export const MICROSCOPE_SPECIMENS: SpecimenConfig[] = [
  {
    id: 'respiratory-alveoli',
    title: 'Respiratory System & Alveoli',
    chapterLabel: 'Chapter 2 · Lesson 2: How Lungs Work',
    summary: 'Follow the air path from the nose through the windpipe (trachea) into the lungs and alveoli, plus fish gills.',
    subModes: [
      { id: 'human', label: 'Human Respiratory System' },
      { id: 'organisms', label: 'Fish Gills & Cat Lungs' },
    ],
    hotspots: [
      {
        id: 'nose',
        label: 'Nose',
        chapterRef: 'Ch. 2, Lesson 2',
        description: 'The first organ of the air path. Air enters the body through the nose or mouth, and the nose filters and traps dust before air reaches the lungs.',
        x: 34,
        y: 16,
        labelX: 12,
        labelY: 14,
        zoomScale: 2.4,
        viewFilter: 'human',
      },
      {
        id: 'windpipe',
        label: 'Windpipe (Trachea)',
        chapterRef: 'Ch. 2, Lesson 2',
        description: 'The tube that allows air to pass from the throat to the left and right lungs.',
        x: 34,
        y: 35,
        labelX: 10,
        labelY: 36,
        zoomScale: 2.5,
        viewFilter: 'human',
      },
      {
        id: 'lungs',
        label: 'Left & Right Lungs',
        chapterRef: 'Ch. 2, Lesson 2',
        description: 'Contain Alveoli (air sacs) where gas exchange takes place inside the chest cavity.',
        x: 27,
        y: 58,
        labelX: 8,
        labelY: 62,
        zoomScale: 2.2,
        viewFilter: 'human',
      },
      {
        id: 'alveoli',
        label: 'Alveoli (Tiny Air Sacs)',
        chapterRef: 'Ch. 2, Lesson 2',
        description: 'Tiny air sacs inside the lungs where gas exchange takes place: oxygen in air moves into blood, and carbon dioxide in blood moves into air.',
        x: 74,
        y: 52,
        labelX: 60,
        labelY: 16,
        zoomScale: 3.6,
        viewFilter: 'human',
      },
      {
        id: 'blood-capillary',
        label: 'Surrounding Blood Vessels',
        chapterRef: 'Ch. 2, Lesson 2',
        description: 'Oxygen from the alveoli passes into the surrounding blood vessels, while carbon dioxide passes from the blood into the air sacs.',
        x: 75,
        y: 72,
        labelX: 60,
        labelY: 86,
        zoomScale: 3.8,
        viewFilter: 'human',
      },
      {
        id: 'fish-gills',
        label: 'Fish Gills',
        chapterRef: 'Ch. 2, Lesson 2',
        description: 'Fish depend on gills to absorb dissolved oxygen in water. Outside water in dry air, gills cannot absorb oxygen.',
        x: 31,
        y: 52,
        labelX: 12,
        labelY: 22,
        zoomScale: 2.6,
        viewFilter: 'organisms',
      },
      {
        id: 'cat-lungs',
        label: 'Cat Lungs',
        chapterRef: 'Ch. 2, Lesson 2',
        description: 'Cats breathe air using lungs.',
        x: 72,
        y: 54,
        labelX: 60,
        labelY: 22,
        zoomScale: 2.6,
        viewFilter: 'organisms',
      },
    ],
  },
  {
    id: 'digestive-villi',
    title: 'Digestive Tract & Small Intestine Villi',
    chapterLabel: 'Chapter 3 · Lessons 1 & 3',
    summary: 'Inspect the path of food from mouth to anus, and zoom into the inner wall of the small intestine to examine villi.',
    hotspots: [
      {
        id: 'mouth',
        label: 'Mouth (Teeth & Saliva)',
        chapterRef: 'Ch. 3, Lesson 1',
        description: 'Contains teeth (cut and grind food) and saliva (digests starch into sugar, giving a sweet taste when chewing bread slowly).',
        x: 28,
        y: 13,
        labelX: 6,
        labelY: 11,
        zoomScale: 2.6,
      },
      {
        id: 'pharynx',
        label: 'Pharynx (Throat)',
        chapterRef: 'Ch. 3, Lesson 1',
        description: 'Carries food from the mouth into the food pipe (esophagus).',
        x: 30,
        y: 23,
        labelX: 6,
        labelY: 25,
        zoomScale: 2.8,
      },
      {
        id: 'esophagus',
        label: 'Food Pipe (Esophagus)',
        chapterRef: 'Ch. 3, Lesson 1',
        description: 'A muscular tube that carries food from the pharynx to the stomach.',
        x: 31,
        y: 36,
        labelX: 5,
        labelY: 39,
        zoomScale: 2.5,
      },
      {
        id: 'stomach',
        label: 'Stomach',
        chapterRef: 'Ch. 3, Lesson 1',
        description: 'Located in the upper abdomen. Secretes digestive juice onto food.',
        x: 36,
        y: 50,
        labelX: 6,
        labelY: 54,
        zoomScale: 2.4,
      },
      {
        id: 'liver',
        label: 'Liver',
        chapterRef: 'Ch. 3, Lesson 3',
        description: 'Blood capillaries in villi carry absorbed nutrients to the liver and then to all body parts. The liver stores some nutrients.',
        x: 25,
        y: 48,
        labelX: 5,
        labelY: 67,
        zoomScale: 2.5,
      },
      {
        id: 'small-intestine',
        label: 'Small Intestine',
        chapterRef: 'Ch. 3, Lessons 1 & 3',
        description: 'Absorbs nutrients through tiny bumps called villi on its inner wall.',
        x: 32,
        y: 66,
        labelX: 6,
        labelY: 80,
        zoomScale: 2.4,
      },
      {
        id: 'large-intestine',
        label: 'Large Intestine & Anus',
        chapterRef: 'Ch. 3, Lessons 1 & 3',
        description: 'Surrounds the small intestine. Absorbs more water from undigested food, coming out as feces through the anus.',
        x: 38,
        y: 78,
        labelX: 8,
        labelY: 91,
        zoomScale: 2.4,
      },
      {
        id: 'villi-zoom',
        label: 'Villi (Microscopic View)',
        chapterRef: 'Ch. 3, Lesson 3',
        description: 'Very small bumps on the inner wall of the small intestine that increase the surface area for nutrient absorption. Contain blood capillaries.',
        x: 75,
        y: 52,
        labelX: 60,
        labelY: 16,
        zoomScale: 3.6,
      },
    ],
  },
  {
    id: 'organs-heart-kidneys',
    title: 'Heart, Body Cavities & Kidneys',
    chapterLabel: 'Chapter 4 · Lessons 1, 2 & 3',
    summary: 'Examine the heart, blood vessels, urinary system (kidneys, ureters, urinary bladder), and how organs integrate inside body cavities.',
    subModes: [
      { id: 'cavities', label: 'Body Cavities & Organs' },
      { id: 'heart', label: 'Heart & Blood Circulation' },
      { id: 'kidneys', label: 'Kidneys & Urinary System' },
    ],
    hotspots: [
      {
        id: 'chest-cavity',
        label: 'Chest Cavity & Ribs',
        chapterRef: 'Ch. 4, Lesson 3',
        description: 'Contains the right and left lungs and the heart between them, protected by ribs.',
        x: 34,
        y: 34,
        labelX: 8,
        labelY: 18,
        zoomScale: 2.4,
        viewFilter: 'cavities',
      },
      {
        id: 'abdomen-stomach',
        label: 'Upper Abdomen (Stomach)',
        chapterRef: 'Ch. 4, Lesson 3',
        description: 'Stomach is located in the upper abdomen below the heart and lungs.',
        x: 38,
        y: 53,
        labelX: 60,
        labelY: 42,
        zoomScale: 2.5,
        viewFilter: 'cavities',
      },
      {
        id: 'abdomen-intestines',
        label: 'Small & Large Intestines',
        chapterRef: 'Ch. 4, Lesson 3',
        description: 'Small intestine lies below the stomach, and the large intestine surrounds the small intestine.',
        x: 34,
        y: 68,
        labelX: 60,
        labelY: 66,
        zoomScale: 2.4,
        viewFilter: 'cavities',
      },
      {
        id: 'back-kidneys',
        label: 'Two Kidneys (Lower Back)',
        chapterRef: 'Ch. 4, Lesson 3',
        description: 'Located in the lower back, one on each side of the backbone. Connected to other organs by blood vessels.',
        x: 72,
        y: 61,
        labelX: 60,
        labelY: 20,
        zoomScale: 2.6,
        viewFilter: 'cavities',
      },
      {
        id: 'heart-pump',
        label: 'Heart (Muscular Pump)',
        chapterRef: 'Ch. 4, Lesson 1',
        description: 'Works like a pump, sending blood to all parts of the body through blood vessels and then receiving it again. Beats faster during exercise.',
        x: 50,
        y: 45,
        labelX: 12,
        labelY: 20,
        zoomScale: 2.8,
        viewFilter: 'heart',
      },
      {
        id: 'oxygen-blood',
        label: 'Red Blood Vessels (Oxygen-Rich)',
        chapterRef: 'Ch. 4, Lesson 1',
        description: 'Red represents blood rich in oxygen pumped from the heart to body parts.',
        x: 62,
        y: 36,
        labelX: 62,
        labelY: 18,
        zoomScale: 2.8,
        viewFilter: 'heart',
      },
      {
        id: 'co2-blood',
        label: 'Blue Blood Vessels (Carbon Dioxide-Rich)',
        chapterRef: 'Ch. 4, Lesson 1',
        description: 'Blue represents blood rich in carbon dioxide returning to the heart and lungs.',
        x: 38,
        y: 36,
        labelX: 10,
        labelY: 68,
        zoomScale: 2.8,
        viewFilter: 'heart',
      },
      {
        id: 'pulse-points',
        label: 'Pulse Points (Wrist, Neck, Ankle)',
        chapterRef: 'Ch. 4, Lesson 1',
        description: 'Heartbeat travels through blood vessels and can be felt as a pulse at certain points: wrist, neck, and ankle.',
        x: 77,
        y: 72,
        labelX: 62,
        labelY: 82,
        zoomScale: 2.5,
        viewFilter: 'heart',
      },
      {
        id: 'kidneys-filter',
        label: 'Two Kidneys',
        chapterRef: 'Ch. 4, Lesson 2',
        description: 'Filter the blood, removing waste products and excess water to form urine.',
        x: 38,
        y: 34,
        labelX: 10,
        labelY: 22,
        zoomScale: 2.6,
        viewFilter: 'kidneys',
      },
      {
        id: 'ureters',
        label: 'Ureters',
        chapterRef: 'Ch. 4, Lesson 2',
        description: 'Tubes where urine passes from the kidneys to the urinary bladder.',
        x: 44,
        y: 56,
        labelX: 10,
        labelY: 56,
        zoomScale: 2.8,
        viewFilter: 'kidneys',
      },
      {
        id: 'urinary-bladder',
        label: 'Urinary Bladder & Urinary Tube',
        chapterRef: 'Ch. 4, Lesson 2',
        description: 'Urine is temporarily stored in the urinary bladder until it is discharged from the body through the urinary tube.',
        x: 50,
        y: 77,
        labelX: 62,
        labelY: 78,
        zoomScale: 2.8,
        viewFilter: 'kidneys',
      },
    ],
  },
  {
    id: 'leaf-stomata',
    title: 'Plant Leaf & Stomata',
    chapterLabel: 'Chapter 5, Lesson 1 & Chapter 6, Lesson 1',
    summary: 'Examine how green leaves absorb sunlight and carbon dioxide, and zoom into the underside of the leaf to observe stomata.',
    hotspots: [
      {
        id: 'leaf-blade',
        label: 'Green Leaf (Photosynthesis)',
        chapterRef: 'Ch. 5, Lesson 1',
        description: 'Green plants use light to make food (sugar stored as starch) inside their leaves using sunlight, water, and carbon dioxide gas, releasing oxygen.',
        x: 28,
        y: 44,
        labelX: 8,
        labelY: 16,
        zoomScale: 2.4,
      },
      {
        id: 'leaf-veins',
        label: 'Leaf Veins',
        chapterRef: 'Ch. 6, Lesson 2',
        description: 'Carry water absorbed by roots and transported up through the stem into the leaf.',
        x: 30,
        y: 55,
        labelX: 8,
        labelY: 82,
        zoomScale: 2.8,
      },
      {
        id: 'stomata-pore',
        label: 'Stomata (Lower Leaf Surface)',
        chapterRef: 'Ch. 6, Lesson 1',
        description: 'Small pores found mostly on the lower surface of leaves that act as exits for water vapor during transpiration.',
        x: 73,
        y: 50,
        labelX: 60,
        labelY: 16,
        zoomScale: 3.8,
      },
      {
        id: 'water-vapor-exit',
        label: 'Water Vapor Exit (Transpiration)',
        chapterRef: 'Ch. 6, Lesson 1',
        description: 'Water leaves through stomata as vapor to the air. Inside a sealed plastic bag, water vapor condenses into water drops.',
        x: 73,
        y: 68,
        labelX: 60,
        labelY: 84,
        zoomScale: 3.4,
      },
    ],
  },
  {
    id: 'plant-water-path',
    title: 'Plant Water Path: Roots, Stems & Leaves',
    chapterLabel: 'Chapter 6 · Lesson 2: The Path of Water',
    summary: 'Use the microscope / magnifying glass to trace red-colored water moving from roots through stems into leaf veins.',
    hotspots: [
      {
        id: 'roots-water',
        label: 'Roots (Immersed in Red-Colored Water)',
        chapterRef: 'Ch. 6, Lesson 2',
        description: 'Water is absorbed from the soil by roots. When washed roots are placed in red-colored water, specific parts inside the roots turn red.',
        x: 28,
        y: 78,
        labelX: 6,
        labelY: 82,
        zoomScale: 2.6,
      },
      {
        id: 'stem-vessels',
        label: 'Stem (Red-Colored Vascular Parts)',
        chapterRef: 'Ch. 6, Lesson 2',
        description: 'Water travels upward through the stem. Closer examination with a magnifying glass or microscope shows specific red-colored parts inside the stem.',
        x: 28,
        y: 50,
        labelX: 6,
        labelY: 48,
        zoomScale: 3.0,
      },
      {
        id: 'leaf-vein-red',
        label: 'Veins of Leaves (Turn Red)',
        chapterRef: 'Ch. 6, Lesson 2',
        description: 'Water reaches the leaves through the path Roots -> Stems -> Leaves, turning the leaf veins red.',
        x: 34,
        y: 25,
        labelX: 8,
        labelY: 14,
        zoomScale: 2.8,
      },
      {
        id: 'stem-cross-section',
        label: 'Microscope View: Red Parts in Stem',
        chapterRef: 'Ch. 6, Lesson 2',
        description: 'Under a microscope or magnifying glass, the specific water-transporting parts inside roots, stems, and leaf veins clearly show red color.',
        x: 74,
        y: 50,
        labelX: 58,
        labelY: 16,
        zoomScale: 3.8,
      },
    ],
  },
];

interface MicroscopeLabProps {
  initialSpecimenId?: MicroscopeSpecimenId;
  embedded?: boolean;
}

export const MicroscopeLab: React.FC<MicroscopeLabProps> = ({
  initialSpecimenId = 'respiratory-alveoli',
  embedded = false,
}) => {
  const [activeSpecimenId, setActiveSpecimenId] = useState<MicroscopeSpecimenId>(initialSpecimenId);
  const [subMode, setSubMode] = useState<string>('human');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);

  const specimen =
    MICROSCOPE_SPECIMENS.find((s) => s.id === activeSpecimenId) || MICROSCOPE_SPECIMENS[0];

  useEffect(() => {
    setActiveSpecimenId(initialSpecimenId);
  }, [initialSpecimenId]);

  useEffect(() => {
    const spec = MICROSCOPE_SPECIMENS.find((s) => s.id === activeSpecimenId);
    if (spec?.subModes && spec.subModes.length > 0) {
      setSubMode(spec.subModes[0].id);
    } else {
      setSubMode('default');
    }
    setZoomLevel(1);
    setFocusPoint({ x: 50, y: 50 });
    setSelectedHotspotId(null);
    setHoveredHotspotId(null);
  }, [activeSpecimenId]);

  const visibleHotspots = specimen.hotspots.filter(
    (h) => !h.viewFilter || h.viewFilter === subMode
  );

  const activeHotspot =
    visibleHotspots.find((h) => h.id === (hoveredHotspotId || selectedHotspotId)) ||
    visibleHotspots[0];

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspotId(hotspot.id);
    setFocusPoint({ x: hotspot.x, y: hotspot.y });
    setZoomLevel(hotspot.zoomScale);
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setFocusPoint({ x: 50, y: 50 });
    setSelectedHotspotId(null);
  };

  // Calculate CSS transform for pan & zoom around focusPoint
  const translateX = (50 - focusPoint.x) * (zoomLevel - 1);
  const translateY = (50 - focusPoint.y) * (zoomLevel - 1);

  return (
    <section className={embedded ? '' : 'max-w-[1200px] mx-auto px-4 sm:px-6 py-8'}>
      {!embedded && (
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-sky-700 mb-1">
              Interactive Microscope &amp; Anatomical Zoom
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
              Microscope &amp; Zoom Explorer
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Click or hover over any part to zoom in with pointing arrows and view exact textbook labels.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {MICROSCOPE_SPECIMENS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSpecimenId(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSpecimenId === item.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Stage (65% -> 8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          {/* Stage Top Toolbar */}
          <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
            <div className="min-w-0">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>{specimen.chapterLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-data text-slate-700">{zoomLevel.toFixed(1)}x Zoom</span>
              </div>
              <h2 className="text-base font-semibold text-slate-900 truncate">{specimen.title}</h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {specimen.subModes && (
                <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg">
                  {specimen.subModes.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSubMode(m.id);
                        handleResetZoom();
                      }}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        subMode === m.id
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-1 border border-slate-200 rounded-lg bg-white p-0.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(1, +(z - 0.5).toFixed(1)))}
                  aria-label="Zoom out"
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(2.5)}
                  className={`px-2 py-1 text-xs font-mono-data rounded transition-colors cursor-pointer ${
                    zoomLevel >= 2 && zoomLevel < 3.2
                      ? 'bg-sky-50 text-sky-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  2.5x
                </button>
                <button
                  onClick={() => setZoomLevel(3.6)}
                  className={`px-2 py-1 text-xs font-mono-data rounded transition-colors cursor-pointer ${
                    zoomLevel >= 3.2
                      ? 'bg-sky-50 text-sky-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  4x
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(4, +(z + 0.5).toFixed(1)))}
                  aria-label="Zoom in"
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  aria-label="Reset zoom"
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                  title="Reset View"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Microscope Viewport */}
          <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden select-none">
            {/* Optical grid background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at center, rgba(56,189,248,0.22) 0%, transparent 70%), linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 40px 40px, 40px 40px',
              }}
            />

            {/* Zoomable & Pannable Stage */}
            <div
              className="w-full h-full transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${translateX / zoomLevel}%, ${
                  translateY / zoomLevel
                }%)`,
                transformOrigin: 'center center',
              }}
            >
              <SpecimenSVG
                specimenId={activeSpecimenId}
                subMode={subMode}
                hotspots={visibleHotspots}
                activeHotspotId={activeHotspot?.id || null}
                onSelectHotspot={handleSelectHotspot}
                onHoverHotspot={setHoveredHotspotId}
              />
            </div>

            {/* Microscope Lens Vignette */}
            {zoomLevel > 1.2 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 90px rgba(15, 23, 42, 0.72)',
                }}
              />
            )}

            {/* Floating Active Part Callout inside Viewport */}
            {activeHotspot && (
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md bg-slate-950/90 backdrop-blur-sm border border-slate-700/80 text-white rounded-lg px-3.5 py-2.5 pointer-events-none">
                <div className="flex items-center gap-2 text-xs text-sky-300 font-medium">
                  <Crosshair className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeHotspot.chapterRef}</span>
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">{activeHotspot.label}</div>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  {activeHotspot.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Control & Concept Deck (35% -> 4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
              <Microscope className="w-4 h-4 text-sky-600" />
              <span>Labeled Specimen Parts</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{specimen.summary}</p>

            <div className="space-y-2">
              {visibleHotspots.map((spot, idx) => {
                const isActive = activeHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => handleSelectHotspot(spot)}
                    onMouseEnter={() => setHoveredHotspotId(spot.id)}
                    onMouseLeave={() => setHoveredHotspotId(null)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-sky-50 border-sky-300 text-slate-900'
                        : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {idx + 1}. {spot.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{spot.chapterRef}</div>
                    </div>
                    <ArrowUpRight
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-sky-600' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Click any pin on the diagram or list to zoom in
            </span>
            <button
              onClick={handleResetZoom}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reset View
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SpecimenSVGProps {
  specimenId: MicroscopeSpecimenId;
  subMode: string;
  hotspots: Hotspot[];
  activeHotspotId: string | null;
  onSelectHotspot: (h: Hotspot) => void;
  onHoverHotspot: (id: string | null) => void;
}

const SpecimenSVG: React.FC<SpecimenSVGProps> = ({
  specimenId,
  subMode,
  hotspots,
  activeHotspotId,
  onSelectHotspot,
  onHoverHotspot,
}) => {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <marker
          id="arrow-pointer"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#38BDF8" />
        </marker>
        <marker
          id="arrow-active"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#FBBF24" />
        </marker>
      </defs>

      {/* Specimen Artwork Layer */}
      {specimenId === 'respiratory-alveoli' && subMode === 'human' && (
        <g>
          {/* Left Panel: Human Respiratory Path */}
          <rect x="30" y="25" width="380" height="450" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="50" y="52" fill="#94A3B8" fontSize="13" fontWeight="600">
            Respiratory System Path
          </text>
          {/* Head & Nose silhouette */}
          <path
            d="M210 65 C255 65 285 95 290 125 L302 140 L290 146 L290 165 C290 175 278 182 268 182 L255 182 L255 205 L235 205 L235 165 C235 140 220 120 205 110 Z"
            fill="#1E293B"
            stroke="#64748B"
            strokeWidth="2"
          />
          {/* Nasal passage & Mouth */}
          <path d="M294 134 Q270 134 268 155" stroke="#38BDF8" strokeWidth="4" fill="none" />
          <path d="M286 156 Q272 156 268 164" stroke="#7DD3FC" strokeWidth="2.5" fill="none" />
          {/* Windpipe / Trachea */}
          <rect x="262" y="160" width="16" height="90" rx="5" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
          {[172, 184, 196, 208, 220, 232].map((ry) => (
            <line key={ry} x1="263" y1={ry} x2="277" y2={ry} stroke="#CBD5E1" strokeWidth="2" />
          ))}
          {/* Bronchi */}
          <path d="M268 248 L225 280 M272 248 L315 280" stroke="#94A3B8" strokeWidth="10" strokeLinecap="round" />
          {/* Left & Right Lungs */}
          <path
            d="M250 250 C205 250 175 300 175 365 C175 405 205 420 245 415 C255 413 260 390 258 340 Z"
            fill="#FB7185"
            fillOpacity="0.32"
            stroke="#FDA4AF"
            strokeWidth="2.5"
          />
          <path
            d="M290 250 C335 250 365 300 365 365 C365 405 335 420 295 415 C285 413 280 390 282 340 Z"
            fill="#FB7185"
            fillOpacity="0.32"
            stroke="#FDA4AF"
            strokeWidth="2.5"
          />

          {/* Right Panel: Microscope Zoom into Alveoli */}
          <rect x="435" y="25" width="335" height="450" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="455" y="52" fill="#38BDF8" fontSize="13" fontWeight="600">
            Alveoli (Air Sacs) &amp; Gas Exchange
          </text>
          {/* Alveoli cluster */}
          <path d="M590 120 L590 190" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" />
          {[
            [555, 225, 36],
            [625, 225, 36],
            [535, 275, 38],
            [595, 265, 42],
            [650, 275, 35],
            [570, 315, 36],
            [625, 315, 34],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="#F43F5E"
              fillOpacity="0.25"
              stroke="#FDA4AF"
              strokeWidth="2.5"
            />
          ))}
          {/* Blood capillary wrapping alveoli */}
          <path
            d="M475 370 C520 340 555 375 600 360 C645 345 680 385 730 355"
            fill="none"
            stroke="#EF4444"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M475 395 C520 365 555 400 600 385 C645 370 680 410 730 380"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <text x="478" y="432" fill="#BAE6FD" fontSize="12">
            O₂ moves into blood · CO₂ moves into air
          </text>
        </g>
      )}

      {specimenId === 'respiratory-alveoli' && subMode === 'organisms' && (
        <g>
          {/* Left: Fish Gills */}
          <rect x="30" y="35" width="355" height="430" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="50" y="65" fill="#38BDF8" fontSize="14" fontWeight="600">
            Fish: Gills Absorb Dissolved Oxygen
          </text>
          {/* Water waves */}
          <path d="M50 160 Q120 140 190 160 T330 160" stroke="#0284C7" strokeWidth="2" fill="none" opacity="0.5" />
          {/* Fish body */}
          <path
            d="M95 260 C150 185 260 190 315 260 C260 330 150 335 95 260 Z"
            fill="#0EA5E9"
            fillOpacity="0.25"
            stroke="#38BDF8"
            strokeWidth="2.5"
          />
          <path d="M315 260 L358 220 L350 260 L358 300 Z" fill="#0EA5E9" fillOpacity="0.35" stroke="#38BDF8" strokeWidth="2" />
          {/* Gill arches */}
          <path d="M235 232 Q255 260 235 288" stroke="#FB7185" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M248 236 Q266 260 248 284" stroke="#FDA4AF" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="145" cy="245" r="7" fill="#E2E8F0" />
          <circle cx="143" cy="245" r="3" fill="#0F172A" />
          <text x="65" y="405" fill="#CBD5E1" fontSize="13">
            Absorbs oxygen dissolved in water
          </text>

          {/* Right: Cat Lungs */}
          <rect x="415" y="35" width="355" height="430" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="435" y="65" fill="#34D399" fontSize="14" fontWeight="600">
            Cat: Breathes Air Using Lungs
          </text>
          {/* Cat outline */}
          <path
            d="M495 235 L485 185 L515 210 L545 210 L565 185 L560 235 C625 235 675 265 675 315 L675 360 L645 360 L645 320 L535 320 L535 360 L505 360 L505 285 Z"
            fill="#334155"
            fillOpacity="0.4"
            stroke="#94A3B8"
            strokeWidth="2"
          />
          {/* Cat lungs inside */}
          <ellipse cx="580" cy="272" rx="34" ry="22" fill="#FB7185" fillOpacity="0.45" stroke="#FDA4AF" strokeWidth="2" />
          <path d="M525 245 L565 266" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" />
          <text x="465" y="405" fill="#CBD5E1" fontSize="13">
            Breathes air using lungs
          </text>
        </g>
      )}

      {specimenId === 'digestive-villi' && (
        <g>
          {/* Left: Digestive Tract */}
          <rect x="25" y="20" width="390" height="460" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="45" y="46" fill="#94A3B8" fontSize="13" fontWeight="600">
            Digestive Tract (Mouth to Anus)
          </text>
          {/* Mouth */}
          <path d="M210 65 Q245 65 245 86 Q210 92 200 76 Z" fill="#FDE68A" fillOpacity="0.35" stroke="#FCD34D" strokeWidth="2" />
          {/* Pharynx & Esophagus */}
          <path d="M238 88 L244 125 L248 220" stroke="#FBBF24" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.65" />
          {/* Liver */}
          <path d="M185 225 L242 225 L220 265 L178 255 Z" fill="#B45309" fillOpacity="0.6" stroke="#F59E0B" strokeWidth="2" />
          {/* Stomach */}
          <path
            d="M250 218 C295 215 315 245 298 278 C285 298 255 292 248 272 Z"
            fill="#F97316"
            fillOpacity="0.4"
            stroke="#FDBA74"
            strokeWidth="2.5"
          />
          {/* Small intestine coiled */}
          <path
            d="M235 305 Q280 295 275 320 Q230 330 280 345 Q235 358 275 370"
            fill="none"
            stroke="#34D399"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Large intestine surrounding small intestine */}
          <path
            d="M205 385 L205 305 Q205 288 260 288 Q310 288 310 315 L310 385 L265 405 L265 435"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Right: Microscope Zoom of Villi */}
          <rect x="435" y="20" width="340" height="460" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="455" y="46" fill="#34D399" fontSize="13" fontWeight="600">
            Inner Wall of Small Intestine: Villi
          </text>
          {/* Villi finger-like bumps */}
          <path
            d="M465 375 L465 265 C465 180 515 180 515 265 L515 320 C515 230 565 155 595 155 C625 155 645 230 645 320 L645 265 C645 185 695 185 695 265 L695 375 Z"
            fill="#10B981"
            fillOpacity="0.25"
            stroke="#34D399"
            strokeWidth="3"
          />
          {/* Blood capillaries inside villi */}
          <path
            d="M490 375 L490 225 C490 205 495 205 495 225 L495 375"
            fill="none"
            stroke="#EF4444"
            strokeWidth="5"
          />
          <path
            d="M582 375 L582 185 C582 168 608 168 608 185 L608 375"
            fill="none"
            stroke="#EF4444"
            strokeWidth="6"
          />
          <path
            d="M668 375 L668 225 C668 205 674 205 674 225 L674 375"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="5"
          />
          <text x="465" y="418" fill="#A7F3D0" fontSize="12">
            Increase surface area for nutrient absorption
          </text>
          <text x="465" y="438" fill="#CBD5E1" fontSize="12">
            Blood capillaries carry nutrients to the liver
          </text>
        </g>
      )}

      {specimenId === 'organs-heart-kidneys' && subMode === 'cavities' && (
        <g>
          {/* Left: Torso front cavities */}
          <rect x="25" y="20" width="390" height="460" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="45" y="46" fill="#94A3B8" fontSize="13" fontWeight="600">
            Chest Cavity &amp; Abdomen Organs
          </text>
          {/* Ribs */}
          {[115, 140, 165, 190, 215].map((ry) => (
            <path
              key={ry}
              d={`M180 ${ry} Q250 ${ry - 12} 320 ${ry}`}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="4"
              opacity="0.35"
            />
          ))}
          {/* Lungs */}
          <ellipse cx="210" cy="168" rx="38" ry="52" fill="#FB7185" fillOpacity="0.3" stroke="#FDA4AF" strokeWidth="2" />
          <ellipse cx="295" cy="168" rx="38" ry="52" fill="#FB7185" fillOpacity="0.3" stroke="#FDA4AF" strokeWidth="2" />
          {/* Heart between lungs */}
          <path
            d="M252 155 C240 140 225 152 232 175 L252 198 L272 175 C279 152 264 140 252 155 Z"
            fill="#EF4444"
            stroke="#FCA5A5"
            strokeWidth="2"
          />
          {/* Stomach in upper abdomen */}
          <path
            d="M258 242 C300 240 315 268 295 292 C278 308 252 298 250 275 Z"
            fill="#F97316"
            fillOpacity="0.45"
            stroke="#FDBA74"
            strokeWidth="2"
          />
          {/* Small & Large intestine */}
          <path d="M225 322 Q280 315 275 340 Q225 352 275 365" fill="none" stroke="#34D399" strokeWidth="11" strokeLinecap="round" />
          <path
            d="M202 385 L202 315 Q202 298 255 298 Q305 298 305 320 L305 385"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Right: Lower Back Kidneys */}
          <rect x="435" y="20" width="340" height="460" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="455" y="46" fill="#38BDF8" fontSize="13" fontWeight="600">
            Lower Back: Two Kidneys &amp; Backbone
          </text>
          {/* Backbone */}
          <rect x="595" y="95" width="22" height="310" rx="6" fill="#475569" stroke="#CBD5E1" strokeWidth="2" />
          {[120, 155, 190, 225, 260, 295, 330, 365].map((vy) => (
            <line key={vy} x1="595" y1={vy} x2="617" y2={vy} stroke="#94A3B8" strokeWidth="2" />
          ))}
          {/* Two Kidneys */}
          <path
            d="M545 270 C515 270 505 335 545 345 C565 348 570 325 562 308 C570 292 565 270 545 270 Z"
            fill="#E11D48"
            fillOpacity="0.55"
            stroke="#FDA4AF"
            strokeWidth="2.5"
          />
          <path
            d="M667 270 C697 270 707 335 667 345 C647 348 642 325 650 308 C642 292 647 270 667 270 Z"
            fill="#E11D48"
            fillOpacity="0.55"
            stroke="#FDA4AF"
            strokeWidth="2.5"
          />
          <text x="465" y="438" fill="#CBD5E1" fontSize="12">
            All organs connected by blood vessels
          </text>
        </g>
      )}

      {specimenId === 'organs-heart-kidneys' && subMode === 'heart' && (
        <g>
          <rect x="30" y="25" width="740" height="450" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="55" y="55" fill="#FDA4AF" fontSize="14" fontWeight="600">
            Heart &amp; Blood Circulation (Red = Oxygen-rich · Blue = Carbon dioxide-rich)
          </text>
          {/* Blue vessel (CO2 rich) */}
          <path
            d="M360 120 L360 190 M220 350 C220 260 300 220 355 220"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Red vessel (O2 rich) */}
          <path
            d="M440 120 L440 190 M445 220 C510 220 595 260 615 360"
            fill="none"
            stroke="#EF4444"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Central Heart Pump */}
          <path
            d="M400 185 C365 140 315 170 335 240 L400 325 L465 240 C485 170 435 140 400 185 Z"
            fill="#DC2626"
            fillOpacity="0.8"
            stroke="#FCA5A5"
            strokeWidth="3"
          />
          {/* Pulse Ring on wrist */}
          <circle cx="615" cy="360" r="24" fill="#EF4444" fillOpacity="0.2" stroke="#FCA5A5" strokeWidth="2" />
          <text x="55" y="445" fill="#CBD5E1" fontSize="13">
            Heart pumps blood through blood vessels; pulse felt at wrist, neck, and ankle.
          </text>
        </g>
      )}

      {specimenId === 'organs-heart-kidneys' && subMode === 'kidneys' && (
        <g>
          <rect x="30" y="25" width="740" height="450" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="55" y="55" fill="#38BDF8" fontSize="14" fontWeight="600">
            Urinary System: Blood Filtration &amp; Excretion
          </text>
          {/* Blood vessels */}
          <line x1="395" y1="90" x2="395" y2="230" stroke="#EF4444" strokeWidth="10" />
          <line x1="412" y1="90" x2="412" y2="230" stroke="#3B82F6" strokeWidth="10" />
          {/* Left & Right Kidneys */}
          <path
            d="M320 130 C275 130 265 215 320 225 C345 228 350 200 340 178 C350 156 345 130 320 130 Z"
            fill="#E11D48"
            fillOpacity="0.7"
            stroke="#FDA4AF"
            strokeWidth="3"
          />
          <path
            d="M485 130 C530 130 540 215 485 225 C460 228 455 200 465 178 C455 156 460 130 485 130 Z"
            fill="#E11D48"
            fillOpacity="0.7"
            stroke="#FDA4AF"
            strokeWidth="3"
          />
          {/* Ureters */}
          <path d="M335 195 Q365 280 382 345" fill="none" stroke="#FBBF24" strokeWidth="7" strokeLinecap="round" />
          <path d="M470 195 Q440 280 422 345" fill="none" stroke="#FBBF24" strokeWidth="7" strokeLinecap="round" />
          {/* Urinary Bladder & Tube */}
          <ellipse cx="402" cy="375" rx="45" ry="34" fill="#F59E0B" fillOpacity="0.45" stroke="#FCD34D" strokeWidth="3" />
          <line x1="402" y1="409" x2="402" y2="445" stroke="#FCD34D" strokeWidth="8" strokeLinecap="round" />
        </g>
      )}

      {specimenId === 'leaf-stomata' && (
        <g>
          {/* Left: Whole Leaf */}
          <rect x="25" y="25" width="380" height="450" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="45" y="55" fill="#34D399" fontSize="13" fontWeight="600">
            Green Leaf (Photosynthesis &amp; Veins)
          </text>
          {/* Sun */}
          <circle cx="95" cy="115" r="24" fill="#FBBF24" />
          <path d="M128 138 L175 175" stroke="#FDE047" strokeWidth="3" markerEnd="url(#arrow-active)" />
          {/* Leaf shape */}
          <path
            d="M115 340 C120 190 220 130 330 140 C320 265 255 345 115 340 Z"
            fill="#10B981"
            fillOpacity="0.35"
            stroke="#34D399"
            strokeWidth="3"
          />
          {/* Midrib and veins */}
          <path d="M90 365 Q205 245 320 148" fill="none" stroke="#A7F3D0" strokeWidth="4" />
          <path d="M175 275 L165 215 M215 240 L205 180 M255 205 L245 155" fill="none" stroke="#6EE7B7" strokeWidth="2.5" />
          <path d="M190 265 L245 270 M225 230 L280 235" fill="none" stroke="#6EE7B7" strokeWidth="2.5" />

          {/* Right: Microscope Zoom of Stomata */}
          <rect x="425" y="25" width="350" height="450" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="445" y="55" fill="#38BDF8" fontSize="13" fontWeight="600">
            Microscope: Stomata on Lower Leaf Surface
          </text>
          {/* Leaf cells grid */}
          <rect x="465" y="105" width="270" height="270" rx="18" fill="#065F46" fillOpacity="0.45" stroke="#10B981" strokeWidth="2" />
          {/* Stoma opening */}
          <path
            d="M555 250 C555 185 592 185 595 250 C592 315 555 315 555 250 Z"
            fill="#34D399"
            fillOpacity="0.6"
            stroke="#A7F3D0"
            strokeWidth="2.5"
          />
          <path
            d="M645 250 C645 185 608 185 605 250 C608 315 645 315 645 250 Z"
            fill="#34D399"
            fillOpacity="0.6"
            stroke="#A7F3D0"
            strokeWidth="2.5"
          />
          <ellipse cx="600" cy="250" rx="14" ry="36" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          {/* Water vapor leaving */}
          <path d="M600 285 L600 355" stroke="#38BDF8" strokeWidth="3" strokeDasharray="5 5" markerEnd="url(#arrow-pointer)" />
          <text x="470" y="425" fill="#BAE6FD" fontSize="12">
            Water vapor exits through stomata pores
          </text>
        </g>
      )}

      {specimenId === 'plant-water-path' && (
        <g>
          {/* Left: Whole Plant in Red-Colored Water */}
          <rect x="25" y="25" width="380" height="450" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="45" y="55" fill="#FDA4AF" fontSize="13" fontWeight="600">
            Path of Water: Roots → Stems → Leaves
          </text>
          {/* Beaker with red water */}
          <path d="M145 315 L155 435 L295 435 L305 315" fill="none" stroke="#94A3B8" strokeWidth="3" />
          <rect x="152" y="348" width="146" height="84" fill="#EF4444" fillOpacity="0.35" />
          {/* Roots */}
          <path
            d="M225 350 L200 400 M225 350 L225 415 M225 350 L255 402 M210 380 L185 415"
            stroke="#F87171"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Stem */}
          <rect x="218" y="150" width="14" height="200" fill="#10B981" fillOpacity="0.4" stroke="#34D399" strokeWidth="2" />
          {/* Red water channel inside stem */}
          <line x1="225" y1="350" x2="225" y2="155" stroke="#EF4444" strokeWidth="4" />
          {/* Leaves with red veins */}
          <path d="M232 165 C270 105 335 100 355 135 C325 180 265 185 232 165 Z" fill="#10B981" fillOpacity="0.45" stroke="#34D399" strokeWidth="2" />
          <path d="M232 165 L335 135 M275 152 L285 120 M295 147 L315 160" stroke="#EF4444" strokeWidth="2.5" />
          <path d="M218 205 C180 155 125 155 105 190 C135 225 185 225 218 205 Z" fill="#10B981" fillOpacity="0.45" stroke="#34D399" strokeWidth="2" />
          <path d="M218 205 L125 190" stroke="#EF4444" strokeWidth="2.5" />

          {/* Right: Microscope Zoom of Stem & Leaf Veins */}
          <rect x="425" y="25" width="350" height="450" rx="16" fill="#0F172A" stroke="#334155" />
          <text x="445" y="55" fill="#38BDF8" fontSize="13" fontWeight="600">
            Microscope / Magnifying Glass View
          </text>
          {/* Circular Lens */}
          <circle cx="600" cy="245" r="125" fill="#064E3B" fillOpacity="0.4" stroke="#34D399" strokeWidth="4" />
          {/* Stem cross-section red vascular tubes */}
          {[
            [560, 185],
            [640, 185],
            [540, 245],
            [660, 245],
            [565, 305],
            [635, 305],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="18" fill="#EF4444" fillOpacity="0.8" stroke="#FCA5A5" strokeWidth="2.5" />
              <circle cx={cx} cy={cy} r="7" fill="#FEE2E2" />
            </g>
          ))}
          <text x="460" y="425" fill="#FCA5A5" fontSize="12">
            Specific parts in roots, stems &amp; leaf veins turn red
          </text>
        </g>
      )}

      {/* Hotspot Pins & Pointing Arrows */}
      {hotspots.map((spot) => {
        const cx = (spot.x / 100) * 800;
        const cy = (spot.y / 100) * 500;
        const lx = (spot.labelX / 100) * 800;
        const ly = (spot.labelY / 100) * 500;
        const isActive = activeHotspotId === spot.id;

        return (
          <g
            key={spot.id}
            className="cursor-pointer"
            onClick={() => onSelectHotspot(spot)}
            onMouseEnter={() => onHoverHotspot(spot.id)}
            onMouseLeave={() => onHoverHotspot(null)}
          >
            {/* Pointing Leader Arrow */}
            <line
              x1={lx + 60}
              y1={ly}
              x2={cx}
              y2={cy}
              stroke={isActive ? '#FBBF24' : '#38BDF8'}
              strokeWidth={isActive ? '2.5' : '1.5'}
              strokeDasharray={isActive ? undefined : '4 3'}
              markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow-pointer)'}
            />

            {/* Label Tag */}
            <rect
              x={lx}
              y={ly - 13}
              width={Math.min(200, Math.max(96, spot.label.length * 7.2 + 18))}
              height="24"
              rx="4"
              fill={isActive ? '#FBBF24' : '#0F172A'}
              stroke={isActive ? '#FDE68A' : '#38BDF8'}
              strokeWidth="1.5"
            />
            <text
              x={lx + 9}
              y={ly + 3}
              fill={isActive ? '#0F172A' : '#F8FAFC'}
              fontSize="11.5"
              fontWeight="600"
            >
              {spot.label}
            </text>

            {/* Target Pin */}
            <circle
              cx={cx}
              cy={cy}
              r={isActive ? 11 : 8}
              fill={isActive ? '#FBBF24' : '#38BDF8'}
              fillOpacity="0.28"
              stroke={isActive ? '#FBBF24' : '#38BDF8'}
              strokeWidth="2"
            />
            <circle cx={cx} cy={cy} r="3.5" fill={isActive ? '#FBBF24' : '#FFFFFF'} />
          </g>
        );
      })}
    </svg>
  );
};
