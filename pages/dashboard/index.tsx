import React from "react";
import {GetServerSidePropsContext, NextPage} from "next";
import {checkAuth} from "@/utils/checkAuth";
import {Layout} from "@/layouts/Layout";

import * as Api from "@/api"
import {FileItem} from "@/api/dto/files.dto";
import {FileList} from "@/components/FileList";
import DashboardLayout from "@/layouts/DashboardLayout";
import {FileActions} from "@/components/FileActions";

interface Props {
    items: FileItem[]
}


const DashboardPage: NextPage<Props> = ({items}) => {

    return (
        <DashboardLayout>
            <FileActions isActive/>
            <FileList items={items} />
        </DashboardLayout>
    )
}

// @ts-ignore
DashboardPage.getLayout = (page: React.ReactNode) => {
    return <Layout title={'Dashboard / Главная'}>{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const authProps = await checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }

    try {
        const items = await Api.files.getAll()

        return {
            props: {
                items
            }
        }
    } catch (err) {
        console.log(err)
        return {
            props: {files: []}
        }
    }
}

export default DashboardPage
