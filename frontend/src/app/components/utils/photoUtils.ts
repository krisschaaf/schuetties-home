import { Photo } from "src/app/model/car";

export abstract class PhotoUtils {
    static getPhotoSrc(photo: Photo): string {
        if(!photo) {
          throw Error('Currently no photo uploaded!')
        } else {
          return `data:${photo.type};base64,${photo.data}`;
        }
    }
}