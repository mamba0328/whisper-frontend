/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        colors: {
            //TELEGRAM DEFAULT COLORS //https://web.telegram.org/k/
            // General Colors
            "primary-color": "#8774e1",
            "secondary-color": "#707579",
            "light-primary-color": "rgba(135, 116, 225, 0.08)",
            "light-filled-primary-color": "#292730",
            "dark-primary-color": "hsl(250.45871559633028, 64.49704142011832%, 62.86274509803921%)",
            "saved-color": "#8774e1",
            "light-filled-saved-color": "#b2a6eb",
            "surface-color": "#212121",
            "danger-color": "#ff595a",
            "light-danger-color": "rgba(255, 89, 90, 0.08)",
            "dark-danger-color": "hsl(359.6385542168675, 100%, 59.450980392156865%)",
            "green-color": "#5CC85E",

            // Message Colors
            "message-out-background-color": "#8774e1",
            "light-message-out-background-color": "rgba(135, 116, 225, 1)",
            "light-filled-message-out-background-color": "#8774e1",
            "dark-message-out-background-color": "hsl(250.45871559633028, 64.49704142011832%, -33.13725490196079%)",
            "message-out-primary-color":" #ffffff",
            "light-filled-message-out-primary-color": "#907fe3",
            "message-background-color": "#212121",
            "light-message-background-color": "rgba(33, 33, 33, 0.08)",
            "light-filled-message-background-color": "#212121",
            "dark-message-background-color": "hsl(0, 0%, 4.941176470588237%)",
            "message-highlighting-color": "hsla(299.142857, 44.166666%, 37.470588%, .4)",
            "message-checkbox-border-color": "#fff",
            "message-error-color": "#fff",
            "message-icon-text-color": "#fff",
            "message-out-link-color": "#fff",
            "message-out-status-color": "#fff",
            "message-out-time-color": "rgba(255, 255, 255, .6)",

            // Text Colors
            "primary-text-color": "#ffffff",
            "secondary-text-color": "#aaaaaa",
            "light-secondary-text-color": "rgba(170, 170, 170, 0.08)",
            "light-filled-secondary-text-color": "#2b2b2b",

            // Other Colors
            "body-background-color": "#181818",
            "border-color": "#0f0f0f",
            "scrollbar-color": "rgba(255, 255, 255, .2)",
            "section-box-shadow-color": "rgba(0, 0, 0, .12)",
            "input-search-background-color": "#181818",
            "input-search-border-color": "#2f2f2f",
        },
        fontFamily: {
            //TELEGRAM DEFAULT FONTS //https://web.telegram.org/k/
            "regular": ["Roboto", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "sans-serif"]
        },
        extend: {
            size: {
                "logo-sm": "40px",
                "logo-md": "80px",
                "logo-lg": "160px",
            },
        }
    },
    plugins: []
};

