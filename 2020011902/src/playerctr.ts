module my {
	export class playerctr {
		private kb: KeyBoard;
		public direct = 'd';
		public lock = false;
		public event: egret.Event;
		public data;
		public point;
		public constructor() {
			this.kb = new KeyBoard();
			this.kb.addEventListener(KeyBoard.onkeydown, this.onKeyDown, this);
			let rawdata = localStorage.getItem('sdata');
			let sdata = {
				maxpoint: 0,
				gametimes: 0
			};
			if (rawdata) {
				sdata = JSON.parse(rawdata)
			}
			this.data = sdata;
			this.point = 0;
		}

		public saveData() {
			if (this.point > this.data.maxpoint) {
				this.data.maxpoint = this.point;
			}
			this.data.gametimes++;
			let data = JSON.stringify(this.data);
			localStorage.setItem('sdata', data);
		}

		private onKeyDown(event) {
			if (this.lock) return;
			this.lock = true;
			if (this.kb.isContain(event.data, KeyBoard.A) || this.kb.isContain(event.data, KeyBoard.keyArrow)) {
				if (this.direct != 'a' && this.direct != 'd') {
					this.direct = 'a';
				} else {
					this.lock = false;
				}
			} else if (this.kb.isContain(event.data, KeyBoard.D) || this.kb.isContain(event.data, KeyBoard.RightArrow)) {
				if (this.direct != 'd' && this.direct != 'a') {
					this.direct = 'd';
				} else {
					this.lock = false;
				}
			} else if (this.kb.isContain(event.data, KeyBoard.W) || this.kb.isContain(event.data, KeyBoard.UpArrow)) {
				if (this.direct != 'w' && this.direct != 's') {
					this.direct = 'w';
				} else {
					this.lock = false;
				}
			} else if (this.kb.isContain(event.data, KeyBoard.S) || this.kb.isContain(event.data, KeyBoard.DownArrow)) {
				if (this.direct != 's' && this.direct != 'w') {
					this.direct = 's';
				} else {
					this.lock = false;
				}
			}
		}

		public touchTap(key) {
			if (this.lock) return;
			this.lock = true;
			if (key == 3) {
				if (this.direct != 'a' && this.direct != 'd') {
					this.direct = 'a';
				} else {
					this.lock = false;
				}
			} else if (key == 4) {
				if (this.direct != 'd' && this.direct != 'a') {
					this.direct = 'd';
				} else {
					this.lock = false;
				}
			} else if (key == 1) {
				if (this.direct != 'w' && this.direct != 's') {
					this.direct = 'w';
				} else {
					this.lock = false;
				}
			} else if (key == 2) {
				if (this.direct != 's' && this.direct != 'w') {
					this.direct = 's';
				} else {
					this.lock = false;
				}
			}
		}

	}
}