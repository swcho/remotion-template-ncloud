import {Composition} from 'remotion';
import {MyComposition, myCompSchema} from './sample/Composition';
import './style.css';
import { makeRootTtsComposition } from './tts/RootTtsComposition';
import { intro } from './tts-sample/intro';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{makeRootTtsComposition('intro', intro)}
			<Composition
				id="sample"
				component={MyComposition}
				durationInFrames={240}
				fps={30}
				width={1280}
				height={720}
				schema={myCompSchema}
				defaultProps={{
					titleText: 'Welcome to Remotion with Tailwind CSS',
					titleColor: '#000000',
					logoColor: '#00bfff',
				}}
			/>
		</>
	);
};
