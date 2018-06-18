import Modernizr from 'modernizr';
import anime from 'animejs';

window.addEventListener('load', function() {
  var mql = window.matchMedia('(max-width: 799.98px)');
  var formReset = document.querySelector('.form--reset');
  var formLogin = document.querySelector('.form--login');

  var animateFormLogin = anime.timeline({
    autoplay: false
  });

  function choiceAnimate(e) {
    if (mql.matches) {
      formReset.style.transform = 'scale(0.8)';

      animateFormLogin
        .add({
          targets: '.form--login',
          scale: {
            value: 0.8,
            easing: 'easeOutCubic',
            duration: 600
          },
          opacity: {
            value: 0,
            easing: 'easeOutCubic',
            duration: 600
          }
        })
        .add({
          targets: '.form--reset',
          scale: {
            value: 1,
            easing: 'easeOutCubic',
            duration: 600
          },
          opacity: {
            value: 1,
            easing: 'easeOutCubic',
            duration: 600
          }
        });
    } else if (!Modernizr.es6number && !mql.matches) {
      formReset.style.transform = 'scale(0.8)';

      animateFormLogin
        .add({
          targets: '.block--login-bg .bg',
          scale: 0,
          opacity: 0,
          duration: 600,
          easing: 'easeInCubic',
        })
        .add({
          targets: '.form--login',
          scale: {
            value: 0.8,
            easing: 'easeOutCubic',
            duration: 600
          },
          opacity: {
            value: 0,
            easing: 'easeOutCubic',
            duration: 600
          }
        })
        .add({
          targets: '.form--reset',
          scale: {
            value: 1,
            easing: 'easeOutCubic',
            duration: 600
          },
          opacity: {
            value: 1,
            easing: 'easeOutCubic',
            duration: 600
          }
        })
        .add({
          targets: '.block--login-bg .bg',
          scale: 1,
          opacity: 1,
          duration: 600,
          easing: 'easeOutCubic',
        });
    } else {
      animateFormLogin
        .add({
          targets: '.block--login-bg .bg',
          scale: 0,
          opacity: 0,
          duration: 600,
          easing: 'easeInCubic',
        })
        .add({
          targets: '.block--form-flip',
          scale: {
            value: 1.2,
            easing: 'easeOutCubic',
            duration: 600,
          },
          rotateY: {
            value: 180,
            easing: 'linear',
            duration: 600,
            delay: 600
          },
          perspective: '800px',
          offset: '-=300'
        })
        .add({
          targets: '.block--login-bg .bg',
          scale: 1,
          opacity: 1,
          duration: 600,
          easing: 'easeOutCubic',
        })
        .add({
          targets: '.block--form-flip',
          scale: {
            value: 1,
            easing: 'easeOutCubic',
            duration: 600,
          },
          rotateY: {
            value: 180,
            easing: 'linear',
            duration: 600,
            delay: 600
          },
          perspective: '800px',
          offset: '-=300'
        });
    }
  }
  choiceAnimate();

  function forgotLogin() {
    if (!Modernizr.es6number) {
      formReset.style.zIndex = '2';
      formLogin.style.zIndex = '0';
    }
    if (animateFormLogin.reversed) {
      animateFormLogin.reverse();
      animateFormLogin.play();
    } else {
      animateFormLogin.play();
    }
  };

  function backLogin() {
    if (!Modernizr.es6number) {
      formReset.style.zIndex = '0';
      formLogin.style.zIndex = '2';
    }
    if (!animateFormLogin.reversed) {
      animateFormLogin.reverse();
      animateFormLogin.play();
    } else {
      animateFormLogin.play();
    }
  };

  document.querySelector('.btn--forgot').addEventListener('click', forgotLogin, false);

  document.querySelector('.btn--back').addEventListener('click', backLogin, false);
})
