export type Source = {
    name: string,
    subtitle?: string,
    description?: string,
    iconURL?: string,
    headerURL?: string,
    website?: string,
    patreonURL?: string,
    tintColor?: string,
    featuredApps?: string[],
    apps: App[],
    news: NewsItem[],
};

export type App = {
    name: string,
    bundleIdentifier: string,
    // marketplaceID: string,
    marketplaceID?: string,  // notarized
    developerName: string,
    subtitle?: string,
    localizedDescription: string,
    iconURL: string,
    tintColor?: string,
    category?: string,
    screenshots?: Screenshot[],
    versions?: AppVersion[],
    appPermissions: AppPermission,
    patreon?: Patreon,
    version?: string,
    versionDate?: string,
    downloadURL?: string,
    size?: number,
    screenshotURLs?: string[]
};

export type Screenshot = (string | {
    imageURL: string,
    width?: number,
    height?: number
});

export type AppVersion = {
    version: string,
    // buildVersion: string,
    buildVersion?: string,  // notarized
    marketingVersion?: string;
    date: string,
    localizedDescription?: string,
    downloadURL: string,
    size: number,
    minOSVersion?: string,
    maxOSVersion?: string
};

export type AppPermission = {
    entitlements: string[],
    privacy: object
};

export type NewsItem = {
    title: string,
    identifier: string,
    caption: string,
    date: string,
    tintColor?: string,
    imageURL?: string,
    notify?: boolean,
    url?: string,
    appID?: string
};

export type Patreon = {
    pledge?: number,
    currency?: string,
    benefit?: string,
    tier?: string[],
};