<template>
  <div class="container">
    <div class="_row">
      <div class="left">
        <div class="logo">
          <img src="./assets/Group20.svg" alt="logo" />
          <span class="logo-name">
            <b><router-link to="/">PetsPaw</router-link></b>
          </span>

          <input
            type="button"
            class="switch active"
            onclick="this.classList.toggle('active');"
            @click="changeTheme()"
            value="Toggle me"
            title="Change theme"
          />
        </div>

        <div class="main-content">
          <div class="hi">Hi intern!</div>
          <div class="welcome">Welcome to MI 2022 Front-end test</div>
          <div class="lets-start">Lets start using The Cat API</div>
          <div class="carts">
            <div v-for="tab in tabs" :key="tab" class="cart">
              <img :src="tab.tabImg" class="cart" alt="cart-image" /><br />
              <button type="button" class="api-button">
                <router-link :to="tab.link">{{ tab.tabName }}</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="_container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  <Modal v-if="this.mainStore.showModal" />
</template>
<script>
import Modal from "../src/components/Modal.vue";
import { MAINstore } from "../src/store/mainStore";
export default {
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  name: "App",
  components: { Modal },
  data() {
    return {
      tabs: [
        {
          tabName: "Voting",
          tabImg: require("../src/assets/Group106.svg"),
          link: { name: "voting" },
        },
        {
          tabName: "Breeds",
          tabImg: require("../src/assets/MaskGroup.svg"),
          link: { name: "breeds" },
        },
        {
          tabName: "Gallery",
          tabImg: require("../src/assets/MaskGroup1.svg"),
          link: { name: "gallery" },
        },
      ],
    };
  },
  methods: {
    changeTheme() {
      if (document.documentElement.hasAttribute("theme")) {
        document.documentElement.removeAttribute("theme");
      } else {
        document.documentElement.setAttribute("theme", "dark");
      }
    },
  },
};
</script>

<style>
@import "./css/theme-light.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  min-height: 100%;
  overflow: auto;
}

a:-webkit-any-link {
  text-decoration: none !important;
  color: #ff868e !important;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  max-width: 1400px !important;
  overflow: none;
}
._row {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin: 0;
}
.left {
  box-sizing: border-box;
  width: 50%;
  padding-top: 20px;
  position: fixed;
  left: 0;
  top: 0;
}

.logo {
  height: 24px;
  margin-left: 70px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.logo-name {
  margin-left: 5px;
  margin-right: auto;
}

.main-content {
  margin: 20px 0 0 70px;
  text-align: left;
}

.hi {
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-size: 42px;
  line-height: 58px;
  margin: 0;
}

.welcome {
  margin: 0;
  font-family: "Jost";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 29px;
  color: #8c8c8c;
}

.lets-start {
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  margin: 25px 0 15px 0;
}

.carts {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.cart {
  width: 10vw;
  height: auto;
  border: none;
  margin-right: 1.5vw;
}

button.api-button {
  width: 10vw;
  height: 36px;
  border-radius: 10px;
  border: transparent;
  color: #ff868e !important;
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-size: 2vh;
  line-height: 16px;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 1.5vh;
}

button.api-button:hover {
  background-color: #fbe0dc;
}

button.api-button:active {
  background-color: #ff868e;
}

.right {
  box-sizing: border-box;
  width: 50% !important;
  padding: 15px 25px 15px 15px;
  height: 99vh;
}

input.switch {
  width: 0;
  overflow: hidden;
  padding-left: 28px;
  background: #787878 url() 2px center / auto 32px no-repeat;
  border-radius: 18px;
  border: 0;
  color: transparent;
  height: 20px;
  transition: all 0.3s ease-in-out;
}
input.switch:not([disabled]) {
  cursor: pointer;
}
input.switch.active {
  background-color: #ff868e;
  background-position: calc(100% - 2px) center;
}
input.switch.vertical {
  transform: rotate(-90deg);
}

/* base64 encoded circle svgs */
input.switch {
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgaWQ9InN2ZzgiCiAgIHZlcnNpb249IjEuMSIKICAgdmlld0JveD0iMCAwIDM1LjQyODgwMiAzNS40Mjg4MDIiCiAgIGhlaWdodD0iMzUuNDI4ODAybW0iCiAgIHdpZHRoPSIzNS40Mjg4MDJtbSI+CiAgPGRlZnMKICAgICBpZD0iZGVmczIiIC8+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNSI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTQuMTE4MzA5LC0xMDYuNTI5NTUpIgogICAgIGlkPSJsYXllcjEiPgogICAgPGNpcmNsZQogICAgICAgcj0iMTcuNzE0NDAxIgogICAgICAgY3k9IjEyNC4yNDM5NSIKICAgICAgIGN4PSI3MS44MzI3MSIKICAgICAgIGlkPSJwYXRoODIxIgogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjQuNzI3MDAwMjQ7c3Ryb2tlLWxpbmVjYXA6c3F1YXJlO3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiAvPgogIDwvZz4KPC9zdmc+Cg==");
  background-size: 40%;
}
input.switch[disabled] {
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMzcuOTI4ODAybW0iCiAgIGhlaWdodD0iMzcuOTI4ODAybW0iCiAgIHZpZXdCb3g9IjAgMCAzNy45Mjg4MDIgMzcuOTI4ODAyIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc4IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjUgKDIwNjBlYzFmOWYsIDIwMjAtMDQtMDgpIgogICBzb2RpcG9kaTpkb2NuYW1lPSJjaXJjbGVvcGVuLnN2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczIiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjEuNjI4MDMwMyIKICAgICBpbmtzY2FwZTpjeD0iMTA4LjU0MDE0IgogICAgIGlua3NjYXBlOmN5PSItMzIuNjg4MzcxIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGZpdC1tYXJnaW4tdG9wPSIwIgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMCIKICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIgogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIwIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMjU2MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMzkxIgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNSI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUyLjg2ODMwOSwtMTA1LjI3OTU1KSI+CiAgICA8Y2lyY2xlCiAgICAgICBzdHlsZT0ib3BhY2l0eTowLjU7ZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoyLjU7c3Ryb2tlLWxpbmVjYXA6c3F1YXJlO3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgaWQ9InBhdGg4MjEiCiAgICAgICBjeD0iNzEuODMyNzEiCiAgICAgICBjeT0iMTI0LjI0Mzk1IgogICAgICAgcj0iMTcuNzE0NDAxIiAvPgogIDwvZz4KPC9zdmc+Cg==");
  background-size: 40%;
}
</style>
