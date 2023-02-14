async function fetchTasks() {
  try {
    const res = await fetch(`/log`);
    if (!res.ok) return null;

    const result = await res.json();
    return result.allTasks;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchLog(logName = "glados") {
  try {
    const res = await fetch(`/log?logName=${logName}`);
    if (!res.ok) return null;

    const result = await res.json();
    return result.logs;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function renderLog(logName) {
  const logs = await fetchLog(logName);

  const section = document.createElement("section");
  const h1 = document.createElement("h1");
  const ul = document.createElement("ul");

  h1.innerText = logName + `(${logs.length})`;

  logs.forEach((log) => {
    const li = document.createElement("li");
    li.innerText = log;
    ul.appendChild(li);
  });

  section.appendChild(h1);
  section.appendChild(ul);

  document.body.querySelector("main").appendChild(section);
}

async function renderTasks() {
  const allTasks = await fetchTasks();

  if (!allTasks) return false;

  allTasks.forEach(async (item) => {
    await renderLog(item);
  });
  return true;
}

async function main() {
  if (!(await renderTasks())) {
    const h1 = document.createElement("h1");
    h1.innerText = "Something went wrong!";
    document.body.querySelector("main").appendChild(h1);
  }
}

main();
