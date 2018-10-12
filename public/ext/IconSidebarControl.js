!function() {
// import './IconSidebarControl.css';

// ev.opening
// ev.opened { <String>id }
// ev.closing
// ev.closed
let Control = L.Control.extend({
	includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,

    // options.position (left|right)
    initialize: function(options) {
        this._panes = {}
        L.setOptions(this, options);
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'iconSidebarControl')
        this._tabsContainer = L.DomUtil.create('ul', 'iconSidebarControl-tabs', this._container)
        this._panesContainer = L.DomUtil.create('div', 'iconSidebarControl-content', this._container)

        L.DomUtil.addClass(this._container, this.options.position.indexOf('left') !== -1 ? 'iconSidebarControl-left' : 'iconSidebarControl-right');

        L.DomEvent.disableClickPropagation(this._container)
        L.DomEvent.disableScrollPropagation(this._container)
        // L.DomEvent.on(this._container, 'mousemove', L.DomEvent.stopPropagation)

        return this._container;
    },

    onRemove: function(map) { },

    setPane: function(id, paneOptions = {}) {
        const { createTab, position, enabled } = paneOptions
        const defaultPaneOptions = { position: 0, enabled: true }

        this._panes[id] = L.extend({}, defaultPaneOptions, this._panes[id] || {}, paneOptions)

        if (!this._panes[id].enabled && this._activeTabId === id) {
            this.close()
        }

        this._renderTabs({})
        return this._ensurePane(id)
    },

    open: function(paneId) {
        if (this._isAnimating) {
            return
        }

        const pane = this._panes[paneId]
        if (!pane || !pane.enabled) {
            return
        }

        this._activeTabId = paneId;

        this._setActiveClass(paneId);

        if (this._isOpened) {
            this.fire('opened', {
                id: this._activeTabId
            })
            return
        }

        this._isAnimating = true
        L.DomUtil.addClass(this._container, 'iconSidebarControl_opened')
        L.DomUtil.addClass(this._container, 'iconSidebarControl_expanded')
        this._isOpened = true
        this.fire('opening')
        setTimeout(() => {
            this.fire('opened', {
                id: this._activeTabId
            })
            this._isAnimating = false
        }, 250)
    },

    close: function() {
        if (this._isAnimating) {
            return
        }

        L.DomUtil.removeClass(this._container, 'iconSidebarControl_opened')

        this._isAnimating = true
        L.DomUtil.removeClass(this._container, 'iconSidebarControl_opened')
        this._isOpened = false
        this.fire('closing')
        setTimeout(() => {
            L.DomUtil.removeClass(this._container, 'iconSidebarControl_expanded')
            this.fire('closed', {
                id: this._activeTabId
            })
            this._isAnimating = false
            this._setActiveClass('')
            this._activeTabId = null
        }, 250)
    },

    getActiveTabId: function() {
        return this._activeTabId;
    },

    isOpened: function () {
        return this._isOpened
    },

    _ensurePane: function(id) {
        let paneEl = Array.prototype.slice.call(this._panesContainer.childNodes).find((node) => {
            return node.getAttribute('data-pane-id') === id
        })

        if (paneEl) {
            return paneEl
        }

        paneEl = L.DomUtil.create('div', 'iconSidebarControl-pane');
        paneEl.setAttribute('data-pane-id', id);
        this._panesContainer.appendChild(paneEl);

        return paneEl;
    },

    _setActiveClass: function(activeId) {
        var i, id;
        for (i = 0; i < this._panesContainer.children.length; i++) {
            id = this._panesContainer.children[i].getAttribute('data-pane-id');
            if (id === activeId) {
                L.DomUtil.addClass(this._panesContainer.querySelector('[data-pane-id=' + id + ']'), 'iconSidebarControl-pane-active');
            } else {
                L.DomUtil.removeClass(this._panesContainer.querySelector('[data-pane-id=' + id + ']'), 'iconSidebarControl-pane-active');
            }
        }
    },

    _onTabClick: function(e) {
        var tabId = e.currentTarget.getAttribute('data-tab-id');
        if (!this._isOpened || this._activeTabId !== tabId) {
            this.open(tabId);
            this._renderTabs({ activeTabId: tabId })
        } else {
            this.close();
            this._renderTabs({})
        }
    },

    _renderTabs: function ({ activeTabId, hoveredTabId }) {
        this._tabsContainer.innerHTML = ''
        Object.keys(this._panes).map((id) => L.extend({ id }, this._panes[id])).sort((a, b) => {
            return a.position - b.position
        }).map(({ id, createTab, enabled }) => {
            if (!createTab) {
                return
            }
            const tabContainerEl = L.DomUtil.create('li', 'iconSidebarControl-tab')
            tabContainerEl.setAttribute('data-tab-id', id)
            const tabEl = createTab(getFlag(id, activeTabId, hoveredTabId, enabled))
            L.DomEvent.on(tabContainerEl, 'click', this._onTabClick, this);
            tabContainerEl.appendChild(tabEl)
            this._tabsContainer.appendChild(tabContainerEl)
        })

        function getFlag(tabId, activeTabId, hoveredTabId, enabled) {
            if (!enabled) {
                return 'disabled'
            } else if (hoveredTabId && tabId === hoveredTabId) {
                return 'hover'
            } else if (activeTabId && tabId === activeTabId) {
                return 'active'
            } else {
                return 'default'
            }
        }
    }
});
L.Control.iconSidebar = Control;
L.control.iconSidebar = function(options) {
    return new Control(options);
};

window.IconSidebar = window.IconSidebar || {};
window.IconSidebar.Control = Control;
// export { Control };
}();
