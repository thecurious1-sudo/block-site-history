import { getListFromLocal, NO_OF_URLS_TO_DELETE } from "./utils.js"

chrome.tabs.onUpdated.addListener(async(tabId, changeInfo, tab) => {
    if (changeInfo.status === "loading") {
    const listOfUrls=await getListFromLocal();
    listOfUrls.forEach(async(eachURL)=>{
        if(tab.url.includes(eachURL)){
            chrome.history.search({ text: tab.url, maxResults: 5 }, (results) => {
                if (results.length === 0) {
                  return;
                }
                let deletedCount = 0;
                results.forEach((item) => {
                  chrome.history.deleteUrl({ url: item.url }, () => {
                    deletedCount++;
                    if (deletedCount === results.length) {
                      console.log("Deleted all!")
                    }
                  });
                });
              });
        }
    })
    }
  });
  