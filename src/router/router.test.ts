import { Router } from "./router";

const sleep = (ms = 100) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

describe("router", () => {
  const el = document.createElement("div");
  document.body.appendChild(el);

  el.innerHTML = `
      <nav>
        <a id="home" href="/">Home</a>
        <a id="contacts" href="/contacts">Contacts</a>
        <a id="about" href="/about">About</a>
        <a id="about-us" href="/about/us">About / Us</a>
      </nav>
`;
  const homeEl = el.querySelector("#home");
  const contactsEl = el.querySelector("#contacts");
  const aboutEl = el.querySelector("#about");

  const onLeave = jest.fn().mockImplementation(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("ok");
        }, 0);
      })
  );
  const onBeforeEnter = jest.fn().mockImplementation(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("ok");
        }, 0);
      })
  );
  const onEnter = jest.fn().mockImplementation(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("ok");
        }, 0);
      })
  );
  beforeEach(() => {
    jest.spyOn(window.Math, "random").mockReturnValue(0.123);
  });

  afterEach(() => {
    onLeave.mockClear();
    onBeforeEnter.mockClear();
    onEnter.mockClear();
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("routerOn is a function", () => {
    const router = Router();
    const routerOn = router.on("/", undefined, undefined, undefined);
    expect(routerOn).toBeInstanceOf(Function);
  });

  it("should invoke expected hooks on contacts click with onEnter", async () => {
    const router = Router();

    router.on((path) => path === "/contacts", onEnter, undefined, undefined);

    await sleep();
    homeEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();
    contactsEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();
    expect(onEnter).lastCalledWith({
      currentPath: "/contacts",
      previousPath: "/",
      state: 0.123,
    });
  });

  it("should invoke expected hooks with hashApi", async () => {
    const router = Router({ apiHashOn: true });
    router.on((path) => path === "/contacts", onEnter, onLeave, undefined);
    router.on(/\/about/, undefined, undefined, onBeforeEnter);

    await sleep();
    contactsEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    aboutEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onEnter).toHaveBeenCalled();
    expect(onLeave).toHaveBeenCalled();
    expect(onBeforeEnter).toHaveBeenCalled();
  });

  it("expected hooks should be called at certain clicks", async () => {
    const router = Router();
    router.on("/", onEnter, undefined, undefined);
    router.on((path) => path === "/contacts", onEnter, onLeave, undefined);
    router.on(/\/about/, undefined, undefined, onBeforeEnter);

    homeEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    contactsEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onEnter).lastCalledWith({
      currentPath: "/contacts",
      previousPath: "/",
      state: 0.123,
    });

    homeEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onEnter).lastCalledWith({
      currentPath: "/",
      previousPath: "/contacts",
      state: 0.123,
    });

    expect(onLeave).lastCalledWith({
      currentPath: "/",
      previousPath: "/contacts",
      state: 0.123,
    });
    aboutEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onBeforeEnter).lastCalledWith({
      currentPath: "/about",
      previousPath: "/",
      state: 0.123,
    });
  });
});
