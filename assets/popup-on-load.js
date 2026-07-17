if (!customElements.get('popup-modal')) {
  customElements.define(
    'popup-modal',
    class PopupModal extends HTMLElement {
      constructor() {
        super();

        this.cookieName = 'concept:popup-on-load';
        this.classes = {
          open: 'is-open',
          visible: 'is-visible',
        };
      }

      connectedCallback() {
        if (window.location.pathname === '/challenge') return;

        this.testMode = this.getAttribute('data-test-mode') === 'true';
        this.delay = this.hasAttribute('data-delay') ? parseInt(this.getAttribute('data-delay'), 10) : 0;
        this.expiry = this.hasAttribute('data-expiry') ? parseInt(this.getAttribute('data-expiry'), 10) : 7;

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
          this.scheduleShow();
        }
      }

      shouldShow() {
        return this.testMode || !this.getCookie(this.cookieName);
      }

      scheduleShow() {
        if (this.delay <= 0) {
          this.show();
        } else {
          setTimeout(() => this.show(), this.delay * 1000);
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

        const onTransitionEnd = (event) => {
          if (event.target !== this) return;
          this.classList.remove(this.classes.open);
          this.hidden = true;
          this.setAttribute('inert', '');
          this.removeEventListener('transitionend', onTransitionEnd);
        };

        this.addEventListener('transitionend', onTransitionEnd);

        if (this.testMode) {
          this.removeCookie(this.cookieName);
        } else {
          this.setCookie(this.cookieName, this.expiry);
        }
      }

      getCookie(name) {
        const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return match ? match[2] : null;
      }

      setCookie(name, days) {
        document.cookie = name + '=true; max-age=' + (days * 24 * 60 * 60) + '; path=/';
      }

      removeCookie(name) {
        document.cookie = name + '=; max-age=0';
      }
    }
  );
}
