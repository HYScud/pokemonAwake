class CAudioManager {
    constructor() {
        this._data = {};
        this.isDisableBGM = false;
        this.soundVolume = 1;
        this.bgmVolume = 1;
    }
    setSound(num) {
        if (!isNaN(num) && num >= 0) {
            this.soundVolume = num;
            cc.audioEngine.setVolume(this.soundVolume);
        }
    }
    setBgm(num) {
        if (!isNaN(num) && num >= 0) {
            this.bgmVolume = num;
            cc.audioEngine.setMusicVolume(this.bgmVolume);
        }
    }
    play(name, loop, resKey) {
        if (loop && this._data[name] != undefined) {
            return;
        }
        let clip = RES_M.getRes(resKey, name);
        cc.audioEngine.play(clip, loop, this.soundVolume);
    }
    playMusic(name, loop, resKey) {
        let clip = RES_M.getRes(resKey, name);
        let id = cc.audioEngine.playMusic(clip, loop, this.bgmVolume);
        this._data[name] = id
    }
    stop(name) {
        if (this._data[name] == undefined) {
            return;
        }
        cc.audioEngine.stop(this._data[name]);
        this._data[name] = undefined;
    }
    stopAll() {
        cc.audioEngine.stopAll();
    }
    pauseAll() {
        cc.audioEngine.pauseAll();
    }
    pauseMusic() {
        cc.audioEngine.pauseMusic();
    }
    stopMusic() {
        cc.audioEngine.stopMusic();
    }
    resumeMusic() {
        cc.audioEngine.resumeMusic();
    }
    resumeAll() {
        cc.audioEngine.resumeAll();
    }
}
window.Audio_M = new CAudioManager()