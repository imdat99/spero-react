/* eslint-disable @typescript-eslint/no-unused-vars */
const components = import.meta.glob("./*.tsx", {
    eager: true,
});

Object.entries(components).forEach(([_, val]) => {
    console.log(Object.entries(val as any).map(([_, fn]) => (fn as any).name));
});

export default components;
