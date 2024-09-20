import {Composition} from 'remotion';

import './style.css';
import {makeRootPresentationComposition} from './presentation/RootPresentationComposition';
import {MyComposition, myCompSchema} from './sample/Composition';
import {intro} from './tts-sample/intro';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{makeRootPresentationComposition('intro', intro)}
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
