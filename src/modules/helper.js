const Helper = (() => {
    // Create DOM element with attributes
    const createElement = (tag, attributes = {}) => {
        let element = document.createElement(tag)
        Object.keys(attributes).forEach((attribute) => {
            if (attribute !== 'innerHTML') {
                element.setAttribute(attribute, attributes[attribute])
            } else if (attribute === 'innerHTML') {
                element.innerHTML = attributes.innerHTML
            }
        })
        return element
    }

    // Setting multiple attributes to the element
    const setAttributes = (element, attributes ={}) => {
        Object.keys(attributes).forEach((attribute) => {
            if (attribute !== 'innerHTML') {
                element.setAttribute(attribute, attributes[attribute])
            } else if (attribute === 'innerHTML') {
                element.innerHTML = attributes.innerHTML
            }
        })
    }

    // Generate random integer between min (included) and max (excluded)
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {createElement, setAttributes, random}
})()

export default Helper