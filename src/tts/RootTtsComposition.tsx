import * as React from 'react';
import { getAudioInfo } from "./ncloud-proxy";
import { Sequence, Audio, Composition } from 'remotion';
import { waitForNoInput } from './remotion-utils';
import sum from 'lodash-es/sum';

type TtsAudioInfo = {
	text: string;
	url: string;
	from: number;
	durationInFrames: number;
};

async function getAudioInfoList(captions: string[], fps: number) {
	const voice = 'nara';
	const audioInfoList = await Promise.all(
		captions.map((text) => getAudioInfo({text, voice})),
	);

	const ttsItems: TtsAudioInfo[] = [];
	let from = 0;
	for (const {text, url, duration } of audioInfoList) {
		const durationInFrames = Math.ceil(duration * fps);
		ttsItems.push({
			text,
			url,
			from,
			durationInFrames,
		});
		from += durationInFrames;
	}
	console.log('getAudioInfoList', { ttsItems })
	return ttsItems;
}

type CutProps = {
	index: number;
	info: TtsAudioInfo;
};

export type CutItem = {
	caption: string;
	Component?: React.FC<CutProps>;
};

type RootTtsCompositionProps = {
	// eslint-disable-next-line react/no-unused-prop-types
	cuts: CutItem[];
	ttsItems?: TtsAudioInfo[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = React.createContext<RootTtsCompositionProps>({} as any);

const RootTtsComposition: React.FC<RootTtsCompositionProps> = ({
	ttsItems,
}) => {
	const {cuts} = React.useContext(Context);
	console.log('RootTtsComposition', { ttsItems })
	return (
		<>
			{ttsItems?.map((info, index) => {
				const {url, text, from, durationInFrames} = info;
				const {Component} = cuts[index];
				// console.log(`${index}`, Component);
				return (
					<Sequence
						key={index}
						from={from}
						durationInFrames={durationInFrames}
						className={`cut-${index}`}
					>
						{Component && Component({info, index})}
						<Audio src={url} />
						<div className="absolute bottom-3 text-center w-full">{text}</div>
					</Sequence>
				);
			})}
		</>
	);
};

export function makeRootTtsComposition(id: string, cuts: CutItem[], fps = 30) {
	return (
		<Context.Provider value={{cuts}}>
			<Composition
				id={id}
				component={RootTtsComposition}
				fps={fps}
				width={1280}
				height={720}
				// schema={TtsSchema}
				defaultProps={{
					cuts: [],
				}}
				calculateMetadata={async ({ abortSignal}) => {
					await waitForNoInput(abortSignal, 1000);
					const captions = cuts.map(({caption}) => caption);
					const ttsItems = await getAudioInfoList(captions, fps);
					return {
						props: {
							cuts,
							ttsItems,
						},
						durationInFrames: sum(
							ttsItems.map(({durationInFrames}) => durationInFrames),
						),
					};
				}}
			/>
		</Context.Provider>
	);
}
