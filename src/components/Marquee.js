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
    this.addListeners();
    this.addObserver();
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
        (entries) => {
          const entry = entries[0];

          if (!entry.isIntersecting) {
            const clone =
              entry.target.cloneNode(
                true
              );

            const container =
              this.shadowRoot.querySelector(
                "#container"
              );

            container.appendChild(
              clone
            );

            entry.target.remove();

            observer.observe(clone);
          }
        },
        {
          root: this.shadowRoot.querySelector(
            "#container"
          ),
          threshold: 0.001,
        }
      );

    observer.observe(
      this.shadowRoot.querySelector(
        "#contents"
      )
    );
  }

  addListeners() {
    document.addEventListener(
      "visibilitychange",
      () => {
        if (
          document.visibilityState ===
          "hidden"
        ) {
          this.pauseMarquee();
        } else {
          this.resumeMarquee();
        }
      }
    );
  }

  pauseMarquee() {
    const contents =
      this.shadowRoot.querySelector(
        "#contents"
      );

    if (!contents) return;

    contents.style.animationPlayState =
      "paused";
  }

  resumeMarquee() {
    const contents =
      this.shadowRoot.querySelector(
        "#contents"
      );

    if (!contents) return;

    contents.style.animationPlayState =
      "running";
  }
}

customElements.define(
  "marquee-custom",
  MarqueeComponent
);
