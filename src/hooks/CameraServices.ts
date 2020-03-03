import {useEffect, useState} from 'react';
import {isPlatform} from '@ionic/react';
import {CameraPhoto, CameraResultType, CameraSource, Capacitor, FilesystemDirectory} from "@capacitor/core";
import {useCamera} from '@ionic/react-hooks/camera';
import {useFilesystem, base64FromPath} from '@ionic/react-hooks/filesystem';
import {useStorage} from '@ionic/react-hooks/storage';
import {defineCustomElements} from '@ionic/pwa-elements/loader';
import {Photo} from "../interface/Photo";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const {getPhoto} = useCamera();
    const {getUri, readFile, writeFile} = useFilesystem();
    const {get, set} = useStorage();

    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        const newPhotos = [savedFileImage, ...photos];
        setPhotos(newPhotos);

        set(PHOTO_STORAGE,
            isPlatform('hybrid')
                ? JSON.stringify(newPhotos)
                : JSON.stringify(newPhotos.map(p => {
                    // Don't save the base64 representation of the photo data,
                    // since it's already saved on the Filesystem
                    const photoCopy = {...p};
                    delete photoCopy.base64;
                    return photoCopy;
                })));
    };
    //
    // useEffect(() => {
    //     const loadSaved = async () => {
    //         const photosString = await get('photos');
    //         const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];
    //         for (let photo of photos) {
    //             const file = await readFile({
    //                 path: photo.filepath,
    //                 directory: FilesystemDirectory.Data
    //             });
    //             photo.base64 = `data:image/jpeg;base64,${file ? file.data : ''}`;
    //         }
    //         setPhotos(photos);
    //     };
    //     loadSaved();
    // }, [get, readFile]);

    const savePicture = async (photo: CameraPhoto, fileName: string) => {
        let base64Data: string;
        // "hybrid" will detect Cordova or Capacitor;
        if (isPlatform('hybrid')) {
            const file = await readFile({
                path: photo.path!
            });
            base64Data = file.data;
        } else {
            base64Data = await base64FromPath(photo.webPath!);
        }
        await writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        });
        return getPhotoFile(photo, fileName);
    };

    const getPhotoFile = async (cameraPhoto: CameraPhoto, fileName: string): Promise<Photo> => {
        if (isPlatform('hybrid')) {
            // Get the new, complete filepath of the photo saved on filesystem
            const fileUri = await getUri({
                directory: FilesystemDirectory.Data,
                path: fileName
            });

            // Display the new image by rewriting the 'file://' path to HTTP
            // Details: https://ionicframework.com/docs/building/webview#file-protocol
            return {
                filepath: fileUri.uri,
                webviewPath: Capacitor.convertFileSrc(fileUri.uri),
            };
        } else {
            // Use webPath to display the new image instead of base64 since it's
            // already loaded into memory
            return {
                filepath: fileName,
                webviewPath: cameraPhoto.webPath
            };
        }
    };

    return {
        takePhoto,
        photos
    };
}