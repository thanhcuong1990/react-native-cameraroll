"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraRoll = void 0;

var _reactNative = require("react-native");

var _NativeCameraRollModule = _interopRequireDefault(require("./NativeCameraRollModule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                  * Copyright (c) Facebook, Inc. and its affiliates.
                                                                                                                                                                                                                  *
                                                                                                                                                                                                                  * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                  * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                  */

const GROUP_TYPES_OPTIONS = {
  Album: 'Album',
  All: 'All',
  // default
  Event: 'Event',
  Faces: 'Faces',
  Library: 'Library',
  PhotoStream: 'PhotoStream',
  SavedPhotos: 'SavedPhotos'
};
const ALBUM_TYPE_OPTIONS = {
  All: 'All',
  Album: 'Album',
  SmartAlbum: 'SmartAlbum'
};
const ASSET_TYPE_OPTIONS = {
  All: 'All',
  Videos: 'Videos',
  Photos: 'Photos'
};
/**
 * Shape of the param arg for the `getPhotos` function.
 */

/**
 * `CameraRoll` provides access to the local camera roll or photo library.
 *
 * See https://facebook.github.io/react-native/docs/cameraroll.html
 */
class CameraRoll {
  /**
   * On iOS: requests deletion of a set of photos from the camera roll.
   * On Android: Deletes a set of photos from the camera roll.
   *
   */
  static deletePhotos(photoUris) {
    return _NativeCameraRollModule.default.deletePhotos(photoUris);
  }
  /**
   * Saves the photo or video to the camera roll or photo library.
   *
   */


  static save(tag) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let {
      type = 'auto'
    } = options;
    const {
      album = ''
    } = options;
    if (tag === '') throw new Error('tag must be a valid string');

    if (type === 'auto') {
      const fileExtension = tag.split('.').slice(-1)[0] ?? '';
      if (['mov', 'mp4'].indexOf(fileExtension.toLowerCase()) >= 0) type = 'video';else type = 'photo';
    }

    return _NativeCameraRollModule.default.saveToCameraRoll(tag, {
      type,
      album
    });
  }

  static saveToCameraRoll(tag, type) {
    console.warn('CameraRoll.saveToCameraRoll(tag, type) is deprecated.  Use the save function instead');
    return CameraRoll.save(tag, {
      type
    });
  }

  static getAlbums() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      assetType: 'All'
    };
    return _NativeCameraRollModule.default.getAlbums(params);
  }

  static getParamsWithDefaults(params) {
    const newParams = { ...params
    };
    if (newParams.assetType === undefined) newParams.assetType = 'All';
    if (newParams.groupTypes === undefined && _reactNative.Platform.OS !== 'android') newParams.groupTypes = 'All';
    return newParams;
  }
  /**
   * Returns a Promise with photo identifier objects from the local camera
   * roll of the device matching shape defined by `getPhotosReturnChecker`.
   *
   * See https://facebook.github.io/react-native/docs/cameraroll.html#getphotos
   */


  static getPhotos(params) {
    params = CameraRoll.getParamsWithDefaults(params);
    return _NativeCameraRollModule.default.getPhotos(params);
  }
  /**
   * Returns a Promise with photo internal path.
   * if conversion is requested from HEIC then temporary file is created.
   *
   * @param internalID - PH photo internal ID.
   * @param options - photo conversion options.
   * @returns Promise<PhotoIdentifier>
   */


  static iosGetImageDataById(internalID) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const conversionOptions = {
      convertHeicImages: false,
      ...options
    };
    return _NativeCameraRollModule.default.getPhotoByInternalID(internalID, conversionOptions);
  }
  /**
  * Returns a Promise with thumbnail photo.
  *
  * @param internalID - PH photo internal ID.
  * @param options - thumbnail photo options.
  * @returns Promise<PhotoThumbnail>
  */


  static getPhotoThumbnail(internalID, options) {
    return _NativeCameraRollModule.default.getPhotoThumbnail(internalID, options);
  }

}

exports.CameraRoll = CameraRoll;

_defineProperty(CameraRoll, "GroupTypesOptions", GROUP_TYPES_OPTIONS);

_defineProperty(CameraRoll, "AssetTypeOptions", ASSET_TYPE_OPTIONS);

_defineProperty(CameraRoll, "AlbumTypeOptions", ALBUM_TYPE_OPTIONS);
//# sourceMappingURL=CameraRoll.js.map