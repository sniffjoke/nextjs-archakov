import React from "react";
import {Avatar, Button, Layout, Menu, Popover} from "antd";
import {inspect} from "util";
import styles from "./Header.module.scss"
import {CloudOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";


export const Header: React.FC = () => {
    const router = useRouter()
    const selectedMenu = router.pathname

    return (
        <Layout.Header className={styles.root}>
            <div className={styles.headerInner}>
                <div className={styles.headerLeft}>
                    <h2>
                        <CloudOutlined/>
                        Cloud Storage
                    </h2>
                    <Menu
                        className={styles.topMenu}
                        theme={'dark'}
                        mode={'horizontal'}
                        defaultSelectedKeys={[selectedMenu]}
                        onSelect={({key}) => router.push(key)}
                        items={[
                            {key: "/dashboard", label: "Главная"},
                            {key: "/dashboard/profile", label: "Профиль"}
                        ]}
                    />

                </div>

                <div className={styles.headerRight}>
                    <Popover
                        trigger={'click'}
                        content={
                            <Button type={'primary'} danger>
                                Выйти
                            </Button>
                        }
                    >
                        <Avatar>A</Avatar>
                    </Popover>
                </div>
            </div>
        </Layout.Header>
    )
}
