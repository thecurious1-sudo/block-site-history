import { getListFromLocal, LOCAL_STORAGE_KEY } from "./utils.js"
window.onload=async()=>{
    const populateList=(urls)=>{
        listElement.innerHTML=''
        urls.map((each,ind)=>{
            const li=document.createElement("li")
            const txt=document.createTextNode(each)
            const delButton=document.createElement("button")
            delButton.textContent="Delete"
            delButton.addEventListener('click',async()=>{
                const filteredUrls = urls.filter((_, index) => index !== ind);
                await chrome.storage.local.set({[LOCAL_STORAGE_KEY]:filteredUrls})
            })
            li.appendChild(txt)
            li.append(delButton)
            listElement.appendChild(li)
        })
    }
    const addWebsiteToList=async(url)=>{
        const data={};
        const oldUrls=await getListFromLocal()
        if(oldUrls.includes(url))
            return
        data[LOCAL_STORAGE_KEY]=[...oldUrls,url]
        await chrome.storage.local.set(data);
    }
    const listElement=document.getElementById("list-urls")
    const oldUrls=await getListFromLocal()
    populateList(oldUrls)
    document.getElementById("submit-button").addEventListener('click',async()=>{
        const inputURL=document.getElementById("input-url").value.trim()
        addWebsiteToList(inputURL)
    });
    document.getElementById("add-current-website").addEventListener('click',async()=>{
        const oldUrls=await getListFromLocal();
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            const url=new URL(tabs[0].url)
            addWebsiteToList(url.hostname)
        });
    })
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            if(key===LOCAL_STORAGE_KEY)
            {
                populateList(newValue)
            }
        }
      });
}