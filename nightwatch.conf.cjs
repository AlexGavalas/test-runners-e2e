module.exports = {
  src_folders: ["test"],

  plugins: [
    "@nightwatch/react",
    "@nightwatch/apitesting",
    "@nightwatch/testing-library",
  ],

  globals_path: "",

  vite_dev_server: {
    start_vite: true,
    port: 5173,
  },

  webdriver: {},

  test_workers: {
    enabled: true,
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: "http://localhost:5173",

      screenshots: {
        enabled: false,
        path: "screens",
        on_failure: true,
      },

      desiredCapabilities: {
        browserName: "chrome",
      },

      webdriver: {
        start_process: true,
        server_path: "",
        ssl: false,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
      },

      webdriver: {
        start_process: true,
        server_path: "",
        ssl: false,
      },
    },
  },
};
