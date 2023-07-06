// import dom element
import {hamburger,closeIcon, sideBar} from './htmlDomElement'

export const hamburgerBtn=  hamburger.addEventListener('click', () =>{
    sideBar.classList.add('show')
})

export const closeIconBtn =closeIcon.addEventListener('click', () =>{
    sideBar.classList.remove('show')
})
