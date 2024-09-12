var createCounter = function (init) {
  let count = init
  return {
    increment() {
      return count + 1
    },
    decrement() {
      return count - 1
    },
    reset() {
      return init
    },
  }
}

const counter = createCounter(5)
console.log(counter.increment())
console.log(counter.decrement())
console.log(counter.reset())

console.log(expect(5).toBe(5))
console.log(expect(5).notToBe(5))

let products = [
  {
    title: 'Crysis 3',
    price: 60,
  },
  {
    title: 'BF4',
    price: 20,
  },
  {
    title: 'RE4 Remake',
    price: 35,
  },
]

const idx = products.findIndex(({ title }) => title === 'RE4 Remake')
products[idx].price += 100

products = [
  ...products,
  {
    title: 'Bafo',
    price: 250,
  },
]

const { title, price } = products[0]

const newObj = {
  titles: '1322332',
  price: 150,
  inStock: true,
  married: true,
  genre: 'FPS',
}

let { titles, inStock } = newObj

titles = '12345'
inStock = false

console.log(newObj)

gsap.registerPlugin(ScrollTrigger)
$(document).ready(function () {
  $(window).on('load', function () {
    setTimeout(function () {
      $('.preloader').addClass('loaded')
      $(
        '.round, .scrollDown, header, .section:first-child .section__inner__left'
      ).addClass('loaded')
      $('.card--one, .card--two').addClass('active')
    }, 1500)
    setTimeout(function () {
      $('.card--one, .card--two').addClass('loaded')
      $('.cardText').addClass('pageLoaded')
    }, 2100)
  })
  $('.contentSection--faq__item').first().addClass('active')
  $('.contentSection--faq__item__hidden').first().stop().slideDown()
  $('.contentSection--faq__item h4').on('click', function () {
    $('.contentSection--faq__item__hidden').stop().slideUp()
    $('.contentSection--faq__item').removeClass('active')
    if ($(this).next().is(':visible')) {
      $(this).next().stop().slideUp()
      $(this).parent().removeClass('active')
    } else {
      $(this).next().stop().slideToggle()
      $(this).parent().toggleClass('active')
    }
  })

  $('.menu--item').on('click', function (evt) {
    evt.preventDefault()
    $('body').stop().toggleClass('menuOpened')
    $('.overlay').stop().fadeToggle()
    $('.mobileMenu__popup').stop().slideToggle()
    if ($(this).find('span').hasClass('icon-menu')) {
      $(this)
        .find('span')
        .removeClass('icon-menu')
        .addClass('icon-burger-close')
    } else {
      $(this)
        .find('span')
        .removeClass('icon-burger-close')
        .addClass('icon-menu')
    }
  })
  $('.overlay').on('click', function () {
    $('body').stop().removeClass('menuOpened')
    $('.overlay').stop().fadeOut()
    $('.mobileMenu__popup').stop().slideUp()
    $('.menu--item span').removeClass('icon-burger-close').addClass('icon-menu')
  })
  $('.next--dropdown').on('click', function () {
    $(this).toggleClass('active')
    $(this).next().stop().slideToggle()
  })

  function fullpageInit() {
    $('#fullpage').fullpage({
      normalScrollElements: '.contentSection',
      afterRender: function () {
        $('.scrollDown__btn').on('click', function () {
          $.fn.fullpage.moveSectionDown()
        })
      },
      onLeave: function (
        anchorLink,
        index,
        slideIndex,
        direction,
        nextSlideIndex
      ) {
        if (index === 1) {
          $('.card--one, .card--two').addClass('loaded').removeClass('loaded2')
          $('.iphoneWrapper').removeClass('active')
          $('.cardText').removeClass('fixed').addClass('loaded pageLoaded')
        }
        if (index === 2) {
          $('.card--one, .card--two')
            .removeClass('active loaded centered')
            .addClass('loaded2')
          $('.iphoneWrapper').addClass('active').removeClass('toTop')
          $('.iphoneWrapper__text, .iphoneWrapper span').removeClass('active')
          let iphoneWrapperLeft = $('.iphoneWrapper').width() / 2 - 127
          $('.cardText')
            .css('right', iphoneWrapperLeft + 'px')
            .addClass('fixed')
            .removeClass('loaded hidden pageLoaded')
        }
        if (index === 3) {
          $('.cardText').addClass('hidden')
          $('.iphoneWrapper').removeClass('active loaded2').addClass('toTop')
          $('.iphoneWrapper__text, .iphoneWrapper span').removeClass('active')
          $('.card--one, .card--two')
            .removeClass('loaded2 loaded3')
            .addClass('centered')
          $('.card--one').css(
            'right',
            $(window).width() / 2 - $('.card--one').width() / 2 + 'px'
          )
          $('.card--two').css(
            'right',
            $(window).width() / 2 - $('.card--one').width() / 2 + 'px'
          )
          $(window).on('resize', function () {
            $('.card--one').css(
              'right',
              $(window).width() / 2 - $('.card--one').width() / 2 + 'px'
            )
            $('.card--two').css(
              'right',
              $(window).width() / 2 - $('.card--one').width() / 2 + 'px'
            )
          })
        }
        if (index === 4) {
          $('.card--one, .card--two').addClass('loaded3')
          $('.iphoneWrapper').addClass('loaded2').removeClass('toTop rotated')
          $('.iphoneWrapper__text, .iphoneWrapper span').addClass('active')
        }
        if (index === 5) {
          $('.iphoneWrapper')
            .removeClass('loaded2 toTop moreLeft')
            .addClass('rotated')
          $('.iphoneWrapper__text, .iphoneWrapper span').addClass('active')
          $('.androidPhone').removeClass('active')
        }
        if (index === 6) {
          $('.iphoneWrapper')
            .removeClass('rotated toTop')
            .addClass('loaded2 moreLeft')
          $('.androidPhone').addClass('active')
          $('.iphoneWrapper__text, .iphoneWrapper span').removeClass('active')
          $('html, body').removeClass('normalScroll')
          $('.scrollDown').fadeIn()
          $('.contentSection__inner').height('auto')
        }
        if (index > 6) {
          $('.iphoneWrapper').removeClass('loaded2')
          $('.androidPhone').removeClass('active')
          $('.scrollDown').fadeOut()
          $('.contentSection__inner').height(
            $('.contentSection__inner').outerHeight()
          )
        }
      },
    })
  }

  if ($(window).width() > 1200) {
    fullpageInit()
  } else {
    if ($('.fp-enabled').length) {
      $.fn.fullpage.destroy('all')
    }
    let windowScrollHeight = document.documentElement.scrollHeight
    $('.animatedWrapper').height(windowScrollHeight)
    $('.iphoneWrapper').css(
      'top',
      $('.section:nth-child(2)').offset().top +
        $('.section:nth-child(2)').outerHeight() +
        'px'
    )
    $('.androidPhone').css(
      'top',
      $('.section:nth-child(6)').offset().top +
        $('.section:nth-child(6)').height() +
        60 +
        'px'
    )
    $(window).on('load', function () {
      setTimeout(function () {
        let iphoneElement = $('.iphoneWrapper')
        var clone = iphoneElement.clone()
        clone
          .attr('id', 'iphoneWrapper-2')
          .css(
            'top',
            $('.section:nth-child(4)').offset().top +
              $('.section:nth-child(4)').height() +
              60 +
              'px'
          )
        $('.animatedWrapper').after(clone)
        let clone2 = $('#iphoneWrapper-2 img').clone()
        clone2.addClass('iphoneClone')
        $('.androidPhone img').after(clone2)
        gsap.fromTo(
          '.card--one',
          {
            y: $('#iphoneWrapper-1').offset().top + 60,
            rotation: -90,
            x: $(window).width() / 2 - $('.card--two').width() / 2,
          },
          {
            y:
              $('.section__cards').offset().top +
              $('.section__cards').outerHeight() / 2,
            rotation: 15,
            x: $(window).width() / 2 - $('.card--two').width() / 2,
            scrollTrigger: {
              paused: true,
              trigger: $('#iphoneWrapper-1'),
              start: 'top top',
              end: $('.section__cards').offset().top,
              scrub: 0.5,
            },
          }
        )
        gsap.fromTo(
          '.card--one',
          {
            y: 530,
            rotation: 15,
            x: 35,
          },
          {
            y: $('#iphoneWrapper-1').offset().top + 60,
            rotation: -90,
            x: $(window).width() / 2 - $('.card--two').width() / 2,
            scrollTrigger: {
              trigger: $('.card--one'),
              start: $('.card--one').offset().top,
              end: $('.section').eq(1).offset().top,
              scrub: 0.5,
            },
          }
        )
        gsap.fromTo(
          '.card--two',
          {
            y: $('#iphoneWrapper-1').offset().top + 15,
            rotation: -90,
            x: $(window).width() / 2 - $('.card--two').width() / 2,
          },
          {
            y:
              $('.section__cards').offset().top +
              $('.section__cards').outerHeight() / 2 -
              200,
            rotation: -15,
            x: $(window).width() / 2 - $('.card--two').width() / 2 + 90,
            scale: 1,
            scrollTrigger: {
              trigger: $('#iphoneWrapper-1'),
              start: 'top top',
              end: $('.section__cards').offset().top,
              scrub: 0.5,
            },
          }
        )
        gsap.fromTo(
          '.card--two',
          {
            y: 330,
            rotation: -15,
            x: 85,
            scale: 1,
          },
          {
            y: $('#iphoneWrapper-1').offset().top + 15,
            rotation: -90,
            x: $(window).width() / 2 - $('.card--two').width() / 2,
            scale: 0.85,
            scrollTrigger: {
              trigger: $('.card--two'),
              start: $('.card--one').offset().top - 50,
              end: $('.section').eq(1).offset().top,
              scrub: 0.5,
            },
          }
        )
        gsap.fromTo(
          '.section:nth-child(2) .section__inner',
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: $('.section:nth-child(2)'),
              start: 'top +=100px',
              end: '+=200px',
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '.section__cards__part:nth-child(1)',
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: $('#iphoneWrapper-1'),
              start:
                $('#iphoneWrapper-1').offset().top +
                $('#iphoneWrapper-1').outerHeight() -
                200,
              end:
                $('#iphoneWrapper-1').offset().top +
                $('#iphoneWrapper-1').outerHeight() +
                100,
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '.section__cards__part:nth-child(2)',
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: $('#iphoneWrapper-1'),
              start:
                $('#iphoneWrapper-1').offset().top +
                $('#iphoneWrapper-1').outerHeight() -
                200,
              end:
                $('#iphoneWrapper-1').offset().top +
                $('#iphoneWrapper-1').outerHeight() +
                100,
              scrub: 0.5,
            },
          }
        )
        gsap.fromTo(
          '.cardText--transactions',
          {
            y: 350,
            x: 12,
            width: 190,
          },
          {
            y:
              $('#iphoneWrapper-1').offset().top +
              $('#iphoneWrapper-1').outerHeight() -
              232,
            x: $(window).width() / 2 - 103,
            width: 210,
            scrollTrigger: {
              trigger: $('.card--two'),
              start: 300,
              end: $('#iphoneWrapper-1').offset().top,
              scrub: 0.5,
            },
          }
        )
        gsap.fromTo(
          '.cardText--refresh',
          {
            y: 640,
            x: 0,
            width: 204,
          },
          {
            y:
              $('#iphoneWrapper-1').offset().top +
              $('#iphoneWrapper-1').outerHeight() -
              100,
            x: $(window).width() / 2 - 103,
            width: 210,
            scrollTrigger: {
              trigger: $('.card--two'),
              start: 300,
              end: $('#iphoneWrapper-1').offset().top,
              scrub: 0.5,
            },
          }
        )
        gsap.fromTo(
          '.cardText--transfers',
          {
            y: 490,
            x: 190,
            width: 194,
          },
          {
            y:
              $('#iphoneWrapper-1').offset().top +
              $('#iphoneWrapper-1').outerHeight() -
              165,
            x: $(window).width() / 2 - 103,
            width: 210,
            scrollTrigger: {
              trigger: $('.card--two'),
              start: 300,
              end: $('#iphoneWrapper-1').offset().top,
              scrub: 0.5,
            },
          }
        )
        gsap.fromTo(
          '.section:nth-child(4) .section__inner',
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: $('.section:nth-child(4)'),
              start: 'top +=200px',
              end: '+=200px',
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '.section:nth-child(5) .section__inner',
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: $('.section:nth-child(5)'),
              start: 'top +=250px',
              end: '+=200px',
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '.section:nth-child(6) .section__inner',
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: $('.section:nth-child(6)'),
              start: 'top +=250px',
              end: '+=200px',
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '.text--first',
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: $('.section:nth-child(6)'),
              start: 'top +=200px',
              end: '+=200px',
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '.text--first',
          {
            opacity: 0,
            margin: '0 0 0 -150px',
          },
          {
            opacity: 1,
            margin: '0 0 0 -60px',
            scrollTrigger: {
              trigger: $('.section:nth-child(4)'),
              start: 'top top',
              end: '+=200px',
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '.text--last',
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: $('.section:nth-child(6)'),
              start: 'top +=200px',
              end: '+=200px',
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '.text--last',
          {
            opacity: 0,
            margin: '0 0 0 150px',
          },
          {
            opacity: 1,
            margin: '0 0 0 70px',
            scrollTrigger: {
              trigger: $('.section:nth-child(4)'),
              start: 'top top',
              end: '+=200px',
              scrub: true,
            },
          }
        )
        // gsap.fromTo('#iphoneWrapper-2 img', {
        //     rotation:45,
        //     scale:1,
        // }, {
        //     rotation:0,
        //     scale:0.8,
        //     scrollTrigger: {
        //         trigger: $('.section:nth-child(6)'),
        //         start: 'top +=400px',
        //         end: '+=200px',
        //         scrub: 0.5,
        //     }
        // })
        gsap.fromTo(
          '#iphoneWrapper-2 img',
          {
            rotation: 0,
          },
          {
            rotation: 45,
            scrollTrigger: {
              trigger: $('.section:nth-child(5)'),
              start: 'top +=500px',
              end: '+=600px',
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '#iphoneWrapper-2',
          {
            opacity: 1,
            top: $('#iphoneWrapper-2').offset().top,
          },
          {
            opacity: 1,
            top:
              $('#iphoneWrapper-2').offset().top +
              $('.section:nth-child(5)').height() +
              $('#iphoneWrapper-2').height() +
              10,
            scrollTrigger: {
              trigger: $('.section:nth-child(5)'),
              start: 'top +=500px',
              end: '+=600px',
              scrub: true,
            },
          }
        )
        gsap.fromTo(
          '#iphoneWrapper-2',
          {
            opacity: 0,
            margin: '150px 0 0 0',
          },
          {
            opacity: 1,
            margin: '60px 0 0 0',
            scrollTrigger: {
              trigger: $('.section:nth-child(4)'),
              start: 'top +=100px',
              end: '+=200px',
              scrub: true,
            },
          }
        )
        // gsap.fromTo('#iphoneWrapper-2', {
        //     top:$('#iphoneWrapper-2').offset().top + $('.section:nth-child(5)').height() + $('#iphoneWrapper-2').height() + 10,
        //     margin:'60px 0 0 0',
        // }, {
        //     top:$('.androidPhone').offset().top,
        //     margin:'-80px 0 0 -60px',
        //     scrollTrigger: {
        //         trigger: $('.section:nth-child(6)'),
        //         start: 'top +=400px',
        //         end: '+=200px',
        //         scrub: 0.5,
        //     }
        // })
        gsap.fromTo(
          '.androidPhone img.androidImage',
          {
            opacity: 0,
            right: '100px',
          },
          {
            opacity: 1,
            right: '-10px',
            scrollTrigger: {
              trigger: $('.section:nth-child(6)'),
              start: 'top +=200px',
              end: '+=200px',
              scrub: true,
            },
          }
        )
      }, 2100)
    })
  }

  if ($(window).width() < 992) {
    $('.mainFooter h4').on('click', function () {
      $('.mainFooter ul:not(.socials)').stop().slideUp()
      $('.mainFooter h4').removeClass('active')
      if ($(this).next().is(':visible')) {
        $(this).next().stop().slideUp()
        $(this).removeClass('active')
      } else {
        $(this).next().stop().slideToggle()
        $(this).toggleClass('active')
      }
    })
  }

  $(window).on('resize', function () {
    if ($(window).width() > 1200) {
      fullpageInit()
    } else {
      if ($('.fp-enabled').length) {
        $.fn.fullpage.destroy('all')
      }
    }
  })
})
