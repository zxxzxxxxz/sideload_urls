import { githubResponseFunction } from '../common';

const githubUrl = 'https://api.github.com/repos/LiveContainer/LiveContainer';
const iconUrl = 'https://raw.githubusercontent.com/LiveContainer/LiveContainer/main/screenshots/livecontainer_icon.png';
const bundleId = 'com.kdt.livecontainer';

export const GET = githubResponseFunction(githubUrl, iconUrl, bundleId);
export const POST = githubResponseFunction(githubUrl, iconUrl, bundleId);