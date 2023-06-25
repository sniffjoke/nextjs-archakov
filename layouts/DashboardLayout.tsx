import React from "react";
import styles from './../styles/Home.module.scss'
import {NextPage} from "next";
import {useRouter} from "next/router";
import {UploadButton} from "@/components/UploadButton";
import {Menu} from "antd";
import {DeleteOutlined, FileImageOutlined, FileOutlined} from "@ant-design/icons";
import {FileList} from "@/components/FileList";

const DashboardLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    const router = useRouter()
    const selectedMenu = router.pathname

    return (
        <main className={styles.dashboardContainer}>
            <div className={styles.sidebar}>
                <UploadButton />
                <Menu
                    className={styles.menu}
                    mode={'inline'}
                    selectedKeys={[selectedMenu]}
                    items={[
                        {
                            key: '/dashboard',
                            icon: <FileOutlined />,
                            label: `Файлы`,
                            onClick: () => router.push('/dashboard')
                        },
                        {
                            key: '/dashboard/photos',
                            icon: <FileImageOutlined />,
                            label: `Фото`,
                            onClick: () => router.push('/dashboard/photos')
                        },
                        {
                            key: '/dashboard/trash',
                            icon: <DeleteOutlined />,
                            label: `Корзина`,
                            onClick: () => router.push('/dashboard/trash')
                        }
                    ]}
                />
            </div>
            <div className={'container'}>
                {/*<FileList items={items} />*/}
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout
