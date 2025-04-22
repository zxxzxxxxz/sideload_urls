import { githubResponseFunction } from '../common';

const githubUrl = 'https://api.github.com/repos/StephenDev0/StikJIT';
const iconUrl = 'https://raw.githubusercontent.com/StephenDev0/StikJIT/main/assets/StikJIT_Rounded_Corners.png';
const bundleId = 'com.stik.sj';

export const GET = githubResponseFunction(githubUrl, iconUrl, bundleId);
export const POST = githubResponseFunction(githubUrl, iconUrl, bundleId);