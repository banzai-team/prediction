import { extendTheme } from '@chakra-ui/react'

// just for example
const overrides = {
    styles: {
        global: {
            // styles for the `body`
            body: {
                color: "#000000",
            },
            // styles for the `a`
            a: {
                _hover: {
                    opacity: 0.8
                },
            },
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
