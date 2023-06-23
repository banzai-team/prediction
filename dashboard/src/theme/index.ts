import { extendTheme } from '@chakra-ui/react'

// just for example
const overrides = {
    styles: {
        global: {
            // styles for the `body`
            body: {
                color: "#000000"
            },
            // styles for the `a`
            a: {
                _hover: {
                    opacity: 0.5
                },
            },
        },
    },
    colors: {
        brand: {
            900: "#cb2323",
        },
    },
    components: {
        Button: {
            baseStyle: {
                background: "blue"
            },
        }
    }
}

export default extendTheme(overrides)