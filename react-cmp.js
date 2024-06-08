import { LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js'; // For better ref handling 
import ReactDOM from 'react-dom/client'; // Use the newer ReactDOM API
import React from 'react';

const MyReactComponent = () => {
    const [count, setCount] = React.useState(0);
    return <><h1>React Counter: {count}  </h1> <button onClick={()=>{setCount(count => count+1)}}>Click Me!!</button> </>;
};

export class MyLitWrapper extends LitElement {
  static styles = css`
    /* Your Lit styles */
  `;

  // Ref for the container element
  reactContainer = createRef();



  // When the component is first connected to the DOM
  connectedCallback() {
    super.connectedCallback(); 
    
    // Ensure React renders AFTER the container is in the DOM
    requestAnimationFrame(() => {

     
      if (this.reactContainer.value && !this.reactRoot) { 
        console.log(this.reactContainer.value)
        this.reactRoot = ReactDOM.createRoot(this.reactContainer.value);
        this.reactRoot.render(<MyReactComponent />);
      }
    });
  }

  // Clean up when the component is removed
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }

  render() {
    return html`<div id="reactroot" ${ref(this.reactContainer)} ></div>`;
  }
}

window.customElements.define('my-lit-wrapper', MyLitWrapper);