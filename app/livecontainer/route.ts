import { githubResponseFunction } from '../common';

const params = {
    githubUrl: 'https://api.github.com/repos/LiveContainer/LiveContainer',
    descriptionUrl: 'https://raw.githubusercontent.com/LiveContainer/LiveContainer/refs/heads/main/README.md',
    iconUrl: 'https://raw.githubusercontent.com/LiveContainer/LiveContainer/main/screenshots/livecontainer_icon.png',
    bundleId: 'com.kdt.livecontainer',
    category: 'utilities',
    screenshots: []
} as Parameters<typeof githubResponseFunction>[0];

export const GET = githubResponseFunction(params);
export const POST = GET;