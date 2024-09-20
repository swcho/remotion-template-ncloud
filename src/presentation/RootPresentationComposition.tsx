import * as React from 'react';

import sum from 'lodash-es/sum';

import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Composition, Sequence, Audio} from 'remotion';

import {waitForNoInput} from '../utils/remotion-utils';

import {
	PresentationConfig,
	PresentationOptions,
	PresentationProps,
	getPresentationPropList,
	secondsToFrames,
} from './presentation-utils';

type RootPresentationCompositionProps = {
	// eslint-disable-next-line react/no-unused-prop-types
	presentations: PresentationConfig[];
	propsList?: PresentationProps[];
};

const Context = React.createContext<RootPresentationCompositionProps>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	{} as any,
);

export type PresentationContext = {
	props: PresentationProps;
	audioFrom?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContextPresentation = React.createContext<PresentationContext>({} as any);

export function usePresentationContext() {
	return React.useContext(ContextPresentation);
}

// const DebugFrame = () => <div>{useCurrentFrame()}</div>;

const RootPresentationComposition: React.FC<
	RootPresentationCompositionProps
> = ({propsList}) => {
	const {presentations} = React.useContext(Context);
	return (
		<TransitionSeries>
			{propsList?.map((props, index) => {
				const {transitionPaddingFrames, durationInFrames, audioInfo} = props;
				const {Component} = presentations[index];
				const audioFrom =
					(index > 0 ? transitionPaddingFrames : 0) +
					(audioInfo?.audioDelayInFrames || 0);
				// console.log(`${index}`, Component);
				return (
					<>
						{index > 0 && (
							<TransitionSeries.Transition
								presentation={fade()}
								timing={linearTiming({
									durationInFrames: transitionPaddingFrames,
								})}
							/>
						)}
						<TransitionSeries.Sequence
							key={index}
							className={`presentation-${index}`}
							// from={from}
							durationInFrames={durationInFrames}
						>
							<ContextPresentation.Provider value={{props, audioFrom}}>
								{Component && Component(props)}
							</ContextPresentation.Provider>
							{audioInfo && (
								<Sequence from={audioFrom}>
									<Audio src={audioInfo.url} />
									<div className="absolute bottom-3 text-center w-full">
										<span
											// eslint-disable-next-line react/no-danger
											dangerouslySetInnerHTML={{
												__html: audioInfo.text.split('\n').join('<br/>'),
											}}
										/>
									</div>
								</Sequence>
							)}
						</TransitionSeries.Sequence>
					</>
				);
			})}
		</TransitionSeries>
	);
};

export function makeRootPresentationComposition(
	id: string,
	presentations: PresentationConfig[],
	options: Partial<PresentationOptions> = {},
) {
	const {fps = 30, audioDelay = 0.8, transitionDuration = 1} = options;
	return (
		<Context.Provider value={{presentations}}>
			<Composition
				id={id}
				component={RootPresentationComposition}
				fps={fps}
				width={1280}
				height={720}
				// schema={TtsSchema}
				defaultProps={{
					presentations: [],
				}}
				calculateMetadata={async ({abortSignal}) => {
					await waitForNoInput(abortSignal, 1000);
					const propsList = await getPresentationPropList(presentations, {
						fps,
						audioDelay,
						transitionDuration,
					});
					return {
						props: {
							presentations,
							propsList,
						},
						durationInFrames:
							sum(propsList.map(({durationInFrames}) => durationInFrames)) -
							(propsList.length - 1) * secondsToFrames(fps, transitionDuration),
					};
				}}
			/>
		</Context.Provider>
	);
}
