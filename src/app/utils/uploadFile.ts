import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {storage} from '../../../firebase';

const uploadFile = async (file: File, path: string) => {
    if (!file) return;

    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
}

export default uploadFile;