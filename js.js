const saturate = document.getElementById("saturate")
const contrast = document.getElementById("contrast")
const brightness = document.getElementById("brightness")
const sepia = document.getElementById("sepia")
const grayscale = document.getElementById("grayscale")
const blur = document.getElementById("blur")
const HueRotate = document.getElementById("hue-rotate")


const upload = document.getElementById("upload")
const download = document.getElementById("download")
const img = document.getElementById("img")

const reset = document.getElementById("reset")
const imgBox = document.querySelector(".img-box")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext(`2d` , )




// لمسح قيم الفلاتر اللي معموله علي الصوره اللي كانت قبل كدا
function resetValue() {
  img.style.filter = "none"
  saturate.value = "100"
  contrast.value = "100"
  brightness.value = "100"
  sepia.value = "0"
  grayscale.value = "0"
  blur.value = "0"
  HueRotate.value = "0"
}


window.onload = function () {
  download.style.display = "none" 
  reset.style.display = "none" 
  imgBox.style.display = "none"
}

upload.onchange = function () {
  resetValue()
  download.style.display = "block" 
  reset.style.display = "block" 
  imgBox.style.display = "block"

         //1- Read Img
                // بيقرا الملفات FileReader
  let file = new FileReader();
                // readAsDataURL هيقرا الملفات من خلال 
                // upload هيتعامل معامله array 
                // [0] الصوره اللي اخترتها
  file.readAsDataURL(upload.files[0])
  
  file.onload = function () {
    img.src = file.result;
  }
  img.onload = function () {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img , 0 , 0 , canvas.width , canvas.height)
    img.style.display = "none"
  }
}


             // 2-  هنعمل الفلاتر
// هنعمول لوب علي الفلاتر كلها
let filters = document.querySelectorAll("ul li input")  

filters.forEach(item => {
  item.addEventListener("input" , () => {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${HueRotate.value}deg)
    `
    ctx.drawImage(img , 0 , 0 , canvas.width , canvas.height)
  })
})


// 3- reset 

reset.addEventListener("click" , () => {
  resetValue()
})

// 4- Download

download.addEventListener("click" , () => {
  download.href = canvas.toDataURL()
})