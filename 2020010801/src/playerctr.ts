module my {
	export class playerctr {
		private kb: KeyBoard;
		public direct = 'd';
		public lock = false;
		public event: egret.Event;
		public constructor() {
			this.kb = new KeyBoard();
			this.kb.addEventListener(KeyBoard.onkeydown, this.onKeyDown, this);
		}

		private onKeyDown(event) {
			if (this.lock) return;
			this.lock = true;
			if (this.kb.isContain(event.data, KeyBoard.A)) {
				if (this.direct != 'a' && this.direct != 'd') {
					this.direct = 'a';
				} else {
					this.lock = false;
				}
			} else if (this.kb.isContain(event.data, KeyBoard.D)) {
				if (this.direct != 'd' && this.direct != 'a') {
					this.direct = 'd';
				} else {
					this.lock = false;
				}
			} else if (this.kb.isContain(event.data, KeyBoard.W)) {
				if (this.direct != 'w' && this.direct != 's') {
					this.direct = 'w';
				} else {
					this.lock = false;
				}
			} else if (this.kb.isContain(event.data, KeyBoard.S)) {
				if (this.direct != 's' && this.direct != 'w') {
					this.direct = 's';
				} else {
					this.lock = false;
				}
			}
		}

	}
}