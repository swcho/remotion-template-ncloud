import express from 'express'
import md5 from 'md5';
import { TtsParams } from '../src/config';
import {z} from 'zod';
import {
	HeadObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import {Readable} from 'stream';

const env = z
	.object({
		// https://console.ncloud.com/objectStorage
		NCP_OBJECT_STORAGE_BUCKET_NAME: z.string(),
		NCP_OBJECT_STORAGE_REGION: z.string().optional(),

		// https://www.ncloud.com/mypage/manage/authkey
		NCP_ACCESS_KEY_ID: z.string(),
		NCP_SECRET_KEY: z.string(),

		// https://console.ncloud.com/naver-service/application
		NCP_APPLICATION_CLIENT_ID: z.string(),
		NCP_APPLICATION_CLIENT_SECRET: z.string(),

		NCP_PROXY_PORT: z.string().optional(),
	})
	.parse(process.env);

/** [Javascript용 AWS SDK](https://guide.ncloud-docs.com/docs/storage-storage-8-4) */
const s3 = new S3Client({
	region: env.NCP_OBJECT_STORAGE_REGION || 'kr-standard',
	endpoint: 'https://kr.object.ncloudstorage.com',
	credentials: {
		accessKeyId: env.NCP_ACCESS_KEY_ID,
		secretAccessKey: env.NCP_SECRET_KEY,
	},
});

function getFileName({text, voice}: TtsParams) {
	return `${md5(`${text}--${voice}`)}.mp3`;
}

function getParams(req: express.Request) {
	const {query} = req;
	const {text, voice = 'nara'} = query;
	if (typeof text !== 'string' || typeof voice !== 'string') {
		throw new Error(`Invalid params text: ${text}, voice: ${voice}`);
	}
	const filename = getFileName({text, voice});

	return {text, voice, filename};
}

const makeUrl = ({text, voice}: TtsParams) => {
	const filename = getFileName({text, voice});
	return `http://${env.NCP_OBJECT_STORAGE_BUCKET_NAME}.s3-website.kr.object.ncloudstorage.com/${filename}`;
};

const app = express()

app.get('/api/exists', async (req, res) => {
	const ttsParams = getParams(req);
	const {filename} = ttsParams;
	console.log('exists', {filename});
	try {
		const resp = await s3.send(
			new HeadObjectCommand({Bucket: env.NCP_OBJECT_STORAGE_BUCKET_NAME, Key: filename}),
		);
		console.log('exists', {resp});
		res.header('Access-Control-Allow-Origin', '*');
		res.json({
			...resp,
			url: makeUrl(ttsParams),
		});
	} catch (e) {
		console.error(e);
		res.header('Access-Control-Allow-Origin', '*');
		res.status(500).send(e);
	}
});

app.get('/api/put', async (req, res) => {
	const {text, voice, filename} = getParams(req);
	console.log('put', {text, voice, filename});
	try {
		const fetchResponse = await fetch(
			'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts',
			{
				method: 'POST',
				headers: {
					'X-NCP-APIGW-API-KEY-ID': env.NCP_APPLICATION_CLIENT_ID,
					'X-NCP-APIGW-API-KEY': env.NCP_APPLICATION_CLIENT_SECRET,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `speaker=${voice}&text=${text}&volume=0&speed=0&pitch=0&format=mp3`,
			},
		);
		console.log('tts success')
		const resp = await s3.send(
			new PutObjectCommand({
				Bucket: env.NCP_OBJECT_STORAGE_BUCKET_NAME,
				Key: filename,
				Body: new Uint8Array(await fetchResponse.arrayBuffer()),
			}),
		);
		console.log('put success')
		res.header('Access-Control-Allow-Origin', '*');
		res.json(resp);
	} catch (e) {
		console.error(e);
		res.header('Access-Control-Allow-Origin', '*');
		res.status(500).send(e);
	}
});

app.get('/api/get', async (req, res) => {
	const {text, voice} = getParams(req);
	const url = makeUrl({text, voice});
	console.log('get', {text, voice, url});
	const fetchResponse = await fetch(url);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Readable.fromWeb(fetchResponse.body as any).pipe(res);
	res.header('Access-Control-Allow-Origin', '*');
});

app.listen(env.NCP_PROXY_PORT || 3001)
