/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
// 23FI004 荒井 涼



class ThreeJSContainer {
    scene;
    geometry;
    material;
    cubes = [];
    light;
    goodPanel = null;
    medalCount = 777;
    medalPanel = null;
    leverBase = null;
    buttons = []; // ボタンの配列
    constructor() { }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        let renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0x495ed));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        let camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0));
        let orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // requestAnimationFrame により次フレームを呼ぶ
        let render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader();
        const reelTextures = [
            textureLoader.load('image/reelLeft.png'),
            textureLoader.load('image/reelCenter.png'),
            textureLoader.load('image/reelRight.png')
        ];
        reelTextures.forEach(texture => {
            texture.center.set(0.5, 0.5);
            texture.rotation = -Math.PI / 2;
        });
        // 外枠のShape（全体のパネル 5 x 3）
        const shape = new three__WEBPACK_IMPORTED_MODULE_2__.Shape();
        shape.moveTo(-2, -1.5);
        shape.lineTo(2, -1.5);
        shape.lineTo(2, 1.5);
        shape.lineTo(-2, 1.5);
        shape.lineTo(-2, -1.5);
        // 穴のShape（四角形の穴 x3）
        const holes = [
            { x: -1, y: 0, width: 0.9, height: 1.2 },
            { x: 0, y: 0, width: 0.9, height: 1.2 },
            { x: 1, y: 0, width: 0.9, height: 1.2 }
        ];
        holes.forEach(h => {
            const hole = new three__WEBPACK_IMPORTED_MODULE_2__.Path();
            hole.moveTo(h.x - h.width / 2, h.y - h.height / 2);
            hole.lineTo(h.x + h.width / 2, h.y - h.height / 2);
            hole.lineTo(h.x + h.width / 2, h.y + h.height / 2);
            hole.lineTo(h.x - h.width / 2, h.y + h.height / 2);
            hole.lineTo(h.x - h.width / 2, h.y - h.height / 2);
            shape.holes.push(hole);
        });
        const boxMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xff0000 });
        const leftPanel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(0.2, 3, 2), boxMaterial);
        leftPanel.position.set(-2, 0, 0);
        this.scene.add(leftPanel);
        const rightPanel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(0.2, 3, 2), boxMaterial);
        rightPanel.position.set(2, 0, 0);
        this.scene.add(rightPanel);
        const topPanel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(4.2, 0.2, 2), boxMaterial);
        topPanel.position.set(0, 1.5, 0);
        this.scene.add(topPanel);
        const backPanel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(4.2, 3.1, 0.2), boxMaterial);
        backPanel.position.set(0, 0.05, -1);
        this.scene.add(backPanel);
        const underPanel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(4.7, 3, 2.5), boxMaterial);
        underPanel.position.set(0, -3, 0);
        this.scene.add(underPanel);
        const texture = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader().load('image/TDU.png');
        const panelMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ map: texture, transparent: true });
        const panelWidth = 4;
        const panelHeight = 2;
        const panelGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(panelWidth, panelHeight);
        const imagePanel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(panelGeometry, panelMaterial);
        imagePanel.position.set(0, -3.2, 1.26);
        this.scene.add(imagePanel);
        // レバー作成
        const leverGroup = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
        // 棒
        const leverMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x888888 });
        const leverStick = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.05, 0.05, 0.5, 16), leverMaterial);
        leverStick.position.y = 0.25;
        leverGroup.add(leverStick);
        // 黒い球
        const ballMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x000000 });
        const leverBall = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.1, 16, 16), ballMaterial);
        leverBall.position.y = 0.5;
        leverGroup.add(leverBall);
        // レバー全体の位置
        leverGroup.position.set(-1.8, -1.7, 1.2);
        // 回転初期位置
        leverGroup.rotation.x = Math.PI / 2;
        this.scene.add(leverGroup);
        this.leverBase = leverGroup;
        // GeometryとMesh生成
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.ShapeGeometry(shape);
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xff0000, side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide });
        const panel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geometry, material);
        panel.position.z = 1;
        this.scene.add(panel);
        const goodTexture = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader().load('image/goodLamp.png');
        const goodMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ map: goodTexture, transparent: true });
        this.goodPanel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(1, 1), goodMaterial);
        this.goodPanel.position.set(-1.6, -0.8, 1.01);
        this.geometry = new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(1, 1, 1, 32);
        // リール3つ生成
        const positionsX = [-1, 0, 1];
        for (let i = 0; i < 3; i++) {
            const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({
                color: 0xffffff,
                map: reelTextures[i],
                side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide
            });
            const reel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(this.geometry, material);
            reel.castShadow = true;
            reel.rotateZ(Math.PI / 2);
            reel.position.x = positionsX[i];
            this.scene.add(reel);
            this.cubes.push(reel);
        }
        // 状態管理用の配列
        let rotateAngles = [0, 0, 0]; // 3リールの回転角度(度)
        let lastRotateAngles = [0, 0, 0]; // 滑り時の残り角度
        let isRotatings = [false, false, false];
        let isSlippings = [false, false, false];
        const clock = new three__WEBPACK_IMPORTED_MODULE_2__.Clock();
        const rotationSpeedPerSecond = 720;
        const slipSpeed = 720;
        // 0: 全リール回転中, 1〜3: 停止済みリール数（停止順は左→中→右）
        let stopCount = 3; // 最初は全停止状態
        // 抽選フラグ
        let isBell = false;
        let isReplay = false;
        let isOut = false;
        let isWatermelon = false;
        let isChery = false;
        let isStrongChery = false;
        let isBigBonus = false;
        let isRegBonus = false;
        let isBonusTime = false;
        let random = 0;
        let bonusCount = 0;
        // キーイベント: エンターでリール操作
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (stopCount === 3) {
                    // 全リール停止 → 全リール始動
                    this.buttons.forEach(btn => {
                        btn.material.color.set(0x0000ff); // 青
                    });
                    for (let i = 0; i < 3; i++) {
                        isRotatings[i] = true;
                        isSlippings[i] = false;
                        lastRotateAngles[i] = 0;
                    }
                    stopCount = 0;
                    if (!isReplay && !isWatermelon) {
                        this.medalCount -= 3;
                    }
                    this.updateMedalPanel();
                    if (!isBigBonus && !isRegBonus) {
                        resetFlags();
                        random = Math.floor(Math.random() * 256);
                        // 抽選はここで1回だけ
                        if (random === 0)
                            isStrongChery = true;
                        else if (random < 5)
                            isChery = true;
                        else if (random < 37)
                            isWatermelon = true;
                        else if (random < 69)
                            isBell = true;
                        else if (random < 133)
                            isReplay = true;
                        else if (random < 256)
                            isOut = true;
                    }
                    console.log("抽選結果:", {
                        isBell,
                        isReplay,
                        isOut,
                        isWatermelon,
                        isChery,
                        isStrongChery,
                        isBigBonus,
                        isRegBonus,
                        isBonusTime
                    });
                    // レバーを叩く
                    if (this.leverBase) {
                        this.leverBase.rotation.x = Math.PI / 2;
                        this.leverBase.rotation.x = Math.PI / 4 * 3;
                        // 0.5秒後に戻す
                        setTimeout(() => {
                            if (this.leverBase) {
                                this.leverBase.rotation.x = Math.PI / 2;
                            }
                        }, 500);
                    }
                    // （既存のリール回転処理）
                    for (let i = 0; i < 3; i++) {
                        isRotatings[i] = true;
                        isSlippings[i] = false;
                        lastRotateAngles[i] = 0;
                    }
                }
                else {
                    // リールを順番に1つずつ止める処理
                    const i = stopCount; // 停止対象のリールインデックス（0:左,1:中,2:右）
                    if (isRotatings[i]) {
                        isRotatings[i] = false;
                        this.buttons[i].material.color.set(0xff0000); // 赤
                        isSlippings[i] = true;
                        // 滑らかに停止するための残り角度設定
                        const remainder = rotateAngles[i] % 360;
                        let targetAngle = 0;
                        // 左リールの停止位置決定
                        if (isBell || isReplay || isOut || isBonusTime) {
                            const currentSegment = Math.floor(remainder / 90);
                            targetAngle = ((currentSegment + 1) * 90 + 60) % 360;
                            lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                            if (lastRotateAngles[i] > 90)
                                lastRotateAngles[i] -= 90;
                            if (lastRotateAngles[i] === 0)
                                lastRotateAngles[i] = 60;
                        }
                        else if (isWatermelon) {
                            const currentSegment = Math.floor(remainder / 90);
                            targetAngle = ((currentSegment + 1) * 90 + 76) % 360;
                            lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                            if (lastRotateAngles[i] > 90)
                                lastRotateAngles[i] -= 90;
                            if (lastRotateAngles[i] === 0)
                                lastRotateAngles[i] = 76;
                        }
                        else if (isChery || isStrongChery) {
                            const currentSegment = Math.floor(remainder / 90);
                            targetAngle = ((currentSegment + 1) * 90 + 40) % 360;
                            lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                            if (lastRotateAngles[i] > 90)
                                lastRotateAngles[i] -= 90;
                            if (lastRotateAngles[i] === 0)
                                lastRotateAngles[i] = 40;
                        }
                        else if (isBigBonus || isRegBonus) {
                            const currentSegment = Math.floor(remainder / 90);
                            targetAngle = ((currentSegment + 1) * 180 + 22) % 360;
                            lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                            if (lastRotateAngles[i] > 180)
                                lastRotateAngles[i] -= 180;
                            if (lastRotateAngles[i] === 0)
                                lastRotateAngles[i] = 22;
                        }
                        // 中リールの停止位置決定
                        if (i === 1) {
                            if (isOut || isReplay) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 90 + 40) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 90)
                                    lastRotateAngles[i] -= 90;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 40;
                            }
                            else if (isBell || isBonusTime) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 90 + 76) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 90)
                                    lastRotateAngles[i] -= 90;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 76;
                            }
                            else if (isWatermelon) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 180 + 110) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 180)
                                    lastRotateAngles[i] -= 180;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 20;
                            }
                            else if (isChery || isStrongChery) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 90 + 58) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 90)
                                    lastRotateAngles[i] -= 90;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 58;
                            }
                            else if (isBigBonus || isRegBonus) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 360 + 92) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 360)
                                    lastRotateAngles[i] -= 360;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 92;
                            }
                        }
                        // 右リールの停止位置決定
                        if (i === 2) {
                            if (isOut || isWatermelon) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 180 + 2) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 180)
                                    lastRotateAngles[i] -= 180;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 2;
                                if (isOut) {
                                    const bonus = Math.floor(Math.random() * 128);
                                    if (bonus === 1) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        this.setBackgroundColor(0x000000);
                                        isBigBonus = true;
                                        isOut = false;
                                    }
                                    else if (bonus === 2) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        this.setBackgroundColor(0x000000);
                                        isRegBonus = true;
                                        isOut = false;
                                    }
                                }
                                else if (isWatermelon) {
                                    const bonus = Math.floor(Math.random() * 16);
                                    if (bonus === 1) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        this.setBackgroundColor(0x000000);
                                        isBigBonus = true;
                                        isWatermelon = false;
                                    }
                                    else if (bonus === 2) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        this.setBackgroundColor(0x000000);
                                        isRegBonus = true;
                                        isWatermelon = false;
                                    }
                                }
                            }
                            else if (isBell || isReplay || isChery || isBonusTime) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 90 + 20) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 90)
                                    lastRotateAngles[i] -= 90;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 20;
                                if (isBell || isBonusTime) {
                                    this.medalCount += 7;
                                    this.updateMedalPanel();
                                    bonusCount -= 1;
                                    if (isBonusTime) {
                                        this.launchFireworks(5);
                                        this.launchFireworks(-5);
                                        if (bonusCount < 1) {
                                            isBonusTime = false;
                                            isBigBonus = false;
                                            isRegBonus = false;
                                            if (this.goodPanel && this.scene.children.includes(this.goodPanel)) {
                                                this.scene.remove(this.goodPanel);
                                            }
                                            this.setBackgroundColor(0x495ed);
                                        }
                                    }
                                }
                                else if (isChery) {
                                    this.medalCount += 4;
                                    this.updateMedalPanel();
                                    const bonus = Math.floor(Math.random() * 16);
                                    if (bonus === 1) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        this.setBackgroundColor(0x000000);
                                        isBigBonus = true;
                                        isChery = false;
                                    }
                                    else if (bonus === 2) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        this.setBackgroundColor(0x000000);
                                        isRegBonus = true;
                                        isChery = false;
                                    }
                                }
                            }
                            else if (isStrongChery) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 90 + 60) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 90)
                                    lastRotateAngles[i] -= 90;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 60;
                                this.medalCount += 2;
                                this.updateMedalPanel();
                                const big = Math.floor(Math.random() * 2);
                                if (big === 1) {
                                    if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                        this.scene.add(this.goodPanel);
                                    }
                                    this.setBackgroundColor(0x000000);
                                    isBigBonus = true;
                                    isStrongChery = false;
                                }
                            }
                            else if (isRegBonus) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 180 + 146) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 180)
                                    lastRotateAngles[i] -= 180;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 146;
                                isBonusTime = true;
                                bonusCount = 5;
                                this.launchFireworks(5);
                                this.launchFireworks(-5);
                            }
                            else if (isBigBonus) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 180 + 166) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 180)
                                    lastRotateAngles[i] -= 180;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 166;
                                isBonusTime = true;
                                bonusCount = 15;
                                this.launchFireworks(5);
                                this.launchFireworks(-5);
                                ;
                            }
                        }
                        stopCount++;
                    }
                }
            }
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    // 既存のリール制御処理
                }
                else if (event.key === 'g' || event.key === 'G') {
                    if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                        this.scene.add(this.goodPanel);
                    }
                    this.setBackgroundColor(0x000000);
                    resetFlags();
                    isBigBonus = true;
                }
            });
        });
        // フラグリセット関数
        function resetFlags() {
            isBell = false;
            isReplay = false;
            isOut = false;
            isWatermelon = false;
            isChery = false;
            isBigBonus = false;
            isRegBonus = false;
        }
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
        let lvec = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.createMedalPanel();
        this.createButtons();
        this.createStartPanel();
        // 毎フレームのupdateを呼んで，更新
        // requestAnimationFrame により次フレームを呼ぶ
        let update = (time) => {
            const delta = clock.getDelta();
            for (let i = 0; i < 3; i++) {
                if (isRotatings[i]) {
                    const rotationThisFrame = rotationSpeedPerSecond * delta;
                    this.cubes[i].rotateY(three__WEBPACK_IMPORTED_MODULE_2__.MathUtils.degToRad(-rotationThisFrame));
                    rotateAngles[i] = (rotateAngles[i] + rotationThisFrame) % 360;
                }
                else if (isSlippings[i]) {
                    const rotationThisFrame = Math.min(slipSpeed * delta, lastRotateAngles[i]);
                    this.cubes[i].rotateY(three__WEBPACK_IMPORTED_MODULE_2__.MathUtils.degToRad(-rotationThisFrame));
                    rotateAngles[i] = (rotateAngles[i] + rotationThisFrame) % 360;
                    lastRotateAngles[i] -= rotationThisFrame;
                    if (lastRotateAngles[i] <= 0) {
                        lastRotateAngles[i] = 0;
                        isSlippings[i] = false;
                    }
                }
            }
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update(time);
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
    createButtons() {
        const outerMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x000000 });
        const buttonPositions = [
            { x: -1, y: -1.2, z: 1.2 },
            { x: 0, y: -1.2, z: 1.2 },
            { x: 1, y: -1.2, z: 1.2 } // 右リール下
        ];
        for (let i = 0; i < 3; i++) {
            const group = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
            // ボタンの外側
            const outerCylinder = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.15, 0.15, 0.05, 16), outerMaterial);
            outerCylinder.position.y = 0.025;
            // ボタン本体
            const innerMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x0000ff }); // 個別のインスタンス
            const innerCylinder = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.1, 0.1, 0.05, 16), innerMaterial);
            innerCylinder.position.y = 0.05;
            this.buttons.push(innerCylinder);
            group.add(outerCylinder);
            group.add(innerCylinder);
            group.position.set(buttonPositions[i].x, buttonPositions[i].y, buttonPositions[i].z);
            group.rotateX(Math.PI / 2);
            group.position.z = 1.25;
            group.position.y = -1.8;
            this.scene.add(group);
        }
    }
    createStartPanel() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '48px Arial';
        ctx.fillStyle = 'yellow';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Press ENTER to Start!', canvas.width / 2, canvas.height / 2);
        const texture = new three__WEBPACK_IMPORTED_MODULE_2__.CanvasTexture(canvas);
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ map: texture, side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide, transparent: true });
        const panel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(3, 0.6), material);
        panel.position.set(0, 1.1, 1.01); // スロット本体上部あたりの座標
        this.scene.add(panel);
    }
    // メダルをカウントするパネル
    createMedalPanel() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '36px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`Medals: ${this.medalCount}`, 20, 80);
        const texture = new three__WEBPACK_IMPORTED_MODULE_2__.CanvasTexture(canvas);
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ map: texture, side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide });
        const panel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(1.5, 0.6), material);
        panel.position.set(0, -1.05, 1.01);
        this.scene.add(panel);
    }
    // パネルのアップデート
    updateMedalPanel() {
        if (this.medalPanel) {
            this.scene.remove(this.medalPanel);
        }
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '36px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`Medals: ${this.medalCount}`, 20, 80);
        const texture = new three__WEBPACK_IMPORTED_MODULE_2__.CanvasTexture(canvas);
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ map: texture, side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide });
        this.medalPanel = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(1.5, 0.6), material);
        this.medalPanel.position.set(0, -1.05, 1.01);
        this.scene.add(this.medalPanel);
    }
    setBackgroundColor(color) {
        this.scene.background = new three__WEBPACK_IMPORTED_MODULE_2__.Color(color);
    }
    launchFireworks(xPosition) {
        // 打ち上げ球
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.05, 8, 8);
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0xffffff });
        const ball = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geometry, material);
        ball.position.set(xPosition, 0, 0);
        this.scene.add(ball);
        // 打ち上げアニメーション
        new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(ball.position)
            .to({ y: 3 }, 800)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out)
            .onComplete(() => {
            this.scene.remove(ball);
            this.createExplosion(xPosition, 3);
        })
            .start();
    }
    createExplosion(x, y) {
        const particleCount = 200;
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = [];
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = 0;
            // 球面座標でランダムな方向ベクトル
            const theta = Math.random() * 2 * Math.PI; // 水平方向の角度
            const phi = Math.acos(2 * Math.random() - 1); // 垂直方向の角度
            const speed = Math.random() * 0.05 + 0.02; // 速度（大きさ）
            const vx = speed * Math.sin(phi) * Math.cos(theta);
            const vy = speed * Math.cos(phi);
            const vz = speed * Math.sin(phi) * Math.sin(theta);
            velocities.push(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(vx, vy, vz));
            const color = new three__WEBPACK_IMPORTED_MODULE_2__.Color(Math.random(), Math.random(), Math.random());
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(colors, 3));
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 0.08,
            vertexColors: true, // 頂点カラーを使用
        });
        const points = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometry, material);
        this.scene.add(points);
        let life = 60; // フレーム数で寿命管理
        const animateParticles = () => {
            const positions = geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i].x;
                positions[i * 3 + 1] += velocities[i].y;
                positions[i * 3 + 2] += velocities[i].z;
                // 簡易的な重力
                velocities[i].y -= 0.002;
            }
            geometry.attributes.position.needsUpdate = true;
            life--;
            if (life > 0) {
                requestAnimationFrame(animateParticles);
            }
            else {
                this.scene.remove(points);
            }
        };
        animateParticles();
    }
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 7));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-78d392"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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K0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDIzRkkwMDQg6I2S5LqVIOa2vFxuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJztcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBnZW9tZXRyeTogVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgcHJpdmF0ZSBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG4gICAgcHJpdmF0ZSBjdWJlczogVEhSRUUuTWVzaFtdID0gW107XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBnb29kUGFuZWw6IFRIUkVFLk1lc2ggfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIG1lZGFsQ291bnQ6IG51bWJlciA9IDc3NztcbiAgICBwcml2YXRlIG1lZGFsUGFuZWw6IFRIUkVFLk1lc2ggfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGxldmVyQmFzZTogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGJ1dHRvbnM6IFRIUkVFLk1lc2hbXSA9IFtdOyAgLy8g44Oc44K/44Oz44Gu6YWN5YiXXG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQKOihqOekuuOBmeOCi+aeoOOBlOOBqOOBqykqXG4gICAgcHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgbGV0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHg0OTVlZCkpO1xuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7IC8v44K344Oj44OJ44Km44Oe44OD44OX44KS5pyJ5Yq544Gr44GZ44KLXG5cbiAgICAgICAgLy/jgqvjg6Hjg6njga7oqK3lrppcbiAgICAgICAgbGV0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGxldCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG5cbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgbGV0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTtcblxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIGNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcbiAgICAgICAgY29uc3QgcmVlbFRleHR1cmVzID0gW1xuICAgICAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCdpbWFnZS9yZWVsTGVmdC5wbmcnKSxcbiAgICAgICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnaW1hZ2UvcmVlbENlbnRlci5wbmcnKSxcbiAgICAgICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnaW1hZ2UvcmVlbFJpZ2h0LnBuZycpXG4gICAgICAgIF07XG4gICAgICAgIHJlZWxUZXh0dXJlcy5mb3JFYWNoKHRleHR1cmUgPT4ge1xuICAgICAgICAgICAgdGV4dHVyZS5jZW50ZXIuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgICAgIHRleHR1cmUucm90YXRpb24gPSAtTWF0aC5QSSAvIDI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIOWkluaeoOOBrlNoYXBl77yI5YWo5L2T44Gu44OR44ON44OrIDUgeCAz77yJXG4gICAgICAgIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gICAgICAgIHNoYXBlLm1vdmVUbygtMiwgLTEuNSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbygyLCAtMS41KTtcbiAgICAgICAgc2hhcGUubGluZVRvKDIsIDEuNSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbygtMiwgMS41KTtcbiAgICAgICAgc2hhcGUubGluZVRvKC0yLCAtMS41KTtcblxuICAgICAgICAvLyDnqbTjga5TaGFwZe+8iOWbm+inkuW9ouOBrueptCB4M++8iVxuICAgICAgICBjb25zdCBob2xlcyA9IFtcbiAgICAgICAgICAgIHsgeDogLTEsIHk6IDAsIHdpZHRoOiAwLjksIGhlaWdodDogMS4yIH0sXG4gICAgICAgICAgICB7IHg6IDAsIHk6IDAsIHdpZHRoOiAwLjksIGhlaWdodDogMS4yIH0sXG4gICAgICAgICAgICB7IHg6IDEsIHk6IDAsIHdpZHRoOiAwLjksIGhlaWdodDogMS4yIH1cbiAgICAgICAgXTtcblxuICAgICAgICBob2xlcy5mb3JFYWNoKGggPT4ge1xuICAgICAgICAgICAgY29uc3QgaG9sZSA9IG5ldyBUSFJFRS5QYXRoKCk7XG4gICAgICAgICAgICBob2xlLm1vdmVUbyhoLnggLSBoLndpZHRoIC8gMiwgaC55IC0gaC5oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGhvbGUubGluZVRvKGgueCArIGgud2lkdGggLyAyLCBoLnkgLSBoLmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgaG9sZS5saW5lVG8oaC54ICsgaC53aWR0aCAvIDIsIGgueSArIGguaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBob2xlLmxpbmVUbyhoLnggLSBoLndpZHRoIC8gMiwgaC55ICsgaC5oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGhvbGUubGluZVRvKGgueCAtIGgud2lkdGggLyAyLCBoLnkgLSBoLmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgc2hhcGUuaG9sZXMucHVzaChob2xlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYm94TWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmMDAwMCB9KTtcblxuICAgICAgICBjb25zdCBsZWZ0UGFuZWwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4yLCAzLCAyKSwgYm94TWF0ZXJpYWwpO1xuICAgICAgICBsZWZ0UGFuZWwucG9zaXRpb24uc2V0KC0yLCAwLCAwKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobGVmdFBhbmVsKTtcblxuICAgICAgICBjb25zdCByaWdodFBhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMiwgMywgMiksIGJveE1hdGVyaWFsKTtcbiAgICAgICAgcmlnaHRQYW5lbC5wb3NpdGlvbi5zZXQoMiwgMCwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHJpZ2h0UGFuZWwpO1xuXG4gICAgICAgIGNvbnN0IHRvcFBhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDQuMiwgMC4yLCAyKSwgYm94TWF0ZXJpYWwpO1xuICAgICAgICB0b3BQYW5lbC5wb3NpdGlvbi5zZXQoMCwgMS41LCAwKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodG9wUGFuZWwpO1xuXG4gICAgICAgIGNvbnN0IGJhY2tQYW5lbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg0LjIsIDMuMSwgMC4yKSwgYm94TWF0ZXJpYWwpO1xuICAgICAgICBiYWNrUGFuZWwucG9zaXRpb24uc2V0KDAsIDAuMDUsIC0xKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYmFja1BhbmVsKTtcblxuICAgICAgICBjb25zdCB1bmRlclBhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDQuNywgMywgMi41KSwgYm94TWF0ZXJpYWwpO1xuICAgICAgICB1bmRlclBhbmVsLnBvc2l0aW9uLnNldCgwLCAtMywgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHVuZGVyUGFuZWwpO1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCdpbWFnZS9URFUucG5nJyk7XG4gICAgICAgIGNvbnN0IHBhbmVsTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUsIHRyYW5zcGFyZW50OiB0cnVlIH0pO1xuXG4gICAgICAgIGNvbnN0IHBhbmVsV2lkdGggPSA0O1xuICAgICAgICBjb25zdCBwYW5lbEhlaWdodCA9IDI7XG4gICAgICAgIGNvbnN0IHBhbmVsR2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeShwYW5lbFdpZHRoLCBwYW5lbEhlaWdodCk7XG4gICAgICAgIGNvbnN0IGltYWdlUGFuZWwgPSBuZXcgVEhSRUUuTWVzaChwYW5lbEdlb21ldHJ5LCBwYW5lbE1hdGVyaWFsKTtcblxuICAgICAgICBpbWFnZVBhbmVsLnBvc2l0aW9uLnNldCgwLCAtMy4yLCAxLjI2KTtcblxuICAgICAgICB0aGlzLnNjZW5lLmFkZChpbWFnZVBhbmVsKTtcblxuICAgICAgICAvLyDjg6zjg5Djg7zkvZzmiJBcbiAgICAgICAgY29uc3QgbGV2ZXJHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuXG4gICAgICAgIC8vIOajklxuICAgICAgICBjb25zdCBsZXZlck1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHg4ODg4ODggfSk7XG4gICAgICAgIGNvbnN0IGxldmVyU3RpY2sgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjA1LCAwLjA1LCAwLjUsIDE2KSwgbGV2ZXJNYXRlcmlhbCk7XG4gICAgICAgIGxldmVyU3RpY2sucG9zaXRpb24ueSA9IDAuMjU7XG4gICAgICAgIGxldmVyR3JvdXAuYWRkKGxldmVyU3RpY2spO1xuXG4gICAgICAgIC8vIOm7kuOBhOeQg1xuICAgICAgICBjb25zdCBiYWxsTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDAwMCB9KTtcbiAgICAgICAgY29uc3QgbGV2ZXJCYWxsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMSwgMTYsIDE2KSwgYmFsbE1hdGVyaWFsKTtcblxuICAgICAgICBsZXZlckJhbGwucG9zaXRpb24ueSA9IDAuNTtcbiAgICAgICAgbGV2ZXJHcm91cC5hZGQobGV2ZXJCYWxsKTtcblxuICAgICAgICAvLyDjg6zjg5Djg7zlhajkvZPjga7kvY3nva5cbiAgICAgICAgbGV2ZXJHcm91cC5wb3NpdGlvbi5zZXQoLTEuOCwgLTEuNywgMS4yKTtcbiAgICAgICAgLy8g5Zue6Lui5Yid5pyf5L2N572uXG4gICAgICAgIGxldmVyR3JvdXAucm90YXRpb24ueCA9IE1hdGguUEkgLyAyO1xuXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGxldmVyR3JvdXApO1xuICAgICAgICB0aGlzLmxldmVyQmFzZSA9IGxldmVyR3JvdXA7XG5cbiAgICAgICAgLy8gR2VvbWV0cnnjgahNZXNo55Sf5oiQXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlNoYXBlR2VvbWV0cnkoc2hhcGUpO1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmYwMDAwLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlIH0pO1xuICAgICAgICBjb25zdCBwYW5lbCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgIHBhbmVsLnBvc2l0aW9uLnogPSAxO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChwYW5lbCk7XG5cbiAgICAgICAgY29uc3QgZ29vZFRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpLmxvYWQoJ2ltYWdlL2dvb2RMYW1wLnBuZycpO1xuICAgICAgICBjb25zdCBnb29kTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IG1hcDogZ29vZFRleHR1cmUsIHRyYW5zcGFyZW50OiB0cnVlIH0pO1xuICAgICAgICB0aGlzLmdvb2RQYW5lbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDEsIDEpLCBnb29kTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLmdvb2RQYW5lbC5wb3NpdGlvbi5zZXQoLTEuNiwgLTAuOCwgMS4wMSk7XG5cbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDEsIDEsIDEsIDMyKTtcblxuICAgICAgICAvLyDjg6rjg7zjg6sz44Gk55Sf5oiQXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uc1ggPSBbLTEsIDAsIDFdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgICAgICAgICAgICAgIG1hcDogcmVlbFRleHR1cmVzW2ldLFxuICAgICAgICAgICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgcmVlbCA9IG5ldyBUSFJFRS5NZXNoKHRoaXMuZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgICAgIHJlZWwuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICByZWVsLnJvdGF0ZVooTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgcmVlbC5wb3NpdGlvbi54ID0gcG9zaXRpb25zWFtpXTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHJlZWwpO1xuICAgICAgICAgICAgdGhpcy5jdWJlcy5wdXNoKHJlZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g54q25oWL566h55CG55So44Gu6YWN5YiXXG4gICAgICAgIGxldCByb3RhdGVBbmdsZXMgPSBbMCwgMCwgMF07IC8vIDPjg6rjg7zjg6vjga7lm57ou6Lop5LluqYo5bqmKVxuICAgICAgICBsZXQgbGFzdFJvdGF0ZUFuZ2xlcyA9IFswLCAwLCAwXTsgLy8g5ruR44KK5pmC44Gu5q6L44KK6KeS5bqmXG4gICAgICAgIGxldCBpc1JvdGF0aW5ncyA9IFtmYWxzZSwgZmFsc2UsIGZhbHNlXTtcbiAgICAgICAgbGV0IGlzU2xpcHBpbmdzID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2VdO1xuXG4gICAgICAgIGNvbnN0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG4gICAgICAgIGNvbnN0IHJvdGF0aW9uU3BlZWRQZXJTZWNvbmQgPSA3MjA7XG4gICAgICAgIGNvbnN0IHNsaXBTcGVlZCA9IDcyMDtcblxuICAgICAgICAvLyAwOiDlhajjg6rjg7zjg6vlm57ou6LkuK0sIDHjgJwzOiDlgZzmraLmuIjjgb/jg6rjg7zjg6vmlbDvvIjlgZzmraLpoIbjga/lt6bihpLkuK3ihpLlj7PvvIlcbiAgICAgICAgbGV0IHN0b3BDb3VudCA9IDM7IC8vIOacgOWIneOBr+WFqOWBnOatoueKtuaFi1xuXG4gICAgICAgIC8vIOaKvemBuOODleODqeOCsFxuICAgICAgICBsZXQgaXNCZWxsID0gZmFsc2U7XG4gICAgICAgIGxldCBpc1JlcGxheSA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNPdXQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzV2F0ZXJtZWxvbiA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNDaGVyeSA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNTdHJvbmdDaGVyeSA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNCaWdCb251cyA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNSZWdCb251cyA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNCb251c1RpbWUgPSBmYWxzZTtcbiAgICAgICAgbGV0IHJhbmRvbSA9IDA7XG4gICAgICAgIGxldCBib251c0NvdW50ID0gMDtcblxuICAgICAgICAvLyDjgq3jg7zjgqTjg5njg7Pjg4g6IOOCqOODs+OCv+ODvOOBp+ODquODvOODq+aTjeS9nFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3BDb3VudCA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAvLyDlhajjg6rjg7zjg6vlgZzmraIg4oaSIOWFqOODquODvOODq+Wni+WLlVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgKGJ0bi5tYXRlcmlhbCBhcyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKS5jb2xvci5zZXQoMHgwMDAwZmYpOyAvLyDpnZJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUm90YXRpbmdzW2ldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2xpcHBpbmdzW2ldID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdG9wQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzUmVwbGF5ICYmICFpc1dhdGVybWVsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVkYWxDb3VudCAtPSAzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWVkYWxQYW5lbCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQmlnQm9udXMgJiYgIWlzUmVnQm9udXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0RmxhZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1Nik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmir3pgbjjga/jgZPjgZPjgacx5Zue44Gg44GRXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZG9tID09PSAwKSBpc1N0cm9uZ0NoZXJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhbmRvbSA8IDUpIGlzQ2hlcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmFuZG9tIDwgMzcpIGlzV2F0ZXJtZWxvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyYW5kb20gPCA2OSkgaXNCZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhbmRvbSA8IDEzMykgaXNSZXBsYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmFuZG9tIDwgMjU2KSBpc091dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmir3pgbjntZDmnpw6XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQmVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmVwbGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGVybWVsb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NoZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTdHJvbmdDaGVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQmlnQm9udXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JlZ0JvbnVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNCb251c1RpbWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g44Os44OQ44O844KS5Y+p44GPXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVyQmFzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlckJhc2Uucm90YXRpb24ueCA9IE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlckJhc2Uucm90YXRpb24ueCA9IE1hdGguUEkgLyA0ICogMztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMC4156eS5b6M44Gr5oi744GZXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlckJhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlckJhc2Uucm90YXRpb24ueCA9IE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyDvvIjml6LlrZjjga7jg6rjg7zjg6vlm57ou6Llh6bnkIbvvIlcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUm90YXRpbmdzW2ldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2xpcHBpbmdzW2ldID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOODquODvOODq+OCkumghueVquOBqzHjgaTjgZrjgaTmraLjgoHjgovlh6bnkIZcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IHN0b3BDb3VudDsgLy8g5YGc5q2i5a++6LGh44Gu44Oq44O844Or44Kk44Oz44OH44OD44Kv44K577yIMDrlt6YsMTrkuK0sMjrlj7PvvIlcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSb3RhdGluZ3NbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUm90YXRpbmdzW2ldID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5idXR0b25zW2ldLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwpLmNvbG9yLnNldCgweGZmMDAwMCk7IC8vIOi1pFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTbGlwcGluZ3NbaV0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmu5HjgonjgYvjgavlgZzmraLjgZnjgovjgZ/jgoHjga7mrovjgorop5LluqboqK3lrppcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHJvdGF0ZUFuZ2xlc1tpXSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRBbmdsZSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW3puODquODvOODq+OBruWBnOatouS9jee9ruaxuuWumlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQmVsbCB8fCBpc1JlcGxheSB8fCBpc091dCB8fCBpc0JvbnVzVGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiA5MCArIDYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDkwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzV2F0ZXJtZWxvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiA5MCArIDc2KSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDkwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gNzY7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQ2hlcnkgfHwgaXNTdHJvbmdDaGVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiA5MCArIDQwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDkwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gNDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQmlnQm9udXMgfHwgaXNSZWdCb251cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiAxODAgKyAyMikgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiAxODApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gMTgwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gMjI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS4reODquODvOODq+OBruWBnOatouS9jee9ruaxuuWumlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNPdXQgfHwgaXNSZXBsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiA5MCArIDQwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gOTApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gNDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0JlbGwgfHwgaXNCb251c1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiA5MCArIDc2KSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gOTApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gNzY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1dhdGVybWVsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiAxODAgKyAxMTApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiAxODApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gMTgwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDIwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNDaGVyeSB8fCBpc1N0cm9uZ0NoZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogOTAgKyA1OCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDkwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDU4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNCaWdCb251cyB8fCBpc1JlZ0JvbnVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogMzYwICsgOTIpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiAzNjApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDkyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y+z44Oq44O844Or44Gu5YGc5q2i5L2N572u5rG65a6aXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc091dCB8fCBpc1dhdGVybWVsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiAxODAgKyAyKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gMTgwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDE4MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNPdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvbnVzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTI4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib251cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdvb2RQYW5lbCAmJiAhdGhpcy5zY2VuZS5jaGlsZHJlbi5pbmNsdWRlcyh0aGlzLmdvb2RQYW5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5nb29kUGFuZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJhY2tncm91bmRDb2xvcigweDAwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNCaWdCb251cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNPdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9udXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nb29kUGFuZWwgJiYgIXRoaXMuc2NlbmUuY2hpbGRyZW4uaW5jbHVkZXModGhpcy5nb29kUGFuZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZ29vZFBhbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IoMHgwMDAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUmVnQm9udXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzT3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNXYXRlcm1lbG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib251cyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib251cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdvb2RQYW5lbCAmJiAhdGhpcy5zY2VuZS5jaGlsZHJlbi5pbmNsdWRlcyh0aGlzLmdvb2RQYW5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5nb29kUGFuZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJhY2tncm91bmRDb2xvcigweDAwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNCaWdCb251cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNXYXRlcm1lbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvbnVzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKDB4MDAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JlZ0JvbnVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGVybWVsb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNCZWxsIHx8IGlzUmVwbGF5IHx8IGlzQ2hlcnkgfHwgaXNCb251c1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiA5MCArIDIwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gOTApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0JlbGwgfHwgaXNCb251c1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVkYWxDb3VudCArPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNZWRhbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib251c0NvdW50IC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNCb251c1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdW5jaEZpcmV3b3Jrcyg1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdW5jaEZpcmV3b3JrcygtNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvbnVzQ291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQm9udXNUaW1lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQmlnQm9udXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZWdCb251cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nb29kUGFuZWwgJiYgdGhpcy5zY2VuZS5jaGlsZHJlbi5pbmNsdWRlcyh0aGlzLmdvb2RQYW5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHRoaXMuZ29vZFBhbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJhY2tncm91bmRDb2xvcigweDQ5NWVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNDaGVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRhbENvdW50ICs9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1lZGFsUGFuZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvbnVzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvbnVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKDB4MDAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JpZ0JvbnVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NoZXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvbnVzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKDB4MDAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JlZ0JvbnVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NoZXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3Ryb25nQ2hlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiA5MCArIDYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gOTApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVkYWxDb3VudCArPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1lZGFsUGFuZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmlnID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiaWcgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdvb2RQYW5lbCAmJiAhdGhpcy5zY2VuZS5jaGlsZHJlbi5pbmNsdWRlcyh0aGlzLmdvb2RQYW5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJhY2tncm91bmRDb2xvcigweDAwMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JpZ0JvbnVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU3Ryb25nQ2hlcnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNSZWdCb251cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDE4MCArIDE0NikgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDE4MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSAxODA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gMTQ2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JvbnVzVGltZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvbnVzQ291bnQgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdW5jaEZpcmV3b3Jrcyg1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXVuY2hGaXJld29ya3MoLTUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNCaWdCb251cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDE4MCArIDE2NikgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDE4MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSAxODA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gMTY2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JvbnVzVGltZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvbnVzQ291bnQgPSAxNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXVuY2hGaXJld29ya3MoNSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXVuY2hGaXJld29ya3MoLTUpOztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5pei5a2Y44Gu44Oq44O844Or5Yi25b6h5Yem55CGXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdnJyB8fCBldmVudC5rZXkgPT09ICdHJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nb29kUGFuZWwgJiYgIXRoaXMuc2NlbmUuY2hpbGRyZW4uaW5jbHVkZXModGhpcy5nb29kUGFuZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IoMHgwMDAwMDApO1xuICAgICAgICAgICAgICAgICAgICByZXNldEZsYWdzKCk7XG4gICAgICAgICAgICAgICAgICAgIGlzQmlnQm9udXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIOODleODqeOCsOODquOCu+ODg+ODiOmWouaVsFxuICAgICAgICBmdW5jdGlvbiByZXNldEZsYWdzKCkge1xuICAgICAgICAgICAgaXNCZWxsID0gZmFsc2U7XG4gICAgICAgICAgICBpc1JlcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgaXNPdXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlzV2F0ZXJtZWxvbiA9IGZhbHNlO1xuICAgICAgICAgICAgaXNDaGVyeSA9IGZhbHNlO1xuICAgICAgICAgICAgaXNCaWdCb251cyA9IGZhbHNlO1xuICAgICAgICAgICAgaXNSZWdCb251cyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGxldCBsdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSkubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KGx2ZWMueCwgbHZlYy55LCBsdmVjLnopO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZU1lZGFsUGFuZWwoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlU3RhcnRQYW5lbCgpO1xuXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jOabtOaWsFxuICAgICAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gY2xvY2suZ2V0RGVsdGEoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNSb3RhdGluZ3NbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm90YXRpb25UaGlzRnJhbWUgPSByb3RhdGlvblNwZWVkUGVyU2Vjb25kICogZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3ViZXNbaV0ucm90YXRlWShUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoLXJvdGF0aW9uVGhpc0ZyYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIHJvdGF0ZUFuZ2xlc1tpXSA9IChyb3RhdGVBbmdsZXNbaV0gKyByb3RhdGlvblRoaXNGcmFtZSkgJSAzNjA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1NsaXBwaW5nc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3RhdGlvblRoaXNGcmFtZSA9IE1hdGgubWluKHNsaXBTcGVlZCAqIGRlbHRhLCBsYXN0Um90YXRlQW5nbGVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdWJlc1tpXS5yb3RhdGVZKFRIUkVFLk1hdGhVdGlscy5kZWdUb1JhZCgtcm90YXRpb25UaGlzRnJhbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgcm90YXRlQW5nbGVzW2ldID0gKHJvdGF0ZUFuZ2xlc1tpXSArIHJvdGF0aW9uVGhpc0ZyYW1lKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSByb3RhdGlvblRoaXNGcmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2xpcHBpbmdzW2ldID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBUV0VFTi51cGRhdGUodGltZSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b25zKCkge1xuICAgICAgICBjb25zdCBvdXRlck1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHgwMDAwMDAgfSk7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uUG9zaXRpb25zID0gW1xuICAgICAgICAgICAgeyB4OiAtMSwgeTogLTEuMiwgejogMS4yIH0sICAvLyDlt6bjg6rjg7zjg6vkuItcbiAgICAgICAgICAgIHsgeDogMCwgeTogLTEuMiwgejogMS4yIH0sICAgLy8g5Lit44Oq44O844Or5LiLXG4gICAgICAgICAgICB7IHg6IDEsIHk6IC0xLjIsIHo6IDEuMiB9ICAgIC8vIOWPs+ODquODvOODq+S4i1xuICAgICAgICBdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuXG4gICAgICAgICAgICAvLyDjg5zjgr/jg7Pjga7lpJblgbRcbiAgICAgICAgICAgIGNvbnN0IG91dGVyQ3lsaW5kZXIgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjE1LCAwLjE1LCAwLjA1LCAxNiksXG4gICAgICAgICAgICAgICAgb3V0ZXJNYXRlcmlhbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG91dGVyQ3lsaW5kZXIucG9zaXRpb24ueSA9IDAuMDI1O1xuXG4gICAgICAgICAgICAvLyDjg5zjgr/jg7PmnKzkvZNcbiAgICAgICAgICAgIGNvbnN0IGlubmVyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDBmZiB9KTsgLy8g5YCL5Yil44Gu44Kk44Oz44K544K/44Oz44K5XG4gICAgICAgICAgICBjb25zdCBpbm5lckN5bGluZGVyID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4xLCAwLjEsIDAuMDUsIDE2KSxcbiAgICAgICAgICAgICAgICBpbm5lck1hdGVyaWFsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaW5uZXJDeWxpbmRlci5wb3NpdGlvbi55ID0gMC4wNTtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGlubmVyQ3lsaW5kZXIpO1xuXG4gICAgICAgICAgICBncm91cC5hZGQob3V0ZXJDeWxpbmRlcik7XG4gICAgICAgICAgICBncm91cC5hZGQoaW5uZXJDeWxpbmRlcik7XG5cbiAgICAgICAgICAgIGdyb3VwLnBvc2l0aW9uLnNldChidXR0b25Qb3NpdGlvbnNbaV0ueCwgYnV0dG9uUG9zaXRpb25zW2ldLnksIGJ1dHRvblBvc2l0aW9uc1tpXS56KTtcbiAgICAgICAgICAgIGdyb3VwLnJvdGF0ZVgoTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgZ3JvdXAucG9zaXRpb24ueiA9IDEuMjU7XG4gICAgICAgICAgICBncm91cC5wb3NpdGlvbi55ID0gLTEuODtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKGdyb3VwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlU3RhcnRQYW5lbCgpIHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IDUxMjtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IDEyODtcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGN0eC5mb250ID0gJzQ4cHggQXJpYWwnO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3llbGxvdyc7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICBjdHguZmlsbFRleHQoJ1ByZXNzIEVOVEVSIHRvIFN0YXJ0IScsIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsIHRyYW5zcGFyZW50OiB0cnVlIH0pO1xuICAgICAgICBjb25zdCBwYW5lbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDMsIDAuNiksIG1hdGVyaWFsKTtcblxuICAgICAgICBwYW5lbC5wb3NpdGlvbi5zZXQoMCwgMS4xLCAxLjAxKTsgIC8vIOOCueODreODg+ODiOacrOS9k+S4iumDqOOBguOBn+OCiuOBruW6p+aomVxuICAgICAgICB0aGlzLnNjZW5lLmFkZChwYW5lbCk7XG4gICAgfVxuXG4gICAgLy8g44Oh44OA44Or44KS44Kr44Km44Oz44OI44GZ44KL44OR44ON44OrXG4gICAgcHJpdmF0ZSBjcmVhdGVNZWRhbFBhbmVsKCkge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gMjU2O1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTI4O1xuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZvbnQgPSAnMzZweCBBcmlhbCc7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHguZmlsbFRleHQoYE1lZGFsczogJHt0aGlzLm1lZGFsQ291bnR9YCwgMjAsIDgwKTtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG4gICAgICAgIGNvbnN0IHBhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMS41LCAwLjYpLCBtYXRlcmlhbCk7XG4gICAgICAgIHBhbmVsLnBvc2l0aW9uLnNldCgwLCAtMS4wNSwgMS4wMSk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBhbmVsKTtcbiAgICB9XG5cbiAgICAvLyDjg5Hjg43jg6vjga7jgqLjg4Pjg5fjg4fjg7zjg4hcbiAgICBwcml2YXRlIHVwZGF0ZU1lZGFsUGFuZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGFsUGFuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHRoaXMubWVkYWxQYW5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gMjU2O1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTI4O1xuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZvbnQgPSAnMzZweCBBcmlhbCc7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHguZmlsbFRleHQoYE1lZGFsczogJHt0aGlzLm1lZGFsQ291bnR9YCwgMjAsIDgwKTtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG4gICAgICAgIHRoaXMubWVkYWxQYW5lbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDEuNSwgMC42KSwgbWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLm1lZGFsUGFuZWwucG9zaXRpb24uc2V0KDAsIC0xLjA1LCAxLjAxKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5tZWRhbFBhbmVsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEJhY2tncm91bmRDb2xvcihjb2xvcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcihjb2xvcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsYXVuY2hGaXJld29ya3MoeFBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgLy8g5omT44Gh5LiK44GS55CDXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDUsIDgsIDgpO1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcbiAgICAgICAgY29uc3QgYmFsbCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgIGJhbGwucG9zaXRpb24uc2V0KHhQb3NpdGlvbiwgMCwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGJhbGwpO1xuXG4gICAgICAgIC8vIOaJk+OBoeS4iuOBkuOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgICAgICBuZXcgVFdFRU4uVHdlZW4oYmFsbC5wb3NpdGlvbilcbiAgICAgICAgICAgIC50byh7IHk6IDMgfSwgODAwKVxuICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcbiAgICAgICAgICAgIC5vbkNvbXBsZXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZShiYWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUV4cGxvc2lvbih4UG9zaXRpb24sIDMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRXhwbG9zaW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHBhcnRpY2xlQ291bnQgPSAyMDA7XG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocGFydGljbGVDb3VudCAqIDMpO1xuICAgICAgICBjb25zdCBjb2xvcnMgPSBuZXcgRmxvYXQzMkFycmF5KHBhcnRpY2xlQ291bnQgKiAzKTtcbiAgICAgICAgY29uc3QgdmVsb2NpdGllczogVEhSRUUuVmVjdG9yM1tdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpICogM10gPSB4O1xuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMV0gPSB5O1xuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMl0gPSAwO1xuXG4gICAgICAgICAgICAvLyDnkIPpnaLluqfmqJnjgafjg6njg7Pjg4Djg6DjgarmlrnlkJHjg5njgq/jg4jjg6tcbiAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJOyAgICAgIC8vIOawtOW5s+aWueWQkeOBruinkuW6plxuICAgICAgICAgICAgY29uc3QgcGhpID0gTWF0aC5hY29zKDIgKiBNYXRoLnJhbmRvbSgpIC0gMSk7ICAgLy8g5Z6C55u05pa55ZCR44Gu6KeS5bqmXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IE1hdGgucmFuZG9tKCkgKiAwLjA1ICsgMC4wMjsgICAgICAvLyDpgJ/luqbvvIjlpKfjgY3jgZXvvIlcblxuICAgICAgICAgICAgY29uc3QgdnggPSBzcGVlZCAqIE1hdGguc2luKHBoaSkgKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgICAgICAgICBjb25zdCB2eSA9IHNwZWVkICogTWF0aC5jb3MocGhpKTtcbiAgICAgICAgICAgIGNvbnN0IHZ6ID0gc3BlZWQgKiBNYXRoLnNpbihwaGkpICogTWF0aC5zaW4odGhldGEpO1xuXG4gICAgICAgICAgICB2ZWxvY2l0aWVzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjModngsIHZ5LCB2eikpO1xuXG4gICAgICAgICAgICBjb25zdCBjb2xvciA9IG5ldyBUSFJFRS5Db2xvcihNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgIGNvbG9yc1tpICogM10gPSBjb2xvci5yO1xuICAgICAgICAgICAgY29sb3JzW2kgKiAzICsgMV0gPSBjb2xvci5nO1xuICAgICAgICAgICAgY29sb3JzW2kgKiAzICsgMl0gPSBjb2xvci5iO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG4gICAgICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9ycywgMykpO1xuXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgIHNpemU6IDAuMDgsXG4gICAgICAgICAgICB2ZXJ0ZXhDb2xvcnM6IHRydWUsICAvLyDpoILngrnjgqvjg6njg7zjgpLkvb/nlKhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzID0gbmV3IFRIUkVFLlBvaW50cyhnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChwb2ludHMpO1xuXG4gICAgICAgIGxldCBsaWZlID0gNjA7IC8vIOODleODrOODvOODoOaVsOOBp+Wvv+WRveeuoeeQhlxuXG4gICAgICAgIGNvbnN0IGFuaW1hdGVQYXJ0aWNsZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5IGFzIEZsb2F0MzJBcnJheTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzXSArPSB2ZWxvY2l0aWVzW2ldLng7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMV0gKz0gdmVsb2NpdGllc1tpXS55O1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tpICogMyArIDJdICs9IHZlbG9jaXRpZXNbaV0uejtcblxuICAgICAgICAgICAgICAgIC8vIOewoeaYk+eahOOBqumHjeWKm1xuICAgICAgICAgICAgICAgIHZlbG9jaXRpZXNbaV0ueSAtPSAwLjAwMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBsaWZlLS07XG4gICAgICAgICAgICBpZiAobGlmZSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZVBhcnRpY2xlcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHBvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGFuaW1hdGVQYXJ0aWNsZXMoKTtcbiAgICB9XG5cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuXG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCA3KSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3R3ZWVuanNfdHdlZW5fanNfZGlzdF90d2Vlbl9lc21fanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250ci03OGQzOTJcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=