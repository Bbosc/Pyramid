class Menu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="menu-bar">
                <div class="directions">
                    <a href="/">home</a>
                    <a href="">intelligence</a>
                    <a href="">health</a>
                    <a href="">legal</a>
                </div>
                <button type="button" onclick="toggleTaskSpace()">Add a new task</button>
            </div>
        `;
    }
}


customElements.define('menu-bar', Menu);
