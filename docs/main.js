/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");


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
        let renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x495ed));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        let camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
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
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
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
        const shape = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
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
            const hole = new three__WEBPACK_IMPORTED_MODULE_1__.Path();
            hole.moveTo(h.x - h.width / 2, h.y - h.height / 2);
            hole.lineTo(h.x + h.width / 2, h.y - h.height / 2);
            hole.lineTo(h.x + h.width / 2, h.y + h.height / 2);
            hole.lineTo(h.x - h.width / 2, h.y + h.height / 2);
            hole.lineTo(h.x - h.width / 2, h.y - h.height / 2);
            shape.holes.push(hole);
        });
        const boxMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xff0000 });
        const leftPanel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.2, 3, 2), boxMaterial);
        leftPanel.position.set(-2, 0, 0);
        this.scene.add(leftPanel);
        const rightPanel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.2, 3, 2), boxMaterial);
        rightPanel.position.set(2, 0, 0);
        this.scene.add(rightPanel);
        const topPanel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(4.2, 0.2, 2), boxMaterial);
        topPanel.position.set(0, 1.5, 0);
        this.scene.add(topPanel);
        const backPanel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(4.2, 3.1, 0.2), boxMaterial);
        backPanel.position.set(0, 0.05, -1);
        this.scene.add(backPanel);
        const underPanel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(4.7, 3, 2.5), boxMaterial);
        underPanel.position.set(0, -3, 0);
        this.scene.add(underPanel);
        const texture = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader().load('image/TDU.png');
        const panelMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: texture, transparent: true });
        const panelWidth = 4;
        const panelHeight = 2;
        const panelGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(panelWidth, panelHeight);
        const imagePanel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(panelGeometry, panelMaterial);
        imagePanel.position.set(0, -3.2, 1.26);
        this.scene.add(imagePanel);
        // レバー作成
        const leverGroup = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        // 棒
        const leverMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x888888 });
        const leverStick = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.05, 0.05, 0.5, 16), leverMaterial);
        leverStick.position.y = 0.25;
        leverGroup.add(leverStick);
        // 黒い球
        const ballMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x000000 });
        const leverBall = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.1, 16, 16), ballMaterial);
        leverBall.position.y = 0.5;
        leverGroup.add(leverBall);
        // レバー全体の位置
        leverGroup.position.set(-1.8, -1.7, 1.2);
        // 回転初期位置
        leverGroup.rotation.x = Math.PI / 2;
        this.scene.add(leverGroup);
        this.leverBase = leverGroup;
        // GeometryとMesh生成
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.ShapeGeometry(shape);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xff0000, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
        const panel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
        panel.position.z = 1;
        this.scene.add(panel);
        const goodTexture = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader().load('image/goodLamp.png');
        const goodMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: goodTexture, transparent: true });
        this.goodPanel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(1, 1), goodMaterial);
        this.goodPanel.position.set(-1.6, -0.8, 1.01);
        this.geometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(1, 1, 1, 32);
        // リール3つ生成
        const positionsX = [-1, 0, 1];
        for (let i = 0; i < 3; i++) {
            const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({
                color: 0xffffff,
                map: reelTextures[i],
                side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide
            });
            const reel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(this.geometry, material);
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
        const clock = new three__WEBPACK_IMPORTED_MODULE_1__.Clock();
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
        let isLegBonus = false;
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
                    if (!isBigBonus && !isLegBonus) {
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
                        isLegBonus,
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
                        else if (isBigBonus || isLegBonus) {
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
                            else if (isBigBonus || isLegBonus) {
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
                                        isBigBonus = true;
                                        isOut = false;
                                    }
                                    else if (bonus === 2) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        isLegBonus = true;
                                        isOut = false;
                                    }
                                }
                                else if (isWatermelon) {
                                    const bonus = Math.floor(Math.random() * 16);
                                    if (bonus === 1) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        isBigBonus = true;
                                        isWatermelon = false;
                                    }
                                    else if (bonus === 2) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        isLegBonus = true;
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
                                    if (isBonusTime && bonusCount < 1) {
                                        isBonusTime = false;
                                        isBigBonus = false;
                                        isLegBonus = false;
                                        if (this.goodPanel && this.scene.children.includes(this.goodPanel)) {
                                            this.scene.remove(this.goodPanel);
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
                                        isBigBonus = true;
                                        isChery = false;
                                    }
                                    else if (bonus === 2) {
                                        if (this.goodPanel && !this.scene.children.includes(this.goodPanel)) {
                                            this.scene.add(this.goodPanel);
                                        }
                                        isLegBonus = true;
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
                                    isBigBonus = true;
                                    isStrongChery = false;
                                }
                            }
                            else if (isLegBonus) {
                                const currentSegment = Math.floor(remainder / 90);
                                targetAngle = ((currentSegment + 1) * 180 + 146) % 360;
                                lastRotateAngles[i] = (targetAngle - remainder + 360) % 360;
                                if (lastRotateAngles[i] > 180)
                                    lastRotateAngles[i] -= 180;
                                if (lastRotateAngles[i] === 0)
                                    lastRotateAngles[i] = 146;
                                isBonusTime = true;
                                bonusCount = 5;
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
            isLegBonus = false;
        }
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff);
        let lvec = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 1).clone().normalize();
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
                    this.cubes[i].rotateY(three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(-rotationThisFrame));
                    rotateAngles[i] = (rotateAngles[i] + rotationThisFrame) % 360;
                }
                else if (isSlippings[i]) {
                    const rotationThisFrame = Math.min(slipSpeed * delta, lastRotateAngles[i]);
                    this.cubes[i].rotateY(three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(-rotationThisFrame));
                    rotateAngles[i] = (rotateAngles[i] + rotationThisFrame) % 360;
                    lastRotateAngles[i] -= rotationThisFrame;
                    if (lastRotateAngles[i] <= 0) {
                        lastRotateAngles[i] = 0;
                        isSlippings[i] = false;
                    }
                }
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
    createButtons() {
        const outerMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x000000 });
        const buttonPositions = [
            { x: -1, y: -1.2, z: 1.2 },
            { x: 0, y: -1.2, z: 1.2 },
            { x: 1, y: -1.2, z: 1.2 } // 右リール下
        ];
        for (let i = 0; i < 3; i++) {
            const group = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
            // ボタンの外側
            const outerCylinder = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.15, 0.15, 0.05, 16), outerMaterial);
            outerCylinder.position.y = 0.025;
            // ボタン本体
            const innerMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x0000ff }); // 個別のインスタンス
            const innerCylinder = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.1, 0.1, 0.05, 16), innerMaterial);
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
        const texture = new three__WEBPACK_IMPORTED_MODULE_1__.CanvasTexture(canvas);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: texture, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, transparent: true });
        const panel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(3, 0.6), material);
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
        const texture = new three__WEBPACK_IMPORTED_MODULE_1__.CanvasTexture(canvas);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: texture, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
        const panel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(1.5, 0.6), material);
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
        const texture = new three__WEBPACK_IMPORTED_MODULE_1__.CanvasTexture(canvas);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: texture, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
        this.medalPanel = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(1.5, 0.6), material);
        this.medalPanel.position.set(0, -1.05, 1.01);
        this.scene.add(this.medalPanel);
    }
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 7));
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XG5cbmNsYXNzIFRocmVlSlNDb250YWluZXIge1xuICAgIHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xuICAgIHByaXZhdGUgZ2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5O1xuICAgIHByaXZhdGUgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICAgIHByaXZhdGUgY3ViZXM6IFRIUkVFLk1lc2hbXSA9IFtdO1xuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0O1xuICAgIHByaXZhdGUgZ29vZFBhbmVsOiBUSFJFRS5NZXNoIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBtZWRhbENvdW50OiBudW1iZXIgPSA3Nzc7XG4gICAgcHJpdmF0ZSBtZWRhbFBhbmVsOiBUSFJFRS5NZXNoIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBsZXZlckJhc2U6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBidXR0b25zOiBUSFJFRS5NZXNoW10gPSBbXTsgIC8vIOODnOOCv+ODs+OBrumFjeWIl1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspKlxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGxldCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAvL+OCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICAgIGxldCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBsZXQgb3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTY2VuZSgpO1xuXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jHJlbmRlclxuICAgICAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGxldCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCBjYW1lcmEpO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLm1hcmdpbiA9IFwiMTBweFwiO1xuICAgICAgICByZXR1cm4gcmVuZGVyZXIuZG9tRWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyDjgrfjg7zjg7Pjga7kvZzmiJAo5YWo5L2T44GnMeWbnilcbiAgICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICAgICAgY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IHJlZWxUZXh0dXJlcyA9IFtcbiAgICAgICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnaW1hZ2UvcmVlbExlZnQucG5nJyksXG4gICAgICAgICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJ2ltYWdlL3JlZWxDZW50ZXIucG5nJyksXG4gICAgICAgICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJ2ltYWdlL3JlZWxSaWdodC5wbmcnKVxuICAgICAgICBdO1xuICAgICAgICByZWVsVGV4dHVyZXMuZm9yRWFjaCh0ZXh0dXJlID0+IHtcbiAgICAgICAgICAgIHRleHR1cmUuY2VudGVyLnNldCgwLjUsIDAuNSk7XG4gICAgICAgICAgICB0ZXh0dXJlLnJvdGF0aW9uID0gLU1hdGguUEkgLyAyO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyDlpJbmnqDjga5TaGFwZe+8iOWFqOS9k+OBruODkeODjeODqyA1IHggM++8iVxuICAgICAgICBjb25zdCBzaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuICAgICAgICBzaGFwZS5tb3ZlVG8oLTIsIC0xLjUpO1xuICAgICAgICBzaGFwZS5saW5lVG8oMiwgLTEuNSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbygyLCAxLjUpO1xuICAgICAgICBzaGFwZS5saW5lVG8oLTIsIDEuNSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbygtMiwgLTEuNSk7XG5cbiAgICAgICAgLy8g56m044GuU2hhcGXvvIjlm5vop5LlvaLjga7nqbQgeDPvvIlcbiAgICAgICAgY29uc3QgaG9sZXMgPSBbXG4gICAgICAgICAgICB7IHg6IC0xLCB5OiAwLCB3aWR0aDogMC45LCBoZWlnaHQ6IDEuMiB9LFxuICAgICAgICAgICAgeyB4OiAwLCB5OiAwLCB3aWR0aDogMC45LCBoZWlnaHQ6IDEuMiB9LFxuICAgICAgICAgICAgeyB4OiAxLCB5OiAwLCB3aWR0aDogMC45LCBoZWlnaHQ6IDEuMiB9XG4gICAgICAgIF07XG5cbiAgICAgICAgaG9sZXMuZm9yRWFjaChoID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhvbGUgPSBuZXcgVEhSRUUuUGF0aCgpO1xuICAgICAgICAgICAgaG9sZS5tb3ZlVG8oaC54IC0gaC53aWR0aCAvIDIsIGgueSAtIGguaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBob2xlLmxpbmVUbyhoLnggKyBoLndpZHRoIC8gMiwgaC55IC0gaC5oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGhvbGUubGluZVRvKGgueCArIGgud2lkdGggLyAyLCBoLnkgKyBoLmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgaG9sZS5saW5lVG8oaC54IC0gaC53aWR0aCAvIDIsIGgueSArIGguaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBob2xlLmxpbmVUbyhoLnggLSBoLndpZHRoIC8gMiwgaC55IC0gaC5oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIHNoYXBlLmhvbGVzLnB1c2goaG9sZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJveE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwMDAgfSk7XG5cbiAgICAgICAgY29uc3QgbGVmdFBhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMiwgMywgMiksIGJveE1hdGVyaWFsKTtcbiAgICAgICAgbGVmdFBhbmVsLnBvc2l0aW9uLnNldCgtMiwgMCwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGxlZnRQYW5lbCk7XG5cbiAgICAgICAgY29uc3QgcmlnaHRQYW5lbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjIsIDMsIDIpLCBib3hNYXRlcmlhbCk7XG4gICAgICAgIHJpZ2h0UGFuZWwucG9zaXRpb24uc2V0KDIsIDAsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChyaWdodFBhbmVsKTtcblxuICAgICAgICBjb25zdCB0b3BQYW5lbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg0LjIsIDAuMiwgMiksIGJveE1hdGVyaWFsKTtcbiAgICAgICAgdG9wUGFuZWwucG9zaXRpb24uc2V0KDAsIDEuNSwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRvcFBhbmVsKTtcblxuICAgICAgICBjb25zdCBiYWNrUGFuZWwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoNC4yLCAzLjEsIDAuMiksIGJveE1hdGVyaWFsKTtcbiAgICAgICAgYmFja1BhbmVsLnBvc2l0aW9uLnNldCgwLCAwLjA1LCAtMSk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGJhY2tQYW5lbCk7XG5cbiAgICAgICAgY29uc3QgdW5kZXJQYW5lbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg0LjcsIDMsIDIuNSksIGJveE1hdGVyaWFsKTtcbiAgICAgICAgdW5kZXJQYW5lbC5wb3NpdGlvbi5zZXQoMCwgLTMsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh1bmRlclBhbmVsKTtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZCgnaW1hZ2UvVERVLnBuZycpO1xuICAgICAgICBjb25zdCBwYW5lbE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlLCB0cmFuc3BhcmVudDogdHJ1ZSB9KTtcblxuICAgICAgICBjb25zdCBwYW5lbFdpZHRoID0gNDtcbiAgICAgICAgY29uc3QgcGFuZWxIZWlnaHQgPSAyO1xuICAgICAgICBjb25zdCBwYW5lbEdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkocGFuZWxXaWR0aCwgcGFuZWxIZWlnaHQpO1xuICAgICAgICBjb25zdCBpbWFnZVBhbmVsID0gbmV3IFRIUkVFLk1lc2gocGFuZWxHZW9tZXRyeSwgcGFuZWxNYXRlcmlhbCk7XG5cbiAgICAgICAgaW1hZ2VQYW5lbC5wb3NpdGlvbi5zZXQoMCwgLTMuMiwgMS4yNik7XG5cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoaW1hZ2VQYW5lbCk7XG5cbiAgICAgICAgLy8g44Os44OQ44O85L2c5oiQXG4gICAgICAgIGNvbnN0IGxldmVyR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcblxuICAgICAgICAvLyDmo5JcbiAgICAgICAgY29uc3QgbGV2ZXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ODg4ODg4IH0pO1xuICAgICAgICBjb25zdCBsZXZlclN0aWNrID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4wNSwgMC4wNSwgMC41LCAxNiksIGxldmVyTWF0ZXJpYWwpO1xuICAgICAgICBsZXZlclN0aWNrLnBvc2l0aW9uLnkgPSAwLjI1O1xuICAgICAgICBsZXZlckdyb3VwLmFkZChsZXZlclN0aWNrKTtcblxuICAgICAgICAvLyDpu5LjgYTnkINcbiAgICAgICAgY29uc3QgYmFsbE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHgwMDAwMDAgfSk7XG4gICAgICAgIGNvbnN0IGxldmVyQmFsbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjEsIDE2LCAxNiksIGJhbGxNYXRlcmlhbCk7XG5cbiAgICAgICAgbGV2ZXJCYWxsLnBvc2l0aW9uLnkgPSAwLjU7XG4gICAgICAgIGxldmVyR3JvdXAuYWRkKGxldmVyQmFsbCk7XG5cbiAgICAgICAgLy8g44Os44OQ44O85YWo5L2T44Gu5L2N572uXG4gICAgICAgIGxldmVyR3JvdXAucG9zaXRpb24uc2V0KC0xLjgsIC0xLjcsIDEuMik7XG4gICAgICAgIC8vIOWbnui7ouWIneacn+S9jee9rlxuICAgICAgICBsZXZlckdyb3VwLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcblxuICAgICAgICB0aGlzLnNjZW5lLmFkZChsZXZlckdyb3VwKTtcbiAgICAgICAgdGhpcy5sZXZlckJhc2UgPSBsZXZlckdyb3VwO1xuXG4gICAgICAgIC8vIEdlb21ldHJ544GoTWVzaOeUn+aIkFxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5TaGFwZUdlb21ldHJ5KHNoYXBlKTtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmMDAwMCwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSB9KTtcbiAgICAgICAgY29uc3QgcGFuZWwgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICBwYW5lbC5wb3NpdGlvbi56ID0gMTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocGFuZWwpO1xuXG4gICAgICAgIGNvbnN0IGdvb2RUZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCdpbWFnZS9nb29kTGFtcC5wbmcnKTtcbiAgICAgICAgY29uc3QgZ29vZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBtYXA6IGdvb2RUZXh0dXJlLCB0cmFuc3BhcmVudDogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5nb29kUGFuZWwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxLCAxKSwgZ29vZE1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5nb29kUGFuZWwucG9zaXRpb24uc2V0KC0xLjYsIC0wLjgsIDEuMDEpO1xuXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgxLCAxLCAxLCAzMik7XG5cbiAgICAgICAgLy8g44Oq44O844OrM+OBpOeUn+aIkFxuICAgICAgICBjb25zdCBwb3NpdGlvbnNYID0gWy0xLCAwLCAxXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgICAgICAgICBtYXA6IHJlZWxUZXh0dXJlc1tpXSxcbiAgICAgICAgICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHJlZWwgPSBuZXcgVEhSRUUuTWVzaCh0aGlzLmdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgICAgICByZWVsLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgcmVlbC5yb3RhdGVaKE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgIHJlZWwucG9zaXRpb24ueCA9IHBvc2l0aW9uc1hbaV07XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChyZWVsKTtcbiAgICAgICAgICAgIHRoaXMuY3ViZXMucHVzaChyZWVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOeKtuaFi+euoeeQhueUqOOBrumFjeWIl1xuICAgICAgICBsZXQgcm90YXRlQW5nbGVzID0gWzAsIDAsIDBdOyAvLyAz44Oq44O844Or44Gu5Zue6Lui6KeS5bqmKOW6pilcbiAgICAgICAgbGV0IGxhc3RSb3RhdGVBbmdsZXMgPSBbMCwgMCwgMF07IC8vIOa7keOCiuaZguOBruaui+OCiuinkuW6plxuICAgICAgICBsZXQgaXNSb3RhdGluZ3MgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZV07XG4gICAgICAgIGxldCBpc1NsaXBwaW5ncyA9IFtmYWxzZSwgZmFsc2UsIGZhbHNlXTtcblxuICAgICAgICBjb25zdCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xuICAgICAgICBjb25zdCByb3RhdGlvblNwZWVkUGVyU2Vjb25kID0gNzIwO1xuICAgICAgICBjb25zdCBzbGlwU3BlZWQgPSA3MjA7XG5cbiAgICAgICAgLy8gMDog5YWo44Oq44O844Or5Zue6Lui5LitLCAx44CcMzog5YGc5q2i5riI44G/44Oq44O844Or5pWw77yI5YGc5q2i6aCG44Gv5bem4oaS5Lit4oaS5Y+z77yJXG4gICAgICAgIGxldCBzdG9wQ291bnQgPSAzOyAvLyDmnIDliJ3jga/lhajlgZzmraLnirbmhYtcblxuICAgICAgICAvLyDmir3pgbjjg5Xjg6njgrBcbiAgICAgICAgbGV0IGlzQmVsbCA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNSZXBsYXkgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzT3V0ID0gZmFsc2U7XG4gICAgICAgIGxldCBpc1dhdGVybWVsb24gPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzQ2hlcnkgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzU3Ryb25nQ2hlcnkgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzQmlnQm9udXMgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzTGVnQm9udXMgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzQm9udXNUaW1lID0gZmFsc2U7XG4gICAgICAgIGxldCByYW5kb20gPSAwO1xuICAgICAgICBsZXQgYm9udXNDb3VudCA9IDA7XG5cbiAgICAgICAgLy8g44Kt44O844Kk44OZ44Oz44OIOiDjgqjjg7Pjgr/jg7zjgafjg6rjg7zjg6vmk43kvZxcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIGlmIChzdG9wQ291bnQgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5YWo44Oq44O844Or5YGc5q2iIOKGkiDlhajjg6rjg7zjg6vlp4vli5VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goYnRuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIChidG4ubWF0ZXJpYWwgYXMgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCkuY29sb3Iuc2V0KDB4MDAwMGZmKTsgLy8g6Z2SXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JvdGF0aW5nc1tpXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NsaXBwaW5nc1tpXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RvcENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1JlcGxheSAmJiAhaXNXYXRlcm1lbG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lZGFsQ291bnQgLT0gMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1lZGFsUGFuZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0JpZ0JvbnVzICYmICFpc0xlZ0JvbnVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldEZsYWdzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5oq96YG444Gv44GT44GT44GnMeWbnuOBoOOBkVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmRvbSA9PT0gMCkgaXNTdHJvbmdDaGVyeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyYW5kb20gPCA1KSBpc0NoZXJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhbmRvbSA8IDM3KSBpc1dhdGVybWVsb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmFuZG9tIDwgNjkpIGlzQmVsbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyYW5kb20gPCAxMzMpIGlzUmVwbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhbmRvbSA8IDI1NikgaXNPdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oq96YG457WQ5p6cOlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0JlbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JlcGxheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNXYXRlcm1lbG9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDaGVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3Ryb25nQ2hlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0JpZ0JvbnVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNMZWdCb251cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQm9udXNUaW1lXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIOODrOODkOODvOOCkuWPqeOBj1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZXZlckJhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZXJCYXNlLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZXJCYXNlLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gNCAqIDM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAuNeenkuW+jOOBq+aIu+OBmVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZXJCYXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZXJCYXNlLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g77yI5pei5a2Y44Gu44Oq44O844Or5Zue6Lui5Yem55CG77yJXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JvdGF0aW5nc1tpXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NsaXBwaW5nc1tpXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyDjg6rjg7zjg6vjgpLpoIbnlarjgasx44Gk44Ga44Gk5q2i44KB44KL5Yem55CGXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBzdG9wQ291bnQ7IC8vIOWBnOatouWvvuixoeOBruODquODvOODq+OCpOODs+ODh+ODg+OCr+OCue+8iDA65bemLDE65LitLDI65Y+z77yJXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUm90YXRpbmdzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JvdGF0aW5nc1tpXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuYnV0dG9uc1tpXS5tYXRlcmlhbCBhcyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKS5jb2xvci5zZXQoMHhmZjAwMDApOyAvLyDotaRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2xpcHBpbmdzW2ldID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5ruR44KJ44GL44Gr5YGc5q2i44GZ44KL44Gf44KB44Gu5q6L44KK6KeS5bqm6Kit5a6aXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZW1haW5kZXIgPSByb3RhdGVBbmdsZXNbaV0gJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0QW5nbGUgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlt6bjg6rjg7zjg6vjga7lgZzmraLkvY3nva7msbrlrppcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0JlbGwgfHwgaXNSZXBsYXkgfHwgaXNPdXQgfHwgaXNCb251c1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogOTAgKyA2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiA5MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1dhdGVybWVsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogOTAgKyA3NikgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiA5MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDc2O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0NoZXJ5IHx8IGlzU3Ryb25nQ2hlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogOTAgKyA0MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiA5MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDQwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0JpZ0JvbnVzIHx8IGlzTGVnQm9udXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogMTgwICsgMjIpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gMTgwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDE4MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDIyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkuK3jg6rjg7zjg6vjga7lgZzmraLkvY3nva7msbrlrppcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3V0IHx8IGlzUmVwbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogOTAgKyA0MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDkwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDQwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNCZWxsIHx8IGlzQm9udXNUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogOTAgKyA3NikgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDkwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDc2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNXYXRlcm1lbG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogMTgwICsgMTEwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gMTgwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDE4MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQ2hlcnkgfHwgaXNTdHJvbmdDaGVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDkwICsgNTgpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiA5MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSA1ODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQmlnQm9udXMgfHwgaXNMZWdCb251cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDM2MCArIDkyKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gMzYwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSA5MjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWPs+ODquODvOODq+OBruWBnOatouS9jee9ruaxuuWumlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNPdXQgfHwgaXNXYXRlcm1lbG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogMTgwICsgMikgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDE4MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSAxODA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib251cyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEyOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9udXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nb29kUGFuZWwgJiYgIXRoaXMuc2NlbmUuY2hpbGRyZW4uaW5jbHVkZXModGhpcy5nb29kUGFuZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZ29vZFBhbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNCaWdCb251cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNPdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9udXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nb29kUGFuZWwgJiYgIXRoaXMuc2NlbmUuY2hpbGRyZW4uaW5jbHVkZXModGhpcy5nb29kUGFuZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZ29vZFBhbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMZWdCb251cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNPdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1dhdGVybWVsb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvbnVzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvbnVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQmlnQm9udXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0ZXJtZWxvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib251cyA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdvb2RQYW5lbCAmJiAhdGhpcy5zY2VuZS5jaGlsZHJlbi5pbmNsdWRlcyh0aGlzLmdvb2RQYW5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5nb29kUGFuZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0xlZ0JvbnVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGVybWVsb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNCZWxsIHx8IGlzUmVwbGF5IHx8IGlzQ2hlcnkgfHwgaXNCb251c1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiA5MCArIDIwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gOTApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0JlbGwgfHwgaXNCb251c1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVkYWxDb3VudCArPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNZWRhbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib251c0NvdW50IC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNCb251c1RpbWUgJiYgYm9udXNDb3VudCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JvbnVzVGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQmlnQm9udXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0xlZ0JvbnVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmIHRoaXMuc2NlbmUuY2hpbGRyZW4uaW5jbHVkZXModGhpcy5nb29kUGFuZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHRoaXMuZ29vZFBhbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNDaGVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRhbENvdW50ICs9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1lZGFsUGFuZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvbnVzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvbnVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQmlnQm9udXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hlcnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9udXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nb29kUGFuZWwgJiYgIXRoaXMuc2NlbmUuY2hpbGRyZW4uaW5jbHVkZXModGhpcy5nb29kUGFuZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZ29vZFBhbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMZWdCb251cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDaGVyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cm9uZ0NoZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogOTAgKyA2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDkwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lZGFsQ291bnQgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNZWRhbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJpZyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmlnID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nb29kUGFuZWwgJiYgIXRoaXMuc2NlbmUuY2hpbGRyZW4uaW5jbHVkZXModGhpcy5nb29kUGFuZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5nb29kUGFuZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNCaWdCb251cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1N0cm9uZ0NoZXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzTGVnQm9udXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiAxODAgKyAxNDYpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiAxODApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gMTgwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDE0NjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNCb251c1RpbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib251c0NvdW50ID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQmlnQm9udXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiAxODAgKyAxNjYpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiAxODApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gMTgwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDE2NjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNCb251c1RpbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib251c0NvdW50ID0gMTU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOaXouWtmOOBruODquODvOODq+WItuW+oeWHpueQhlxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnZycgfHwgZXZlbnQua2V5ID09PSAnRycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5nb29kUGFuZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0RmxhZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgaXNCaWdCb251cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g44OV44Op44Kw44Oq44K744OD44OI6Zai5pWwXG4gICAgICAgIGZ1bmN0aW9uIHJlc2V0RmxhZ3MoKSB7XG4gICAgICAgICAgICBpc0JlbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIGlzUmVwbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICBpc091dCA9IGZhbHNlO1xuICAgICAgICAgICAgaXNXYXRlcm1lbG9uID0gZmFsc2U7XG4gICAgICAgICAgICBpc0NoZXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICBpc0JpZ0JvbnVzID0gZmFsc2U7XG4gICAgICAgICAgICBpc0xlZ0JvbnVzID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDjg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgbGV0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlTWVkYWxQYW5lbCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbnMoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVTdGFydFBhbmVsKCk7XG5cbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yM5pu05pawXG4gICAgICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgbGV0IHVwZGF0ZTogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBjbG9jay5nZXREZWx0YSgpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpc1JvdGF0aW5nc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3RhdGlvblRoaXNGcmFtZSA9IHJvdGF0aW9uU3BlZWRQZXJTZWNvbmQgKiBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdWJlc1tpXS5yb3RhdGVZKFRIUkVFLk1hdGhVdGlscy5kZWdUb1JhZCgtcm90YXRpb25UaGlzRnJhbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgcm90YXRlQW5nbGVzW2ldID0gKHJvdGF0ZUFuZ2xlc1tpXSArIHJvdGF0aW9uVGhpc0ZyYW1lKSAlIDM2MDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzU2xpcHBpbmdzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdGF0aW9uVGhpc0ZyYW1lID0gTWF0aC5taW4oc2xpcFNwZWVkICogZGVsdGEsIGxhc3RSb3RhdGVBbmdsZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1YmVzW2ldLnJvdGF0ZVkoVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKC1yb3RhdGlvblRoaXNGcmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICByb3RhdGVBbmdsZXNbaV0gPSAocm90YXRlQW5nbGVzW2ldICsgcm90YXRpb25UaGlzRnJhbWUpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldIC09IHJvdGF0aW9uVGhpc0ZyYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNTbGlwcGluZ3NbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbnMoKSB7XG4gICAgICAgIGNvbnN0IG91dGVyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDAwMCB9KTtcblxuICAgICAgICBjb25zdCBidXR0b25Qb3NpdGlvbnMgPSBbXG4gICAgICAgICAgICB7IHg6IC0xLCB5OiAtMS4yLCB6OiAxLjIgfSwgIC8vIOW3puODquODvOODq+S4i1xuICAgICAgICAgICAgeyB4OiAwLCB5OiAtMS4yLCB6OiAxLjIgfSwgICAvLyDkuK3jg6rjg7zjg6vkuItcbiAgICAgICAgICAgIHsgeDogMSwgeTogLTEuMiwgejogMS4yIH0gICAgLy8g5Y+z44Oq44O844Or5LiLXG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG5cbiAgICAgICAgICAgIC8vIOODnOOCv+ODs+OBruWkluWBtFxuICAgICAgICAgICAgY29uc3Qgb3V0ZXJDeWxpbmRlciA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMTUsIDAuMTUsIDAuMDUsIDE2KSxcbiAgICAgICAgICAgICAgICBvdXRlck1hdGVyaWFsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgb3V0ZXJDeWxpbmRlci5wb3NpdGlvbi55ID0gMC4wMjU7XG5cbiAgICAgICAgICAgIC8vIOODnOOCv+ODs+acrOS9k1xuICAgICAgICAgICAgY29uc3QgaW5uZXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4MDAwMGZmIH0pOyAvLyDlgIvliKXjga7jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICAgICAgICAgIGNvbnN0IGlubmVyQ3lsaW5kZXIgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjEsIDAuMSwgMC4wNSwgMTYpLFxuICAgICAgICAgICAgICAgIGlubmVyTWF0ZXJpYWxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpbm5lckN5bGluZGVyLnBvc2l0aW9uLnkgPSAwLjA1O1xuICAgICAgICAgICAgdGhpcy5idXR0b25zLnB1c2goaW5uZXJDeWxpbmRlcik7XG5cbiAgICAgICAgICAgIGdyb3VwLmFkZChvdXRlckN5bGluZGVyKTtcbiAgICAgICAgICAgIGdyb3VwLmFkZChpbm5lckN5bGluZGVyKTtcblxuICAgICAgICAgICAgZ3JvdXAucG9zaXRpb24uc2V0KGJ1dHRvblBvc2l0aW9uc1tpXS54LCBidXR0b25Qb3NpdGlvbnNbaV0ueSwgYnV0dG9uUG9zaXRpb25zW2ldLnopO1xuICAgICAgICAgICAgZ3JvdXAucm90YXRlWChNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICBncm91cC5wb3NpdGlvbi56ID0gMS4yNTtcbiAgICAgICAgICAgIGdyb3VwLnBvc2l0aW9uLnkgPSAtMS44O1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoZ3JvdXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTdGFydFBhbmVsKCkge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gNTEyO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTI4O1xuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZvbnQgPSAnNDhweCBBcmlhbCc7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAneWVsbG93JztcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dCgnUHJlc3MgRU5URVIgdG8gU3RhcnQhJywgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIpO1xuXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IG1hcDogdGV4dHVyZSwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSwgdHJhbnNwYXJlbnQ6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IHBhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMywgMC42KSwgbWF0ZXJpYWwpO1xuXG4gICAgICAgIHBhbmVsLnBvc2l0aW9uLnNldCgwLCAxLjEsIDEuMDEpOyAgLy8g44K544Ot44OD44OI5pys5L2T5LiK6YOo44GC44Gf44KK44Gu5bqn5qiZXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBhbmVsKTtcbiAgICB9XG5cbiAgICAvLyDjg6Hjg4Djg6vjgpLjgqvjgqbjg7Pjg4jjgZnjgovjg5Hjg43jg6tcbiAgICBwcml2YXRlIGNyZWF0ZU1lZGFsUGFuZWwoKSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjYW52YXMud2lkdGggPSAyNTY7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSAxMjg7XG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjdHguZm9udCA9ICczNnB4IEFyaWFsJztcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dChgTWVkYWxzOiAke3RoaXMubWVkYWxDb3VudH1gLCAyMCwgODApO1xuXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IG1hcDogdGV4dHVyZSwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSB9KTtcbiAgICAgICAgY29uc3QgcGFuZWwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxLjUsIDAuNiksIG1hdGVyaWFsKTtcbiAgICAgICAgcGFuZWwucG9zaXRpb24uc2V0KDAsIC0xLjA1LCAxLjAxKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocGFuZWwpO1xuICAgIH1cblxuICAgIC8vIOODkeODjeODq+OBruOCouODg+ODl+ODh+ODvOODiFxuICAgIHByaXZhdGUgdXBkYXRlTWVkYWxQYW5lbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVkYWxQYW5lbCkge1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUodGhpcy5tZWRhbFBhbmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjYW52YXMud2lkdGggPSAyNTY7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSAxMjg7XG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjdHguZm9udCA9ICczNnB4IEFyaWFsJztcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dChgTWVkYWxzOiAke3RoaXMubWVkYWxDb3VudH1gLCAyMCwgODApO1xuXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IG1hcDogdGV4dHVyZSwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSB9KTtcbiAgICAgICAgdGhpcy5tZWRhbFBhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMS41LCAwLjYpLCBtYXRlcmlhbCk7XG4gICAgICAgIHRoaXMubWVkYWxQYW5lbC5wb3NpdGlvbi5zZXQoMCwgLTEuMDUsIDEuMDEpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLm1lZGFsUGFuZWwpO1xuICAgIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuXG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCA3KSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9