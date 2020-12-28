import Vue from 'vue'

const animateOnScrollObserver = new IntersectionObserver(
  (entries, animateOnScrollObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let childrenSpan = entry.target.parentElement.firstChild.children
        childrenSpan.forEach((span,index) => {
          span.classList.add(`animateBar${index + 1}`)
        })
        animateOnScrollObserver.unobserve(entry.target)
      }
    })
  }
)

Vue.directive('animate-on-scroll', {
  bind: el => {
    animateOnScrollObserver.observe(el)
  }
})
