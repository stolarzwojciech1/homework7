{
    let tasks = [];
    let hideDoneTasks = true;
  let a= 0;

    const renderTasks = () => {
        const listToHTML = task =>
            `<li class='list__item ${task.finished && hideDoneTasks ? "list__item--hidden" : ""}'>
            <button class="list__button list__button--finish js-finishButtons"></button>
            <span class="list__itemText ${task.finished === true ? "list__item--finished" : ""}">
            ${task.content}
            </span>
            <button class="list__button list__button--delete js-deleteButtons">&#x1F5D1</button>
            </li>`;

        const listElement = document.querySelector(".js-tasksList");
        listElement.innerHTML = tasks.map(listToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsCheck = document.querySelector(".js-tasksList").innerHTML;
        const sectionHeader = document.querySelector(".list__header")

        if (buttonsCheck !== "") {
            sectionHeader.innerHTML =
                `Lista zadań
            <button class="header__button--hideDone js-hideFinishedButton" ${tasks.every(({ finished }) => !finished) ? "disabled" : ""}>
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="header__button--finishAll ${tasks.every(({ finished }) => finished) ? "disabled" : ""} js-finishAllButton">
            Ukończ wszystkie
            </button>
            <button class="header__button--finishAll ${tasks.every(({ finished }) => finished) ? "disabled" : ""} js-openAllButton">
            Odznacz wszystkie
            </button>
            
            
            `
            
            
            return;
        };

        sectionHeader.innerHTML = "Lista zadań";
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleEvents();
        bindButtonsEvents();
    };

    const bindButtonsEvents = () => {
        const buttonsCheck = document.querySelector(".js-tasksList").innerHTML;

        if (buttonsCheck !== "") {
            const finishAllButton = document.querySelector(".js-finishAllButton");
            finishAllButton.addEventListener("click", () => {
                finishAllTasks();
                

            });
            const hideFinishedButton = document.querySelector(".js-hideFinishedButton");
            hideFinishedButton.addEventListener("click", () => {
                hideFinishedTasks();


            });
            const openAllButton = document.querySelector(".js-openAllButton");
            openAllButton.addEventListener("click", () => {
 
            
                openAllButton.classList.toggle(openAllTasks());
                
        });
        };
        return;
    };

    const bindRemoveEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-deleteButtons");

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            });
        });
    };

    const bindToggleEvents = () => {
        const finishButtons = document.querySelectorAll(".js-finishButtons");

        finishButtons.forEach((finishButton, index) => {
            finishButton.addEventListener("click", () => {
                finishTask(index);
            });
            tasks[index].finished === true ? finishButton.innerHTML = "&#x2714" : "";
        });
    };

    const autofocus = () => {
        const newTaskFocus = document.querySelector(".form__input")

        newTaskFocus.value = "";
        newTaskFocus.focus();
    };

    const deleteTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const finishTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                finished: !tasks[index].finished,
            },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
       
        render();
    };

    const finishAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task, finished: true
        }));

        const a=0;
        render();
    };

    const openAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task, finished: false
        }));

        const a= 1;
        render();
    };

    const hideFinishedTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            autofocus();
            return;
        };

        addNewTask(newTaskContent);
        autofocus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}