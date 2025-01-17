import {
  getAndroidMinimumVersion,
  getAndroidPackageName,
  getAppleBundleId,
  getAppStoreId,
  getFirebaseLinkDomain,
  getIosMinimumVersion,
} from 'pages/Referral/util'
import { getGiraffeEndpoint } from '../utils/apolloClient'

export const GIRAFFE_ENDPOINT = getGiraffeEndpoint(
  'GIRAFFE_ENDPOINT',
  'https://graphql.dev.hedvigit.com/graphql',
)

export const GIRAFFE_WS_ENDPOINT = getGiraffeEndpoint(
  'GIRAFFE_WS_ENDPOINT',
  'wss://graphql.dev.hedvigit.com/subscriptions',
)

export const FIREBASE_LINK_DOMAIN = getFirebaseLinkDomain()
export const ANDROID_PACKAGE_NAME = getAndroidPackageName()
export const ANDROID_MINIMUM_VERSION = getAndroidMinimumVersion()
export const APPLE_BUNDLE_ID = getAppleBundleId()
export const APP_STORE_ID = getAppStoreId()
export const IOS_MINIMUM_VERSION = getIosMinimumVersion()
