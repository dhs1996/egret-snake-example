//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private playerCtr: my.playerctr;
    private game;
    private snake = [];
    protected createGameScene(): void {
        this.playerCtr = new my.playerctr();
        let scene = new eui.Component();
        scene.skinName = 'menu';
        scene['btn_start'].addEventListener('touchTap', () => {
            scene.currentState = 'game';
            this.initGame();
        }, this);
        this.game = scene;
        this.addChild(scene);
    }

    private initGame() {
        this.game['game'].initMap(16, 16);
        this.snake.push({ x: 0, y: 0 });
        this.snake.push({ x: 1, y: 0 });
        this.setMapData(0, 0, 1);
        this.setMapData(1, 0, 1);
        this.addTouchBoard();//添加虚拟方向键
        this.startGame();//计时器
    }

    private addTouchBoard() {
        let touchboard = new eui.Component();
        touchboard.skinName = 'touchboard';
        for (var i = 1; i < 5; i++) {
            let k=i;
            touchboard['btn_'+i].addEventListener('touchTap', () => {
                this.playerCtr.touchTap(k);
            }, this);
        }
        touchboard.left=50;
        touchboard.bottom=50;
        this.addChild(touchboard);
    }

    private setMapData(x, y, v) {
        this.game['game'].changeItem(x, y, v);
    }

    private showSnake() {
        let first = this.snake[this.snake.length - 1];

        switch (this.playerCtr.direct) {
            case 'd':
                this.setMapData(first.x + 1, first.y, 1);
                this.snake.push({ x: first.x + 1, y: first.y });
                break;
            case 'a':
                this.setMapData(first.x - 1, first.y, 1);
                this.snake.push({ x: first.x - 1, y: first.y });
                break;
            case 'w':
                this.setMapData(first.x, first.y - 1, 1);
                this.snake.push({ x: first.x, y: first.y - 1 });
                break;
            case 's':
                this.setMapData(first.x, first.y + 1, 1);
                this.snake.push({ x: first.x, y: first.y + 1 });
                break;
            default:
                break;
        }
        let last = this.snake.shift();
        this.setMapData(last.x, last.y, 0);
        console.log(first.x, first.y)
    }

    public startGame() {
        let t = new egret.Timer(500);
        t.addEventListener('timer', this.updateGame, this);
        t.start();
    }

    private updateGame() {
        this.showSnake();
        this.playerCtr.lock = false;
    }


}
