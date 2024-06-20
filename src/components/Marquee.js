class MarqueeComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this.state = {
      clonedContentsElement: null,
    };
  }

  connectedCallback() {
    this.render();
    this.addObserver();

    window.addEventListener('resize', () => {
      this.render();
      this.addObserver();
    });
  }

  disconnectedCallback () {
    const allContents = this.shadowRoot.querySelectorAll('#contents')

    allContents.forEach((el) => {
      this.observer.unobserve(el)
    })

    console.log('unobserved', allContents)

    this.shadowRoot.innerHTML = ``;
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
        ${PageComponent.resetStyles}

        #container {
          width: 100%;
          height: 100%;

          position: relative;
          overflow: hidden;
        }

        #contents {
          width: fit-content;
          height: fit-content;
          margin-right: 10px;

          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);

          animation: 15s flowLeft linear forwards;

          display: grid;
          place-items: center;
        }

        @keyframes flowLeft {
          0% {
            right: 0;
            transform: translateX(100%) translateY(-50%);
          }

          100% {
            right: 100%;
            transform: translateX(-120%) translateY(-50%);
          }
        }
      </style>

      <div id='container'>
        <div id='contents'>
          <slot>
          </slot>
        </div>
      </div>
    `;
  }

  addObserver() {
    const observer =
      new IntersectionObserver(
        (entries, observe) => {
          const entry = entries[0];

          if (!entry.isIntersecting) {
            console.log(entry, observe)

            if ([...entry.target.classList].includes('intersected')) {
              const clone = entry.target.cloneNode(true)

              entry.target.remove();

              const container = this.shadowRoot.querySelector('#container')
              container.appendChild(clone)
              observer.observe(clone)
            }
          } else {
            entry.target.classList.add('intersected');
          }
        },
        {
          root: this.shadowRoot.querySelector(
            "#container"
          ),
          threshold: 0.01,
        }
      );

    this.observer = observer;

    observer.observe(
      this.shadowRoot.querySelector(
        "#contents"
      )
    );
  }
}

customElements.define(
  "marquee-custom",
  MarqueeComponent
);
