export class AudioDevicesManager {

    async initializeAsync() {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then(stream => {
                stream.getTracks().forEach(t => t.stop());  
                resolve(this);
            })
            .catch(() => reject("Failed to initialize Audio API. Check browser permissions."));
        });
    }
    
    async getInputDevicesAsync() {
        let devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === 'audioinput');
    }
    
    async getOutputDevicesAsync() {
        let devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === 'audiooutput');
    }
    
    async getAllDevicesAsync() {
        return navigator.mediaDevices.enumerateDevices();
    }
    
    async openDeviceStreamAsync(audioDevice) {
        return navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: audioDevice.deviceId } }, video: false });
    }
    
    async closeDeviceStreamAsync(audioStream) {
        audioStream.getTracks().forEach(t => t.stop());
    }
}