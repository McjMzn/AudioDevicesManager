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
    
    async getAllDevicesAsync() {
        return navigator.mediaDevices.enumerateDevices();
    }

    async getInputDevicesAsync() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === 'audioinput');
    }
    
    async getOutputDevicesAsync() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === 'audiooutput');
    }
   
    findDeviceAsync(deviceIdentifier, devices) {
        return new Promise((resolve, reject) => {
            const matchedByLabel = devices.filter(device => device.label == deviceIdentifier);
            const matchedByDeviceId = devices.filter(device => device.deviceId == deviceIdentifier);
            const matched = matchedByLabel.concat(matchedByDeviceId);
            if (matched.length === 0) {
                reject(`Device '${deviceIdentifier}' not found.`);
            }

            if (matched.length > 1) {
                reject(`Identifier '${deviceIdentifier}' does not allow for unambiguous device selection.`);
            }

            resolve(matched[0]);
        });
    }

    async getInputDeviceAsync(deviceIdentifier) {
        const inputDevices = await this.getInputDevicesAsync();
        return this.findDeviceAsync(deviceIdentifier, inputDevices); 
    }

    async getOutputDeviceAsync(deviceIdentifier) {
        const outputDevices = await this.getOutputDevicesAsync();
        return this.findDeviceAsync(deviceIdentifier, outputDevices); 
    }
    
    async openDeviceStreamAsync(audioDevice) {
        return navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: audioDevice.deviceId } }, video: false });
    }
    
    async closeDeviceStreamAsync(audioStream) {
        return new Promise((resolve, reject) => {
            audioStream.getTracks().forEach(t => t.stop());
            resolve();
        });
    }
}