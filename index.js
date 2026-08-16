gsap.registerPlugin(ScrollTrigger);

const baseURL = "https://api.counterapi.dev/v2/rubrics-softcon-pvt-ltds-team-5108/first-visitors/up"


document.addEventListener('DOMContentLoaded', () => {

    const countEl = document.getElementById('visitor-count')
    const lastUpdated = document.getElementById('last-updated')

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
                if(window.innerWidth < 768){
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

    if(countEl){
        let apiTargetCount = null
        let hasScrolledToFooter = false
        let hasAnimated = false

    function animateVisitorCount(finalValue) {
        if(hasAnimated) return
        hasAnimated = true

        let countObject = { val: 0 }
        gsap.to(countObject, {
            val: finalValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                countEl.textContent = Math.floor(countObject.val)
            }
        })
    }

    ScrollTrigger.create({
        trigger: countEl,
        scroller: 'body',
        start: 'top 90%',
        once: true,
        onEnter: () => {
            hasScrolledToFooter = true;
            if(apiTargetCount !== null){
                animateVisitorCount(apiTargetCount)
            }
        }
    })

    // Visitor Counter
    fetch(`${baseURL}?t=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
            console.log("CounterAPI Response: ", data)
            const count = data.data?.up_count ?? data.data?.count ?? data.data?.value ?? data.up_count;

            if (count !== undefined && count !== null){
                apiTargetCount = Number(count)
                
                if(hasScrolledToFooter){
                    animateVisitorCount(apiTargetCount)
                }
            }
        })
        .catch (err => console.log("Error fetching count:", err))
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