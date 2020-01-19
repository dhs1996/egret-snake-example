module my {
    export class Item extends eui.Component {
        constructor() {
            super();
            this.skinName = 'item';
        }

        public change(state) {
            if (state == 0) {
                this.currentState = 'groud';
            } else if (state == 1) {
                this.currentState = 'snake';
            } else if (state == 2) {
                this.currentState = 'food';
            }
        }

        public get value() {
            if (this.currentState == 'groud') {
                return 0;
            } else if (this.currentState == 'snake') {
                return 1;
            } else if (this.currentState == 'food') {
                return 2;
            }
        }
    }
}
