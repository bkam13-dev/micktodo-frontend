import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

interface DaisyUIConfig {
    themes?: string[] | { [key: string]: any }[];
    darkTheme?: string;
    prefix?: string;
}

interface CustomConfig extends Config {
    daisyui?: DaisyUIConfig;
}


const config: CustomConfig = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    
    plugins: [
        daisyui, 
    ],

    daisyui: { 
        themes: [
            'light', 
            'dark', 
        ], 
        
        darkTheme: "dark", 
        
        prefix: "", 
    },
};

export default config;