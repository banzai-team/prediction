import { extendTheme } from '@chakra-ui/react'

// just for example
const overrides = {
    styles: {
        global: {
            // styles for the `body`
            body: {
                color: "#000000",
                // bg: "#fbfbfb"
            },
            // styles for the `a`
            a: {
                _hover: {
                    opacity: 0.8
                },
            },
            ".gantt-normal .bar-progress": {
                fill: "#68bfeeb8 !important"
            },
            ".gantt-bad .bar-progress": {
                fill: "#f1311db8 !important"
            },
            ".gantt-good .bar-progress": {
                fill: "#62e91b61 !important"
            },
            ".gantt .bar-label": {
                fill: "#000 !important",
                fontWeight: "bold"
            },
            ".gantt .bar": {
                fill: "#ccc !important",
            }
            // button: {
            //     background: "brand.900",
            //     _hover: {
            //         background: "brand.700"
            //     },
            // },
        },
    },
    colors: {
        brand: {
            900: "#cb2323",
            700: "#EA3E3E",
            400: "#E96868",
            200: "#FFD0D0",
        },
    },
    components: {
        Button: {
            baseStyle: {
            //     background: "red",
                fontWeight: 'bold', // Normally, it is "semibold"
            },
            variants: {
                'brand': {
                    bg: 'brand.900',
                    color: "white",
                    _hover: {
                        background: "brand.700"
                    },
                },
            },
        },
        Input: {
            variants: {
                'brand': {
                    bg: 'brand.900',
                    color: "white",
                    _hover: {
                        background: "brand.700"
                    },
                },
            },
        },
    },
}

export default extendTheme(overrides)
