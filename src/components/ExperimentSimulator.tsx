import React, { useState, useEffect } from 'react';
import { FlaskConical, Play, RotateCcw, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { ExperimentId } from '../data/curriculum';

export interface ExperimentMeta {
  id: ExperimentId;
  title: string;
  chapterRef: string;
  materials: string[];
}

export const EXPERIMENTS_LIST: ExperimentMeta[] = [
  {
    id: 'burning-air',
    title: 'The Role of Air in Burning Things',
    chapterRef: 'Chapter 1 · Lesson 1',
    materials: ['Wooden board', 'Clay', 'Candle', 'Bottomless glass jar', 'Metal lid', 'Lighter'],
  },
  {
    id: 'burning-gases',
    title: 'Effect of Different Gases on Burning',
    chapterRef: 'Chapter 1 · Lesson 2',
    materials: ['Oxygen jar (21%)', 'Nitrogen jar (78%)', 'Carbon dioxide jar (0.04%)', 'Burning candle', 'Gas Detector Tube / Gas Monitor'],
  },
  {
    id: 'limewater-test',
    title: 'Detecting Carbon Dioxide After Burning (Limewater Test)',
    chapterRef: 'Chapter 1 · Lesson 3',
    materials: ['Jar (1) with burned candle', 'Jar (2) control', 'Clear limewater', 'Safety goggles'],
  },
  {
    id: 'breathing-stages',
    title: 'How Breathing Works: Inhalation & Exhalation',
    chapterRef: 'Chapter 2 · Lesson 1',
    materials: ['Human chest cavity', 'Lungs', 'Inhaled air vs Exhaled air'],
  },
  {
    id: 'saliva-starch',
    title: 'Saliva Changes Starch (Iodine Test)',
    chapterRef: 'Chapter 3 · Lesson 2',
    materials: ['2 test tubes warmed at 40°C', 'Dilute starch solution', 'Cotton swab soaked with saliva', 'Water', 'Iodine solution'],
  },
  {
    id: 'sunlight-starch',
    title: 'Sunlight and Starch in Leaves',
    chapterRef: 'Chapter 5 · Lesson 1',
    materials: ['Green plant leaves', 'Light-blocking cover', 'Sunlight', 'Ethanol', 'Iodine solution'],
  },
  {
    id: 'plant-gas-exchange',
    title: 'Gas Exchange in Plants (Day vs Night & Bag Test)',
    chapterRef: 'Chapter 5 · Lesson 2',
    materials: ['Green plant', 'Plastic bag', 'Sunlight vs Darkness', 'Gas composition check'],
  },
  {
    id: 'transpiration-bag',
    title: 'Transpiration in Plants',
    chapterRef: 'Chapter 6 · Lesson 1',
    materials: ['Plant (1) with leaves', 'Plant (2) with all leaves removed', '2 sealed plastic bags', 'Sunny place'],
  },
  {
    id: 'colored-water-path',
    title: 'Observing the Path of Water Inside a Plant',
    chapterRef: 'Chapter 6 · Lesson 2',
    materials: ['Plant with washed roots', 'Red-colored water', 'Magnifying glass or microscope'],
  },
];

interface ExperimentSimulatorProps {
  initialExperimentId?: ExperimentId;
  embedded?: boolean;
}

export const ExperimentSimulator: React.FC<ExperimentSimulatorProps> = ({
  initialExperimentId = 'burning-air',
  embedded = false,
}) => {
  const [activeId, setActiveId] = useState<ExperimentId>(initialExperimentId);

  // Per-experiment interactive states
  const [burningSetup, setBurningSetup] = useState<'open' | 'closed' | 'bottom-gap' | 'top-bottom'>('open');
  const [gasJar, setGasJar] = useState<'none' | 'oxygen' | 'nitrogen' | 'co2'>('none');
  const [gasTool, setGasTool] = useState<'none' | 'detector-tube' | 'gas-monitor'>('none');
  const [limeStep, setLimeStep] = useState<0 | 1 | 2>(0);
  const [breathStage, setBreathStage] = useState<'inhale' | 'exhale'>('inhale');
  const [salivaStep, setSalivaStep] = useState<0 | 1 | 2>(0);
  const [sunlightStep, setSunlightStep] = useState<0 | 1 | 2 | 3>(0);
  const [plantMode, setPlantMode] = useState<'day' | 'night' | 'bag-test'>('day');
  const [bagStep, setBagStep] = useState<0 | 1 | 2>(0);
  const [transpStep, setTranspStep] = useState<0 | 1 | 2>(0);
  const [waterStep, setWaterStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    setActiveId(initialExperimentId);
  }, [initialExperimentId]);

  const activeMeta = EXPERIMENTS_LIST.find((e) => e.id === activeId) || EXPERIMENTS_LIST[0];

  const resetCurrentExperiment = () => {
    setBurningSetup('open');
    setGasJar('none');
    setGasTool('none');
    setLimeStep(0);
    setBreathStage('inhale');
    setSalivaStep(0);
    setSunlightStep(0);
    setPlantMode('day');
    setBagStep(0);
    setTranspStep(0);
    setWaterStep(0);
  };

  return (
    <section className={embedded ? '' : 'max-w-[1200px] mx-auto px-4 sm:px-6 py-8'}>
      {!embedded && (
        <div className="mb-6">
          <p className="text-xs font-medium text-amber-700 mb-1">
            Interactive Science Activities
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
            Experiments Simulation Lab
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            Step through textbook materials, perform actions, and record real-time observations and conclusions.
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {EXPERIMENTS_LIST.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeId === exp.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {exp.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Interactive Stage (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/70">
            <div className="min-w-0">
              <div className="text-xs text-slate-500">{activeMeta.chapterRef}</div>
              <h2 className="text-base font-semibold text-slate-900 truncate">{activeMeta.title}</h2>
            </div>
            <button
              onClick={resetCurrentExperiment}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          {/* Visual Canvas */}
          <div className="flex-1 bg-slate-900 p-4 flex items-center justify-center min-h-[340px]">
            {activeId === 'burning-air' && <BurningAirSVG setup={burningSetup} />}
            {activeId === 'burning-gases' && <BurningGasesSVG gasJar={gasJar} gasTool={gasTool} />}
            {activeId === 'limewater-test' && <LimewaterSVG step={limeStep} />}
            {activeId === 'breathing-stages' && <BreathingSVG stage={breathStage} />}
            {activeId === 'saliva-starch' && <SalivaStarchSVG step={salivaStep} />}
            {activeId === 'sunlight-starch' && <SunlightStarchSVG step={sunlightStep} />}
            {activeId === 'plant-gas-exchange' && (
              <PlantGasSVG mode={plantMode} bagStep={bagStep} />
            )}
            {activeId === 'transpiration-bag' && <TranspirationSVG step={transpStep} />}
            {activeId === 'colored-water-path' && <ColoredWaterSVG step={waterStep} />}
          </div>
        </div>

        {/* Right Control & Concept Deck (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-5">
          <div className="space-y-5">
            {/* Materials */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Materials
              </div>
              <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5">
                {activeMeta.materials.join(' · ')}
              </div>
            </div>

            {/* Interactive Controls per Experiment */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Interactive Steps &amp; Controls
              </div>

              {activeId === 'burning-air' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'open', label: '1. Lit Candle on Clay' },
                    { id: 'closed', label: '2. Close Jar with Metal Lid' },
                    { id: 'bottom-gap', label: '3. Small Gap at Bottom' },
                    { id: 'top-bottom', label: '4. Gap at Top & Bottom' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setBurningSetup(btn.id as typeof burningSetup)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        burningSetup === btn.id
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              )}

              {activeId === 'burning-gases' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'oxygen', label: 'Oxygen Jar' },
                      { id: 'nitrogen', label: 'Nitrogen Jar' },
                      { id: 'co2', label: 'CO₂ Jar' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setGasJar(btn.id as typeof gasJar)}
                        className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                          gasJar === btn.id
                            ? 'bg-sky-600 text-white border-sky-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-xs text-slate-500 mb-1.5">Let&apos;s Expand Tools:</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setGasTool(gasTool === 'detector-tube' ? 'none' : 'detector-tube')
                        }
                        className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                          gasTool === 'detector-tube'
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Gas Detector Tube
                      </button>
                      <button
                        onClick={() =>
                          setGasTool(gasTool === 'gas-monitor' ? 'none' : 'gas-monitor')
                        }
                        className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                          gasTool === 'gas-monitor'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Gas Monitor
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeId === 'limewater-test' && (
                <div className="space-y-2">
                  {[
                    { step: 0, label: 'Step 1: Wear Safety Goggles & Prepare Jars' },
                    { step: 1, label: 'Step 2: Burn Candle in Jar (1) Until Out' },
                    { step: 2, label: 'Step 3: Shake Clear Limewater in Jar (1) & Jar (2)' },
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setLimeStep(s.step as 0 | 1 | 2)}
                      className={`w-full px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        limeStep === s.step
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {activeId === 'breathing-stages' && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBreathStage('inhale')}
                    className={`px-3 py-2.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      breathStage === 'inhale'
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    1. Inhalation (Breathing in)
                  </button>
                  <button
                    onClick={() => setBreathStage('exhale')}
                    className={`px-3 py-2.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      breathStage === 'exhale'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    2. Exhalation (Breathing out)
                  </button>
                </div>
              )}

              {activeId === 'saliva-starch' && (
                <div className="space-y-2">
                  {[
                    { step: 0, label: 'Step 1: Warm Dilute Starch Tubes at 40°C' },
                    { step: 1, label: 'Step 2: Add Saliva Swab to Tube 1 & Water to Tube 2' },
                    { step: 2, label: 'Step 3: Add Iodine Solution to Both Tubes' },
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setSalivaStep(s.step as 0 | 1 | 2)}
                      className={`w-full px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        salivaStep === s.step
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {activeId === 'sunlight-starch' && (
                <div className="space-y-2">
                  {[
                    { step: 0, label: 'Step 1: Block Light Beforehand (Remove Stored Starch)' },
                    { step: 1, label: 'Step 2: Expose Leaf to Sunlight (Keep Part Covered)' },
                    { step: 2, label: 'Step 3: Wash in Ethanol (Remove Green Color)' },
                    { step: 3, label: 'Step 4: Add Iodine Solution to Test Starch' },
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setSunlightStep(s.step as 0 | 1 | 2 | 3)}
                      className={`w-full px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        sunlightStep === s.step
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {activeId === 'plant-gas-exchange' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPlantMode('day')}
                      className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        plantMode === 'day'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      During Day
                    </button>
                    <button
                      onClick={() => setPlantMode('night')}
                      className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        plantMode === 'night'
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      At Night
                    </button>
                    <button
                      onClick={() => setPlantMode('bag-test')}
                      className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        plantMode === 'bag-test'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Bag Activity
                    </button>
                  </div>

                  {plantMode === 'bag-test' && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {[
                        { s: 0, label: '1. Put Bag Over Plant' },
                        { s: 1, label: '2. Blow Into Bag (CO₂ Increases)' },
                        { s: 2, label: '3. Expose to Sunlight for 1 Hour' },
                      ].map((item) => (
                        <button
                          key={item.s}
                          onClick={() => setBagStep(item.s as 0 | 1 | 2)}
                          className={`w-full px-3 py-1.5 text-xs font-medium rounded-md border text-left cursor-pointer ${
                            bagStep === item.s
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeId === 'transpiration-bag' && (
                <div className="space-y-2">
                  {[
                    { step: 0, label: 'Step 1: Plant (1) With Leaves vs Plant (2) Without Leaves' },
                    { step: 1, label: 'Step 2: Cover Both in Plastic Bags & Place in Sun' },
                    { step: 2, label: 'Step 3: Observe Inside Surface of Plastic Bags' },
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setTranspStep(s.step as 0 | 1 | 2)}
                      className={`w-full px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        transpStep === s.step
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {activeId === 'colored-water-path' && (
                <div className="space-y-2">
                  {[
                    { step: 0, label: 'Step 1: Prepare Plant & Red-Colored Water' },
                    { step: 1, label: 'Step 2: Immerse Washed Roots in Red-Colored Water' },
                    { step: 2, label: 'Step 3: Examine with Magnifying Glass / Microscope' },
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setWaterStep(s.step as 0 | 1 | 2)}
                      className={`w-full px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        waterStep === s.step
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Observation & Conclusion */}
            <ExperimentObservationBox
              activeId={activeId}
              burningSetup={burningSetup}
              gasJar={gasJar}
              gasTool={gasTool}
              limeStep={limeStep}
              breathStage={breathStage}
              salivaStep={salivaStep}
              sunlightStep={sunlightStep}
              plantMode={plantMode}
              bagStep={bagStep}
              transpStep={transpStep}
              waterStep={waterStep}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperimentObservationBox: React.FC<{
  activeId: ExperimentId;
  burningSetup: string;
  gasJar: string;
  gasTool: string;
  limeStep: number;
  breathStage: string;
  salivaStep: number;
  sunlightStep: number;
  plantMode: string;
  bagStep: number;
  transpStep: number;
  waterStep: number;
}> = (props) => {
  let observation = '';
  let conclusion = '';

  switch (props.activeId) {
    case 'burning-air':
      if (props.burningSetup === 'open') {
        observation = 'Candle is fixed on clay on a wooden board and covered with a bottomless glass jar (top open).';
      } else if (props.burningSetup === 'closed') {
        observation = 'Flame weakens and goes out because the air inside is used up and not renewed.';
      } else if (props.burningSetup === 'bottom-gap') {
        observation = 'Flame goes out after a slightly longer time.';
      } else {
        observation = 'Flame continues to burn because air is constantly renewed from outside (flows in and out).';
      }
      conclusion = 'Air has a role in burning. Fresh air must constantly flow in and out for things to continue burning.';
      break;

    case 'burning-gases':
      if (props.gasJar === 'none') {
        observation = 'Select Oxygen jar, Nitrogen jar, or Carbon dioxide jar to test how each gas affects burning.';
      } else if (props.gasJar === 'oxygen') {
        observation = 'Oxygen jar (21% of air): Flame becomes stronger, brighter, and goes out after a long period of time.';
      } else if (props.gasJar === 'nitrogen') {
        observation = 'Nitrogen jar (78% of air): Flame gradually weakens and goes out.';
      } else {
        observation = 'Carbon dioxide jar (0.04% of air): Flame goes out quickly.';
      }
      if (props.gasTool === 'detector-tube') {
        observation += ' [Gas Detector Tube: Changes color when reacting with a specific gas to measure its amount/percentage.]';
      } else if (props.gasTool === 'gas-monitor') {
        observation += ' [Gas Monitor: Uses a sensor to show percentage on a screen in digital numbers.]';
      }
      conclusion = 'Oxygen helps things in burning. Nitrogen and carbon dioxide do not help things in burning.';
      break;

    case 'limewater-test':
      if (props.limeStep === 0) {
        observation = 'Safety goggles protect eyes from limewater splashes. Limewater is a colorless clear liquid.';
      } else if (props.limeStep === 1) {
        observation = 'The candle burns inside Jar (1) until the flame goes out. Oxygen decreases while carbon dioxide increases.';
      } else {
        observation = 'Shaking limewater in Jar (1) turns it milky white. Jar (2) control remains clear.';
      }
      conclusion = 'Burning produces carbon dioxide gas and its percentage increases in the air surrounding the burning object, turning limewater milky white.';
      break;

    case 'breathing-stages':
      if (props.breathStage === 'inhale') {
        observation = 'Inhalation (Breathing in): Air containing oxygen enters the body. Chest moves up. Inhaled air contains a large amount of oxygen and a small amount of carbon dioxide.';
      } else {
        observation = 'Exhalation (Breathing out): Air containing carbon dioxide leaves the body. Chest moves down. Exhaled air contains a large amount of carbon dioxide and a small amount of oxygen.';
      }
      conclusion = 'Breathing (Respiration) is the process by which the body takes in oxygen and lets out (gets rid of) carbon dioxide.';
      break;

    case 'saliva-starch':
      if (props.salivaStep === 0) {
        observation = 'Test tubes are placed in warm water at 40 degrees Celsius to match the temperature inside the human body.';
      } else if (props.salivaStep === 1) {
        observation = 'Tube 1 has dilute starch + cotton swab soaked with saliva. Tube 2 has dilute starch + water.';
      } else {
        observation = 'Tube 1 (saliva): Iodine color does not change to blue-black because starch disappeared and changed into sugar. Tube 2 (water): Starch remains, iodine turns blue-black.';
      }
      conclusion = 'Saliva is a digestive juice that digests starch and changes it into sugar.';
      break;

    case 'sunlight-starch':
      if (props.sunlightStep === 0) {
        observation = 'Blocking light beforehand removes previously stored starch from the leaf.';
      } else if (props.sunlightStep === 1) {
        observation = 'Sunlight is absorbed by the exposed leaf part, while the blocked part receives no light.';
      } else if (props.sunlightStep === 2) {
        observation = 'Ethanol removes the green color so the iodine color change can be clearly observed.';
      } else {
        observation = 'Iodine turns blue-black only on the leaf part exposed to sunlight (starch present). Blocked part does not make food.';
      }
      conclusion = 'Photosynthesis is a process in which green plants use light to make food (sugar stored as starch) inside their leaves and release oxygen.';
      break;

    case 'plant-gas-exchange':
      if (props.plantMode === 'day') {
        observation = 'During day (Light present): Photosynthesis and respiration occur together. Photosynthesis is more active. Plant takes in carbon dioxide and releases oxygen at a greater rate than it uses oxygen during respiration.';
      } else if (props.plantMode === 'night') {
        observation = 'At night (Light absent): Plant continues to respire. Photosynthesis stops. Plant takes in oxygen and releases carbon dioxide.';
      } else {
        if (props.bagStep === 0) observation = 'Plastic bag placed over plant.';
        else if (props.bagStep === 1) observation = 'Blowing into the bag causes carbon dioxide to increase.';
        else observation = 'After leaving plant exposed to sunlight for an hour: oxygen increases, carbon dioxide decreased.';
      }
      conclusion = 'Air is important for plant life for both photosynthesis and respiration.';
      break;

    case 'transpiration-bag':
      if (props.transpStep === 0) {
        observation = 'Plant (1) has leaves. Plant (2) has all leaves removed.';
      } else if (props.transpStep === 1) {
        observation = 'Both plants are covered in sealed plastic bags and placed in a sunny place.';
      } else {
        observation = 'Plant (1) forms water drops inside the bag; Plant (2) does not form water drops.';
      }
      conclusion = 'Plant carries out transpiration, during which water leaves through stomata as vapor and condenses into water drops on the inside surface of the plastic bag.';
      break;

    case 'colored-water-path':
      if (props.waterStep === 0) {
        observation = 'When a wilted plant is watered, its leaves recover because water is transported to them.';
      } else if (props.waterStep === 1) {
        observation = 'Washed roots of the plant are immersed in red-colored water.';
      } else {
        observation = 'Examination with a magnifying glass or microscope shows specific parts in roots, stems, and veins of leaves turn red.';
      }
      conclusion = 'Path of water inside a plant: Roots -> Stems -> Leaves.';
      break;
  }

  return (
    <div className="space-y-3 pt-3 border-t border-slate-200">
      <div className="bg-sky-50/70 border border-sky-200 rounded-lg p-3.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-900 mb-1">
          <Eye className="w-3.5 h-3.5 text-sky-600" />
          Observation
        </div>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{observation}</p>
      </div>
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Conclusion
        </div>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{conclusion}</p>
      </div>
    </div>
  );
};

/* --- Interactive Experiment SVG Components --- */

const BurningAirSVG: React.FC<{ setup: 'open' | 'closed' | 'bottom-gap' | 'top-bottom' }> = ({ setup }) => {
  const flameAlive = setup === 'open' || setup === 'top-bottom';
  const weakFlame = setup === 'bottom-gap';
  return (
    <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto">
      {/* Wooden board */}
      <rect x="80" y="255" width="340" height="22" rx="4" fill="#92400E" stroke="#B45309" strokeWidth="2" />
      {/* Clay */}
      <ellipse cx="250" cy="252" rx="40" ry="10" fill="#D97706" />
      {/* Gap blocks when bottom-gap or top-bottom */}
      {(setup === 'bottom-gap' || setup === 'top-bottom') && (
        <>
          <rect x="172" y="242" width="22" height="13" fill="#64748B" />
          <rect x="306" y="242" width="22" height="13" fill="#64748B" />
        </>
      )}
      {/* Candle */}
      <rect x="236" y="175" width="28" height="75" rx="3" fill="#FEF3C7" stroke="#FDE68A" />
      <line x1="250" y1="175" x2="250" y2="165" stroke="#1E293B" strokeWidth="2" />
      {/* Flame */}
      {flameAlive && (
        <path d="M250 120 C264 142 262 165 250 165 C238 165 236 142 250 120 Z" fill="#F59E0B">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="0.9s" repeatCount="indefinite" />
        </path>
      )}
      {weakFlame && (
        <path d="M250 142 C258 152 257 165 250 165 C243 165 242 152 250 142 Z" fill="#FBBF24" opacity="0.6" />
      )}
      {setup === 'closed' && (
        <path d="M250 158 Q255 140 245 125" stroke="#94A3B8" strokeWidth="2.5" fill="none" strokeDasharray="3 3" />
      )}
      {/* Bottomless glass jar */}
      <path
        d={`M185 85 L185 ${setup === 'bottom-gap' || setup === 'top-bottom' ? 242 : 255} M315 85 L315 ${
          setup === 'bottom-gap' || setup === 'top-bottom' ? 242 : 255
        }`}
        stroke="#BAE6FD"
        strokeWidth="4"
      />
      <rect
        x="185"
        y="85"
        width="130"
        height={setup === 'bottom-gap' || setup === 'top-bottom' ? 157 : 170}
        fill="#38BDF8"
        fillOpacity="0.1"
      />
      {/* Metal Lid */}
      {(setup === 'closed' || setup === 'bottom-gap') && (
        <rect x="178" y="75" width="144" height="10" rx="2" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="1.5" />
      )}
      {/* Air renewal arrows */}
      {setup === 'top-bottom' && (
        <>
          <path d="M145 248 L195 248" stroke="#38BDF8" strokeWidth="3" />
          <path d="M250 75 L250 40" stroke="#38BDF8" strokeWidth="3" />
          <text x="110" y="232" fill="#7DD3FC" fontSize="11">Fresh air in</text>
          <text x="262" y="55" fill="#7DD3FC" fontSize="11">Air out (renewed)</text>
        </>
      )}
    </svg>
  );
};

const BurningGasesSVG: React.FC<{ gasJar: string; gasTool: string }> = ({ gasJar, gasTool }) => {
  const digitalReading =
    gasJar === 'oxygen' ? 'O₂: 99%' : gasJar === 'nitrogen' ? 'N₂: 99%' : gasJar === 'co2' ? 'CO₂: 99%' : 'O₂: 21% · N₂: 78%';
  return (
    <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto">
      {/* Air composition bar */}
      <rect x="40" y="20" width="420" height="28" rx="6" fill="#1E293B" stroke="#334155" />
      <rect x="40" y="20" width="327" height="28" rx="4" fill="#64748B" />
      <rect x="367" y="20" width="88" height="28" fill="#0284C7" />
      <rect x="455" y="20" width="5" height="28" fill="#F59E0B" />
      <text x="52" y="38" fill="#FFFFFF" fontSize="11" fontWeight="600">Nitrogen 78%</text>
      <text x="374" y="38" fill="#FFFFFF" fontSize="11" fontWeight="600">O₂ 21%</text>
      <text x="350" y="64" fill="#FBBF24" fontSize="11">Carbon dioxide 0.04%</text>

      {/* Gas Jar */}
      <rect x="175" y="90" width="150" height="175" rx="8" fill="#38BDF8" fillOpacity="0.12" stroke="#BAE6FD" strokeWidth="3" />
      <text x="250" y="112" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="600">
        {gasJar === 'none'
          ? 'Atmospheric Air Jar'
          : gasJar === 'oxygen'
          ? 'Oxygen Gas Jar'
          : gasJar === 'nitrogen'
          ? 'Nitrogen Gas Jar'
          : 'Carbon Dioxide Jar'}
      </text>
      {/* Candle */}
      <rect x="238" y="185" width="24" height="75" fill="#FEF3C7" />
      {gasJar === 'oxygen' && (
        <path d="M250 118 C272 145 270 180 250 180 C230 180 228 145 250 118 Z" fill="#FBBF24" />
      )}
      {gasJar === 'none' && (
        <path d="M250 142 C260 158 260 180 250 180 C240 180 240 158 250 142 Z" fill="#F59E0B" />
      )}
      {gasJar === 'nitrogen' && (
        <path d="M250 162 C256 170 255 180 250 180 C245 180 244 170 250 162 Z" fill="#F59E0B" opacity="0.4" />
      )}
      {gasJar === 'co2' && (
        <text x="250" y="168" textAnchor="middle" fill="#FCA5A5" fontSize="12" fontWeight="600">
          Flame Out Quickly
        </text>
      )}

      {/* Optional Gas Tools */}
      {gasTool === 'detector-tube' && (
        <g>
          <rect x="355" y="140" width="115" height="24" rx="12" fill="#E2E8F0" stroke="#94A3B8" />
          <rect
            x="365"
            y="144"
            width="65"
            height="16"
            rx="8"
            fill={gasJar === 'co2' ? '#8B5CF6' : gasJar === 'oxygen' ? '#0EA5E9' : '#10B981'}
          />
          <text x="412" y="182" textAnchor="middle" fill="#CBD5E1" fontSize="11">
            Gas Detector Tube
          </text>
        </g>
      )}
      {gasTool === 'gas-monitor' && (
        <g>
          <rect x="350" y="135" width="125" height="65" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          <text x="412" y="156" textAnchor="middle" fill="#94A3B8" fontSize="10">Gas Monitor</text>
          <text x="412" y="180" textAnchor="middle" fill="#34D399" fontSize="13" fontWeight="700">
            {digitalReading}
          </text>
        </g>
      )}
    </svg>
  );
};

const LimewaterSVG: React.FC<{ step: number }> = ({ step }) => (
  <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto">
    {/* Jar 1 */}
    <rect x="85" y="75" width="130" height="185" rx="8" fill="#334155" fillOpacity="0.3" stroke="#BAE6FD" strokeWidth="3" />
    <text x="150" y="62" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="600">Jar (1): Burned Candle</text>
    <rect
      x="88"
      y="195"
      width="124"
      height="62"
      rx="4"
      fill={step === 2 ? '#F8FAFC' : '#38BDF8'}
      fillOpacity={step === 2 ? 0.88 : 0.25}
    />
    {step === 1 && (
      <g>
        <rect x="142" y="140" width="16" height="52" fill="#FEF3C7" />
        <text x="150" y="128" textAnchor="middle" fill="#FCA5A5" fontSize="11">CO₂ increases</text>
      </g>
    )}
    <text x="150" y="282" textAnchor="middle" fill={step === 2 ? '#FDE047' : '#CBD5E1'} fontSize="12">
      {step === 2 ? 'Turns milky white' : 'Clear limewater'}
    </text>

    {/* Jar 2 Control */}
    <rect x="285" y="75" width="130" height="185" rx="8" fill="#334155" fillOpacity="0.3" stroke="#BAE6FD" strokeWidth="3" />
    <text x="350" y="62" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="600">Jar (2): Control</text>
    <rect x="288" y="195" width="124" height="62" rx="4" fill="#38BDF8" fillOpacity="0.25" />
    <text x="350" y="282" textAnchor="middle" fill="#CBD5E1" fontSize="12">
      Remains clear
    </text>
  </svg>
);

const BreathingSVG: React.FC<{ stage: 'inhale' | 'exhale' }> = ({ stage }) => {
  const expanded = stage === 'inhale';
  return (
    <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto">
      {/* Trachea */}
      <rect x="242" y="45" width="16" height="75" rx="4" fill="#64748B" />
      {/* Lungs */}
      <ellipse
        cx="200"
        cy="175"
        rx={expanded ? 58 : 44}
        ry={expanded ? 75 : 58}
        fill="#FB7185"
        fillOpacity="0.45"
        stroke="#FDA4AF"
        strokeWidth="3"
      />
      <ellipse
        cx="300"
        cy="175"
        rx={expanded ? 58 : 44}
        ry={expanded ? 75 : 58}
        fill="#FB7185"
        fillOpacity="0.45"
        stroke="#FDA4AF"
        strokeWidth="3"
      />
      {/* Chest movement arrows */}
      <text x="250" y="34" textAnchor="middle" fill={expanded ? '#38BDF8' : '#FBBF24'} fontSize="14" fontWeight="700">
        {expanded ? 'INHALATION: O₂ enters · Chest moves UP' : 'EXHALATION: CO₂ leaves · Chest moves DOWN'}
      </text>
      <path
        d={expanded ? 'M250 55 L250 110' : 'M250 110 L250 55'}
        stroke={expanded ? '#38BDF8' : '#FBBF24'}
        strokeWidth="4"
      />
      <text x="250" y="292" textAnchor="middle" fill="#CBD5E1" fontSize="12">
        {expanded ? 'Chest moves up (expands)' : 'Chest moves down'}
      </text>
    </svg>
  );
};

const SalivaStarchSVG: React.FC<{ step: number }> = ({ step }) => (
  <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto">
    {/* Warm water bath 40C */}
    <rect x="75" y="130" width="350" height="145" rx="10" fill="#0EA5E9" fillOpacity="0.18" stroke="#38BDF8" strokeWidth="2" />
    <text x="250" y="295" textAnchor="middle" fill="#7DD3FC" fontSize="12">
      Warm Water Bath (40°C — Body Temperature)
    </text>

    {/* Tube 1: Starch + Saliva */}
    <rect x="145" y="65" width="46" height="185" rx="23" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2.5" />
    <rect
      x="148"
      y="145"
      width="40"
      height="102"
      rx="18"
      fill={step === 2 ? '#B45309' : '#E2E8F0'}
      fillOpacity={step === 2 ? 0.65 : 0.45}
    />
    <text x="168" y="48" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="600">Tube 1: + Saliva</text>
    <text x="168" y="268" textAnchor="middle" fill={step === 2 ? '#FDE047' : '#CBD5E1'} fontSize="11">
      {step === 2 ? 'Stays brown (No starch)' : 'Starch -> Sugar'}
    </text>

    {/* Tube 2: Starch + Water */}
    <rect x="305" y="65" width="46" height="185" rx="23" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2.5" />
    <rect
      x="308"
      y="145"
      width="40"
      height="102"
      rx="18"
      fill={step === 2 ? '#1E1B4B' : '#E2E8F0'}
      fillOpacity={step === 2 ? 0.95 : 0.45}
    />
    <text x="328" y="48" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="600">Tube 2: + Water</text>
    <text x="328" y="268" textAnchor="middle" fill={step === 2 ? '#93C5FD' : '#CBD5E1'} fontSize="11">
      {step === 2 ? 'Turns blue-black (Starch!)' : 'Starch remains'}
    </text>
  </svg>
);

const SunlightStarchSVG: React.FC<{ step: number }> = ({ step }) => (
  <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto">
    {/* Sun */}
    {step >= 1 && <circle cx="90" cy="65" r="28" fill="#FBBF24" />}
    {/* Leaf */}
    <path
      d="M135 235 C140 105 245 75 365 95 C355 205 265 255 135 235 Z"
      fill={step === 2 ? '#E2E8F0' : step === 3 ? '#1E1B4B' : '#10B981'}
      fillOpacity={step === 2 ? 0.75 : step === 3 ? 0.9 : 0.5}
      stroke="#34D399"
      strokeWidth="3"
    />
    {/* Blocked Strip */}
    <rect
      x="225"
      y="85"
      width="55"
      height="155"
      rx="6"
      fill={step <= 1 ? '#334155' : '#FEF3C7'}
      stroke="#94A3B8"
      strokeWidth="2"
    />
    <text x="252" y="165" textAnchor="middle" fill={step <= 1 ? '#F8FAFC' : '#0F172A'} fontSize="11" fontWeight="600">
      Blocked
    </text>
    <text x="250" y="285" textAnchor="middle" fill="#CBD5E1" fontSize="12">
      {step === 0 && 'Light blocked beforehand removes stored starch'}
      {step === 1 && 'Exposed parts receive sunlight'}
      {step === 2 && 'Ethanol removes green color'}
      {step === 3 && 'Exposed part turns blue-black with iodine; blocked part stays light'}
    </text>
  </svg>
);

const PlantGasSVG: React.FC<{ mode: string; bagStep: number }> = ({ mode, bagStep }) => (
  <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto">
    {mode === 'day' && <circle cx="95" cy="65" r="28" fill="#FBBF24" />}
    {mode === 'night' && (
      <path d="M90 45 A24 24 0 1 0 115 80 A18 18 0 1 1 90 45 Z" fill="#E2E8F0" />
    )}
    {/* Pot & Plant */}
    <polygon points="215,235 285,235 275,280 225,280" fill="#B45309" />
    <rect x="245" y="135" width="10" height="100" fill="#10B981" />
    <ellipse cx="220" cy="160" rx="34" ry="18" fill="#10B981" />
    <ellipse cx="280" cy="145" rx="34" ry="18" fill="#10B981" />
    {mode === 'bag-test' && (
      <rect x="165" y="95" width="170" height="150" rx="18" fill="#38BDF8" fillOpacity="0.15" stroke="#BAE6FD" strokeWidth="2.5" strokeDasharray="5 4" />
    )}
    <text x="250" y="45" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="600">
      {mode === 'day' && 'Day (Light): Photosynthesis > Respiration (Takes CO₂, Releases O₂)'}
      {mode === 'night' && 'Night (Dark): Respiration Only (Takes O₂, Releases CO₂)'}
      {mode === 'bag-test' &&
        (bagStep === 0
          ? 'Bag placed over plant'
          : bagStep === 1
          ? 'Blow into bag -> CO₂ increases'
          : 'After 1 hr in sunlight -> O₂ increases, CO₂ decreased')}
    </text>
  </svg>
);

const TranspirationSVG: React.FC<{ step: number }> = ({ step }) => (
  <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto">
    {/* Plant 1 with leaves */}
    <polygon points="115,240 175,240 165,280 125,280" fill="#B45309" />
    <rect x="141" y="145" width="8" height="95" fill="#10B981" />
    <ellipse cx="120" cy="165" rx="26" ry="14" fill="#10B981" />
    <ellipse cx="170" cy="155" rx="26" ry="14" fill="#10B981" />
    {step >= 1 && (
      <rect x="85" y="105" width="120" height="140" rx="14" fill="#38BDF8" fillOpacity="0.16" stroke="#BAE6FD" strokeWidth="2" />
    )}
    {step === 2 && (
      <>
        {[
          [102, 125],
          [185, 130],
          [112, 200],
          [180, 195],
          [145, 118],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill="#38BDF8" />
        ))}
      </>
    )}
    <text x="145" y="302" textAnchor="middle" fill="#CBD5E1" fontSize="11">
      {step === 2 ? 'Plant (1): Water drops form' : 'Plant (1): With leaves'}
    </text>

    {/* Plant 2 without leaves */}
    <polygon points="325,240 385,240 375,280 335,280" fill="#B45309" />
    <rect x="351" y="145" width="8" height="95" fill="#10B981" />
    {step >= 1 && (
      <rect x="295" y="105" width="120" height="140" rx="14" fill="#38BDF8" fillOpacity="0.1" stroke="#BAE6FD" strokeWidth="2" />
    )}
    <text x="355" y="302" textAnchor="middle" fill="#CBD5E1" fontSize="11">
      {step === 2 ? 'Plant (2): No water drops' : 'Plant (2): Leaves removed'}
    </text>
  </svg>
);

const ColoredWaterSVG: React.FC<{ step: number }> = ({ step }) => (
  <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto">
    {/* Beaker */}
    <path d="M180 185 L190 285 L310 285 L320 185" fill="none" stroke="#CBD5E1" strokeWidth="3" />
    <rect x="186" y="210" width="128" height="72" fill="#EF4444" fillOpacity="0.4" />
    {/* Roots */}
    <path
      d="M250 205 L228 255 M250 205 L250 265 M250 205 L274 255"
      stroke={step >= 1 ? '#F87171' : '#E2E8F0'}
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Stem */}
    <rect x="244" y="95" width="12" height="110" fill="#10B981" fillOpacity="0.5" stroke="#34D399" />
    {step >= 1 && <line x1="250" y1="205" x2="250" y2="95" stroke="#EF4444" strokeWidth="4" />}
    {/* Leaves */}
    <ellipse cx="215" cy="120" rx="34" ry="16" fill="#10B981" fillOpacity="0.6" stroke="#34D399" />
    <ellipse cx="285" cy="105" rx="34" ry="16" fill="#10B981" fillOpacity="0.6" stroke="#34D399" />
    {step >= 1 && (
      <>
        <line x1="245" y1="120" x2="190" y2="120" stroke="#EF4444" strokeWidth="2.5" />
        <line x1="255" y1="105" x2="310" y2="105" stroke="#EF4444" strokeWidth="2.5" />
      </>
    )}
    {step === 2 && (
      <g>
        <circle cx="385" cy="145" r="48" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
        <circle cx="370" cy="135" r="8" fill="#EF4444" />
        <circle cx="400" cy="135" r="8" fill="#EF4444" />
        <circle cx="385" cy="160" r="8" fill="#EF4444" />
        <text x="385" y="212" textAnchor="middle" fill="#FCA5A5" fontSize="11">
          Red parts inside stem
        </text>
      </g>
    )}
    <text x="250" y="38" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="600">
      Path of water: Roots → Stems → Leaves
    </text>
  </svg>
);
