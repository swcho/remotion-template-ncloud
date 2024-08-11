import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { TtsParams } from "../config";
import queryString from 'query-string';

const API_ENDPOINT = 'http://localhost:3001/api';

async function s3Exists(tts: TtsParams) {
	try {
		return await fetch(
			`${API_ENDPOINT}/exists?${queryString.stringify(tts)}`,
		).then((r) => r.ok && r.json());
	} catch (e) {}
}

async function uploadFile(tts: TtsParams) {
	return fetch(`${API_ENDPOINT}/put?${queryString.stringify(tts)}`).then((r) =>
		r.json(),
	);
}

export async function getAudioInfo(ttsParams: TtsParams) {
	const exists = await s3Exists(ttsParams);
	// console.log({exists});
	if (!exists) {
		await uploadFile(ttsParams);
	}
	const url = `${API_ENDPOINT}/get?${queryString.stringify(ttsParams)}`;
	const duration = await getAudioDurationInSeconds(url);
	return {
		text: ttsParams.text,
		url,
		duration,
	};
}
