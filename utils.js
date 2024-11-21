export const LOCAL_STORAGE_KEY="urls"
export const NO_OF_URLS_TO_DELETE=1
export const getListFromLocal=async()=>{
    const res=await chrome.storage.local.get([LOCAL_STORAGE_KEY])
    const oldUrls=res[LOCAL_STORAGE_KEY]||[]
    return oldUrls
}
