export function selectInfoRender(e: Event) {
    const fuzzyInput = <HTMLInputElement>document.querySelector("#fuzzyInput");

    const selectValue = (<HTMLSelectElement>e.target).value;
    let innerText = "";
    let titleText = "";
    if (selectValue === "title") {
        innerText = "Type Title here...";
        titleText = "start typing the title";
    }
    if (selectValue === "date") {
        innerText = "Type date here...";
        titleText = "typing yyyy-mm-dd or yyyymmdd";
    }
    if (selectValue === "description") {
        innerText = "Type Task here...";
        titleText = "start typing the task";
    }
    fuzzyInput.placeholder = `${innerText}`;
    fuzzyInput.title = `${titleText}`;
}