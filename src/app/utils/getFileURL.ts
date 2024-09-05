import {ref, getDownloadURL} from 'firebase/storage';
import {storage} from '../../../firebase';

const getFileUrl = async (filePath) => {
    const storageRef = ref(storage, filePath);
    return await getDownloadURL(storageRef);
};

export default getFileUrl;