/// <reference types="vite/client" />
declare module '*.scss' {
  const css: { [key: string]: string };
  export default css;
}
declare module '*.sass' {
  const css: { [key: string]: string };
  export default css;
}
declare module '*.svg';
declare module 'react';
declare module 'react-dom/client';
declare module 'react/jsx-runtime';
