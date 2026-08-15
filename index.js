gsap.registerPlugin(ScrollTrigger);

const baseURL = "https://api.counterapi.dev/v2"
const siteID = "rubrics-in"
const lastUpdated = document.getElementById('last-updated')

document.addEventListener('DOMContentLoaded', () => {

    // Hamburger icon
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
    // GSAP
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'))
        let countObject = { val: 0 }

        gsap.to(countObject, {
            val: target,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counter,
                scroller: "body",
                start: "top 90%",
                once: true
            },

            onUpdate: () => {
                counter.textContent = Math.floor(countObject.val)
            }
        } )
    })

    // Visitor Counter
    fetch(`${baseURL}/${siteID}/up`)
        .then(res => res.json())
        .then(data => {
            const countEl = document.getElementById('visitor-count')
            const count = data.count || data.value || data.data?.count

            if (countEl && count !== undefined){
                countEl.setAttribute('data-target', count)
                animateVisitorCount(countEl, count)
            }
        })
        .catch (err => console.log("Error fetching count:", err))

    
    function animateVisitorCount(element, target) {
        let countObject = { val: 0}

        gsap.to(countObject, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                element.textContent = Math.floor(countObject.val)
            }
        })
    }

    // Last Update
    if(lastUpdated) {
        const lastModifiedDate = new Date(document.lastModified)

        const formattedDate = lastModifiedDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })

        const formattedTime = lastModifiedDate.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })

        lastUpdated.textContent = `${formattedDate} at ${formattedTime}`
    }
}) 