document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById("menu-btn")
    const menuIcon = document.getElementById("menu-icon")
    const menuLinks = document.getElementById("menu-links")

    if(menuBtn && menuIcon && menuLinks) {
        menuBtn.addEventListener('click' , () => {
            menuLinks.classList.toggle('hidden')
            menuLinks.classList.toggle('flex')

            if(menuLinks.classList.contains('hidden')){
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16')
            }else {
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12')
            }
        })

        const individualLink = menuLinks.querySelectorAll('a')
        individualLink.forEach(link => {
            link.addEventListener('click', () => {
                if(window.innerWidth < 786){
                    menuLinks.classList.add('hidden')
                    menuLinks.classList.remove('flex')
                    menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16')
                }
            })
        })
    }
})