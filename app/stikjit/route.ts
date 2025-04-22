import { githubResponseFunction } from '../common';

const params = {
    githubUrl: 'https://api.github.com/repos/StephenDev0/StikJIT',
    iconUrl: 'https://raw.githubusercontent.com/StephenDev0/StikJIT/main/assets/StikJIT_Rounded_Corners.png',
    bundleId: 'com.stik.sj',
    screenshots: [
        'https://raw.githubusercontent.com/neoarz/StikJIT/main/assets/views/light/HomeScreen.PNG',
        'https://raw.githubusercontent.com/neoarz/StikJIT/main/assets/views/light/AppsList.PNG',
        'https://raw.githubusercontent.com/neoarz/StikJIT/main/assets/views/light/Settings.PNG',
        'https://github.com/neoarz/StikJIT/raw/main/assets/views/light/GetJIT.gif?raw=true'
    ]
} as Parameters<typeof githubResponseFunction>[0];

export const GET = githubResponseFunction(params);
export const POST = GET;