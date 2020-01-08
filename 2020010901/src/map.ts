module my {
    export class Map extends eui.Component {
        public map: eui.Group;
        private w;//宽
        private h;//高
        constructor() {
            super();
            this.skinName = 'map';
        }

        public initMap(w, h) {
            this.w = w;
            this.h = h;
            this.map.removeChildren();
            for (var i = 0; i < this.w; i++) {
                for (var j = 0; j < this.h; j++) {
                    let item = new my.Item();
                    this.map.addChild(item);
                }
            }
        }

        public changeItem(x, y, v) {
            (this.map.getChildAt(x + y * 16) as my.Item).change(v);
        }

        public getItem(x, y) {
            return (this.map.getChildAt(x + y * 16) as my.Item).value;
        }
    }
}
