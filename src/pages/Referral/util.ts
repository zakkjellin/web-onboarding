export const createFirebaseLink = (code: string) => {
  const encodedLink = encodeURIComponent(
    `https://www.hedvig.com/referrals?code=${code}`,
  )
  const encodedApn = encodeURIComponent(getAndroidPackageName())
  const encodedIbi = encodeURIComponent(getAppleBundleId())
  const encodedIsi = encodeURIComponent(getAppStoreId())

  return `${getFirebaseLinkDomain()}/?link=${encodedLink}&apn=${encodedApn}&ibi=${encodedIbi}&isi=${encodedIsi}`
}
export const getFirebaseLinkDomain = () => {
  if (
    typeof window !== 'undefined' &&
    (window as any).FIREBASE_LINK_DOMAIN !== undefined
  ) {
    return (window as any).FIREBASE_LINK_DOMAIN
  }

  if (process.env.NODE_ENV === 'development') {
    return process.env.FIREBASE_LINK_DOMAIN || 'https://hedvigtest.page.link'
  }

  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.FIREBASE_LINK_DOMAIN
  ) {
    return process.env.FIREBASE_LINK_DOMAIN
  }

  throw Error(
    'Unable to find firebase link domain - specify with envvar `FIREBASE_LINK_DOMAIN`',
  )
}

export const getAndroidPackageName = () => {
  if (
    typeof window !== 'undefined' &&
    (window as any).ANDROID_PACKAGE_NAME !== undefined
  ) {
    return (window as any).ANDROID_PACKAGE_NAME
  }

  if (process.env.NODE_ENV === 'development') {
    return process.env.ANDROID_PACKAGE_NAME || 'com.hedvig.dev.app'
  }

  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.ANDROID_PACKAGE_NAME
  ) {
    return process.env.ANDROID_PACKAGE_NAME
  }

  throw Error(
    'Unable to find android package name - specify with envvar `ANDROID_PACKAGE_NAME`',
  )
}

export const getAppleBundleId = () => {
  if (
    typeof window !== 'undefined' &&
    (window as any).APPLE_BUNDLE_ID !== undefined
  ) {
    return (window as any).APPLE_BUNDLE_ID
  }

  if (process.env.NODE_ENV === 'development') {
    return process.env.APPLE_BUNDLE_ID || 'com.hedvig.test.app'
  }

  if (process.env.NODE_ENV !== 'development' && process.env.APPLE_BUNDLE_ID) {
    return process.env.APPLE_BUNDLE_ID
  }

  throw Error(
    'Unable to find apple bundle id - specify with envvar `APPLE_BUNDLE_ID`',
  )
}

export const getAppStoreId = () => {
  if (
    typeof window !== 'undefined' &&
    (window as any).APP_STORE_ID !== undefined
  ) {
    return (window as any).APP_STORE_ID
  }

  if (process.env.NODE_ENV === 'development') {
    return process.env.APP_STORE_ID || '1339670517'
  }

  if (process.env.NODE_ENV !== 'development' && process.env.APP_STORE_ID) {
    return process.env.APP_STORE_ID
  }

  throw Error(
    'Unable to find apple bundle id - specify with envvar `APPLE_BUNDLE_ID`',
  )
}