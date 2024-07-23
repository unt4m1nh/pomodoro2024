/// <reference types="vite/client" />
declare module '*.scss' {
  const css: { [key: string]: string };
  export default css;
}
declare module '*.sass' {
  const css: { [key: string]: string };
  export default css;
}

//import file types
declare module '*.svg';
declare module '*.mp3';
declare module '*.wav';

//import libs
declare module 'react';
declare module 'react-dom/client';
declare module 'react/jsx-runtime';
declare module 'react-beautiful-dnd';
declare module 'node';
