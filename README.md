# AudioDevicesManager.js
Simple audio devices manager based on Web Audio API which makes browsing available devices and working with audio streams much easier.

### Usage
#### TL;DR;
```js
// Create an instance.
const audioDevicesManager = new AudioDevicesManager();

// Get permission to access audio devices.
await audioDevicesManager.initializeAsync();

// Get audio device.
const defaultInputDevice = await audioDevicesManager.getInputDeviceAsync('default');

// Open device stream.
const inputStream = await audioDevicesManager.openDeviceStreamAsync(defaultInputDevice);
...

// Close device stream.
await audioDevicesManager.closeDeviceStreamAsync(inputStream);
```

#### Initialization
Creating an instance of the ```AudioDevicesManager``` is pretty straightforward.
```js
const audioDevicesManager = new AudioDevicesManager();
```
Access to audio input devices has to be explicitly granted by the user. Use the ```initializeAsync``` method to check the permissions.
* It will do nothing if permission has already been granted.
* It will ask the user for permission if it hasn't been set yet.
* It will throw if the access is denied by user.
```js
 await audioDevicesManager.initializeAsync();
```

#### Getting audio devices
The manager itself exposes few methods that simplify accessing the audio devices.
```js
const inputDevices = await audioDevicesManager.getInputDevicesAsync();
const outputDevices = await audioDevicesManager.getOutputDevicesAsync();
const allDevices = await audioDevicesManager.getAllDevicesAsync();
```
Beside getting all devices of chosen type, it is also possible to get the device based on its name or identifier.
```js
const defaultInputDevice = await audioDevicesManager.getInputDeviceAsync('default');
const defaultOutputDevice = await audioDevicesManager.getOutputDeviceAsync('default');
const namedInputDevice = await audioDevicesManager.getOutputDeviceAsync('Speakers (Realtek High Definition Audio)');
```

#### Handling the audio device stream
AudioDevicesManager.js allows user to open and close the device stream without diving into details of the Web Audio API.  
```js
const stream = await audioDevicesManager.openDeviceStreamAsync(audioDevice);
...
await audioDevicesManager.closeDeviceStreamAsync(stream);
```
