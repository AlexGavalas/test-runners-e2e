import { fireEvent, screen } from "@testing-library/react";
import Login from "../src/login";

const token = "fake_user_token";

let server;
let serverResponse = {
  status: 200,
  body: { token },
};

export default {
  title: "Login",
  component: Login,
  setup: async ({ mockserver }) => {
    server = await mockserver.create();
    server.setup((app) => {
      app.post("/api/login", function (req, res) {
        res.status(serverResponse.status).json(serverResponse.body);
      });
    });

    await server.start(5174);
  },
  teardown: async (browser) => {
    await browser.execute(function () {
      window.localStorage.removeItem("token");
    });

    await server.close();
  },
};

export const LoginWithValidCredentials = () => <Login />;
LoginWithValidCredentials.play = async () => {
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "chuck" },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "norris" },
  });

  fireEvent.click(screen.getByText(/submit/i));
};

LoginWithValidCredentials.test = async (browser) => {
  const alert = await browser.getByRole("alert");
  await expect(alert).text.to.match(/congrats/i);

  const localStorage = await browser.execute(() =>
    window.localStorage.getItem("token")
  );

  expect(localStorage).to.equal(token);
};

export const LoginWithServerException = () => <Login />;
LoginWithServerException.preRender = async () => {
  serverResponse = {
    status: 500,
    body: { message: "Internal server error" },
  };
};

LoginWithServerException.test = async (browser) => {
  const username = await browser.getByLabelText(/username/i);
  await username.sendKeys("chuck");

  const password = await browser.getByLabelText(/password/i);
  await password.sendKeys("norris");

  const submit = await browser.getByText(/submit/i);
  await submit.click();

  const alert = await browser.getByRole("alert");
  await expect(alert).text.to.match(/internal server error/i);

  const localStorage = await browser.execute(() =>
    window.localStorage.getItem("token")
  );

  expect(localStorage).to.equal(token);
};
