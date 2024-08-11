import {AbsoluteFill} from 'remotion';
import { CutItem } from '../tts/RootTtsComposition';

export const intro: CutItem[] = [
	{
		caption:
			'안녕하세요. NAVER Cloud Platform을 활용한 Remotion TTS 예제를 소개합니다.',
		Component: () => (
			<AbsoluteFill className="bg-gray-100 items-center justify-center">
				<div className="text-6xl">Remotion with NAVER Cloud Platform</div>
			</AbsoluteFill>
		),
	},
];
