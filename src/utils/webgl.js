let supported;

/** True when the browser can create a WebGL context (false on the server). Cached. */
export const hasWebGL = () => {
  if (typeof window === 'undefined') return false;
  if (supported === undefined) {
    try {
      const canvas = document.createElement('canvas');
      supported = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      supported = false;
    }
  }
  return supported;
};

/** '17 17 17' (theme token) -> '#111111' */
export const rgbTokenToHex = token =>
  `#${token
    .split(' ')
    .map(value => Number(value).toString(16).padStart(2, '0'))
    .join('')}`;
