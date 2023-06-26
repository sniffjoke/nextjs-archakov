import axios from "@/core/axios";
import {FileItem} from "@/api/dto/files.dto";

type FileType = 'all' | 'photos' | 'trash'

export const getAll = async (type: FileType = 'all'): Promise<FileItem[]> => {
    console.log(type)
    return (await axios.get('files?type=' + type)).data
}

export const remove = (ids: number[]): Promise<void> => {
    return axios.delete("/files?id=" + ids)
}

export const uploadFile = async (options: any) => {
    const {onSuccess, onError, file, onProgress} = options

    const formData = new FormData()
    formData.append('file', file)

    const config = {
        headers: {'Content-Type': 'multipart/form-data'},
        onProgress: (event: ProgressEvent) => {
            onProgress({percent: (event.loaded / event.total) * 100})
        }
    }

    try {

        const {data} = await axios.post('files', formData, config)

        onSuccess()

    } catch (err) {
        onError({err})
    }
}
