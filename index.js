const accesskey = "G6kU2wm6RxhcU0yunN4Hdb4h1m27c4cZpqqrjV_HDNs"

const form = document.querySelector("form")
const input = document.querySelector(".input")
const searchimage = document.querySelector(".search-results")
const showmore = document.querySelector(".show-more")
const showmorebutton = document.querySelector("#show-more")
// const btn = document.querySelector(".btn")


let inputdata = ""
let page = 1

async function searchimages(){
    inputdata = input.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`
    

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results
    console.log(results);
    
    if(page===1){
        searchimage.innerHTML = ""

    }
    results.map((result) =>{
        const imagewrapper = document.createElement('div')
        imagewrapper.classList.add("search-result")
        const image = document.createElement('img')  
        image.src = result.urls.small;
        // console.log(image.src);
        
        // image.alt = result.slug || result.src_description;
        image.alt = result.alt_description || result.description || 'Image';

        // console.log(image.alt);
        
        const imagelink = document.createElement('a')
        imagelink.href = result.links.html

        imagelink.target = "_blank"
        
        imagelink.appendChild(image); //push the img tag in iamgewrapper

        imagewrapper.appendChild(imagelink); // push the anchor tag in imagewrapper

        searchimage.appendChild(imagewrapper);// push the div tag in imagewrapper
    })
    page++
    if(page>1)
        {
            showmore.style.display = "block"
        }
}

form.addEventListener("submit",(e) =>{
    e.preventDefault()
    page = 1
    searchimages()
})

showmorebutton.addEventListener("click",() =>{
    searchimages()
})

