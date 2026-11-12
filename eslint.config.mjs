import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default [
  { ignores: ['.next/**', 'public/**', 'node_modules/**'] },
  js.configs.recommended,
  ...nextVitals,
  {
    rules: {
      semi: 'error',
      'no-unused-vars': 'warn',
      'import/no-anonymous-default-export': 'off',
      'react/display-name': 'off',
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      // React Compiler rules (new in eslint-plugin-react-hooks 7) flag long-standing
      // imperative three.js/animation patterns that work fine; warn until refactored.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
    },
  },
];
