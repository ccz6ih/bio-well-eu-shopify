if (!customElements.get('popup-modal')) {
  customElements.define(
    'popup-modal',
    class PopupModal extends HTMLElement {
      constructor() {
        super();

        this.storageKey = 'concept:popup-on-load:seen';
        this.classes = {
          open: 'is-open',
          visible: 'is-visible',
        };
      }

      connectedCallback() {
        if (window.location.pathname === '/challenge') return;

        this.testMode = this.getAttribute('data-test-mode') === 'true';

        this.overlay = this.querySelector('overlay-element');
        this.closer = this.querySelector('.drawer__close');

        if (this.closer) {
          this.closer.addEventListener('click', (e) => {
            e.preventDefault();
            this.hide();
          });
        }

        document.addEventListener('keyup', (event) => {
          if (event.code === 'Escape' && this.classList.contains(this.classes.open)) {
            this.hide();
          }
        });

        if (this.overlay) {
          this.overlay.addEventListener('click', () => this.hide());
        }

        if (Shopify && Shopify.designMode) {
          return;
        }

        if (this.shouldShow()) {
          this.show();
        }
      }

      shouldShow() {
        if (this.testMode) return true;
        try {
          return window.sessionStorage.getItem(this.storageKey) === null;
        } catch (e) {
          // sessionStorage may be unavailable (e.g. private mode in some browsers)
          return true;
        }
      }

      show() {
        if (Shopify && Shopify.designMode) return;

        this.hidden = false;
        this.removeAttribute('inert');

        // Two-step transition: first make the element visible (display),
        // then trigger the opacity/scale transition on the next frame.
        requestAnimationFrame(() => {
          this.classList.add(this.classes.open);
          requestAnimationFrame(() => {
            this.classList.add(this.classes.visible);
            this.setAttribute('active', '');
            document.body.classList.add('has-modal-open');
          });
        });
      }

      hide() {
        this.classList.remove(this.classes.visible);
        this.removeAttribute('active');
        document.body.classList.remove('has-modal-open');

        // Stop all videos in the popup (native + YouTube/Vimeo iframes)
        this.pauseAllMedia();

        const onTransitionEnd = (event) => {
          if (event.target !== this) return;
          this.classList.remove(this.classes.open);
          this.hidden = true;
          this.setAttribute('inert', '');
          this.removeEventListener('transitionend', onTransitionEnd);
        };

        this.addEventListener('transitionend', onTransitionEnd);

        if (this.testMode) {
          this.clearSessionFlag();
        } else {
          this.markSessionSeen();
        }
      }

      pauseAllMedia() {
        // Native HTML5 <video> elements
        this.querySelectorAll('video').forEach((video) => {
          try {
            video.pause();
            video.currentTime = 0;
          } catch (e) {
            /* ignore */
          }
        });

        // <video-media> custom elements — reset so the template re-clicks the play button
        this.querySelectorAll('video-media').forEach((media) => {
          try {
            const innerVideo = media.querySelector('video');
            if (innerVideo) {
              innerVideo.pause();
              innerVideo.currentTime = 0;
            }
            // Reset the custom element to its poster state
            if (typeof media.reset === 'function') {
              media.reset();
            } else {
              media.setAttribute('inert', '');
              media.removeAttribute('inert');
            }
          } catch (e) {
            /* ignore */
          }
        });

        // YouTube / Vimeo iframes — postMessage to stop playback
        this.querySelectorAll('iframe').forEach((iframe) => {
          const src = iframe.src || '';
          try {
            if (src.includes('youtube.com') || src.includes('youtu.be')) {
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'stopVideo', args: '' }),
                '*'
              );
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
                '*'
              );
            } else if (src.includes('vimeo.com')) {
              iframe.contentWindow.postMessage({ method: 'pause' }, '*');
            }
          } catch (e) {
            /* ignore cross-origin errors */
          }
        });
      }

      markSessionSeen() {
        try {
          window.sessionStorage.setItem(this.storageKey, '1');
        } catch (e) {
          /* ignore */
        }
      }

      clearSessionFlag() {
        try {
          window.sessionStorage.removeItem(this.storageKey);
        } catch (e) {
          /* ignore */
        }
      }
    }
  );
}
