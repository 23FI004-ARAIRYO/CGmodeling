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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7Ozs7Ozs7VUN0bEJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcbiAgICBwcml2YXRlIGdlb21ldHJ5OiBUSFJFRS5CdWZmZXJHZW9tZXRyeTtcbiAgICBwcml2YXRlIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcbiAgICBwcml2YXRlIGN1YmVzOiBUSFJFRS5NZXNoW10gPSBbXTtcbiAgICBwcml2YXRlIGxpZ2h0OiBUSFJFRS5MaWdodDtcbiAgICBwcml2YXRlIGdvb2RQYW5lbDogVEhSRUUuTWVzaCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgbWVkYWxDb3VudDogbnVtYmVyID0gNzc3O1xuICAgIHByaXZhdGUgbWVkYWxQYW5lbDogVEhSRUUuTWVzaCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgbGV2ZXJCYXNlOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgYnV0dG9uczogVEhSRUUuTWVzaFtdID0gW107ICAvLyDjg5zjgr/jg7Pjga7phY3liJdcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKSpcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBsZXQgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweDQ5NWVkKSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgLy/jgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnjgavjgZnjgotcblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICBsZXQgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwKTtcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgICAgY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSk7XG5cbiAgICAgICAgbGV0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIxyZW5kZXJcbiAgICAgICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBsZXQgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgICAgIGNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuICAgICAgICBjb25zdCByZWVsVGV4dHVyZXMgPSBbXG4gICAgICAgICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJ2ltYWdlL3JlZWxMZWZ0LnBuZycpLFxuICAgICAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCdpbWFnZS9yZWVsQ2VudGVyLnBuZycpLFxuICAgICAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCdpbWFnZS9yZWVsUmlnaHQucG5nJylcbiAgICAgICAgXTtcbiAgICAgICAgcmVlbFRleHR1cmVzLmZvckVhY2godGV4dHVyZSA9PiB7XG4gICAgICAgICAgICB0ZXh0dXJlLmNlbnRlci5zZXQoMC41LCAwLjUpO1xuICAgICAgICAgICAgdGV4dHVyZS5yb3RhdGlvbiA9IC1NYXRoLlBJIC8gMjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g5aSW5p6g44GuU2hhcGXvvIjlhajkvZPjga7jg5Hjg43jg6sgNSB4IDPvvIlcbiAgICAgICAgY29uc3Qgc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAgICAgICAgc2hhcGUubW92ZVRvKC0yLCAtMS41KTtcbiAgICAgICAgc2hhcGUubGluZVRvKDIsIC0xLjUpO1xuICAgICAgICBzaGFwZS5saW5lVG8oMiwgMS41KTtcbiAgICAgICAgc2hhcGUubGluZVRvKC0yLCAxLjUpO1xuICAgICAgICBzaGFwZS5saW5lVG8oLTIsIC0xLjUpO1xuXG4gICAgICAgIC8vIOeptOOBrlNoYXBl77yI5Zub6KeS5b2i44Gu56m0IHgz77yJXG4gICAgICAgIGNvbnN0IGhvbGVzID0gW1xuICAgICAgICAgICAgeyB4OiAtMSwgeTogMCwgd2lkdGg6IDAuOSwgaGVpZ2h0OiAxLjIgfSxcbiAgICAgICAgICAgIHsgeDogMCwgeTogMCwgd2lkdGg6IDAuOSwgaGVpZ2h0OiAxLjIgfSxcbiAgICAgICAgICAgIHsgeDogMSwgeTogMCwgd2lkdGg6IDAuOSwgaGVpZ2h0OiAxLjIgfVxuICAgICAgICBdO1xuXG4gICAgICAgIGhvbGVzLmZvckVhY2goaCA9PiB7XG4gICAgICAgICAgICBjb25zdCBob2xlID0gbmV3IFRIUkVFLlBhdGgoKTtcbiAgICAgICAgICAgIGhvbGUubW92ZVRvKGgueCAtIGgud2lkdGggLyAyLCBoLnkgLSBoLmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgaG9sZS5saW5lVG8oaC54ICsgaC53aWR0aCAvIDIsIGgueSAtIGguaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBob2xlLmxpbmVUbyhoLnggKyBoLndpZHRoIC8gMiwgaC55ICsgaC5oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGhvbGUubGluZVRvKGgueCAtIGgud2lkdGggLyAyLCBoLnkgKyBoLmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgaG9sZS5saW5lVG8oaC54IC0gaC53aWR0aCAvIDIsIGgueSAtIGguaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBzaGFwZS5ob2xlcy5wdXNoKGhvbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBib3hNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmYwMDAwIH0pO1xuXG4gICAgICAgIGNvbnN0IGxlZnRQYW5lbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjIsIDMsIDIpLCBib3hNYXRlcmlhbCk7XG4gICAgICAgIGxlZnRQYW5lbC5wb3NpdGlvbi5zZXQoLTIsIDAsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChsZWZ0UGFuZWwpO1xuXG4gICAgICAgIGNvbnN0IHJpZ2h0UGFuZWwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4yLCAzLCAyKSwgYm94TWF0ZXJpYWwpO1xuICAgICAgICByaWdodFBhbmVsLnBvc2l0aW9uLnNldCgyLCAwLCAwKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocmlnaHRQYW5lbCk7XG5cbiAgICAgICAgY29uc3QgdG9wUGFuZWwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoNC4yLCAwLjIsIDIpLCBib3hNYXRlcmlhbCk7XG4gICAgICAgIHRvcFBhbmVsLnBvc2l0aW9uLnNldCgwLCAxLjUsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0b3BQYW5lbCk7XG5cbiAgICAgICAgY29uc3QgYmFja1BhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDQuMiwgMy4xLCAwLjIpLCBib3hNYXRlcmlhbCk7XG4gICAgICAgIGJhY2tQYW5lbC5wb3NpdGlvbi5zZXQoMCwgMC4wNSwgLTEpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChiYWNrUGFuZWwpO1xuXG4gICAgICAgIGNvbnN0IHVuZGVyUGFuZWwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoNC43LCAzLCAyLjUpLCBib3hNYXRlcmlhbCk7XG4gICAgICAgIHVuZGVyUGFuZWwucG9zaXRpb24uc2V0KDAsIC0zLCAwKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodW5kZXJQYW5lbCk7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpLmxvYWQoJ2ltYWdlL1REVS5wbmcnKTtcbiAgICAgICAgY29uc3QgcGFuZWxNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IG1hcDogdGV4dHVyZSwgdHJhbnNwYXJlbnQ6IHRydWUgfSk7XG5cbiAgICAgICAgY29uc3QgcGFuZWxXaWR0aCA9IDQ7XG4gICAgICAgIGNvbnN0IHBhbmVsSGVpZ2h0ID0gMjtcbiAgICAgICAgY29uc3QgcGFuZWxHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KHBhbmVsV2lkdGgsIHBhbmVsSGVpZ2h0KTtcbiAgICAgICAgY29uc3QgaW1hZ2VQYW5lbCA9IG5ldyBUSFJFRS5NZXNoKHBhbmVsR2VvbWV0cnksIHBhbmVsTWF0ZXJpYWwpO1xuXG4gICAgICAgIGltYWdlUGFuZWwucG9zaXRpb24uc2V0KDAsIC0zLjIsIDEuMjYpO1xuXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGltYWdlUGFuZWwpO1xuXG4gICAgICAgIC8vIOODrOODkOODvOS9nOaIkFxuICAgICAgICBjb25zdCBsZXZlckdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG5cbiAgICAgICAgLy8g5qOSXG4gICAgICAgIGNvbnN0IGxldmVyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDg4ODg4OCB9KTtcbiAgICAgICAgY29uc3QgbGV2ZXJTdGljayA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMDUsIDAuMDUsIDAuNSwgMTYpLCBsZXZlck1hdGVyaWFsKTtcbiAgICAgICAgbGV2ZXJTdGljay5wb3NpdGlvbi55ID0gMC4yNTtcbiAgICAgICAgbGV2ZXJHcm91cC5hZGQobGV2ZXJTdGljayk7XG5cbiAgICAgICAgLy8g6buS44GE55CDXG4gICAgICAgIGNvbnN0IGJhbGxNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4MDAwMDAwIH0pO1xuICAgICAgICBjb25zdCBsZXZlckJhbGwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4xLCAxNiwgMTYpLCBiYWxsTWF0ZXJpYWwpO1xuXG4gICAgICAgIGxldmVyQmFsbC5wb3NpdGlvbi55ID0gMC41O1xuICAgICAgICBsZXZlckdyb3VwLmFkZChsZXZlckJhbGwpO1xuXG4gICAgICAgIC8vIOODrOODkOODvOWFqOS9k+OBruS9jee9rlxuICAgICAgICBsZXZlckdyb3VwLnBvc2l0aW9uLnNldCgtMS44LCAtMS43LCAxLjIpO1xuICAgICAgICAvLyDlm57ou6LliJ3mnJ/kvY3nva5cbiAgICAgICAgbGV2ZXJHcm91cC5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDI7XG5cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobGV2ZXJHcm91cCk7XG4gICAgICAgIHRoaXMubGV2ZXJCYXNlID0gbGV2ZXJHcm91cDtcblxuICAgICAgICAvLyBHZW9tZXRyeeOBqE1lc2jnlJ/miJBcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU2hhcGVHZW9tZXRyeShzaGFwZSk7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwMDAsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG4gICAgICAgIGNvbnN0IHBhbmVsID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgcGFuZWwucG9zaXRpb24ueiA9IDE7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBhbmVsKTtcblxuICAgICAgICBjb25zdCBnb29kVGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZCgnaW1hZ2UvZ29vZExhbXAucG5nJyk7XG4gICAgICAgIGNvbnN0IGdvb2RNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgbWFwOiBnb29kVGV4dHVyZSwgdHJhbnNwYXJlbnQ6IHRydWUgfSk7XG4gICAgICAgIHRoaXMuZ29vZFBhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMSwgMSksIGdvb2RNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuZ29vZFBhbmVsLnBvc2l0aW9uLnNldCgtMS42LCAtMC44LCAxLjAxKTtcblxuICAgICAgICB0aGlzLmdlb21ldHJ5ID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMSwgMSwgMSwgMzIpO1xuXG4gICAgICAgIC8vIOODquODvOODqzPjgaTnlJ/miJBcbiAgICAgICAgY29uc3QgcG9zaXRpb25zWCA9IFstMSwgMCwgMV07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICAgICAgbWFwOiByZWVsVGV4dHVyZXNbaV0sXG4gICAgICAgICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCByZWVsID0gbmV3IFRIUkVFLk1lc2godGhpcy5nZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgcmVlbC5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlZWwucm90YXRlWihNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICByZWVsLnBvc2l0aW9uLnggPSBwb3NpdGlvbnNYW2ldO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQocmVlbCk7XG4gICAgICAgICAgICB0aGlzLmN1YmVzLnB1c2gocmVlbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDnirbmhYvnrqHnkIbnlKjjga7phY3liJdcbiAgICAgICAgbGV0IHJvdGF0ZUFuZ2xlcyA9IFswLCAwLCAwXTsgLy8gM+ODquODvOODq+OBruWbnui7ouinkuW6pijluqYpXG4gICAgICAgIGxldCBsYXN0Um90YXRlQW5nbGVzID0gWzAsIDAsIDBdOyAvLyDmu5HjgormmYLjga7mrovjgorop5LluqZcbiAgICAgICAgbGV0IGlzUm90YXRpbmdzID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2VdO1xuICAgICAgICBsZXQgaXNTbGlwcGluZ3MgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZV07XG5cbiAgICAgICAgY29uc3QgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcbiAgICAgICAgY29uc3Qgcm90YXRpb25TcGVlZFBlclNlY29uZCA9IDcyMDtcbiAgICAgICAgY29uc3Qgc2xpcFNwZWVkID0gNzIwO1xuXG4gICAgICAgIC8vIDA6IOWFqOODquODvOODq+Wbnui7ouS4rSwgMeOAnDM6IOWBnOatoua4iOOBv+ODquODvOODq+aVsO+8iOWBnOatoumghuOBr+W3puKGkuS4reKGkuWPs++8iVxuICAgICAgICBsZXQgc3RvcENvdW50ID0gMzsgLy8g5pyA5Yid44Gv5YWo5YGc5q2i54q25oWLXG5cbiAgICAgICAgLy8g5oq96YG444OV44Op44KwXG4gICAgICAgIGxldCBpc0JlbGwgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzUmVwbGF5ID0gZmFsc2U7XG4gICAgICAgIGxldCBpc091dCA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNXYXRlcm1lbG9uID0gZmFsc2U7XG4gICAgICAgIGxldCBpc0NoZXJ5ID0gZmFsc2U7XG4gICAgICAgIGxldCBpc1N0cm9uZ0NoZXJ5ID0gZmFsc2U7XG4gICAgICAgIGxldCBpc0JpZ0JvbnVzID0gZmFsc2U7XG4gICAgICAgIGxldCBpc0xlZ0JvbnVzID0gZmFsc2U7XG4gICAgICAgIGxldCBpc0JvbnVzVGltZSA9IGZhbHNlO1xuICAgICAgICBsZXQgcmFuZG9tID0gMDtcbiAgICAgICAgbGV0IGJvbnVzQ291bnQgPSAwO1xuXG4gICAgICAgIC8vIOOCreODvOOCpOODmeODs+ODiDog44Ko44Oz44K/44O844Gn44Oq44O844Or5pON5L2cXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RvcENvdW50ID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWFqOODquODvOODq+WBnOatoiDihpIg5YWo44Oq44O844Or5aeL5YuVXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9ucy5mb3JFYWNoKGJ0biA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAoYnRuLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwpLmNvbG9yLnNldCgweDAwMDBmZik7IC8vIOmdklxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3RhdGluZ3NbaV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNTbGlwcGluZ3NbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0b3BDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNSZXBsYXkgJiYgIWlzV2F0ZXJtZWxvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRhbENvdW50IC09IDM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNZWRhbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNCaWdCb251cyAmJiAhaXNMZWdCb251cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRGbGFncygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaKvemBuOOBr+OBk+OBk+OBpzHlm57jgaDjgZFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYW5kb20gPT09IDApIGlzU3Ryb25nQ2hlcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmFuZG9tIDwgNSkgaXNDaGVyeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyYW5kb20gPCAzNykgaXNXYXRlcm1lbG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhbmRvbSA8IDY5KSBpc0JlbGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmFuZG9tIDwgMTMzKSBpc1JlcGxheSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyYW5kb20gPCAyNTYpIGlzT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaKvemBuOe1kOaenDpcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNCZWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXBsYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc091dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0ZXJtZWxvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N0cm9uZ0NoZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNCaWdCb251cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTGVnQm9udXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0JvbnVzVGltZVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyDjg6zjg5Djg7zjgpLlj6njgY9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZXJCYXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVyQmFzZS5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVyQmFzZS5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDQgKiAzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAwLjXnp5LlvozjgavmiLvjgZlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVyQmFzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVyQmFzZS5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIO+8iOaXouWtmOOBruODquODvOODq+Wbnui7ouWHpueQhu+8iVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3RhdGluZ3NbaV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNTbGlwcGluZ3NbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g44Oq44O844Or44KS6aCG55Wq44GrMeOBpOOBmuOBpOatouOCgeOCi+WHpueQhlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpID0gc3RvcENvdW50OyAvLyDlgZzmraLlr77osaHjga7jg6rjg7zjg6vjgqTjg7Pjg4fjg4Pjgq/jgrnvvIgwOuW3piwxOuS4rSwyOuWPs++8iVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1JvdGF0aW5nc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3RhdGluZ3NbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmJ1dHRvbnNbaV0ubWF0ZXJpYWwgYXMgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCkuY29sb3Iuc2V0KDB4ZmYwMDAwKTsgLy8g6LWkXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NsaXBwaW5nc1tpXSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa7keOCieOBi+OBq+WBnOatouOBmeOCi+OBn+OCgeOBruaui+OCiuinkuW6puioreWumlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtYWluZGVyID0gcm90YXRlQW5nbGVzW2ldICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldEFuZ2xlID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bem44Oq44O844Or44Gu5YGc5q2i5L2N572u5rG65a6aXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNCZWxsIHx8IGlzUmVwbGF5IHx8IGlzT3V0IHx8IGlzQm9udXNUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDkwICsgNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gOTApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSA2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNXYXRlcm1lbG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDkwICsgNzYpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gOTApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSA3NjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNDaGVyeSB8fCBpc1N0cm9uZ0NoZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDkwICsgNDApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gOTApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSA0MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNCaWdCb251cyB8fCBpc0xlZ0JvbnVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDE4MCArIDIyKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDE4MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSAxODA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAyMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Lit44Oq44O844Or44Gu5YGc5q2i5L2N572u5rG65a6aXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc091dCB8fCBpc1JlcGxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDkwICsgNDApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiA5MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSA0MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQmVsbCB8fCBpc0JvbnVzVGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDkwICsgNzYpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiA5MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSA3NjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzV2F0ZXJtZWxvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDE4MCArIDExMCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDE4MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSAxODA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0NoZXJ5IHx8IGlzU3Ryb25nQ2hlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiA5MCArIDU4KSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gOTApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gNTg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0JpZ0JvbnVzIHx8IGlzTGVnQm9udXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNlZ21lbnQgPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDkwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QW5nbGUgPSAoKGN1cnJlbnRTZWdtZW50ICsgMSkgKiAzNjAgKyA5MikgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDM2MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID09PSAwKSBsYXN0Um90YXRlQW5nbGVzW2ldID0gOTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlj7Pjg6rjg7zjg6vjga7lgZzmraLkvY3nva7msbrlrppcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3V0IHx8IGlzV2F0ZXJtZWxvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDE4MCArIDIpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiAxODApIGxhc3RSb3RhdGVBbmdsZXNbaV0gLT0gMTgwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc091dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9udXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMjgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvbnVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQmlnQm9udXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzT3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvbnVzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTGVnQm9udXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzT3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNXYXRlcm1lbG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib251cyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib251cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdvb2RQYW5lbCAmJiAhdGhpcy5zY2VuZS5jaGlsZHJlbi5pbmNsdWRlcyh0aGlzLmdvb2RQYW5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5nb29kUGFuZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JpZ0JvbnVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGVybWVsb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9udXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nb29kUGFuZWwgJiYgIXRoaXMuc2NlbmUuY2hpbGRyZW4uaW5jbHVkZXModGhpcy5nb29kUGFuZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZ29vZFBhbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMZWdCb251cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNXYXRlcm1lbG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQmVsbCB8fCBpc1JlcGxheSB8fCBpc0NoZXJ5IHx8IGlzQm9udXNUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogOTAgKyAyMCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAodGFyZ2V0QW5nbGUgLSByZW1haW5kZXIgKyAzNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA+IDkwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFJvdGF0ZUFuZ2xlc1tpXSA9PT0gMCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9IDIwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNCZWxsIHx8IGlzQm9udXNUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lZGFsQ291bnQgKz0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWVkYWxQYW5lbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9udXNDb3VudCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQm9udXNUaW1lICYmIGJvbnVzQ291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNCb251c1RpbWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JpZ0JvbnVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMZWdCb251cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdvb2RQYW5lbCAmJiB0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZSh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQ2hlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVkYWxDb3VudCArPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNZWRhbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib251cyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib251cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdvb2RQYW5lbCAmJiAhdGhpcy5zY2VuZS5jaGlsZHJlbi5pbmNsdWRlcyh0aGlzLmdvb2RQYW5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5nb29kUGFuZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JpZ0JvbnVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NoZXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvbnVzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdvb2RQYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTGVnQm9udXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hlcnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJvbmdDaGVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2VnbWVudCA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbmdsZSA9ICgoY3VycmVudFNlZ21lbnQgKyAxKSAqIDkwICsgNjApICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldID0gKHRhcmdldEFuZ2xlIC0gcmVtYWluZGVyICsgMzYwKSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPiA5MCkgbGFzdFJvdGF0ZUFuZ2xlc1tpXSAtPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSA2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRhbENvdW50ICs9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWVkYWxQYW5lbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiaWcgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJpZyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ29vZFBhbmVsICYmICF0aGlzLnNjZW5lLmNoaWxkcmVuLmluY2x1ZGVzKHRoaXMuZ29vZFBhbmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZ29vZFBhbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQmlnQm9udXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTdHJvbmdDaGVyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0xlZ0JvbnVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogMTgwICsgMTQ2KSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gMTgwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDE4MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAxNDY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQm9udXNUaW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9udXNDb3VudCA9IDU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0JpZ0JvbnVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWdtZW50ID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA5MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFuZ2xlID0gKChjdXJyZW50U2VnbWVudCArIDEpICogMTgwICsgMTY2KSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJvdGF0ZUFuZ2xlc1tpXSA9ICh0YXJnZXRBbmdsZSAtIHJlbWFpbmRlciArIDM2MCkgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldID4gMTgwKSBsYXN0Um90YXRlQW5nbGVzW2ldIC09IDE4MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RSb3RhdGVBbmdsZXNbaV0gPT09IDApIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAxNjY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQm9udXNUaW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9udXNDb3VudCA9IDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDml6LlrZjjga7jg6rjg7zjg6vliLblvqHlh6bnkIZcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ2cnIHx8IGV2ZW50LmtleSA9PT0gJ0cnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdvb2RQYW5lbCAmJiAhdGhpcy5zY2VuZS5jaGlsZHJlbi5pbmNsdWRlcyh0aGlzLmdvb2RQYW5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZ29vZFBhbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNldEZsYWdzKCk7XG4gICAgICAgICAgICAgICAgICAgIGlzQmlnQm9udXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIOODleODqeOCsOODquOCu+ODg+ODiOmWouaVsFxuICAgICAgICBmdW5jdGlvbiByZXNldEZsYWdzKCkge1xuICAgICAgICAgICAgaXNCZWxsID0gZmFsc2U7XG4gICAgICAgICAgICBpc1JlcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgaXNPdXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlzV2F0ZXJtZWxvbiA9IGZhbHNlO1xuICAgICAgICAgICAgaXNDaGVyeSA9IGZhbHNlO1xuICAgICAgICAgICAgaXNCaWdCb251cyA9IGZhbHNlO1xuICAgICAgICAgICAgaXNMZWdCb251cyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGxldCBsdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSkubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KGx2ZWMueCwgbHZlYy55LCBsdmVjLnopO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZU1lZGFsUGFuZWwoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XG5cbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yM5pu05pawXG4gICAgICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgbGV0IHVwZGF0ZTogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBjbG9jay5nZXREZWx0YSgpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpc1JvdGF0aW5nc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3RhdGlvblRoaXNGcmFtZSA9IHJvdGF0aW9uU3BlZWRQZXJTZWNvbmQgKiBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdWJlc1tpXS5yb3RhdGVZKFRIUkVFLk1hdGhVdGlscy5kZWdUb1JhZCgtcm90YXRpb25UaGlzRnJhbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgcm90YXRlQW5nbGVzW2ldID0gKHJvdGF0ZUFuZ2xlc1tpXSArIHJvdGF0aW9uVGhpc0ZyYW1lKSAlIDM2MDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzU2xpcHBpbmdzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdGF0aW9uVGhpc0ZyYW1lID0gTWF0aC5taW4oc2xpcFNwZWVkICogZGVsdGEsIGxhc3RSb3RhdGVBbmdsZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1YmVzW2ldLnJvdGF0ZVkoVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKC1yb3RhdGlvblRoaXNGcmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICByb3RhdGVBbmdsZXNbaV0gPSAocm90YXRlQW5nbGVzW2ldICsgcm90YXRpb25UaGlzRnJhbWUpICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICBsYXN0Um90YXRlQW5nbGVzW2ldIC09IHJvdGF0aW9uVGhpc0ZyYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Um90YXRlQW5nbGVzW2ldIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSb3RhdGVBbmdsZXNbaV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNTbGlwcGluZ3NbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbnMoKSB7XG4gICAgICAgIGNvbnN0IG91dGVyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDAwMCB9KTtcblxuICAgICAgICBjb25zdCBidXR0b25Qb3NpdGlvbnMgPSBbXG4gICAgICAgICAgICB7IHg6IC0xLCB5OiAtMS4yLCB6OiAxLjIgfSwgIC8vIOW3puODquODvOODq+S4i1xuICAgICAgICAgICAgeyB4OiAwLCB5OiAtMS4yLCB6OiAxLjIgfSwgICAvLyDkuK3jg6rjg7zjg6vkuItcbiAgICAgICAgICAgIHsgeDogMSwgeTogLTEuMiwgejogMS4yIH0gICAgLy8g5Y+z44Oq44O844Or5LiLXG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG5cbiAgICAgICAgICAgIC8vIOODnOOCv+ODs+OBruWkluWBtFxuICAgICAgICAgICAgY29uc3Qgb3V0ZXJDeWxpbmRlciA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMTUsIDAuMTUsIDAuMDUsIDE2KSxcbiAgICAgICAgICAgICAgICBvdXRlck1hdGVyaWFsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgb3V0ZXJDeWxpbmRlci5wb3NpdGlvbi55ID0gMC4wMjU7XG5cbiAgICAgICAgICAgIC8vIOODnOOCv+ODs+acrOS9k1xuICAgICAgICAgICAgY29uc3QgaW5uZXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4MDAwMGZmIH0pOyAvLyDlgIvliKXjga7jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICAgICAgICAgIGNvbnN0IGlubmVyQ3lsaW5kZXIgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjEsIDAuMSwgMC4wNSwgMTYpLFxuICAgICAgICAgICAgICAgIGlubmVyTWF0ZXJpYWxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpbm5lckN5bGluZGVyLnBvc2l0aW9uLnkgPSAwLjA1O1xuICAgICAgICAgICAgdGhpcy5idXR0b25zLnB1c2goaW5uZXJDeWxpbmRlcik7XG5cbiAgICAgICAgICAgIGdyb3VwLmFkZChvdXRlckN5bGluZGVyKTtcbiAgICAgICAgICAgIGdyb3VwLmFkZChpbm5lckN5bGluZGVyKTtcblxuICAgICAgICAgICAgZ3JvdXAucG9zaXRpb24uc2V0KGJ1dHRvblBvc2l0aW9uc1tpXS54LCBidXR0b25Qb3NpdGlvbnNbaV0ueSwgYnV0dG9uUG9zaXRpb25zW2ldLnopO1xuICAgICAgICAgICAgZ3JvdXAucm90YXRlWChNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICBncm91cC5wb3NpdGlvbi56ID0gMS4yNTtcbiAgICAgICAgICAgIGdyb3VwLnBvc2l0aW9uLnkgPSAtMS44O1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoZ3JvdXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8g44Oh44OA44Or44KS44Kr44Km44Oz44OI44GZ44KL44OR44ON44OrXG4gICAgcHJpdmF0ZSBjcmVhdGVNZWRhbFBhbmVsKCkge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gMjU2O1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTI4O1xuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZvbnQgPSAnMzZweCBBcmlhbCc7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHguZmlsbFRleHQoYE1lZGFsczogJHt0aGlzLm1lZGFsQ291bnR9YCwgMjAsIDgwKTtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG4gICAgICAgIGNvbnN0IHBhbmVsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMS41LCAwLjYpLCBtYXRlcmlhbCk7XG4gICAgICAgIHBhbmVsLnBvc2l0aW9uLnNldCgwLCAtMS4wNSwgMS4wMSk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBhbmVsKTtcbiAgICB9XG5cbiAgICAvLyDjg5Hjg43jg6vjga7jgqLjg4Pjg5fjg4fjg7zjg4hcbiAgICBwcml2YXRlIHVwZGF0ZU1lZGFsUGFuZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGFsUGFuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHRoaXMubWVkYWxQYW5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gMjU2O1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTI4O1xuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZvbnQgPSAnMzZweCBBcmlhbCc7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHguZmlsbFRleHQoYE1lZGFsczogJHt0aGlzLm1lZGFsQ291bnR9YCwgMjAsIDgwKTtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG4gICAgICAgIHRoaXMubWVkYWxQYW5lbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDEuNSwgMC42KSwgbWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLm1lZGFsUGFuZWwucG9zaXRpb24uc2V0KDAsIC0xLjA1LCAxLjAxKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5tZWRhbFBhbmVsKTtcbiAgICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcblxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgNykpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==