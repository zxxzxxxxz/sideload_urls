import { githubResponseFunction } from '../common';

const params = {
    githubUrl: 'https://api.github.com/repos/LiveContainer/LiveContainer',
    iconUrl: 'https://raw.githubusercontent.com/LiveContainer/LiveContainer/main/screenshots/livecontainer_icon.png',
    bundleId: 'com.kdt.livecontainer',
    screenshots: []
} as Parameters<typeof githubResponseFunction>[0];

export const GET = githubResponseFunction(params);
export const POST = GET;