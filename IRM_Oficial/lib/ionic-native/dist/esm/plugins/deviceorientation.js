var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Cordova, Plugin } from './plugin';
/**
 * @name Device Orientation
 * @description
 * Requires Cordova plugin: `cordova-plugin-device-orientation`. For more info, please see the [Device Orientation docs](https://github.com/apache/cordova-plugin-device-orientation).
 *
 * @usage
 * ```typescript
 * // DeviceOrientationCompassHeading is an interface for compass
 * import { DeviceOrientation, DeviceOrientationCompassHeading } from 'ionic-native';
 *
 *
 * // Get the device current compass heading
 * DeviceOrientation.getCurrentHeading().then(
 *   (data: DeviceOrientationCompassHeading) => console.log(data),
 *   (error: any) => console.log(error)
 * );
 *
 * // Watch the device compass heading change
 * var subscription = DeviceOrientation.watchHeading().subscribe(
 *   (data: DeviceOrientationCompassHeading) => console.log(data)
 * );
 *
 * // Stop watching heading change
 * subscription.unsubscribe();
 * ```
 * @interfaces
 * DeviceOrientationCompassOptions
 * DeviceOrientationCompassHeading
 */
export var DeviceOrientation = (function () {
    function DeviceOrientation() {
    }
    /**
     * Get the current compass heading.
     * @returns {Promise<DeviceOrientationCompassHeading>}
     */
    DeviceOrientation.getCurrentHeading = function () { return; };
    /**
     * Get the device current heading at a regular interval
     *
     * Stop the watch by unsubscribing from the observable
     * @param {DeviceOrientationCompassOptions} options Options for compass. Frequency and Filter. Optional
     * @returns {Observable<DeviceOrientationCompassHeading>} Returns an observable that contains the compass heading
     */
    DeviceOrientation.watchHeading = function (options) { return; };
    __decorate([
        Cordova()
    ], DeviceOrientation, "getCurrentHeading", null);
    __decorate([
        Cordova({
            callbackOrder: 'reverse',
            observable: true,
            clearFunction: 'clearWatch'
        })
    ], DeviceOrientation, "watchHeading", null);
    DeviceOrientation = __decorate([
        Plugin({
            pluginName: 'DeviceOrientation',
            plugin: 'cordova-plugin-device-orientation',
            pluginRef: 'navigator.compass',
            repo: 'https://github.com/apache/cordova-plugin-device-orientation'
        })
    ], DeviceOrientation);
    return DeviceOrientation;
}());
//# sourceMappingURL=deviceorientation.js.map