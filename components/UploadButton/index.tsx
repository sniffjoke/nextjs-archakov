import React from "react";
import {Button, notification, Upload, UploadFile} from "antd";
import {CloudOutlined} from "@ant-design/icons";
import styles from "@/styles/Home.module.scss"
import * as Api from "@/api"


export const UploadButton: React.FC = () => {
    const [fileList, setFileList] = React.useState<UploadFile[]>([])

    const onUploadSuccess = async (options) => {
        try {
            const file = await Api.files.uploadFile(options)

            setFileList([])
        } catch (err) {
            notification.error({
                message: 'Ошибка!',
                description: "Не удалось загрузить файл",
                duration: 2
            })
        }
    }

    return (
        <Upload
            customRequest={onUploadSuccess}
            fileList={fileList}
            onChange={({fileList}) => setFileList(fileList)}
            className={styles.upload}
        >
            <Button type={"primary"} icon={<CloudOutlined />} size={"large"}>
                Загрузить файл
            </Button>
        </Upload>
    )
}
