type NetworkInformation = { saveData?: boolean; effectiveType?: string; type?: string }

/**
 * Silent preview loops only play on a good, non-metered connection. Where the browser
 * reports the network (Chrome on Android), mobile data, data-saver and slow links get
 * still posters instead; reduced-motion users always get posters.
 */
export function canAutoplayLoops() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (!connection) return true
  if (connection.saveData) return false
  if (connection.type === 'cellular') return false
  if (connection.effectiveType && connection.effectiveType !== '4g') return false
  return true
}
