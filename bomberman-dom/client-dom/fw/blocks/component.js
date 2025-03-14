// Component de bas extends de tout les component
import { diff, patch, render } from '../runner/engine.js';
/**
 * Represents a component in the mini-framework.
 */
export default class Component {
    /**
     * Creates a new instance of the Component class.
     * @param {string} tag - The HTML tag name for the component.
     * @param {Object} props - The properties of the component.
     * @param {Array} children - The child components of the component.
     */
    constructor(tag, props = {}, children = [], parent = null) {
        this.tag = tag;
        this.props = props;
        this.children = children;
        this.parent = parent;
        this.domNode = render(this);
    }
    /**
     * Adds CSS class names to the component's props.
     * @param {...string} classList - The CSS class names to add.
     */
    addClassName(...classList) {
        this.props.className += ' ' + classList.join(" ")
    }
    rmClassName(cl) {
        this.props.className = this.props.className.split(" ").filter((el) => { return el !== cl }).join(" ");
    }
    /**
     * Adds child components to the component.
     * @param {...Component} children - The child components to add.
     */
    addElement(...children) {
        this.children.push(...children);
    }

    removeElement(...children) {
        this.children = this.children.filter((child) => !children.includes(child))
    }

    replaceChildren(c1, c2) {
        this.children = this.children.filter((c) => c !== c1)
        this.addElement(c2)
    }

    /**
     * Renders the component.
     * Override this method in subclasses to define what the component renders.
     * @returns {Promise<string>} A promise that resolves to the rendered HTML string.
     */
    render() {
        return '';
    }


    updateDOM(callback = () => { }) {
        this.oldNode = this.domNode
        callback()
        const patches = diff(this.oldNode, this)
        const rootNode = document.getElementById(this.props.id)
        patch(rootNode, patches);
        this.domNode = render(this);
    }

    /**
     * Updates the component with new data.
     * @param {any} data - The new data to update the component with.
     * @returns {Promise<void>} A promise that resolves when the update is complete.
     */
    update() {
        // const oldVNode = this.vNode;
        // this.vNode = await this.render();
        // const patches = diff(oldVNode, this.vNode);
        // await patch(this.domNode, patches);
        this.updateDOM()
    }
    /**
     * Sets an event listener for the specified event type.
     * @param {string} eventType - The type of event to listen for.
     * @param {Function} func - The event listener function.
     */
    actionListener(eventType, func) {
        this.props[`on${eventType}`] = (event) => {
            event.preventDefault();
            if (eventType === 'submit') {
                func(event.target);
                event.target.reset();
            } else {
                func(event)
            }
        };
    }


    delete(child) {
        this.children = this.children.filter(element => element.props.id !== child)
        this.update();
    }

    clear() {
        this.children = [];
        this.update();
    }

    clone() {
        const clone = new Component(this.tag, this.props, this.children)
        clone.children = this.children.map((child) => child.clone())
        clone.parent = this.parent
        return clone
    }

    updateStyle(style) {
        document.getElementById(this.props.id).style = style;
    }

    getParent() {
        return this.parent;
    }
}
