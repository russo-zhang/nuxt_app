import request from "~/utils/request";
export type Hotspot = {
    title: string;
    summary: string;
    link: string;
    img_link: string;
    sort: number;
    source: string;
};
export type HotspotMapItem = {
    title: string;
    data: Hotspot[];
};
export type HotspotListMap = {
    [key: string]: HotspotMapItem;
};
export const useHome = async () => {
    const hotspotListMap = reactive<HotspotListMap>({
        baidu: {
            title: "百度热搜",
            data: [],
        },
        zhihu: {
            title: "知乎热搜",
            data: [],
        },
        sougou: {
            title: "搜狗热搜",
            data: [],
        },
        so360: {
            title: "360热搜",
            data: [],
        },
    });
    const reqBody = {
        title: "",
        link: "",
        source: "",
        date: 0,
        limit: 200,
        skip: 0,
    };
    const res = await request("/client/last", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: reqBody,
    });
    try {
        for (const key in res.data) {
            const item: Hotspot[] | null = res.data[key];
            if (item && item.length > 0) {
                hotspotListMap[key].data = item.sort((a, b) => {
                    return a.sort - b.sort;
                });
            }
        }
    } catch (error) {
        console.log("catch error", error);
    }

    return {
        hotspotListMap,
        getFirstWord(str: string) {
            if (!str) return "";
            return str.substr(0, 1);
        },
    };
};
