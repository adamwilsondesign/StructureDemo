"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Reconstructed from chunk-page.js module 93890 (scene cards) + live HTML.
 * Decorative CSS-driven scenes — classNames match original.
 */

function SceneCard({
  title,
  body,
  children,
  className = "",
}: {
  title: string;
  body: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="scene-well rounded-[16px] aspect-[4/3] overflow-hidden mb-7">
        {children}
      </div>
      <h3 className="text-[24px] font-[480] mb-3 leading-[1.2]">{title}</h3>
      <p className="text-[17px] leading-[1.6] text-muted max-w-[42ch]">{body}</p>
    </div>
  );
}

function SceneComponents() {
  return (
    <div className="scene">
      <div className="sc-window">
        <div className="sc-chrome">
          <i />
          <i />
          <i />
        </div>
        <div className="sc-split">
          <div className="sc-layers">
            <div className="sc-layer l1">Button</div>
            <div className="sc-layer l2">Input</div>
            <div className="sc-layer l3">Card</div>
          </div>
          <div className="sc-stage">
            <div className="sc-button">Continue</div>
            <div className="sc-ring" />
            <div className="sc-mapped">Mapped</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneSpecs() {
  return (
    <div className="scene">
      <div className="sp-doc">
        <div className="sp-line a" />
        <div className="sp-line b" />
        <div className="sp-line c">
          <span>color.brand</span>
        </div>
        <div className="sp-line d" />
        <div className="sp-note">token</div>
      </div>
    </div>
  );
}

function ScenePrompts() {
  return (
    <div className="scene">
      <div className="pr-thread">
        <div className="pr-msg me">Draft the launch note</div>
        <div className="pr-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="pr-msg them">
          On brand. Ready.
          <span className="pr-swatches">
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
    </div>
  );
}

function SceneHandoff() {
  return (
    <div className="scene">
      <div className="ho-list">
        <div className="ho-row r1">
          <span className="ho-box" />
          <em>Tokens</em>
          <b>✓</b>
        </div>
        <div className="ho-row r2">
          <span className="ho-box" />
          <em>Specs</em>
          <b>✓</b>
        </div>
        <div className="ho-row r3">
          <span className="ho-box" />
          <em>Training</em>
          <b>✓</b>
        </div>
        <div className="ho-track">
          <span />
        </div>
      </div>
    </div>
  );
}

export default function FeatureScenes() {
  return (
    <section className="px-6 pt-6 pb-24 md:pt-10 md:pb-36">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="theme-line border-t pt-10 mb-14">
            <h2 className="text-[40px] md:text-[56px] font-[480] leading-[1.05] tracking-[-0.02em] md:max-w-[16ch]">
              Design’s been the bottleneck. Now it’s a head start.
            </h2>
          </div>
        </Reveal>

        <div className="space-y-24 md:space-y-32">
          <Reveal>
            <div className="grid md:grid-cols-12 gap-x-8 gap-y-14">
              <SceneCard
                className="md:col-span-6"
                title="Ship components in a couple of clicks"
                body="Tokens and components are already mapped. Engineers pull from the system instead of redrawing the same button."
              >
                <SceneComponents />
              </SceneCard>
              <SceneCard
                className="md:col-span-6"
                title="Specs write themselves"
                body="Structured Markdown lands with the components, so the decision isn’t trapped in a Figma comment."
              >
                <SceneSpecs />
              </SceneCard>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-12 gap-x-8 gap-y-14">
              <SceneCard
                className="md:col-span-6"
                title="Prompts stay on brand"
                body="Sales and marketing generate decks and posts from the same source. The voice doesn’t fork."
              >
                <ScenePrompts />
              </SceneCard>
              <SceneCard
                className="md:col-span-6"
                title="Handoff without the chase"
                body="Training, mappings, and files arrive together. Your team keeps moving after we leave."
              >
                <SceneHandoff />
              </SceneCard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
