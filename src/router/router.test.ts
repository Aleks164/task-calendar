import { Router } from "./router";

const sleep = (ms = 100) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
let homeEl: HTMLAreaElement;
let tasksEl: HTMLAreaElement;
let aboutEl: HTMLAreaElement;
let el: HTMLDivElement;
describe.skip("router", () => {
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
    homeEl = <HTMLAreaElement>el.querySelector("#home");
    tasksEl = <HTMLAreaElement>el.querySelector("#tasks");
    aboutEl = <HTMLAreaElement>el.querySelector("#about");
    el = document.createElement("div");
    document.body.appendChild(el);
    el.innerHTML = `
      <nav>
        <a id="home" href="/">Home</a>
        <a id="tasks" href="/tasks">tasks</a>
        <a id="about" href="/about">About</a>
        <a id="about-us" href="/about/us">About / Us</a>
      </nav>
`;
    jest.spyOn(window.Math, "random").mockReturnValue(0.123);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    onLeave.mockClear();
    onBeforeEnter.mockClear();
    onEnter.mockClear();
    jest.spyOn(window.Math, "random").mockRestore();
  });

  it("routerOn is a function", () => {
    const router = Router();
    const routerOn = router.on("/", undefined, undefined, undefined);
    expect(routerOn).toBeInstanceOf(Function);
  });

  it("should invoke expected hooks on tasks click with onEnter", async () => {
    const router = Router();

    router.on((path) => path === "/tasks", onEnter, undefined, undefined);

    await sleep();
    homeEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();
    tasksEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();
    expect(onEnter).lastCalledWith({
      currentPath: "/tasks",
      previousPath: "/",
      state: 0.123
    });
  });

  it("should invoke expected hooks with hashApi", async () => {
    const router = Router({ apiHashOn: true });
    router.on((path) => path === "/tasks", onEnter, onLeave, undefined);
    router.on(/\/about/, undefined, undefined, onBeforeEnter);

    await sleep();
    tasksEl?.dispatchEvent(new Event("click", { bubbles: true }));
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
    router.on((path) => path === "/tasks", onEnter, onLeave, undefined);
    router.on(/\/about/, undefined, undefined, onBeforeEnter);

    homeEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    tasksEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onEnter).lastCalledWith({
      currentPath: "/tasks",
      previousPath: "/",
      state: 0.123
    });

    homeEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onEnter).lastCalledWith({
      currentPath: "/",
      previousPath: "/tasks",
      state: 0.123
    });

    expect(onLeave).lastCalledWith({
      currentPath: "/",
      previousPath: "/tasks",
      state: 0.123
    });
    aboutEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onBeforeEnter).lastCalledWith({
      currentPath: "/about",
      previousPath: "/",
      state: 0.123
    });
  });
});
