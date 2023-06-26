import React from "react";
import {GetServerSidePropsContext, NextPage} from "next";
import {checkAuth} from "@/utils/checkAuth";
import {Layout} from "@/layouts/Layout";
import {useRouter} from "next/router";

import * as Api from "@/api"
import {FileItem} from "@/api/dto/files.dto";
import {FileList} from "@/components/FileList";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Files} from "@/modules/Files";

interface Props {
    items: FileItem[]
}


const DashboardPhotos: NextPage<Props> = ({items}) => {
    const router = useRouter()
    const selectedMenu = router.pathname

    return (
        <DashboardLayout>
            <Files items={items}/>
        </DashboardLayout>
    )
}

// @ts-ignore
DashboardPhotos.getLayout = (page: React.ReactNode) => {
    return <Layout title={'Dashboard / Фотографии'}>{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const authProps = await checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }

    try {
        const items = await Api.files.getAll('photos')

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

export default DashboardPhotos
