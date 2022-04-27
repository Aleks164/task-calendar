import { Router } from "./router";

const sleep = (ms = 100) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
let homeEl: HTMLAreaElement;
let tasksEl: HTMLAreaElement;
let aboutEl: HTMLAreaElement;
let el: HTMLDivElement;
describe("router", () => {
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
    el = document.createElement("div");
    el.innerHTML = `
      <nav>
        <a id="home" href="/task-calendar/">Home</a>
        <a id="tasks" href="/task-calendar/tasks">tasks</a>
        <a id="about" href="/task-calendar/about">About</a>
        <a id="about-us" href="/task-calendar/about/us">About / Us</a>
      </nav>
`;
    document.body.appendChild(el);

    homeEl = <HTMLAreaElement>el.querySelector("#home");
    tasksEl = <HTMLAreaElement>el.querySelector("#tasks");
    aboutEl = <HTMLAreaElement>el.querySelector("#about");
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
    const routerOn = router.on(
      "/task-calendar/",
      undefined,
      undefined,
      undefined
    );
    expect(routerOn).toBeInstanceOf(Function);
  });

  it("should invoke expected hooks on tasks click with onEnter", async () => {
    const router = Router();

    router.on(
      (path) => path === "/task-calendar/tasks",
      onEnter,
      undefined,
      undefined
    );

    await sleep();
    homeEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();
    tasksEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();
    expect(onEnter).lastCalledWith({
      currentPath: "/task-calendar/tasks",
      previousPath: "/task-calendar/",
      state: 0.123,
    });
  });

  it("should invoke expected hooks with hashApi", async () => {
    const router = Router({ apiHashOn: true });
    router.on(
      (path) => path === "/task-calendar/tasks",
      onEnter,
      onLeave,
      undefined
    );
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
    router.on("/task-calendar/", onEnter, undefined, undefined);
    router.on(
      (path) => path === "/task-calendar/tasks",
      onEnter,
      onLeave,
      undefined
    );
    router.on(/\/about/, undefined, undefined, onBeforeEnter);

    homeEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    tasksEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onEnter).lastCalledWith({
      currentPath: "/task-calendar/tasks",
      previousPath: "/task-calendar/",
      state: 0.123,
    });

    homeEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onEnter).lastCalledWith({
      currentPath: "/task-calendar/",
      previousPath: "/task-calendar/tasks",
      state: 0.123,
    });

    expect(onLeave).lastCalledWith({
      currentPath: "/task-calendar/",
      previousPath: "/task-calendar/tasks",
      state: 0.123,
    });
    aboutEl?.dispatchEvent(new Event("click", { bubbles: true }));
    await sleep();

    expect(onBeforeEnter).lastCalledWith({
      currentPath: "/task-calendar/about",
      previousPath: "/task-calendar/",
      state: 0.123,
    });
  });
});
