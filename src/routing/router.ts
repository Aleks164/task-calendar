/* eslint-disable no-unused-expressions */

type Config = {
  apiHashOn: boolean;
};
type Args = {
  state: unknown;
  currentPath: string;
  previousPath: string;
};

type MatchFunction = (path: string) => void;

type Match = RegExp | MatchFunction | string;

export type SecondCallRenderFunc = (...args: Args[]) => Promise<unknown>;

type Listener = {
  id: number;
  match: Match;
  onEnter: SecondCallRenderFunc|undefined;
  onLeave: SecondCallRenderFunc|undefined;
  onBeforeEnter: SecondCallRenderFunc|undefined;
};

export function Router(config?: Config) {
  let listeners: Listener[] = [];
  let currentPath = location.pathname;
  let previousPath = "";

  const isMatch = (match: Match, path: string) =>
    (match instanceof RegExp && match.test(path)) ||
    (typeof match === "function" && match(path)) ||
    (typeof match === "string" && match === path);

  const handleListener = async ({
    match,
    onEnter,
    onLeave,
    onBeforeEnter,
  }: Listener) => {
    const args = { currentPath, previousPath, state: history.state };
    if (currentPath !== previousPath || args.state === null) {
      if (isMatch(match, currentPath)) {
        await onBeforeEnter?.(args);
        await onEnter?.(args);
      }
      if (isMatch(match, previousPath)) {
        await onLeave?.(args);
      }
    }
  };

  const handleAllListeners = () => {
    const promList = listeners.map((el) => el);
    const chain = () => {
      const currentToDo = promList.shift();
      if (currentToDo) {
        handleListener(currentToDo).catch((e) => console.error(e));
      }
    };
    for (let i = 0; i < listeners.length; i++) {
      chain();
    }
  };

  const generateId = () => {
    const getRandomNumber = () =>
      Math.floor(Math.random() * listeners.length * 1000);
    const doesExist = (id: number) => listeners.find((item) => item.id === id);

    let id = getRandomNumber();
    while (doesExist(id)) {
      id = getRandomNumber();
    }
    return id;
  };

  const on = (
    match: Match,
    onEnter?: SecondCallRenderFunc,
    onLeave?: SecondCallRenderFunc,
    onBeforeEnter?: SecondCallRenderFunc
  ) => {
    const id = generateId();
    const listener: Listener = { id, match, onEnter, onLeave, onBeforeEnter };
    listeners.push(listener);
    handleListener(listener);
    return () => {
      listeners = listeners.filter((el) => el.id !== id);
    };
  };

  const go = (url: string, state: unknown) => {
    if (config && config.apiHashOn) {
      location.hash = url;
    } else {
      history.pushState(state, url, url);
    }
    previousPath = currentPath;
    currentPath = location.pathname;
    handleAllListeners();
  };

  window.addEventListener("popstate", () => {
    previousPath = currentPath;
    currentPath = location.pathname;
    handleAllListeners();
  });

  document.body.addEventListener("click", (event) => {
    if (!(event.target as HTMLAreaElement).matches("a")) {
      return;
    }
    event.preventDefault();

    const url = (event.target as HTMLAreaElement).getAttribute("href");

    const random = Math.random();
    if (url && typeof url === "string") {
      go(url, random);
    }
  });

  return { on };
}
