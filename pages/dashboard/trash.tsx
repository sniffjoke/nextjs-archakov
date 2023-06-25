import React from "react";
import {GetServerSidePropsContext, NextPage} from "next";
import {checkAuth} from "@/utils/checkAuth";
import {Layout} from "@/layouts/Layout";

import * as Api from "@/api"
import {FileItem} from "@/api/dto/files.dto";
import {FileList} from "@/components/FileList";
import DashboardLayout from "@/layouts/DashboardLayout";

interface Props {
    items: FileItem[]
}


const DashboardTrash: NextPage<Props> = ({items}) => {

    return (
        <DashboardLayout>
            <FileList items={items} />
        </DashboardLayout>
    )
}

// @ts-ignore
DashboardTrash.getLayout = (page: React.ReactNode) => {
    return <Layout title={'Dashboard / Корзина'}>{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const authProps = await checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }

    try {
        const items = await Api.files.getAll('trash')

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

export default DashboardTrash