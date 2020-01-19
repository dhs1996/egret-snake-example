module me {
    class EventDispatcher extends egret.EventDispatcher {
        private map: any;

        constructor() {
            super();
            this.map = {};
        }
        
        public emit(type: string, data?: any) {
            this.dispatchEventWith(type, false, data);
        }
        
        public on(type: string, listener: Function, thisObject = null) {
            if (!type || type == '' || !listener) return;
            this.addEventListener(type, listener, thisObject);
            this.map[type] = this.map[type] || [];
            this.map[type].push({ 'f': listener, 'o': thisObject });
        }
        
        public cut(type: string, listener: Function, thisObject = null) {
            if (!type || type == '' || !listener) return;
            this.removeEventListener(type, listener, thisObject);
            for (let k in this.map[type]) {
                let v = this.map[type][k];
                if (v.f == listener && v.o == thisObject) {
                    this.map[type].splice(k, 1);
                }
            }
        }

    }
    export let Event = new EventDispatcher();
}