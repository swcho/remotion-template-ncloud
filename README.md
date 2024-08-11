# Remotion with NAVER Cloud Platform

[Remotion](https://www.remotion.dev/)은 React와 Web 기술을 활용하여 비디오를 생성할 수 있는 툴 입니다.

특별히 TTS 기능을 응용하여 쉽고 빠른 영상 제작이 가능합니다.
* AWS S3 + Azure: [FelippeChemello/Remotion-TTS-Example](https://github.com/FelippeChemello/Remotion-TTS-Example)
* GCP [thecmdrunner/remotion-gtts-template](https://github.com/thecmdrunner/remotion-gtts-template)

위 템플릿 프로젝트를 참고하여 NAVER Cloud Platform의 object storage와 Clova voice(TTS) 기능을 활용한 템플릿을 만들어 보았습니다.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm start
```

**Render video**

```console
npm run build
```

**Upgrade Remotion**

```console
npm run upgrade
```

## TTS Sample

```typescript
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

```
